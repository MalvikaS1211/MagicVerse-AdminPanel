import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import axios from "axios";

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

export const LevelReward = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [levelRewardList, setlevelRewardList] = useState([]);
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

      let alllevelRewardList = response.data;
      console.log(alllevelRewardList);
      setTotalPages(response.data.meta.totalPages);
      setlevelRewardList(alllevelRewardList);

      // setFilteredData(alllevelRewardList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  // const handleSearch = (e) => {
  //   const query = e.target.value.toLowerCase().trim();
  //   setSearch(query);
  //   const filtered = levelRewardList.filter((item) =>
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
              <Card.Title>Level Reward</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User Address</th>
                    <th>Amount</th>
                    <th>Admin Fee</th>
                    <th>Approve</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {levelRewardList.length > 0 ? (
                    levelRewardList.map((levelreward, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 20 + index + 1}</td>
                        <td>
                          {levelreward?.user?.slice(0, 5)}...
                          {levelreward?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(levelreward?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>
                          {(Number(levelreward?.amount) / 1e18)?.toFixed(2)}
                        </td>

                        <td>{levelreward?.LicenceType}</td>
                        <td>{levelreward?.transactionHash}</td>
                        <td>
                          {moment(levelreward?.createdAt).format(
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

export default LevelReward;
