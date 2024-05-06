import { resolve } from "node:path";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import type { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import * as envEnc from "@chainlink/env-enc";

import utils from "./hardhat.utils";
import "./hre/helpers";
import "./tasks/accounts";
import "./tasks/setGreeting";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

if (process.env.NODE_ENV !== "test") {
  envEnc.config({ path: "./.env.enc" });
}

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  // TODO revisar
  // etherscan: {
  //   apiKey: {
  //     arbitrumOne: process.env.ARBISCAN_API_KEY || "",
  //     avalanche: process.env.SNOWTRACE_API_KEY || "",
  //     bsc: process.env.BSCSCAN_API_KEY || "",
  //     mainnet: process.env.ETHERSCAN_API_KEY || "",
  //     optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
  //     polygon: process.env.POLYGONSCAN_API_KEY || "",
  //     polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
  //     sepolia: process.env.ETHERSCAN_API_KEY || "",
  //   },
  // },
  // gasReporter: {
  //   currency: "USD",
  //   token: "ETH",
  //   gasPriceApi: "Etherscan",
  //   gasPrice: 21,
  //   enabled: !!process.env.REPORT_GAS,
  //   excludeContracts: [],
  //   src: "./contracts",
  // },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: utils.getMnemonic(),
      },
      chainId: utils.chainIds.hardhat,
    },
    ganache: {
      accounts: {
        mnemonic: utils.getMnemonic(),
      },
      chainId: utils.chainIds.ganache,
      url: "http://127.0.0.1:7545",
    },
    arbitrum: utils.getChainConfig("arbitrum-mainnet"),
    avalanche: utils.getChainConfig("avalanche"),
    bsc: utils.getChainConfig("bsc"),
    mainnet: utils.getChainConfig("mainnet"),
    optimism: utils.getChainConfig("optimism-mainnet"),
    "polygon-mainnet": utils.getChainConfig("polygon-mainnet"),
    "polygon-mumbai": utils.getChainConfig("polygon-mumbai"),
    sepolia: utils.getChainConfig("sepolia"),
  },
  // TODO mover caminhos para storage
  paths: {
    artifacts: "./artifacts",
    ignition: "./ignition",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test",
    root: "./",
  },
  typechain: {
    outDir: "./typechain",
    target: "ethers-v6",
  },
};

export default config;
