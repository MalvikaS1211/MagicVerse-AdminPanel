import React, { useState, useEffect } from "react";

import { FaUserGraduate } from "react-icons/fa";

import { AiFillDollarCircle } from "react-icons/ai";

import "swiper/css";
import { getAdminDashboard } from "../../../../services/api_function";
import { useAccount } from "wagmi";

const BalanceCardSlider = () => {
  const { address } = useAccount();

  const [user, setUser] = useState(null);

  const ShowAdminData = async () => {
    try {
      const res = await getAdminDashboard();
      console.log(res, "admin data");
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ShowAdminData();
  }, [address]);

  return (
    <>
      <div className="col-xl-12">
        <label className="form-label h3">Dashboard</label>
        <div className="row" style={{ paddingTop: "10px" }}>
          <div className="col-lg-4">
            <div className="card ">
              <div className="card-body">
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
            <div className="card ">
              <div className="card-body">
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
        </div>
      </div>
    </>
  );
};

export default BalanceCardSlider;
