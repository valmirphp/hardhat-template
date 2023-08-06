import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { deployGreeterFixture } from "./Greeter.fixture";

describe("Greeter", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.user = signers[1];

    this.loadFixture = loadFixture;
  });

  describe("Admin", function () {
    before(async function () {
      const { greeter } = await this.loadFixture(deployGreeterFixture);
      this.greeter = greeter;
    });

    it("[admin] read", async function () {
      const contract = this.greeter.connect(this.signers.admin);
      expect(await contract.greet()).to.equal("Hello, world!");
    });

    it("[admin] should return the new greeting once it's changed", async function () {
      const contract = this.greeter.connect(this.signers.admin);
      const address = this.signers.admin.address;
      const message = "Bonjour, le monde!";

      //"Deve disparar evento: MintedBox"
      await expect(contract.setGreeting(message)).to.emit(this.greeter, "Greeted").withArgs(address, message, false);

      // Deve alterar a mensagem
      expect(await contract.greet()).to.equal(message);
    });

    it("[admin] setGreetingMaster", async function () {
      const contract = this.greeter.connect(this.signers.admin);
      await contract.setGreetingMaster("Hello, master!");
      expect(await contract.greet()).to.equal("*Hello, master!*");
    });
  });

  describe("User", function () {
    before(async function () {
      const { greeter } = await this.loadFixture(deployGreeterFixture);
      this.greeter = greeter;
    });

    it("[user] read", async function () {
      const contract = this.greeter.connect(this.signers.user);
      expect(await contract.greet()).to.equal("Hello, world!");
    });

    it("[user] should return the new greeting once it's changed", async function () {
      const contract = this.greeter.connect(this.signers.user);
      await contract.setGreeting("Bonjour, le monde!");
      expect(await contract.greet()).to.equal("Bonjour, le monde!");
    });

    it("[user] deve gerar erro ao tentar setar um texto com wallet da leia", async function () {
      const contract = this.greeter.connect(this.signers.user);
      await expect(contract.setGreetingMaster("Meu pai é o Darth Vader!")).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });
  });
});
