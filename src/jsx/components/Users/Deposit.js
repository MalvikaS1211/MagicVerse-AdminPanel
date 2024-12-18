import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

export const Deposit = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [depositList, setDepositList] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [filteredData, setFilteredData] = useState([]);
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const [token, setToken] = useState();

  const fetchData = async () => {
    try {
      const userDetails = localStorage.getItem("adminToken");
      setToken(userDetails);
      const token = userDetails;
      const response = await axios.post(
        `${URLApi}/get-deposit`,
        {
          page: currentPage,
          limit: 20,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.meta, ":::::::123");
      let allDepositList = response.data.data;
      setTotalPages(response.data.meta.totalPages);
      setDepositList(allDepositList);
      console.log(response.data.meta?.totalPages, "pagepage");
      // setFilteredData(allDepositList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearch(query);
    const filtered = depositList.filter((item) =>
      item?.user?.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const now = new Date();

  const formattedDate = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  console.log(formattedDate, "8888");
  return (
    <Fragment>
      <Row>
        <div className="display_end">
          <div className="input-group " style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              onChange={handleSearch}
            />
          </div>
          <label className="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>DEPOSIT</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>License Type</th>
                    <th>Tx Hash</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {depositList?.length > 0 ? (
                    depositList?.map((deposit, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 20 + index + 1}</td>
                        <td>
                          {deposit?.user?.slice(0, 5)}...
                          {deposit?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(deposit?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{(Number(deposit?.amount) / 1e18)?.toFixed(2)}</td>

                        <td>{deposit?.LicenceType}</td>
                        <td>{deposit?.transactionHash}</td>
                        <td>
                          {moment(deposit?.createdAt).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
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
                <div className=" filter-pagination mt-3 ">
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

export default Deposit;
