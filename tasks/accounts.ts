import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  const data: Array<{ address: string; balance: string }> = [];

  for (const account of accounts) {
    const balance = await account.provider.getBalance(account.address);

    data.push({
      address: account.address,
      balance: hre.ethers.formatEther(balance),
    });
  }

  console.table(data);
});
