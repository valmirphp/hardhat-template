import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Greeter } from "../../types";
import { deployGreeterFixture } from "./greeter.fixture";

describe("Contract Greeter", function () {
  let adminSigner: SignerWithAddress;
  let userSigner: SignerWithAddress;

  before(async function () {
    [adminSigner, userSigner] = await ethers.getSigners();
  });

  describe("Admin Wallet", function () {
    let greeter: Greeter;

    before(async function () {
      const fixture = await loadFixture(deployGreeterFixture);
      greeter = fixture.greeter.connect(adminSigner);
    });

    it("Should return the greeting", async function () {
      expect(await greeter.greet()).to.equal("Hello, world!");
    });

    it("Should return the new greeting once it's changed", async function () {
      const address = adminSigner.address;
      const message = "Bonjour, le monde!";

      // Should emit event
      await expect(greeter.setGreeting(message)) //
        .to.emit(greeter, "Greeted")
        .withArgs(address, message, false);

      // Should change greeting
      expect(await greeter.greet()).to.equal(message);
    });

    it("Should change master greeting with event", async function () {
      const address = adminSigner.address;
      const expected = "*Hello, master!*";

      // Should emit event
      await expect(greeter.setGreetingMaster("Hello, master!")) //
        .to.emit(greeter, "Greeted")
        .withArgs(address, expected, true);

      // Should change greeting
      expect(await greeter.greet()).to.equal(expected);
    });

    it("Should error when contract is paused", async function () {
      await greeter.pause().catch(() => {}); // ignore error

      await expect(greeter.setGreeting("Hello!")) //
        .to.revertedWithCustomError(greeter, "IsPaused");

      await expect(greeter.setGreetingMaster("Hello, master!")) //
        .to.revertedWithCustomError(greeter, "IsPaused");
    });

    it("Own can pause contract", async function () {
      await greeter.unpause().catch(() => {}); // ignore error

      await expect(greeter.pause()) //
        .to.be.emit(greeter, "Paused")
        .withArgs(adminSigner.address);
    });

    it("Own can unpause contract", async function () {
      await greeter.pause().catch(() => {}); // ignore error

      await expect(greeter.unpause()) //
        .to.be.emit(greeter, "Unpaused")
        .withArgs(adminSigner.address);
    });

    it("Own can transfer Ownership", async function () {
      await greeter.unpause().catch(() => {}); // ignore error

      expect(await greeter.owner()).to.be.equal(adminSigner.address);

      expect(await greeter.isOwner()).to.be.true;

      await expect(greeter.transferOwnership(ethers.ZeroAddress)) //
        .to.be.revertedWithCustomError(greeter, "OwnerZeroAddress");

      await expect(greeter.transferOwnership(userSigner.address)) //
        .to.be.emit(greeter, "OwnershipTransferred")
        .withArgs(adminSigner.address, userSigner.address);
    });

    it("Call throwError", async function () {
      await expect(greeter.throwError()).to.be.revertedWithCustomError(greeter, "GreeterError");
    });
  });

  describe("User Wallet", function () {
    let greeter: Greeter;

    before(async function () {
      const fixture = await loadFixture(deployGreeterFixture);
      greeter = fixture.greeter.connect(userSigner);
    });

    it("Should return the greeting", async function () {
      expect(await greeter.greet()).to.equal("Hello, world!");
    });

    it("Should return the new greeting once it's changed", async function () {
      const address = userSigner.address;
      const message = "Bonjour, le monde!";

      // Should emit event
      await expect(greeter.setGreeting(message)) //
        .to.emit(greeter, "Greeted")
        .withArgs(address, message, false);

      // Should change greeting
      expect(await greeter.greet()).to.equal(message);
    });

    it("Should error when a regular wallet tries to change the master greeting", async function () {
      await expect(greeter.setGreetingMaster("Buen día")) //
        .to.be.revertedWithCustomError(greeter, "Unauthorized");
    });

    it("Should error when a regular wallet tries to pause", async function () {
      await expect(greeter.pause()) //
        .to.be.revertedWithCustomError(greeter, "Unauthorized");
    });

    it("Should error when a regular wallet tries to unpause", async function () {
      await expect(greeter.unpause()) //
        .to.be.revertedWithCustomError(greeter, "Unauthorized");
    });

    it("Should error when a regular wallet tries transfer Ownership", async function () {
      expect(await greeter.isOwner()).to.be.false;

      await expect(greeter.transferOwnership(userSigner.address)) //
        .to.be.revertedWithCustomError(greeter, "Unauthorized");
    });
  });
});
