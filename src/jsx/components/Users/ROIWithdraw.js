import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import axios from "axios";
import Papa from "papaparse";
import {
  cutAfterDecimal,
  getAllStakeUsers,
  URLApi,
} from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import moment from "moment";
import {
  getIsUserExist,
  getOperator,
  stakeUsdtByAdmin,
} from "./web3/transfert";
import { useAccount } from "wagmi";

export const ROIWithdraw = () => {
  const [search, setSearch] = useState("");
  const [WithdrawList, setWithdrawList] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [filteredData, setFilteredData] = useState([]);
  const [reload, setReload] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemPerpage = 20;

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${URLApi}/getWithdrawList`,
        {
          page: currentPage,
          limit: itemPerpage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let allWithdrawList = response.data.data;
      setTotalPages(response.data.total);
      setWithdrawList(allWithdrawList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, reload]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
  };

  return (
    <Fragment>
      <Row>
        {/* <div className="display_end">
          <div className="input-group " style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              autoComplete="off"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <label className="form-label" htmlFor="form1"></label>
        </div> */}

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Withdraw List</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>Split Balance</th>
                    <th>Topup Balance</th>
                    <th>Wallet</th>
                    <th>Tx Hash</th>
                    <th>Block</th>
                    <th>Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  {WithdrawList?.length > 0 ? (
                    WithdrawList?.map((withdraw, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 20 + index + 1}</td>
                        <td>
                          {withdraw?.user?.slice(0, 5)}...
                          {withdraw?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(withdraw?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{withdraw?.splitBalance?.toFixed(2)}</td>
                        <td>{withdraw?.topupBalance?.toFixed(2)}</td>
                        <td>{withdraw?.wallet?.toFixed(2)}</td>
                        <td>{withdraw?.txHash}</td>
                        <td>{withdraw?.block}</td>
                        <td>
                          {withdraw?.timestamp
                            ? new Date(
                                Number(withdraw?.timestamp) * 1000
                              ).toLocaleString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Records Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className=" filter-pagination mt-3">
                  <button
                    className="previous-button btn border m-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    className="next-button btn btn-success pointer border m-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>

                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ROIWithdraw;
