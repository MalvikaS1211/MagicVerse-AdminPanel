import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import "swiper/css";
import {
  getAllContest,
  getDashboardData,
} from "../../../../services/api_function";
const BalanceCardSlider = () => {
  const [data, setData] = useState(null);
  const [allContest, setAllContest] = useState([]);
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
          <div className="col-lg-3">
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
                    <h4 className="count-num">{data.totalContests ?? 0}</h4>
                    <p className="text_gray mb-0">Total Contest</p>
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

      <div
        className="col-lg-6 table-responsive bg-white mt-5"
        style={{ margin: "0px", padding: "0px" }}
      >
        <h2 style={{ paddingLeft: "10px" }}>Contest</h2>
        <table
          class="table table-sm"
          style={{ height: "100%", width: "100%" }}
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Total Spot</th>
              <th scope="col">Spot Left</th>
              <th scope="col">Total Prize</th>
            </tr>
          </thead>
          <tbody>
            {allContest.map((it) => {
              console.log(it, ":::");
              return (
                <tr>
                  <th scope="row">{it?.title}</th>
                  <td>{it?.totalSpots}</td>
                  <td>{it?.spotsLeft}</td>
                  <td>{it?.totalPrize}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BalanceCardSlider;
