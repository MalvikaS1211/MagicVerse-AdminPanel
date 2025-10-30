import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTag, FaUserGraduate } from "react-icons/fa";

import "swiper/css";
import {
  AllowToCreateBulk,
  getAdminDashboard,
  getNftStartStop,
} from "../../../../services/api_function";
import { useAccount } from "wagmi";

import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RiNftFill } from "react-icons/ri";

const BalanceCardSlider = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { login } = useSelector((state) => state.login);

  const [user, setUser] = useState(null);
  const [NftAction, setNftAction] = useState(false);
  const [UserAddressSingle, setUserAddressSingle] = useState();
  const [statusAllow, setStatusAllow] = useState(false);
  const [statusForBulk, setStatusForBulk] = useState(false);
  const [UserAddressBulk, setUserAddressBulk] = useState();
  const ShowAdminData = async () => {
    try {
      const res = await getAdminDashboard();
      // console.log(res, "admin data");
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNftAction = async () => {
    try {
      const response = await getNftStartStop("GET");
      console.log(response.nftCreationBlockStatus, "response::::::");
      setNftAction(response?.nftCreationBlockStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleNFTActionForSingle = async () => {
    try {
      const res = await getNftStartStop(UserAddressSingle, statusAllow);

      console.log(res, "res");
      setUserAddressSingle("");
      console.log(statusAllow, "statusAllow");
      if (statusAllow === "true") {
        toast.success("User Allowed to create an NFT !");
      } else {
        toast.success("User Not Allowed to create an NFT !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleNFTActionForBulk = async () => {
    try {
      const res = await AllowToCreateBulk(UserAddressBulk, statusForBulk);

      console.log(res, "res");
      setUserAddressBulk("");
      setStatusForBulk(false);
      if (statusForBulk == true) {
        toast.success("User Allowed to create Bulk NFTs !");
      } else {
        toast.success("User Not Allowed to create Bulk NFTs !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (login === true) {
      ShowAdminData();
      handleNftAction();
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => {
    setIsEnabled((prev) => !prev);
    console.log("New NFT toggled:", !isEnabled); // or trigger an API call
  };
  return (
    <div className="col-xl-12">
      <label className="form-label h3">Dashboard</label>
      <div className="" style={{ paddingTop: "10px" }}>
        {/* Total Users Card */}
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card card-bg">
              <div className="card-body d-flex align-items-center">
                <div className="d-flex gap-3">
                  <div>
                    <FaUserGraduate style={{ width: "160%", height: "100%" }} />
                  </div>
                  <div className="-info">
                    <h4 className="count-num" style={{ fontSize: "20px" }}>
                      Total Users : {user?.totalUsers || 0}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="card card-bg">
              <div className="card-body d-flex align-items-center">
                <div className="d-flex gap-3">
                  <div>
                    <RiNftFill style={{ width: "160%", height: "100%" }} />
                  </div>
                  <div className="-info">
                    <h4 className="count-num" style={{ fontSize: "20px" }}>
                      Total Created NFTs: {user?.totalNFTs || 0}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card card-bg">
              <div className="card-body d-flex align-items-center">
                <div className="d-flex gap-3">
                  <div>
                    <FaShoppingCart style={{ width: "160%", height: "100%" }} />
                  </div>
                  <div className="-info">
                    <h4 className="count-num" style={{ fontSize: "20px" }}>
                      Total Sold NFTs : {user?.NFTSold || 0}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card card-bg">
              <div className="card-body d-flex align-items-center">
                <div className="d-flex gap-3">
                  <div>
                    <FaTag style={{ width: "160%", height: "100%" }} />
                  </div>
                  <div className="-info">
                    <h4 className="count-num" style={{ fontSize: "20px" }}>
                      Total In Sale NFTs : {user?.InSaleNFTs || 0}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {" "}
          {/* NFT Action Card  Single*/}
          {/* <div className="col-lg-6 mb-4">
            <div className="card card-bg" style={{ height: "100%" }}>
              <div className="card-body pb-4">
                <div className="d-flex flex-column gap-3">
                  <h4 className="card-title mb-0">Single NFT Action</h4>
                  <h5>User</h5>
                  <div className="input-group w-100">
                    <input
                      type="text"
                      id="form1"
                      className="form-control"
                      placeholder="Enter User Address"
                      value={UserAddressSingle}
                      onChange={(e) => setUserAddressSingle(e.target.value)}
                    />
                  </div>

                  <div>
                    <h5>Allow User Access</h5>
                    <select
                      className="form-select"
                      value={statusAllow}
                      onChange={(e) => setStatusAllow(e.target.value)}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <button
                      type="button"
                      className="btn btn-success w-50 py-2"
                      aria-label="Start NFT Action"
                      onClick={toggleNFTActionForSingle}
                    >
                      Allow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* NFT action Card For Bulk */}
          {/* <div className="col-lg-6 mb-4">
            <div className="card card-bg" style={{ height: "100%" }}>
              <div className="card-body pb-4">
                <div className="d-flex flex-column gap-3">
                  <h4 className="card-title mb-0">Bulk NFT Action </h4>
                  <h5>User</h5>
                  <div className="input-group w-100">
                    <input
                      type="text"
                      id="form1"
                      className="form-control"
                      placeholder="Enter User Address"
                      value={UserAddressBulk}
                      onChange={(e) => setUserAddressBulk(e.target.value)}
                    />
                  </div>

                  <div>
                    <h5>Allow User Access</h5>
                    <select
                      className="form-select"
                      value={statusForBulk}
                      onChange={(e) => setStatusForBulk(e.target.value)}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <button
                      type="button"
                      className="btn btn-success w-50 py-2"
                      aria-label="Start NFT Action"
                      onClick={toggleNFTActionForBulk}
                    >
                      Allow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* toggle btn */}
          {/* <div className="d-flex  gap-3">
            <div className="d-flex align-items-center gap-3 mt-4">
              <span className="">New NFT</span>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
            <div className="d-flex align-items-center gap-3 mt-4">
              <span>Old NFT</span>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BalanceCardSlider;
