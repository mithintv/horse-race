import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GameProvider } from "../src/context/game-context";
import ChakraTheme from "../src/models/theme";
import Layout from "../src/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraTheme>
      <GameProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GameProvider>
    </ChakraTheme>
  );
}
