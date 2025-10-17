import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useChainId } from "wagmi";
import { setWallet } from "../../redux/reducer";
import ConnectWallet from "./ConnectWallet";
const Header = ({ onNote }) => {
  const { address, connector, isConnected, status, isDisconnected } =
    useAccount();
  const chainId = useChainId();
  const dispatch = useDispatch();
  const obj = {
    walletAddress: address,
    chainId: chainId,
    isConnected: isConnected,
    isDisconnected: isDisconnected,
    connector: connector,
    status: status,
  };
  dispatch(setWallet({ ...obj }));

  const [path, setPath] = useState();
  //For fix header
  const [headerFix, setheaderFix] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);
  useEffect(() => {
    var path = window.location.pathname.split("/");
    // console.log(window.location, ":::::");
    setPath(path);
  }, [window.location.pathname]);

  return (
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              ></div>
            </div>
            <div className="navbar-nav header-right"></div>
            <div>
              {/* <ConnectButton
                chainStatus="icon"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              /> */}
              <ConnectWallet />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
