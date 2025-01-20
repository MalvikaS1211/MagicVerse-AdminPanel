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
  getusdt,
  stakeUsdtByAdmin,
} from "./web3/transfert";
import { useAccount } from "wagmi";

export const Alluser = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [licenseList, setLicenseList] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [usersList, setUsersList] = useState([]);
  const itemPerpage = 20;

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000); // Reset tooltip text after 2 seconds
  };

  // const handleSearch = async (e) => {
  //   const query = e.target.value.trim().toLowerCase();
  //   const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
  //   setSearch(sanitizedQuery);
  //   if (currentPage !== 1) {
  //     setCurrentPage(1);
  //   }
  // };

  const [token, setToken] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("adminToken");
        // setToken(userDetails);
        // const token = userDetails;
        const response = await axios.post(
          `${URLApi}/getUserList`,
          {
            page: currentPage,
            limit: itemPerpage,
          },
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data.data, "getUserList");
        setUsersList(response.data.data);
        setTotalPages(response.data.total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearch(query);
    const filtered = licenseList.filter((item) =>
      item?.user?.toLowerCase().includes(query)
    );
    // setFilteredData(filtered);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const { address } = useAccount();
  console.log("account address", address);

  return (
    <Fragment>
      <Row className="mb-4"></Row>
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
              <Card.Title>All Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>referral</th>
                    <th>Deposit Wallet</th>
                    {/* <th>Radiant Deposit</th> */}
                    <th>Tx Hash</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList?.length > 0 ? (
                    usersList?.map((user, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 20 + index + 1}</td>
                        <td>
                          {user?.user?.slice(0, 5)}...
                          {user?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(user?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>
                          {user?.referrer?.slice(0, 5)}...
                          {user?.referrer?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(user?.referrer)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{cutAfterDecimal(user?.depositWallet, 2)}</td>
                        {/* <td>
                          {cutAfterDecimal(user?.totalDepositRadiant, 2)} USDT
                        </td> */}
                        <td>{user?.txHash}</td>
                        <td>
                          {moment(user.createdAt).format("M/D/YYYY h:mm:ss A")}
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

              <div className="d-flex justify-content-between"></div>
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

export default Alluser;
