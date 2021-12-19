import Web3Context from "../../src/Web3Context"
import { useContext, useEffect } from "react"

export default function AppName(): JSX.Element {
    const web3Context = useContext(Web3Context)
    useEffect(()=>{
        console.log(web3Context)
    }, [web3Context.addr, web3Context.chainId])
    return <>
        DAPP boilerplate (Nextjs + typescript)
    </>
}