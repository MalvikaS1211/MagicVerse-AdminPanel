import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "swiper/css";
import {
  cutAfterDecimal,
  getStakeSummary,
} from "../../../../services/api_function";

const BalanceCardSlider = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      const res = await getStakeSummary(token);
      console.log(res,"res")
      if (res?.status === 200) {
        setData(res.data);
      } else {
        setData(null);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div
        className="d-flex justify-content-end mb-5"
        style={{ opacity: "0" }}
      ></div>
      {data ? (
        <div className="row">
          <Link
            to="/userList"
            className="col-lg-3"
          >
            <div>
              <div className="card ">
                <div className="card-body">
                  <div className="d-flex gap-3">
                    <div className="circle_bg">
                      {/* <img src="/images/user.png" className="img_50" /> */}
                      <FaUserGraduate
                        className="text-dark"
                        style={{ fontSize: "45px" }}
                      />
                    </div>
                    <div className="-info">
                      <h4 className="count-num">{data?.totalUsers ?? 0}</h4>
                      <p className="text_gray mb-0">Total Users</p>
                    </div>
                  </div>
                </div>
                <div className="card-border"></div>
              </div>
            </div>
          </Link>
          <Link className="col-lg-3" to="/contestList">
            <div>
              <div className="card ">
                <div className="card-body">
                  <div className="d-flex gap-3">
                    <div className="circle_bg">
                      {/* <img src="/images/user.png" className="img_50" /> */}
                      <MdQuiz
                        className="text-dark"
                        style={{ fontSize: "45px" }}
                      />
                    </div>
                    <div className="-info">
                      <h4 className="count-num">${cutAfterDecimal(data?.totalStake,4) ?? 0}</h4>
                      <p className="text_gray mb-0">Total Stake</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    {/* <img src="/images/user.png" className="img_50" /> */}
                    <MdQuiz
                      className="text-dark"
                      style={{ fontSize: "45px" }}
                    />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">${cutAfterDecimal(data?.totalUnstakedTokens,4) ?? 0}</h4>
                    <p className="text_gray mb-0">Total Unstake</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    {/* <img src="/images/user.png" className="img_50" /> */}
                    <MdQuiz
                      className="text-dark"
                      style={{ fontSize: "45px" }}
                    />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{cutAfterDecimal(data.totalDSCCoin,4) ?? 0} DSC</h4>
                    <p className="text_gray mb-0">Total DSC STAKE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    {/* <img src="/images/user.png" className="img_50" /> */}
                    <MdQuiz
                      className="text-dark"
                      style={{ fontSize: "45px" }}
                    />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{cutAfterDecimal(data.totalUSDTCoin,4) ?? 0} USDT</h4>
                    <p className="text_gray mb-0">Total USDT STAKE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    {/* <img src="/images/user.png" className="img_50" /> */}
                    <MdQuiz
                      className="text-dark"
                      style={{ fontSize: "45px" }}
                    />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{data.totalPaid ?? 0}</h4>
                    <p className="text_gray mb-0">Total Withdrawal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BalanceCardSlider;
