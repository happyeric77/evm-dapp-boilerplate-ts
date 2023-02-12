import type { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import Header from "../components/layout/Header";
import Notify from "../components/layout/Notify";
import { AppContext } from "../hooks";
// import 'antd/dist/antd.css'
require("../styles/custom.less");

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* fontawesome */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
          integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
          crossOrigin="anonymous"
        />

        <title>DAPP Boilerplate</title>
      </Head>
      <AppContext>
        <Header />
        <Component {...pageProps} />
        <Notify />
      </AppContext>
    </>
  );
};

export default MyApp;
