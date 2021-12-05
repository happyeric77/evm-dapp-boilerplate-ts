
import Class from "./Layout.module.css"
import Head from 'next/head'
import Footer from "./Footer"
import {useEffect, useState} from "react"
import Header from "./Header"
import Web3Context from "../../src/Web3Context"
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from "@walletconnect/web3-provider"
import Web3 from "web3";
import 'antd/dist/antd.css'


function Layout(props) {
    let provider;
    let chainId;
    const [web3, setWeb3] = useState();
    // Enable the chains that will be supported
    const supportedChains = {
        "0x61": ["BSC Test Net", 'https://data-seed-prebsc-1-s1.binance.org:8545/'],
        "0x38": ["Binance Smart Chain Mainnet", "https://bsc-dataseed1.binance.org"],
        // "0x3": ["Ethereum Testnet Ropsten", null]
    }  
    
    const [userAddr, setUserAddr] = useState()
    const [currentChain, setChain] = useState()

    useEffect(()=>{
        fetchData()
        web3?._provider.on && web3._provider.on("chainChanged", (chainId)=>{
            setChain(supportedChains[chainId][0])
            login()
        })
    }, [userAddr])
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
            setChain(supportedChains[chainId][0])
        } catch(e){
            // alert("No injected web3, install metamask")
            getDefaultWeb3()
        }
    }

    const getDefaultWeb3 = () =>{
        setWeb3(new Web3(supportedChains[Object.keys(supportedChains)[0]][1]))
        setChain(supportedChains[Object.keys(supportedChains)[0]][0])
    }

    function clearUserInfo() {
        setUserAddr(null)
    }

    async function login(walletConnChainId=0) {
        if (window.ethereum) {
            await startInjectedWeb3()
        } else {
            await startWalletConnWeb3()
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
    
    async function startWalletConnWeb3() {
        try {
            let rpc = {}
            Object.keys(supportedChains).forEach((chain)=>{
                rpc[Number(chain)] = supportedChains[chain][1]
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

    async function instanciateWeb3(provider) {
        let web3 = await new Web3(provider)
        let addr = await web3.eth.getAccounts()
        setWeb3(web3)
        setUserAddr(addr[0])
        let chainId = "0x" + (await web3.eth.getChainId()/1).toString(16)
        if (!supportedChains[chainId]) {alert("Does not support this network")}
        setChain(supportedChains[chainId][0])
    }

    async function logout() {
        try {
            // for walletconnect
            web3 && await web3._provider.disconnect()
        } catch (e){
            // Injected web3
            web3 && web3.eth.accounts.wallet.clear()
        }
        initWeb3()
        clearUserInfo()
    }

    async function switchNetwork(chain) {
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

            <Web3Context.Provider value={{addr: userAddr,chain: currentChain, web3: web3}}>
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
                copyright: "Copyright © MultiFarm. All Rights Reserved",
            }}/>
        </div>
    
    </>
}


export default Layout

/************************
 * Data format example **
 ***********************/

//  const layoutData = {
//     pages: [
//         {pageName: "Blockchain Dev", url: "blockchain_dev"},
//         {pageName: "Web Dev", url: "web_dev"},
//         {pageName: "About Me", url: "about_me"},
//         {pageName: "Contact ME", url: "contact_me"}
//     ],
//     github: "",
//     twitter: "",
// }