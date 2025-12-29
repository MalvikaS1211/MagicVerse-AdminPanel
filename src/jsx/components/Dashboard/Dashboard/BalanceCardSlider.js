import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTag, FaUserGraduate } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import "swiper/css";
import {
  allowBulkCreation,
  AllowToCreateBulk,
  getAdminDashboard,
  getNftStartStop,
} from "../../../../services/api_function";
import { useAccount } from "wagmi";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RiNftFill } from "react-icons/ri";

const BalanceCardSlider = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { login } = useSelector((state) => state.login);
  const [bulkLoading, setBulkLoading] = useState(false);
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

  const handleBulkToggle = async () => {
    try {
      setBulkLoading(true);

      const newStatus = !statusForBulk;
      setStatusForBulk(newStatus);

      // pass boolean value to API
      await allowBulkCreation(newStatus);

      toast.success(
        newStatus ? "Bulk NFT creation ENABLED" : "Bulk NFT creation DISABLED"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update bulk NFT status");
    } finally {
      setBulkLoading(false);
    }
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
          <div className="col">
            <button
              className={`btn ${
                statusForBulk ? "btn-success" : "btn-danger"
              } pointer border m-2`}
              onClick={handleBulkToggle}
              disabled={bulkLoading}
              style={{
                marginBottom: "20px",
                minWidth: "260px",
                fontWeight: "600",
              }}
            >
              {bulkLoading ? (
                "Updating..."
              ) : (
                <>
                  Allow Bulk NFT Creation :{" "}
                  <strong>{statusForBulk ? "ON" : "OFF"}</strong>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCardSlider;
