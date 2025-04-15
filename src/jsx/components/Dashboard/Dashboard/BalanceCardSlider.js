import React, { useState, useEffect } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";

import "swiper/css";
import {
  getAdminDashboard,
  getMaturedNFTs,
  getNftStartStop,
} from "../../../../services/api_function";
import { useAccount } from "wagmi";
import { Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";

const BalanceCardSlider = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const dispatch = useDispatch();

  const { login } = useSelector((state) => state.login);

  const [user, setUser] = useState(null);
  const [NftAction, setNftAction] = useState(false);
  const [UserAddress, setUserAddress] = useState();
  const [statusAllow, setStatusAllow] = useState(false);

  const ShowAdminData = async () => {
    try {
      const res = await getAdminDashboard();
      console.log(res, "admin data");
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
  const handleStatusChange = (e) => {
    setStatusAllow(e.target.value);
  };
  // const toggleNftAction = async () => {
  //   try {
  //     await getNftStartStop("UPDATE", !NftAction);
  //     setNftAction(!NftAction);
  //   } catch (error) {
  //     console.error("Error updating NFT status:", error);
  //   }
  // };
  const handleInputUser = async (e) => {
    const Address = e.target.value;
    setUserAddress(Address);
  };
  const toggleNftAction = async () => {
    try {
      const res = await getNftStartStop(UserAddress, statusAllow);

      console.log(res, "res");
      setUserAddress("");
      setStatusAllow(false);
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

  return (
    <div className="col-xl-12">
      <label className="form-label h3">Dashboard</label>
      <div className="" style={{ paddingTop: "10px" }}>
        {/* Total Users Card */}
        <div className="col-lg-6 mb-4">
          <div className="card" style={{ background: "#fff7f7" }}>
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

        {/* NFT Action Card */}
        <div className="col-lg-6 mb-4">
          <div
            className="card"
            style={{ height: "100%", background: "#fff7f7" }}
          >
            <div className="card-body pb-4">
              <div className="d-flex flex-column gap-3">
                <h4 className="card-title mb-0">NFT Action</h4>
                <h5>User</h5>
                <div className="input-group w-100">
                  <input
                    type="text"
                    id="form1"
                    className="form-control"
                    placeholder="Enter User Address"
                    value={UserAddress}
                    onChange={handleInputUser}
                  />
                </div>

                <div>
                  <h5>Allow User Access</h5>
                  <select
                    className="form-select"
                    value={statusAllow}
                    onChange={handleStatusChange}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="btn btn-success w-100 py-2"
                  aria-label="Start NFT Action"
                  onClick={toggleNftAction}
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCardSlider;
