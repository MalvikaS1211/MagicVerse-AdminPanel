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
import {
  darkTheme,
  lightTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { bsc, opBNB, opBNBTestnet } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import Login from "./pages/Login";

import NFTCreationList from "./components/Users/NFTCreationList";
import Setting from "./components/Users/Setting";

import Support from "./components/Users/Support/Support";
import SupportCharts from "./components/Users/Support/SupportCharts";
import Deposit from "./components/Users/Deposit";
import ROIWithdraw from "./components/Users/ROIWithdraw";

import RejectedWithdrawal from "./components/Users/RejectedWithdrawal";
import AprrovalWithDrawal from "./components/Users/AprrovalWithDrawal";
import RoiviewData from "./components/Users/roiviewData";
import TotalNFT from "./components/Users/TotalNFT";
import MaturedNFT from "./components/Users/MaturedNFT";
import BulkPackage from "./components/Users/BulkPackage";
import PackageHistory from "./components/Users/PackageHistory";
import ChatSupport from "./components/Users/ChatSupport";
import ChatConversation from "./components/Users/ChatConversation";
import UserHolding from "./components/Users/UserHolding";
import NewNFTsList from "./components/Users/NewNFTsList";
import SoldNFTs from "./components/Users/SoldNFTs";
import NFTValueTracking from "./components/Users/NFTValueTracking";
import AddNFTToQueue from "./components/Users/AddNFTToQueue";
import Message from "./components/Users/Message";
import { ActiveUserslast24Hours } from "./components/Users/ActiveUserslast24Hours";
import { DueNFT } from "./components/Users/DueNFT";
import OldNft from "./components/Users/OldNft";
import ApproveStaking from "./components/Users/ApproveStaking";
import GiveRoi from "./components/Users/GiveRoi";
import BuyNFT from "./components/Users/BuyNFT";

const Markup = () => {
  const allroutes = [
    { url: "", component: <Home /> },
    { url: "admin/dashboard", component: <Home /> },
    { url: "admin/userList", component: <Alluser /> },
    { url: "admin/approveStaking", component: <ApproveStaking /> },
    { url: "admin/giveRoi", component: <GiveRoi /> },

    { url: "admin/NFTCreationList", component: <NFTCreationList /> },
    { url: "admin/deposit", component: <Deposit /> },
    { url: "admin/setting", component: <Setting /> },

    { url: "admin/support-chats", component: <SupportCharts /> },
    { url: "admin/allusers/support", component: <Support /> },
    { url: "admin/roiWithdraw", component: <ROIWithdraw /> },

    { url: "admin/rejected-withdrawal", component: <RejectedWithdrawal /> },
    { url: "admin/approved-withdrawal", component: <AprrovalWithDrawal /> },
    { url: "admin/roiviewdata", component: <RoiviewData /> },
    { url: "admin/totalnft", component: <TotalNFT /> },
    { url: "admin/maturedNft", component: <MaturedNFT /> },
    { url: "admin/bulkpackage", component: <BulkPackage /> },
    { url: "admin/packagehistory", component: <PackageHistory /> },
    { url: "admin/support", component: <ChatSupport /> },
    {
      url: "admin/support-chat",
      component: <ChatConversation />,
    },
    { url: "admin/userholding", component: <UserHolding /> },
    { url: "admin/newnftlist", component: <NewNFTsList /> },
    { url: "admin/soldNFTs", component: <SoldNFTs /> },
    { url: "admin/nfttracking", component: <NFTValueTracking /> },
    { url: "admin/addnftqueue", component: <AddNFTToQueue /> },
    { url: "admin/addmessage", component: <Message /> },
    { url: "admin/active-users", component: <ActiveUserslast24Hours /> },
    { url: "admin/dueNft", component: <DueNFT /> },
    { url: "admin/oldNftList", component: <OldNft /> },
    { url: "admin/buy-nft", component: <BuyNFT /> },
  ];

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
      etherscan: { name: "BscScan", url: "https://bscscan.com" },
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
  const projectId = "24fb23164e7f77e68afeff05da5f7026";
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId,
    chains,
  });

  const wagmiClient = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    // provider,
    // webSocketProvider,
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
                  exact
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
        // style={{ height: "100vh" }}
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Markup;
