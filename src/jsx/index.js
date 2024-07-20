import React, { useContext } from "react";

/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
//import Main from './layouts/Main';

import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import Dashboard2 from "./components/Dashboard/Dashboard2";
import Dashboard3 from "./components/Dashboard/Dashboard3";
import Dashboard4 from "./components/Dashboard/Dashboard4";
import Dashboard5 from "./components/Dashboard/Dashboard5";

// Users
import AllUser from "./components/Users/allUser";
import StakingUser from "./components/Users/stakingUser";
import TeamDetails from "./components/Users/team";
import Announcement from "./components/Users/announcement";
import WithdrawClaim from "./components/Users/withdrawClaim";
import WithdrawRoi from "./components/Users/withdrawRoi";
import Commission from "./components/Users/commission";
import CommissionData from "./components/Users/commissionData";
import BlockData from "./components/Users/block";
import BlockUserList from "./components/Users/blockuserlist";
import FreeIddata from "./components/Users/freeId";
import UserRegester from "./components/Users/regesterUser";
import TopTeams from "./components/Users/topTeams";
//Histroy
import Transaction from "./components/Users/tranzation";
import DepositHisory from "./components/Users/depositeHistory";
import Withdrawal from "./components/Users/withdrawHistroy";
// import Deposit from "./components/Users/deposite";
import Fifty from "./components/Users/fifty";
import ExelFormet from "./components/Users/exeldata";
import Protocol from "./components/Users/protocol";
import ProtocalData from "./components/Users/prtocolData";
import RejectWithdraw from "./components/Users/rejectWithdraw";
import ApproveWithdraw from "./components/Users/approveWithdraw";
//Trading
import Market from "./components/Trading/Market";
import IcoListing from "./components/Trading/IcoListing";
import P2P from "./components/Trading/P2P";
import Future from "./components/Trading/Future";
import IntradayTrading from "./components/Trading/IntradayTrading";

//Crypto
import MarketWatch from "./components/Crypto/MarketWatch";
import IcoListingFilter from "./components/Crypto/IcoListingFilter";
import Banking from "./components/Crypto/Banking";
import CoinDetails from "./components/Crypto/CoinDetails";

//Report
import History from "./components/Report/History";
import Order from "./components/Report/Order";
import Reports from "./components/Report/Reports";
import User from "./components/Report/User";
import Contact from "./components/Report/Contact";

/////Demo
import Theme1 from "./components/Dashboard/Demo/Theme1";
import Theme2 from "./components/Dashboard/Demo/Theme2";
import Theme3 from "./components/Dashboard/Demo/Theme3";
import Theme4 from "./components/Dashboard/Demo/Theme4";
import Theme5 from "./components/Dashboard/Demo/Theme5";
import Theme6 from "./components/Dashboard/Demo/Theme6";
import Theme7 from "./components/Dashboard/Demo/Theme7";
import Theme8 from "./components/Dashboard/Demo/Theme8";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import EditProfile from "./components/AppsMenu/AppProfile/EditProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
////import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import MainNouiSlider from "./components/PluginsMenu/NouiSlider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/JqvMap/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

//Redux
//import Todo from "./pages/Todo";

// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import CkEditor from "./components/Forms/CkEditor/CkEditor";
import Pickers from "./components/Forms/Pickers/Pickers";
import FormValidation from "./components/Forms/FormValidation/FormValidation";

