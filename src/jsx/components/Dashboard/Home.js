import React, { useContext, useEffect, useReducer, useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { ThemeContext } from "../../../context/ThemeContext";
import BalanceCardSlider from "./Dashboard/BalanceCardSlider";
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from "./SvgIcon";
// import Dropdown from "react-bootstrap/Dropdown";
//images
import coin from "./../../../images/coin.png";
import metaverse from "./../../../images/metaverse.png";

const DashboardComboChart = loadable(() =>
  pMinDelay(import("./Dashboard/DashboardComboChart"), 1000)
);
const AssetsChart = loadable(() =>
  pMinDelay(import("./Dashboard/AssetsChart"), 1000)
);

const ServerStatusBar = loadable(() =>
  pMinDelay(import("./Dashboard/ServerStatusBar"), 1000)
);

const pickerData = [
  { fillcolor: "var(--primary)", datatitle: "XTZ(40%)", price: "763" },
  { fillcolor: "#2A353A", datatitle: "BTC(20%)", price: "321" },
  { fillcolor: "#C0E192", datatitle: "BNB(10%)", price: "69" },
  { fillcolor: "#E085E4", datatitle: "ETH(10%)", price: "154" },
];

const marketBlog = [
  { icon: LtcIcon, classBg: "bg-success", Name: "LTC" },
  { icon: BtcIcon, classBg: "bg-warning", Name: "BTC" },
  { icon: XtzIcon, classBg: "bg-primary", Name: "XTZ" },
  { icon: EthIcon, classBg: "bg-pink", Name: "ETH" },
  { icon: XtzIcon, classBg: "bg-primary", Name: "XTZ" },
];

const axios = require("axios");
const Home = () => {
  const { changeBackground } = useContext(ThemeContext);

  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, []);

  const dateFilter = () => {};

  const MarketChart = loadable(() =>
    pMinDelay(import("./Index2/MarketChart"), 1000)
  );
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <BalanceCardSlider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
