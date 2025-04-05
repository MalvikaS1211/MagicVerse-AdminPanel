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
import { Card } from "react-bootstrap";
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

  const toggleNftAction = async () => {
    try {
      await getNftStartStop("UPDATE", !NftAction);
      setNftAction(!NftAction);
    } catch (error) {
      console.error("Error updating NFT status:", error);
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
      <div className="row" style={{ paddingTop: "10px" }}>
        <div className="col-lg-4">
          <div
            className="card"
            style={{ height: "80%", background: "#fff7f7" }}
          >
            <div className="card-body  d-flex align-items-center">
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

        <div className="col-lg-4">
          <div
            className="card"
            style={{ height: "80%", background: "#fff7f7" }}
          >
            <div className="card-body d-flex align-items-center">
              <div className="d-flex gap-3">
                <div>
                  <AiFillDollarCircle
                    style={{ width: "160%", height: "100%" }}
                  />
                </div>
                <div className="-info">
                  <h4 className="count-num" style={{ fontSize: "20px" }}>
                    Fund : {user?.totalFunds || 0}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div
            className="card "
            style={{ height: "100%", background: "#fff7f7" }}
          >
            <div className="card-body pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">NFT Action</h4>
                <button
                  type="button"
                  className="btn btn-success px-4 py-2"
                  aria-label="Start NFT Action"
                  onClick={toggleNftAction}
                >
                  {NftAction ? "Stop" : "Start"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-lg-4">
        <Card>
          <Card.Header>
            <Card.Title as="h5">NFT Action</Card.Title>
          </Card.Header>
          <Card.Body className="d-flex flex-wrap align-items-center">
            <button
              type="button"
              className="next-button btn btn-success pointer border m-2"
              aria-label="Start NFT Action"
            >
              Start
            </button>
          </Card.Body>
        </Card>
      </div> */}
    </div>
  );
};

export default BalanceCardSlider;
