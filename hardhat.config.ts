import * as envEnc from "@chainlink/env-enc";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import "hardhat-deploy";
import type { HardhatUserConfig } from "hardhat/config";
import { resolve } from "path";

import utils from "./hardhat.utils";
import "./tasks/accounts";
import "./tasks/greet";
import "./tasks/taskDeploy";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

if (process.env.NODE_ENV !== "test") {
  envEnc.config({ path: "./.env.enc" });
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY || "",
      avalanche: process.env.SNOWTRACE_API_KEY || "",
      bsc: process.env.BSCSCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: !!process.env.REPORT_GAS,
    excludeContracts: [],
    src: "./contracts",
    noColors: true,
  },
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
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
