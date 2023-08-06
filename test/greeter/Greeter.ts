import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { deployGreeterFixture } from "./Greeter.fixture";

describe("Contract Greeter", function () {
  let adminSigner: SignerWithAddress;
  let userSigner: SignerWithAddress;

  before(async function () {
    [adminSigner, userSigner] = await ethers.getSigners();
  });

  describe("Admin Wallet", function () {
    before(async function () {
      const { greeter } = await loadFixture(deployGreeterFixture);
      this.greeter = greeter.connect(adminSigner);
    });

    it("Should return the greeting", async function () {
      expect(await this.greeter.greet()).to.equal("Hello, world!");
    });

    it("Should return the new greeting once it's changed", async function () {
      const address = adminSigner.address;
      const message = "Bonjour, le monde!";

      // Should emit event
      await expect(this.greeter.setGreeting(message)) //
        .to.emit(this.greeter, "Greeted")
        .withArgs(address, message, false);

      // Should change greeting
      expect(await this.greeter.greet()).to.equal(message);
    });

    it("Should change master greeting with event", async function () {
      const address = adminSigner.address;
      const expected = "*Hello, master!*";

      // Should emit event
      await expect(this.greeter.setGreetingMaster("Hello, master!")) //
        .to.emit(this.greeter, "Greeted")
        .withArgs(address, expected, true);

      // Should change greeting
      expect(await this.greeter.greet()).to.equal(expected);
    });

    it("Should error when contract is paused", async function () {
      await this.greeter.pause().catch(() => {}); // ignore error

      await expect(this.greeter.setGreeting("Hello!")) //
        .to.revertedWith("Pausable: paused");

      await expect(this.greeter.setGreetingMaster("Hello, master!")) //
        .to.revertedWith("Pausable: paused");
    });

    it("Own can pause contract", async function () {
      await this.greeter.unpause().catch(() => {}); // ignore error

      await expect(this.greeter.pause()) //
        .to.be.emit(this.greeter, "Paused")
        .withArgs(adminSigner.address);
    });

    it("Own can unpause contract", async function () {
      await this.greeter.pause().catch(() => {}); // ignore error

      await expect(this.greeter.unpause()) //
        .to.be.emit(this.greeter, "Unpaused")
        .withArgs(adminSigner.address);
    });

    it("Own can transfer Ownership", async function () {
      await this.greeter.unpause().catch(() => {}); // ignore error

      expect(await this.greeter.owner()).to.be.equal(adminSigner.address);

      expect(await this.greeter.isOwner()).to.be.true;

      await expect(this.greeter.transferOwnership(ethers.ZeroAddress)) //
        .to.be.revertedWith("Ownable: new owner is the zero address");

      await expect(this.greeter.transferOwnership(userSigner.address)) //
        .to.be.emit(this.greeter, "OwnershipTransferred")
        .withArgs(adminSigner.address, userSigner.address);
    });

    it("Call throwError", async function () {
      await expect(this.greeter.throwError()).to.be.revertedWithCustomError(this.greeter, "GreeterError");
    });
  });

  describe("User Wallet", function () {
    before(async function () {
      const { greeter } = await loadFixture(deployGreeterFixture);
      this.greeter = greeter.connect(userSigner);
    });

    it("Should return the greeting", async function () {
      expect(await this.greeter.greet()).to.equal("Hello, world!");
    });

    it("Should return the new greeting once it's changed", async function () {
      const address = userSigner.address;
      const message = "Bonjour, le monde!";

      // Should emit event
      await expect(this.greeter.setGreeting(message)) //
        .to.emit(this.greeter, "Greeted")
        .withArgs(address, message, false);

      // Should change greeting
      expect(await this.greeter.greet()).to.equal(message);
    });

    it("Should error when a regular wallet tries to change the master greeting", async function () {
      await expect(this.greeter.setGreetingMaster("Buen día")) //
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should error when a regular wallet tries to pause", async function () {
      await expect(this.greeter.pause()) //
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should error when a regular wallet tries to unpause", async function () {
      await expect(this.greeter.unpause()) //
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should error when a regular wallet tries transfer Ownership", async function () {
      expect(await this.greeter.isOwner()).to.be.false;

      await expect(this.greeter.transferOwnership(userSigner.address)) //
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
