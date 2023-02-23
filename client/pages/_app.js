import Layout from "../components/UI/layout/Layout";
import "../styles/globals.css";
import Head from "next/head";
import AppProvider from "../util/context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Maeve Limited</title>
        <meta
          name="description"
          content="invest in real life assets and start making passive income"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
