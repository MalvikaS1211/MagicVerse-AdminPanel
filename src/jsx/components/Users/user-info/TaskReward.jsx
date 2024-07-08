import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table } from "react-bootstrap";
import { allUser, SingleUserDetail } from "../../../../services/api_function";
import { useLocation } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { TfiGift } from "react-icons/tfi";
import { TbClock } from "react-icons/tb";
import "./TaskReward.css";
import { useSelector } from "react-redux";
export const TaskReward = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //   const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  //   const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const pageSize = 100;
  const {userTask}  = useSelector((state) => state.auth);

  console.log(userTask, "::::::::");


  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const datakey = userTask;
  console.log(datakey)
  const data = [
    {
      bonus: 10,
      key: "firstdepositinr",
      symbol: "USDT",
      title: "Task",
      description:
        "First deposit in INR, with a corresponding amount of 25K (most likely INR)",
    },
    {
      bonus: 10,
      key: "firstdepositinrx",
      symbol: "USDT",
      title: "Task",
      description:
        "First deposit in INRx, with a corresponding amount of 25K (most likely INR)",
    },
    {
      bonus: 20,
      key: "firstdepositusdt",
      symbol: "USDT",
      title: "Task",
      description:
        "First deposit in USDT, with a corresponding amount of 500 USDT",
    },
    {
      bonus: 10,
      key: "firstwithdrawinr",
      symbol: "USDT",
      title: "Task",
      description:
        "First withdrawal, with a corresponding amount of 10K (most likely INR)",
    },
    {
      bonus: 10,
      key: "secondwithdrawinr",
      symbol: "USDT",
      title: "Task",
      description:
        "Second withdrawal, with a corresponding amount of 10K (most likely INR)",
    },
  ];

  return (
    <>
      <main className=" pt-5 deposit_main">
        <div className="mb-3">
          <h1 className="heading mb-1" style={{ color: "white" }}>
            Rewards
          </h1>
          <div className="text-muted mob-font">
            Claim rewards by completing tasks and joining events
          </div>
        </div>
        <div className="col-lg-12 col-sm-12 mb-3">
          <div className="highlighted_card">
            <div className="row align-items-center">
              <div className="col-lg-9">
                <div className="highlighted_card_text">
                  Invite a friend and you'll earn{" "}
                  <span className="text-green">40 USDT</span>
                </div>
                <p className="sub_description mb-0">
                  This entry appears to sum up the transactions, showing a total
                  deposit of 1,000.00 (currency not specified, could be INR).
                </p>
              </div>
              <div className="col-lg-3 text-end">
                <img
                  src="https://auth.inrx.io/images/reward.svg
"
                  className="reward_img"
                  height="100"
                  width="100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-sm-12">
          <div className="box_wrapper">
            <div className="box-left">
              <h5 className="amount_heading">100 USDT</h5>
              <p className="coupon_code">Signup Bonus</p>
              <div className="gift_icon_wrapper">
                <TfiGift />
              </div>
            </div>
            <div className="box-right">
              <div className="row align-items-center">
                <div className="col-lg-10">
                  <h5 className="box_heading text-white">
                    Receive 100 USDT upon signing up
                  </h5>
                </div>
                <div className="col-lg-2 text-end">
                  <a href="#" className="custom_btn_outline fs-14">
                    Completed
                    <FaCheckCircle className="ms-1" />
                  </a>
                </div>
              </div>
            </div>
            <div class="corner_badge">
              <TbClock className="me-1" />
              1d 3h
            </div>
          </div>

          {data.map((item, i) => {
            const iscompleted = datakey
              ? datakey?.find((it) => (it[item?.key] == true ? true : false))
              : false;
            return (
              <div className="box_wrapper" key={i + "BonusCards"}>
                <div className="box-left">
                  <h5 className="amount_heading">
                    {item?.bonus} {item?.symbol}
                  </h5>
                  <p className="coupon_code">{item?.title}</p>
                  <div className="gift_icon_wrapper">
                    <TfiGift />
                  </div>
                </div>
                <div className="box-right">
                  <div className="row align-items-center">
                    <div className="col-lg-10">
                      <h5 className="box_heading text-white">
                        {item?.description}
                      </h5>
                    </div>
                    <div className="col-lg-2 text-end">
                      <a href="#" className="custom_btn_outline fs-14">
                        {iscompleted ? "Completed" : "Acomplished"}{" "}
                        {iscompleted ? (
                          <FaCheckCircle className="ms-1" />
                        ) : (
                          <FaArrowRight className="ms-1" />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default TaskReward;
