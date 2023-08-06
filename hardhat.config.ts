import * as envEnc from "@chainlink/env-enc";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import "hardhat-deploy";
import type { HardhatUserConfig } from "hardhat/config";
import type { NetworkUserConfig } from "hardhat/types";
import { HardhatNetworkAccountsUserConfig } from "hardhat/types/config";
import { resolve } from "path";

import "./tasks/accounts";
import "./tasks/greet";
import "./tasks/taskDeploy";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });
envEnc.config({ path: "./.env.enc" });

const chainIds = {
  "arbitrum-mainnet": 42161,
  avalanche: 43114,
  bsc: 56,
  ganache: 1337,
  hardhat: 31337,
  mainnet: 1,
  "optimism-mainnet": 10,
  "polygon-mainnet": 137,
  "polygon-mumbai": 80001,
  sepolia: 11155111,
};

function getMnemonic(): string {
  const mnemonic: string = process.env.MNEMONIC || "";
  if (mnemonic.split(" ").length < 12) {
    throw new Error("Please set your MNEMONIC in a .env file");
  }

  return mnemonic;
}

function getInfuraApiKey(): string {
  const infuraApiKey: string = process.env.INFURA_API_KEY || "";
  if (infuraApiKey.length === 0) {
    throw new Error("Please set your INFURA_API_KEY in a .env file");
  }

  return infuraApiKey;
}

function getAlchemyUri(mainnet: boolean): string {
  const key = mainnet ? "ALCHEMY_MAINNET_URI" : "ALCHEMY_TESTNET_URI";
  const alchemyUri = process.env[key] || "";

  if (!alchemyUri.includes("alchemy.com")) {
    throw new Error(`Please set your ${key} in a .env file`);
  }

  return alchemyUri;
}

function getAccountConfig(chain: keyof typeof chainIds): HardhatNetworkAccountsUserConfig {
  const requirePrivateKey: Array<keyof typeof chainIds> = [
    "bsc",
    "ganache",
    "mainnet",
    "polygon-mainnet",
    "polygon-mumbai",
    "sepolia",
  ];

  if (!requirePrivateKey.includes(chain)) {
    return {
      count: 10,
      mnemonic: getMnemonic(),
      path: "m/44'/60'/0'/0",
    };
  }

  const privateKey = process.env.HW_PRIVATE_KEY || "";
  if (!privateKey) {
    throw new Error("Please set your HW_PRIVATE_KEY in a .env file");
  }

  return [privateKey] as HardhatNetworkAccountsUserConfig; // fix: Invalid account: Expected string, received object
}

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string;

  switch (chain) {
    case "avalanche":
      jsonRpcUrl = "https://api.avax.network/ext/bc/C/rpc";
      break;
    case "bsc":
      jsonRpcUrl = "https://bsc-dataseed1.binance.org";
      break;
    case "sepolia":
    case "polygon-mumbai":
      jsonRpcUrl = getAlchemyUri(false);
      break;
    case "mainnet":
    case "polygon-mainnet":
      jsonRpcUrl = getAlchemyUri(true);
      break;
    default:
      jsonRpcUrl = "https://" + chain + ".infura.io/v3/" + getInfuraApiKey();
  }

  return {
    accounts: getAccountConfig(chain),
    chainId: chainIds[chain],
    url: jsonRpcUrl,
  };
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
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: getMnemonic(),
      },
      chainId: chainIds.hardhat,
    },
    ganache: {
      accounts: {
        mnemonic: getMnemonic(),
      },
      chainId: chainIds.ganache,
      url: "http://127.0.0.1:7545",
    },
    arbitrum: getChainConfig("arbitrum-mainnet"),
    avalanche: getChainConfig("avalanche"),
    bsc: getChainConfig("bsc"),
    mainnet: getChainConfig("mainnet"),
    optimism: getChainConfig("optimism-mainnet"),
    "polygon-mainnet": getChainConfig("polygon-mainnet"),
    "polygon-mumbai": getChainConfig("polygon-mumbai"),
    sepolia: getChainConfig("sepolia"),
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
