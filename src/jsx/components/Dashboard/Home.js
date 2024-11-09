import React, { useContext, useEffect, useReducer, useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { ThemeContext } from "../../../context/ThemeContext";
import BalanceCardSlider from "./Dashboard/BalanceCardSlider";
import { getStakeSetting, updateStakeSetting } from "../../../services/api_function";
import toast from "react-hot-toast";

const pickerData = [
  { fillcolor: "var(--primary)", datatitle: "XTZ(40%)", price: "763" },
  { fillcolor: "#2A353A", datatitle: "BTC(20%)", price: "321" },
  { fillcolor: "#C0E192", datatitle: "BNB(10%)", price: "69" },
  { fillcolor: "#E085E4", datatitle: "ETH(10%)", price: "154" },
];
const axios = require("axios");
const Home = () => {
  "";
  const { changeBackground } = useContext(ThemeContext);
  
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, []);




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
