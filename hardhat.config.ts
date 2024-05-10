import 'tsconfig-paths/register';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-ignition-ethers';
import '@nomiclabs/hardhat-solhint';
import type { HardhatUserConfig } from 'hardhat/config';
import { config as dotenvConfig } from 'dotenv';
import { config as envEncConfig } from '@chainlink/env-enc';

import utils from './hardhat.utils';
import './hre/helpers';
import './tasks/accounts';
import './tasks/setGreeting';

dotenvConfig({ path: './.env' });

if (process.env.NODE_ENV !== 'test') {
  envEncConfig({ path: './.env.enc' });
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY || '',
      avalanche: process.env.SNOWTRACE_API_KEY || '',
      bsc: process.env.BSCSCAN_API_KEY || '',
      mainnet: process.env.ETHERSCAN_API_KEY || '',
      optimisticEthereum: process.env.OPTIMISM_API_KEY || '',
      polygon: process.env.POLYGONSCAN_API_KEY || '',
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || '',
      sepolia: process.env.ETHERSCAN_API_KEY || '',
    },
  },
  gasReporter: {
    currency: 'USD',
    token: 'ETH',
    gasPriceApi: 'Etherscan',
    gasPrice: 21,
    enabled: !!process.env.REPORT_GAS,
    excludeContracts: [],
    src: './contracts',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    showMethodSig: true,
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
      url: 'http://127.0.0.1:7545',
    },
    arbitrum: utils.getChainConfig('arbitrum-mainnet'),
    avalanche: utils.getChainConfig('avalanche'),
    bsc: utils.getChainConfig('bsc'),
    mainnet: utils.getChainConfig('mainnet'),
    optimism: utils.getChainConfig('optimism-mainnet'),
    'polygon-mainnet': utils.getChainConfig('polygon-mainnet'),
    'polygon-mumbai': utils.getChainConfig('polygon-mumbai'),
    sepolia: utils.getChainConfig('sepolia'),
  },
  paths: {
    artifacts: './storage/artifacts',
    cache: './storage/cache',
    ignition: './ignition',
    sources: './contracts',
    tests: './test',
    root: './',
  },
  typechain: {
    outDir: './storage/typechain',
    target: 'ethers-v6',
  },
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: process.env.SOLIDITY_OPTIMIZER_ENABLED === 'true',
        runs: 200,
      },
    },
  },
};

export default config;
