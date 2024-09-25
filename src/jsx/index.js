import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
import Home from "./components/Dashboard/Home";
import AllUser from "./components/Users/allUser";
import { ThemeContext } from "../context/ThemeContext";
import { Toaster } from "react-hot-toast";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { bsc, polygon } from "wagmi/chains";
import { configureChains, createClient, mainnet, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

const Markup = () => {
  const allroutes = [
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    { url: "allUsers", auth: true, component: <AllUser /> },
  ];

  //Bsc testnet
  // var mbscTestnet = {
  //   id: 97,
  //   name: "Binance Smart Chain Testnet",
  //   network: "bsc-testnet",
  //   nativeCurrency: {
  //     decimals: 18,
  //     name: "BNB",
  //     symbol: "tBNB",
  //   },
  //   rpcUrls: {
  //     // default: { http: ["https://data-seed-prebsc-1-s2.binance.org:8545"] },
  //     default: { http: ["https://data-seed-prebsc-1-s2.binance.org:8545"] },
  //   },
  //   blockExplorers: {
  //     etherscan: { name: "BscScan", url: "https://testnet.bscscan.com" },
  //     default: { name: "BscScan", url: "https://testnet.bscscan.com" },
  //   },
  //   contracts: {
  //     multicall3: {
  //       address: "0xca11bde05977b3631167028862be2a173976ca11",
  //       blockCreated: 17422483,
  //     },
  //   },
  //   testnet: true,
  // };

  const { chains, provider } = configureChains(
    [bsc],
    [publicProvider()],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http: `${chain.rpcUrls.default.http[0]}`,
        }),
      }),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    // webSocketProvider,
  });

  return (
    <>
      <Toaster position="top-center" />
      {/* <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={darkTheme()}
        > */}
          <Routes>
            <Route element={<MainLayout />}>
              {allroutes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`${data.url}`}
                  element={data.component}
                />
              ))}
            </Route>
          </Routes>
        {/* </RainbowKitProvider>
      </WagmiConfig> */}
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  const { menuToggle } = useContext(ThemeContext);
  return (
    <div
      id="main-wrapper"
      className={`show ${menuToggle ? "menu-toggle" : ""}`}
    >
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Markup;
