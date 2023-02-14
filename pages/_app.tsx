import type { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import Header from "../components/layout/Header";
import Loading from "../components/layout/Loading";
import Notify from "../components/layout/Notify";
import { AppContext } from "../hooks";
// import 'antd/dist/antd.css'
require("../styles/custom.less");

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DAPP Boilerplate</title>
      </Head>
      <AppContext>
        <Header />
        <Component {...pageProps} />
        <Notify />
        <Loading />
      </AppContext>
    </>
  );
};

export default MyApp;
