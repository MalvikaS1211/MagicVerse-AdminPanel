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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [RoiWithdrawList, setRoiWithdrawList] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [filteredData, setFilteredData] = useState([]);
  const [reload, setReload] = useState(false);

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const token = localStorage.getItem("adminToken");
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${URLApi}/get-admin-pendingWithdrawal`,
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

      let allRoiWithdrawList = response.data.data;
      console.log(allRoiWithdrawList, "res");
      // setTotalPages(response.data.meta.totalPages);
      setRoiWithdrawList(allRoiWithdrawList);

      // setFilteredData(allRoiWithdrawList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, reload]);
  // const handleSearch = (e) => {
  //   const query = e.target.value.toLowerCase().trim();
  //   setSearch(query);
  //   const filtered = RoiWithdrawList.filter((item) =>
  //     item?.user?.toLowerCase().includes(query)
  //   );
  //   setFilteredData(filtered);
  // };
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
  console.log(token, "token");

  const handleApprove = async ({ id, user, licenseType, claimType }) => {
    try {
      const response = await axios.post(
        `${URLApi}/rejectWithdrawal`,
        {
          id: id, // Ensure 'id' is defined in your function or context
          user: user, // Ensure 'user' is provided
          licenseType: licenseType, // Ensure 'licenseType' is passed correctly
          claimType: claimType, // Ensure 'claimType' is passed correctly
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure 'token' is valid and not null
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async ({ id, user, licenseType, claimType }) => {
    try {
      console.log(id, user, licenseType, claimType);
      const response = await axios.post(
        `${URLApi}/rejectWithdrawal`,
        {
          id,
          user,
          licenseType,
          claimType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data, "::::::::::::::::::");
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };
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
              // onChange={handleSearch}
            />
          </div>
          <label className="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>ROI Withdraw</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User Address</th>
                    <th>Amount</th>
                    <th>Admin Fee</th>
                    <th>Action</th>
                    {/* <th>Reject</th> */}
                  </tr>
                </thead>
                <tbody>
                  {RoiWithdrawList?.length > 0 ? (
                    RoiWithdrawList?.map((withdraw, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 20 + index + 1}</td>
                        <td>
                          {withdraw?.user?.slice(0, 5)}...
                          {withdraw?.user?.slice(-4)}
                          <Tooltip title="Copy User Address" arrow>
                            <IconButton
                              onClick={() => handleCopy(withdraw?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{withdraw?.totalAmount}</td>
                        <td>
                          {withdraw?.totalAmount - withdraw?.claimedAmount}
                        </td>

                        <td>
                          <button className="next-button btn btn-success pointer border m-2">
                            <Link to={`/admin/roiviewdata?id=${withdraw?._id}`}>
                              View
                            </Link>
                          </button>
                        </td>
                        {/* <td>
                          <button
                            className="next-button btn btn-danger pointer border m-2"
                            onClick={() =>
                              handleReject({
                                id: withdraw?._id,
                                user: withdraw?.user,
                                licenseType: withdraw?.licenceType,
                                claimType: withdraw?.claimType,
                              })
                            }
                          >
                            Reject
                          </button>
                        </td> */}
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

export default ROIWithdraw;
