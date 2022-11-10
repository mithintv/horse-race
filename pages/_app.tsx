import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../src/context/app-context";
import ChakraTheme from "../src/models/theme";
import Layout from "../src/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraTheme>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </ChakraTheme>
  );
}
