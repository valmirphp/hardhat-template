import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:setGreeting", "Set the greeting on the Greeter contract")
  .addParam("greeting", "Say hello, be nice")
  .addParam("account", "Specify which account [0, 9]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, helpers } = hre;
    const signers = await ethers.getSigners();
    const greeter = await helpers.getGreeter();

    await greeter.connect(signers[taskArguments.account]).setGreeting(taskArguments.greeting);

    console.log("Greeter contract #", await greeter.getAddress());
    console.log("Greeting set: ", taskArguments.greeting);
  });
