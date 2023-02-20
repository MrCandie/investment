import Layout from "../components/UI/layout/Layout";
import "../styles/globals.css";
import AppProvider from "../util/context";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />;
    </AppProvider>
  );
}
