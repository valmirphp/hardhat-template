import type { HardhatNetworkAccountsUserConfig } from "hardhat/types/config";
import type { NetworkUserConfig } from "hardhat/types";

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

function getHwPrivateKey(): string | null {
  return process.env.HW_PRIVATE_KEY || null;
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
  const privateKey = getHwPrivateKey();
  const requirePrivateKey: Array<keyof typeof chainIds> = [
    "bsc",
    "ganache",
    "mainnet",
    "polygon-mainnet",
    "polygon-mumbai",
    "sepolia",
  ];

  if (requirePrivateKey.includes(chain) && privateKey) {
    return [privateKey] as HardhatNetworkAccountsUserConfig; // fix: Invalid account: Expected string, received object
  }

  return {
    count: 10,
    mnemonic: getMnemonic(),
    path: "m/44'/60'/0'/0",
  };
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

export default {
  chainIds,
  getMnemonic,
  getHwPrivateKey,
  getInfuraApiKey,
  getAlchemyUri,
  getAccountConfig,
  getChainConfig,
};
