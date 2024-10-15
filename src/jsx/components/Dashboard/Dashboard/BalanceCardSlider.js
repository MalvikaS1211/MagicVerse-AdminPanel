import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "swiper/css";
import {
  getAllContest,
  getDashboardData,
} from "../../../../services/api_function";
const BalanceCardSlider = () => {
  const [data, setData] = useState(null);
  const [allContest, setAllContest] = useState([]);

  const [countdowns, setCountdowns] = useState({});
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      allContest.forEach((it) => {
        const endTime = new Date(it.endTime).getTime();
        const now = new Date().getTime();
        const distance = endTime - now;
        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          newCountdowns[it.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[it.id] = "Expired";
        }
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [allContest]);

  function formatPrize(amount) {
    if (amount >= 1e7) {
      return (amount / 1e7).toFixed(0) + " Crore";
    } else if (amount >= 1e5) {
      return (amount / 1e5).toFixed(0) + " Lakh";
    } else if (amount >= 1e3) {
      return (amount / 1e3).toFixed(0) + " Thousand";
    }
    return amount;
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboardData();
      if (res) {
        setData(res);
      } else {
        setData(null);
      }
    };
    fetchData();
  }, []);

  const fetchContest = async () => {
    console.log("infetchContest");
    try {
      const res = await getAllContest();
      setAllContest(res);
    } catch (error) {
      console.log(error, ":: in contestlist");
      setAllContest([]);
    }
  };
  useEffect(() => {
    fetchContest();
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
                      <h4 className="count-num">{data.totalUsers ?? 0}</h4>
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
                      <h4 className="count-num">{data.totalContests ?? 0}</h4>
                      <p className="text_gray mb-0">Total Contest</p>
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
                    <h4 className="count-num">{data.totalDeposit ?? 0}</h4>
                    <p className="text_gray mb-0">Total Deposit</p>
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

      <h3>Contest List</h3>
      <div className="row col-lg-12 gap-3" style={{ paddingLeft: "15px" }}>
        {allContest.map((it) => {
          {
            /* console.log(it, ":::"); */
          }
          return (
            <div className="col-lg-3 contest-card">
              <div className="div1">
                <p className="exTitle">{it?.title}</p>
                <p className="time">{countdowns[it.id]}</p>
              </div>
              <div className="div2">
                <div className="money">
                  <p className="m1">{formatPrize(it.totalPrize)}</p>
                  <p className="m2">₹ {it?.buy}</p>
                </div>
                <div>
                  <Slider
                    size="small"
                    defaultValue={it?.totalSpots - it?.spotsLeft}
                    value={it?.totalSpots - it?.spotsLeft}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    max={it?.totalSpots}
                  />
                </div>
              </div>
              <div className="div3">
                <p>{it?.spotsLeft ?? it?.totalSpots} spot left</p>
                <p>{it?.totalSpots} spot</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BalanceCardSlider;
