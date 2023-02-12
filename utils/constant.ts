interface ChainType {
  chainName: string;
  rpcUrl: string;
  symbol: string;
  explorer: string;
}

const bsctestnet: ChainType = {
  chainName: "BSC Test Net",
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  symbol: "BNB",
  explorer: "https://bscscan.com/",
};

const bscmainnet: ChainType = {
  chainName: "Binance Smart Chain Mainnet",
  rpcUrl: "https://bsc-dataseed1.binance.org",
  symbol: "BNB",
  explorer: "https://testnet.bscscan.com/",
};

const ethmainnet: ChainType = {
  chainName: "Ethereum mainnet",
  symbol: "ETH",
  rpcUrl: "TBD",
  explorer: "https://etherscan.io/",
};

const ethRineby: ChainType = {
  chainName: "Ethereum Testnet rinkeby",
  symbol: "ETH",
  rpcUrl: "TBD",
  explorer: "https://rinkeby.etherscan.io/",
};

const matic: ChainType = {
  chainName: "Polygon_Mumbai",
  symbol: "MATIC",
  rpcUrl: "https://rpc-mumbai.maticvigil.com/",
  explorer: "https://mumbai.polygonscan.com/",
};

export const supportedChains: { [key: string]: ChainType } = {
  "0x61": bsctestnet,
  "0x38": bscmainnet,
  "0x1": ethmainnet,
  "0x4": ethRineby,
  "0x13881": matic,
};
