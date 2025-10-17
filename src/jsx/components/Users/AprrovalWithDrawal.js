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

import { useAccount } from "wagmi";

export const RejectedWithdrawal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const [tooltipText, setTooltipText] = useState("Copy address");
  const [filteredData, setFilteredData] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);
  const [approvalList, setApprovalList] = useState([]);
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

      let allRejectedList = response.data.data;
      console.log(allRejectedList, "res");
      // setTotalPages(response.data.meta.totalPages);
      setRejectedList(allRejectedList);

      // setFilteredData(allRejectedList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

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

  const handleReject = async ({ id, user, licenseType, claimType }) => {
    try {
      const response = await axios.post(`${URLApi}/rejectWithdrawal`, {
        id,
        user,
        licenseType,
        claimType,
      });
      // console.log(response.data, "::::::::::::::::::");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Row>
        <div className="display_end">
          <label className="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Approve Withdrawal</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Withdrawal Type</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalList?.length > 0 ? (
                    approvalList?.map((approval, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 20 + index + 1}</td>
                        <td>
                          {approval?.user?.slice(0, 5)}...
                          {approval?.user?.slice(-4)}
                          <Tooltip title="Copy User Address" arrow>
                            <IconButton
                              onClick={() => handleCopy(approval?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{approval?.totalAmount}</td>
                        <td>{approval?.totalAmount}</td>
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

export default RejectedWithdrawal;
