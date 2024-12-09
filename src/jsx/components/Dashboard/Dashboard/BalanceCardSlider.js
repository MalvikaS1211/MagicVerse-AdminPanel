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
  getTop3IdData,
} from "../../../../services/api_function";

const BalanceCardSlider = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      const res = await getStakeSummary(token);
      // console.log(res, "res");
      if (res?.status === 200) {
        setData(res.data);
      } else {
        setData(null);
      }

      const res2 = await getTop3IdData(token);
      console.log(res2, "res2");
      if (res2?.status === 200) {
        setData2(res2.data);
      } else {
        setData2(null);
      }
    };
    fetchData();
  }, []);

  return (
    <>
  <label className="form-label h3">Funds Collect</label>
    <div className="row">
      <div className="col-lg-6">
      <div className="card ">
            <div className="card-body">
              <div className="d-flex gap-3">
                <div className="circle_bg2">
                  <div className="text-green h1">70%</div>
                  {/* <img src="/images/user.png" className="img_50" /> */}
                  {/* <MdQuiz
              className="text-dark"
              style={{ fontSize: "45px" }}
            /> */}
                </div>
                <div className="-info">
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.balance?.nativeBalanceDSC70, 4) ??
                      0}{" "}
                    DSC
                  </h4>
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.balance?.tokenBalance70, 4) ??
                      0}{" "}
                    USDT
                  </h4>

                  <p className="text_gray mb-0">
                    {" "}
                    {data2?.balance?.address70?.slice(0, 5)}...
                    {data2?.balance?.address70?.slice(-5)}
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="col-lg-6">
      <div className="card ">
            <div className="card-body">
              <div className="d-flex gap-3">
                <div className="circle_bg2">
                  <div className="text-green h1">30%</div>
                  {/* <img src="/images/user.png" className="img_50" /> */}
                  {/* <MdQuiz
              className="text-dark"
              style={{ fontSize: "45px" }}
            /> */}
                </div>
                <div className="-info">
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.balance?.nativeBalanceDSC30, 4) ??
                      0}{" "}
                    DSC
                  </h4>
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.balance?.tokenBalance30, 4) ??
                      0}{" "}
                    USDT
                  </h4>

                  <p className="text_gray mb-0">
                    {" "}
                    {data2?.balance?.address30?.slice(0, 5)}...
                    {data2?.balance?.address30?.slice(-5)}
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
      <label className="form-label h3">TOP 3 Id's</label>
      <div className="row">
        <div className="col-lg-4">
          <div className="card ">
            <div className="card-body">
              <div className="d-flex gap-3">
                <div className="circle_bg2">
                  <div className="text-green h1">6%</div>
                  {/* <img src="/images/user.png" className="img_50" /> */}
                  {/* <MdQuiz
              className="text-dark"
              style={{ fontSize: "45px" }}
            /> */}
                </div>
                <div className="-info">
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.firstId?.systemIdIncome?.dsc, 4) ??
                      0}{" "}
                    DSC
                  </h4>
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.firstId?.systemIdIncome?.usdt, 4) ??
                      0}{" "}
                    USDT
                  </h4>

                  <p className="text_gray mb-0">
                    {" "}
                    {data2?.firstId?.userAddress?.slice(0, 5)}...
                    {data2?.firstId?.userAddress?.slice(-5)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card ">
            <div className="card-body">
              <div className="d-flex gap-3">
                <div className="circle_bg2">
                  <div className="text-green h1">3%</div>
                  {/* <img src="/images/user.png" className="img_50" /> */}
                  {/* <MdQuiz
                      className="text-dark"
                      style={{ fontSize: "45px" }}
                    /> */}
                </div>
                <div className="-info">
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.secondId?.systemIdIncome?.dsc, 4) ??
                      0}{" "}
                    DSC
                  </h4>
                  <h4 className="count-num">
                    {cutAfterDecimal(
                      data2?.secondId?.systemIdIncome?.usdt,
                      4
                    ) ?? 0}{" "}
                    USDT
                  </h4>

                  <p className="text_gray mb-0">
                    {" "}
                    {data2?.secondId?.userAddress?.slice(0, 5)}...
                    {data2?.secondId?.userAddress?.slice(-5)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card ">
            <div className="card-body">
              <div className="d-flex gap-3">
                <div className="circle_bg2">
                  <div className="text-green h1">3%</div>
                  {/* <img src="/images/user.png" className="img_50" /> */}
                  {/* <MdQuiz
                      className="text-dark"
                      style={{ fontSize: "45px" }}
                    /> */}
                </div>
                <div className="-info">
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.thirdId?.systemIdIncome?.dsc, 4) ??
                      0}{" "}
                    DSC
                  </h4>
                  <h4 className="count-num">
                    {cutAfterDecimal(data2?.thirdId?.systemIdIncome?.usdt, 4) ??
                      0}{" "}
                    USDT
                  </h4>

                  <p className="text_gray mb-0">
                    {" "}
                    {data2?.thirdId?.userAddress?.slice(0, 5)}...
                    {data2?.thirdId?.userAddress?.slice(-5)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-end mb-5"
        style={{ opacity: "0" }}
      ></div>
      {data ? (
        <div className="row">
          <Link to="/admin/userList" className="col-lg-3">
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

          <Link className="col-lg-3" to="/admin/stakeList">
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
                      <h4 className="count-num">
                        ${cutAfterDecimal(data?.totalStake, 4) ?? 0}
                      </h4>
                      <p className="text_gray mb-0">Total Stake</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <stakeList className="col-lg-3" to="/admin/unstake">
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
                    <h4 className="count-num">
                      ${cutAfterDecimal(data?.totalUnstakedTokens, 4) ?? 0}
                    </h4>
                    <p className="text_gray mb-0">Total Unstake</p>
                  </div>
                </div>
              </div>
            </div>
          </stakeList>
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
                    <h4 className="count-num">
                      {cutAfterDecimal(data.totalDSCCoin, 4) ?? 0} DSC
                    </h4>
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
                    <h4 className="count-num">
                      {cutAfterDecimal(data.totalUSDTCoin, 4) ?? 0} USDT
                    </h4>
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
                    <h4 className="count-num">
                      {cutAfterDecimal(data.totalUnstakedDSC, 4) ?? 0} DSC
                    </h4>
                    <p className="text_gray mb-0">Total DSC UNSTAKE</p>
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
                    <h4 className="count-num">
                      {cutAfterDecimal(data.totalUnstakedUSDT, 4) ?? 0} USDT
                    </h4>
                    <p className="text_gray mb-0">Total USDT UNSTAKE</p>
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
