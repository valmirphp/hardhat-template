import { ethers } from "hardhat";

import type { Greeter } from "../../types/Greeter";

export type GreeterFixture = {
  greeter: Greeter;
  greeterAddress: string;
};

// We define a fixture to reuse the same setup in every test.
// We use loadFixture to run this setup once, snapshot that state,
// and reset Hardhat Network to that snapshot in every test.
export async function deployGreeterFixture(): Promise<GreeterFixture> {
  const signers = await ethers.getSigners();
  const admin = signers[0];

  const greeting = "Hello, world!";
  const greeterFactory = await ethers.getContractFactory("Greeter");
  const greeter = await greeterFactory.connect(admin).deploy(greeting);
  await greeter.waitForDeployment();

  return { greeter, greeterAddress: await greeter.getAddress() };
}
