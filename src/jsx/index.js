import React, { useContext, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import Nav from "./layouts/nav";
import Home from "./components/Dashboard/Home";
import AllUser, { Alluser } from "./components/Users/allUser";
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
import Login from "./pages/Login";
import UserList from "./components/Users/UserList";
import QuestionList from "./components/Users/QuestionList";
import LeaderBoard from "./components/Users/LeaderBoard";
import ContestList from "./components/Users/ContestList";
import Tds from "./components/Users/Tds";
import DepositList from "./components/Users/DepositList";
import { useDispatch } from "react-redux";
import { setLogin } from "./redux/reducer";
import DaoUsers from "./components/Users/DaoUsers";
import Unstake from "./components/Users/Unstake";
import RewardList from "./components/Users/RewardList";

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
    // { url: "addQuestion", auth: true, component: <AllUser /> },
    { url: "admin/userList", component: <Alluser /> },
    { url: "admin/rewardList", component: <RewardList /> },

    { url: "admin/unstake", component: <Unstake /> },
    // { url: "QuestionList", component: <QuestionList /> },
    // { url: "leaderBoard", component: <LeaderBoard /> },
    { url: "admin/daousers", component: <DaoUsers /> },
    { url: "admin/depositList", component: <DepositList /> },
    

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

  // const { chains, provider } = configureChains(
  //   [bsc],
  //   [publicProvider()],
  //   [
  //     jsonRpcProvider({
  //       rpc: (chain) => ({
  //         http: `${chain.rpcUrls.default.http[0]}`,
  //       }),
  //     }),
  //   ]
  // );
  // const { connectors } = getDefaultWallets({
  //   appName: "My RainbowKit App",
  //   chains,
  // });

  // const wagmiClient = createClient({
  //   autoConnect: true,
  //   connectors,
  //   provider,
  //   // webSocketProvider,
  // });

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
        <Route path="/admin/login" element={<Login />} />
      </Routes>
      {/* </RainbowKitProvider>
      </WagmiConfig> */}
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
