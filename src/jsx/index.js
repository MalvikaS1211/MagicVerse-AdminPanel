import React, { useContext, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
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
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { opBNB } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { setLogin } from "./redux/reducer";
import NFTCreationList from "./components/Users/NFTCreationList";
import Setting from "./components/Users/Setting";

import NodeApprove from "./components/Users/NodeGroup/NodeApprove";
import NodePending from "./components/Users/NodeGroup/NodePending";

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

const Markup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminToken = localStorage.getItem("adminToken");

  // useEffect(() => {
  //   if (adminToken) {
  //     dispatch(setLogin(true));
  //     navigate("/admin/dashboard");
  //     console.log("Admin Token found:", adminToken);
  //   } else {
  //     dispatch(setLogin(false));
  //     console.log("No admin token found.");
  //   }
  // }, [adminToken]);

  const allroutes = [
    { url: "", component: <Home /> },
    { url: "admin/dashboard", component: <Home /> },
    { url: "admin/userList", component: <Alluser /> },

    { url: "admin/NFTCreationList", component: <NFTCreationList /> },
    { url: "admin/deposit", component: <Deposit /> },
    { url: "admin/setting", component: <Setting /> },

    { url: "admin/node-approve", component: <NodeApprove /> },
    { url: "admin/node-pending", component: <NodePending /> },

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
  ];

  const { chains, publicClient } = configureChains(
    [opBNB],
    [publicProvider()],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http: `${chain.rpcUrls.default.http[0]}`,
        }),
      }),
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
          theme={darkTheme()}
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
