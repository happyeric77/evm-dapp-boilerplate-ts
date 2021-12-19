import Web3 from "web3"

type ChainType = {
    chainName: string,
    rpcUrl: string,
    symbol: string,
    explorer: string
}

type UserType = {
    username: string, addr: string, avatar: any
}

type ContextType = {
    addr: string | null | undefined,
    chain: string | null| undefined, 
    web3: any, 
    chainId: string | null, 
}

type providerType = {
    on: (arg0: string, arg1: (arg0: string)=>void )=>{}
}

interface Web3Type extends Web3 {
    _provider: providerType
}

// Props

type HeaderType = {
    userAddr: string | null | undefined,
    chain: string | null | undefined,
    login: ()=>void,
    logout: ()=>void,
    supportedChains: {[key: string]: ChainType},
    switchNetwork: (chain: string)=> Promise<void>
}

type FooterProps = {
    data: {
        pages: {pageName: string, url: string}[],
        twitter: string,
        telegram: string,
        medium: string,
        copyright: string,
    }
}


export type { ChainType, UserType, ContextType, Web3Type, HeaderType, FooterProps}