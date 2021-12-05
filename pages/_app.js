import "../components/layout/Layout"
import Layout from '../components/layout/Layout'
import 'antd/dist/antd.css'


function MyApp({ Component, pageProps }) {
  
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
