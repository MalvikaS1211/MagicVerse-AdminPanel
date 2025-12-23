import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import Nav from "./layouts/nav";
import Home from "./components/Dashboard/Home";
import { Alluser } from "./components/Users/allUser";
import { ThemeContext } from "../context/ThemeContext";
import { Toaster } from "react-hot-toast";

import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import {
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  tokenPocketWallet, // ✅ TokenPocket added
} from "@rainbow-me/rainbowkit/wallets";

import "@rainbow-me/rainbowkit/styles.css";

import Login from "./pages/Login";
import NFTCreationList from "./components/Users/NFTCreationList";
import Support from "./components/Users/Support/Support";
import SupportCharts from "./components/Users/Support/SupportCharts";
import Deposit from "./components/Users/Deposit";
import MaturedNFT from "./components/Users/MaturedNFT";
import BulkPackage from "./components/Users/BulkPackage";
import ChatSupport from "./components/Users/ChatSupport";
import ChatConversation from "./components/Users/ChatConversation";
import NewNFTsList from "./components/Users/NewNFTsList";
import SoldNFTs from "./components/Users/SoldNFTs";
import AddNFTToQueue from "./components/Users/AddNFTToQueue";
import Message from "./components/Users/Message";
import { ActiveUserslast24Hours } from "./components/Users/ActiveUserslast24Hours";
import { DueNFT } from "./components/Users/DueNFT";
import BuyNFT from "./components/Users/BuyNFT";
import NFTList15 from "./components/Users/NFTList15";
import TransactionHash from "./components/Users/TransactionHash";

const Markup = () => {
  const allroutes = [
    { url: "", component: <Home /> },
    { url: "admin/dashboard", component: <Home /> },
    { url: "admin/userList", component: <Alluser /> },
    { url: "admin/NFTCreationList", component: <NFTCreationList /> },
    { url: "admin/deposit", component: <Deposit /> },
    { url: "admin/support-chats", component: <SupportCharts /> },
    { url: "admin/allusers/support", component: <Support /> },
    { url: "admin/maturedNft", component: <MaturedNFT /> },
    { url: "admin/bulkpackage", component: <BulkPackage /> },
    { url: "admin/support", component: <ChatSupport /> },
    { url: "admin/support-chat", component: <ChatConversation /> },
    { url: "admin/newnftlist", component: <NewNFTsList /> },
    { url: "admin/soldNFTs", component: <SoldNFTs /> },
    { url: "admin/addnftqueue", component: <AddNFTToQueue /> },
    { url: "admin/addmessage", component: <Message /> },
    { url: "admin/active-users", component: <ActiveUserslast24Hours /> },
    { url: "admin/dueNft", component: <DueNFT /> },
    { url: "admin/buy-nft", component: <BuyNFT /> },
    { url: "admin/nftList15", component: <NFTList15 /> },
    { url: "admin/transactionhash", component: <TransactionHash /> },

  ];


  // ✅ BSC Mainnet
  const bscM = {
    id: 56,
    name: "BNB Smart Chain",
    network: "bsc",
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "BNB",
    },
    rpcUrls: {
      default: { http: ["https://56.rpc.thirdweb.com"] },
      public: { http: ["https://56.rpc.thirdweb.com"] },
    },
    blockExplorers: {
      default: { name: "BscScan", url: "https://bscscan.com" },
    },
    testnet: false,
  };

  const { chains, publicClient } = configureChains(
    [bscM],
    [
      jsonRpcProvider({
        rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
      }),
      publicProvider(),
    ]
  );

  // ✅ WalletConnect Project ID
  const projectId = "24fb23164e7f77e68afeff05da5f7026";

  // ✅ Wallets with TokenPocket
  const connectors = connectorsForWallets([
    {
      groupName: "Popular Wallets",
      wallets: [
        metaMaskWallet({ projectId, chains }),
        trustWallet({ projectId, chains }),
        tokenPocketWallet({ projectId, chains }), // 🔥 TokenPocket
        walletConnectWallet({ projectId, chains }),
      ],
    },
  ]);

  const wagmiClient = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <>
      <Toaster position="top-center" />
      <WagmiConfig config={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={lightTheme()}
        >
          <Routes>
            <Route element={<MainLayout />}>
              {allroutes.map((data, i) => (
                <Route
                  key={i}
                  path={`${data.url}`}
                  element={data.component}
                />
              ))}
            </Route>

            <Route path="/admin/login" element={<Login />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
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
    </div>
  );
}

export default Markup;
