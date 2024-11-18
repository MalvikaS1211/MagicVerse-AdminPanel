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
import { bsc, bscTestnet } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { setLogin } from "./redux/reducer";
import DaoUsers from "./components/Users/DaoUsers";
import Unstake from "./components/Users/Unstake";
import RewardList from "./components/Users/RewardList";
import StakeList from "./components/Users/StakeList";
import Setting from "./components/Users/Setting";
import UnstakePending from "./components/Users/UnstakeWithdraw/UnstakePending";
import UnstakeApprove from "./components/Users/UnstakeWithdraw/UnstakeApprove";

const Markup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminToken = localStorage.getItem("adminToken");

  useEffect(()=>{
    if (adminToken) {
      dispatch(setLogin(true))
      navigate('/admin/dashboard');
      console.log("Admin Token found:", adminToken);
    } else {
      dispatch(setLogin(false))
      console.log("No admin token found.");
    }
  },[adminToken])
  const allroutes = [
    { url: "", component: <Home /> },
    { url: "admin/dashboard", component: <Home /> },
    { url: "admin/userList", component: <Alluser /> },
    { url: "admin/stakeList", component: <StakeList /> },

    { url: "admin/rewardList", component: <RewardList /> },

    { url: "admin/unstake", component: <Unstake /> },
    { url: "admin/daousers", component: <DaoUsers /> },
    { url: "admin/setting", component: <Setting /> },
    
    { url: "admin/unstake-pending", component: <UnstakePending /> },
    { url: "admin/unstake-approve", component: <UnstakeApprove /> },



  ];

  //Bsc testnet
  var mbscTestnet = {
    id: 97,
    name: "Binance Smart Chain Testnet",
    network: "bsc-testnet",
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "tBNB",
    },
    rpcUrls: {
      // default: { http: ["https://data-seed-prebsc-1-s2.binance.org:8545"] },
      default: { http: ["https://data-seed-prebsc-1-s2.binance.org:8545"] },
    },
    blockExplorers: {
      etherscan: { name: "BscScan", url: "https://testnet.bscscan.com" },
      default: { name: "BscScan", url: "https://testnet.bscscan.com" },
    },
    contracts: {
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 17422483,
      },
    },
    testnet: true,
  };

  var dscnetwork = {
    id: 1555,
    name: "DSC Scan",
    network: "DSC Scan",
    iconUrl: 'https://dscscan.io/images/dscscanlogo.png',
    nativeCurrency: {
      decimals: 18,
      name: "DSC",
      symbol: "DSC",
    },
    rpcUrls: {
      default: { http: ["https://rpc01.dscscan.io"] },
      public: { http: ["https://rpc01.dscscan.io"] },
    },
    blockExplorers: {
      etherscan: { name: "dscscan", url: "https://dscscan.io" },
      default: { name: "dscscan", url: "https://dscscan.io" },
    },
    // contracts: {
    //   multicall3: {
    //     address: "0xca11bde05977b3631167028862be2a173976ca11",
    //     blockCreated: 17422483,
    //   },
    // },
    testnet: false,
  };

  const { chains, publicClient } = configureChains(

    [bsc,dscnetwork],
    [publicProvider()],
    [jsonRpcProvider({
      rpc: (chain) => ({
        http: `${chain.rpcUrls.default.http[0]}`,
      }),
    }),],
    
  );
  const projectId = '24fb23164e7f77e68afeff05da5f7026';
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId,
    chains,
  });

  const wagmiClient = createConfig({
    autoConnect: true,
    connectors,
    publicClient
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
