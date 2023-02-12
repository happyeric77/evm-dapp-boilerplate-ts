import { createContext, useContext } from "react";
import Web3 from "web3";

export interface IWeb3Data {
  accounts: string[];
  web3: Web3;
  chainId: number;
}

interface IWeb3Context {
  web3Data: IWeb3Data;
  loginWithInjectedWeb3(): Promise<boolean>;
  loginWithWalletConnect(chainId: number): Promise<boolean>;
  switchNetwork(chainId: number): Promise<void>;
  logout(): Promise<boolean>;
}

const Web3Context = createContext<IWeb3Context>({} as IWeb3Context);

const useWeb3 = () => {
  return useContext(Web3Context);
};

export default Web3Context;
export { useWeb3 };
