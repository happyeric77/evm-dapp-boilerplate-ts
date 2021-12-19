import type { AppProps /*, AppContext */ } from 'next/app'
import "../components/layout/Layout"
import Layout from '../components/layout/Layout'
// import 'antd/dist/antd.css'
require("../styles/custom.less")

function MyApp({ Component, pageProps }: AppProps) {
  
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
