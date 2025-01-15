import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Import Phantom wallet from the wallet adapter package
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import Header from "./components/Header";
import Banner from "./components/Banner";
import PageMarquee from "./components/PageMarquee";
import About from "./components/About";
import Howto from "./components/Howto";
import Tokenomics from "./components/Tokenomics";
import Roadmap from "./components/Roadmap";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Include the Phantom wallet in the wallets array
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(), // Phantom
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* <WalletMultiButton /> 
          <h1>Hello Solana</h1> */}
          <Header />
          <Banner />
          <About />
          <Howto />
          <Tokenomics />
          <PageMarquee />
          <Roadmap />
          <Faq />
          <PageMarquee />
          <Footer />
          {/*
           */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