/// Pages
//import Registration from "./pages/Registration";
//import Login from "./pages/Login";
//import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "../context/ThemeContext";
import Login from "./pages/Login";
import ClaimHistory from "./components/Users/claimHistory";
import Deposit from "./components/Users/deposit";
import Swap from "./components/Users/swap";
import Asset from "./components/Users/asset";
import Currency from "./components/Users/currency";
import Deposite, { Assets } from "./components/Users/user-info/Deposite";
import WithdrawDetail from "./components/Users/user-info/WithdrawDetail";
import Staking from "./components/Users/user-info/Staking";
import AssetsDetail from "./components/Users/user-info/AssetsDetail";
import Activity from "./components/Users/user-info/Activity";
import Exchange from "./components/Users/user-info/Exchange";
import PriceSetting from "./components/Users/settings/priceSetting";
import AddressWithdraw from "./components/Users/settings/addressWithdraw";
import DepositMinimum from "./components/Users/settings/depositMinimum";
import WithdrawMinimum from "./components/Users/settings/withdrawMinimum";
import { Toaster } from "react-hot-toast";
import LoginActivity from "./components/Users/loginActivity";
import Mint from "./components/Users/Mint";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
// wagmi
// import {
//   coinbaseWallet,
//   injectedWallet,
//   metaMaskWallet,
//   trustWallet,
//   walletConnectWallet,
// } from "@rainbow-me/rainbowkit/wallets";
import {
  // connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { bsc, polygon } from "wagmi/chains";
import { configureChains, createClient, mainnet, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import UserReferral from "./components/Users/user-info/UserReferal";
import ReferralIncome from "./components/Users/user-info/ReferralIncome";
import TaskReward from "./components/Users/user-info/TaskReward";
import SignupBonus from "./components/Users/user-info/SignupBonus";
import Support from "./components/Users/Support/Support";
import SupportCharts from "./components/Users/Support/SupportCharts";
import Kyc from "./components/Users/kyc/Kyc";
import { useSelector } from "react-redux";
import PdfUpload from "./components/Users/PdfUpload";

const Markup = () => {
  const allroutes = [
    /// Dashboard
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    { url: "dashboard-dark", component: <DashboardDark /> },
    { url: "index-1", component: <Dashboard2 /> },
    { url: "index-3", component: <Dashboard3 /> },
    { url: "index-4", component: <Dashboard4 /> },
    { url: "index-5", component: <Dashboard5 /> },
    // Users
    { url: "allUsers", auth: true, component: <AllUser /> },
    { url: "staking-user", component: <StakingUser /> },
    { url: "claim-history", component: <ClaimHistory /> },
    { url: "deposite", component: <Deposit /> },
    { url: "asset", component: <Asset /> },
    { url: "currency", component: <Currency /> },
    { url: "swap", component: <Swap /> },
    { url: "login-activity", component: <LoginActivity /> },
    { url: "team-list", component: <TeamDetails /> },
    { url: "announcement", component: <Announcement /> },
    { url: "commission", component: <Commission /> },
    { url: "commission-data", component: <CommissionData /> },
    { url: "transaction", component: <Transaction /> },
    { url: "block", component: <BlockData /> },
    { url: "fifty-list", component: <Fifty /> },
    { url: "block-user", component: <BlockUserList /> },
    { url: "topup-list", component: <FreeIddata /> },
    { url: "user-registration", component: <UserRegester /> },
    { url: "top-team", component: <TopTeams /> },
    // History
    // { url: "deposit", component: <DepositHisory /> },
    { url: "withdrawal", component: <Withdrawal /> },
    { url: "mint", component: <Mint /> },
    { url: "support-chats", component: <SupportCharts /> },
    { url: "allusers/support", component: <Support /> },
    { url: "withdraw", component: <WithdrawRoi /> },
    { url: "withdrawClaim", component: <WithdrawClaim /> },
    { url: "deposit-data", component: <Deposit /> },
    { url: "allusers/user-referal", component: <UserReferral /> },
    { url: "allusers/referral-income", component: <ReferralIncome/> },
    { url: "allusers/Signup-bonus", component: <SignupBonus /> },
    { url: "allusers/task-reward", component: <TaskReward/> },
    { url: "exel-formet", component: <ExelFormet /> },
    { url: "protocol", component: <Protocol /> },
    { url: "protocol-data", component: <ProtocalData /> },
    { url: "withdraw-approve", component: <ApproveWithdraw /> },
    { url: "reject-withdraw", component: <RejectWithdraw /> },
    { url: "allusers/deposit-detail", component: <Deposite /> },
    { url: "allusers/withdraw-detail", component: <WithdrawDetail /> },
    { url: "allusers/staking-detail", component: <Staking /> },
    { url: "allusers/assets-detail", component: <AssetsDetail /> },
    { url: "allusers/exchange-detail", component: <Exchange /> },
    { url: "allusers/activity-detail", component: <Activity /> },

    // Dashboard Setting
    { url: "price-setting", component: <PriceSetting /> },
    { url: "address-setting", component: <AddressWithdraw /> },
    { url: "deposit-setting", component: <DepositMinimum /> },
    { url: "withdraw-setting", component: <WithdrawMinimum /> },

    // pdf upload
    { url: "reports", component: <PdfUpload /> },

    // key
    { url: "pending-kyc", component: <Kyc/> },
    { url: "approved-kyc", component: <Kyc/> },
    { url: "rejected-kyc", component: <Kyc/> },
  ];
  //let path = window.location.pathname;
  //path = path.split("/");
  //path = path[path.length - 1];

  //let pagePath = path.split("-").includes("page");
  //const { menuToggle } = useContext(ThemeContext);

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

  const selectChain  = useSelector((state=>state.auth.selectChain));
  console.log(selectChain,"chain")
  const chain = selectChain==="bsc"?bsc:selectChain==="polygon"?polygon:mainnet;
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
  //   const connectors = connectorsForWallets(
  //   [
  //     {
  //       groupName: "Recommended",
  //       wallets: [
  //         injectedWallet({ chains }),
  //         metaMaskWallet({ chains }),
  //         trustWallet({ chains }),
  //         coinbaseWallet({ chains, appName: "My RainbowKit App" }),
  //         walletConnectWallet({ chains }),
  //       ],
  //     },
  //   ],
  //   {
  //     projectId: "1ff81cbbd335161159e53053dce2ddec",
  //   }
  // );

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
        style={{ minHeight: window.screen.height - 45, background: "black" }}
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
