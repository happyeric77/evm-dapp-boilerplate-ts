
import Class from "./Layout.module.sass"
import Head from 'next/head'
import Footer from "./Footer"
import {useEffect, useState} from "react"
import Header from "./Header"
import Web3Context from "../../src/Web3Context"
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from "@walletconnect/web3-provider"
import Web3 from "web3";
import { supportedChains } from "../../src/utils/networkProvider"
import {Web3Type} from "../../src/types"


function Layout({...props}): JSX.Element {
    let provider: any;
    let chainId: string| null = null
    const [web3, setWeb3] = useState<Web3Type|any>();    
    const [userAddr, setUserAddr] = useState<string|null>()
    const [currentChain, setChain] = useState<string|null>()

    useEffect(()=>{
        fetchData()
        web3?._provider && web3._provider.on("chainChanged", (chainId: string)=>{
            setChain(supportedChains[chainId].chainName)
            login()
        })
    }, [userAddr, currentChain])
    const fetchData = async () =>{
        await initWeb3()
    }

    const initWeb3 = async () =>{
        try{
            provider = await detectEthereumProvider()
            
            chainId = provider.chainId
            if (chainId && !supportedChains[chainId]) {
                alert("Not supported chain")
                return
            }
            setWeb3(new Web3(provider))
            setChain(chainId && supportedChains[chainId].chainName)
        } catch(e){
            // alert("No injected web3, install metamask")
            getDefaultWeb3()
        }
    }

    const getDefaultWeb3 = () =>{
        setWeb3(new Web3(supportedChains[Object.keys(supportedChains)[0]].rpcUrl))
        setChain(supportedChains[Object.keys(supportedChains)[0]].chainName) 
        
    }

    function clearUserInfo() {
        setUserAddr(null)
    }

    async function login(walletConnChainId: string="0") {
        if (window.ethereum) {
            await startInjectedWeb3()
        } else {
            await startWalletConnWeb3(walletConnChainId)
        } 
    }

    async function startInjectedWeb3(){
        console.log("Browser injected web3 'ethereum'")
        try {
            
            provider = await detectEthereumProvider()
            await provider.request({ method: 'eth_requestAccounts' });
            instanciateWeb3(provider)
        } catch (error) {
            console.log(error);
        }
    }
    
    async function startWalletConnWeb3(walletConnChainId: string) {
        try {
            let rpc: {[key: number]: string} = {}
            Object.keys(supportedChains).forEach((chain)=>{
                rpc[Number(chain)] = supportedChains[chain].rpcUrl
            })
            console.log("Log in with walletConnect")
            const provider = await new WalletConnectProvider({
                rpc: rpc,
                chainId: Number(walletConnChainId),
                qrcode: true,
                qrcodeModalOptions: {
                    mobileLinks: [
                        "metamask",
                        "trust",
                    ]
                }
            });                
            await provider.enable();
            instanciateWeb3(provider)
        } catch(e) {
            console.log(e)
        }  
    }

    async function instanciateWeb3(provider: any) {
        let web3 = await new Web3(provider)
        let addr = await web3.eth.getAccounts()
        setWeb3(web3)
        setUserAddr(addr[0])
        let chainId = "0x" + (await web3.eth.getChainId()/1).toString(16)
        if (!supportedChains[chainId]) {alert("Does not support this network")}
        setChain(supportedChains[chainId].chainName)
    }

    async function logout() {
        try {
            // for walletconnect
            web3 && await web3._provider?.disconnect()
        } catch (e){
            // Injected web3
            web3 && web3.eth.accounts.wallet.clear()
        }
        initWeb3()
        clearUserInfo()
    }

    async function switchNetwork(chain: string) {
        if (web3?._provider.request) {
            await web3._provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chain }],
        })} else {
            await login(chain)
        }
    }

    return <>
    
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            {/* fontawesome */}
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"/>
            
            <title>DAPP Boilerplate</title>
        </Head>

        <div className={Class.layout} >

            <Header 
                userAddr={userAddr} 
                chain={currentChain} 
                login={login} 
                logout={logout} 
                supportedChains={supportedChains} 
                switchNetwork={switchNetwork}
            />

            <Web3Context.Provider value={{addr: userAddr,chain: currentChain, web3: web3, chainId: chainId}}>
                <main className={Class.content} >{props.children}</main>
            </Web3Context.Provider>

            <Footer data={{
                pages: [
                    // {pageName: "Contact us", url: ""}
                ],
                // github: "",
                twitter: "",
                telegram: "",
                medium: "",
                copyright: "Copyright © ColorfulLife. All Rights Reserved",
            }}/>
        </div>
    </>
}


export default Layout