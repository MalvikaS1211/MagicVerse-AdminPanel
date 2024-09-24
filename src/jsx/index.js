import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import AllUser from "./components/Users/allUser";
import Widget from "./pages/Widget";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
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
import { useSelector } from "react-redux";


const Markup = () => {
  const allroutes = [
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    { url: "dashboard-dark", component: <DashboardDark /> },
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

  const selectChain = useSelector((state) => state.auth.selectChain);
  console.log(selectChain, "chain");
  const chain =
    selectChain === "bsc" ? bsc : selectChain === "polygon" ? polygon : mainnet;
  const { chains, provider } = configureChains(
    // [mbscTestnet],
    // [mainnet],
    // [bsc],
    [chain],
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
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={darkTheme()}
        >
          <Routes>
            <Route path="page-lock-screen" element={<LockScreen />} />
            <Route path="page-error-400" element={<Error400 />} />
            <Route path="page-error-403" element={<Error403 />} />
            <Route path="page-error-404" element={<Error404 />} />
            <Route path="page-error-500" element={<Error500 />} />
            <Route path="page-error-503" element={<Error503 />} />
            {/* <Route path='/dashboard' element={<Home />} /> */}

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
        </RainbowKitProvider>
      </WagmiConfig>
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
