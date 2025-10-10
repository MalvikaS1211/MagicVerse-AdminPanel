import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import {
  getStakingList,
  approveRejectStaking,
} from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useAccount } from "wagmi";
import moment from "moment";
export const ApproveStaking = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [limit] = useState(1);
  const { address } = useAccount();
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [stakingList, setStakingList] = useState([]);
  const [totalvalue, setTotalValue] = useState(0);
  const [totalcount, setTotalCount] = useState(0);
  const itemPerpage = 10;
  const [searchValue, setSearchValue] = useState("");
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const ApproveStakingList = async () => {
    try {
      setLoading(true);

      const res = await getStakingList(
        currentPage,
        itemPerpage,
        "pending",
        searchValue
      );

      console.log(res, walletAddress, "List");

      const { pagination } = res;

      setCurrentPage(pagination?.currentPage || 1);
      setTotalPages(pagination?.totalPages || 1);
      setStakingList(res.data || []);
      setTotalValue(pagination?.totalDocs || 0);
      setTotalCount(pagination?.totalDocs || 0);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleApproveReject = async (Id, action) => {
    try {
      // find the staking item by its id
      const stakingItem = stakingList.find((item) => item._id === Id);

      if (!stakingItem) {
        toast.error("Staking item not found");
        return;
      }

      const response = await approveRejectStaking(stakingItem.user, Id, action);

      if (response.success) {
        toast.success(`${action === "approved" ? "Approved" : "Rejected"}!`);
        // ApproveStakingList();
      } else {
        toast.error(response?.message || "Action failed");
      }

      setTimeout(() => {
        ApproveStakingList();
      }, 3000);
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  useEffect(() => {
    ApproveStakingList();
  }, [currentPage, searchValue]);

  return (
    <Fragment>
      <Row>
        <div className="display_end " style={{ display: "flex", gap: "3px" }}>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here by User Address..."
              autoComplete="off"
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                // ShowDueNFT(value); // fetch data with search tokenId
              }}
            />
          </div>
          {/* <button
            type="button"
            className="btn btn-success p-2 pointer border "
            onClick={() => {
              ApproveStakingList(searchValue);
            }}
          >
            Serach
          </button> */}
          <label className="form-label" htmlFor="form1"></label>
        </div>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Approve Staking</Card.Title>
              {/* <Card.Title>Total Count : {totalcount} NFT</Card.Title> */}
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User Address</th>
                    <th>Amount</th>
                    {/* <th>Value</th>
                    <th>Sales Count</th> */}
                    <th>Date & Time</th>

                    <th>Approve</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        <div className="d-flex justify-content-center align-items-center py-4">
                          <div
                            className="spinner-border text-success"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : stakingList?.length > 0 ? (
                    stakingList?.map((stake, index) => (
                      <tr key={stake._id}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>{stake?.user}</td>
                        <td>{stake?.stakingAmount.toFixed(4)}</td>
                        <td>
                          {moment(stake.createdAt).format("M/D/YYYY h:mm:ss A")}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="next-button btn btn-success pointer border"
                            onClick={() =>
                              handleApproveReject(stake._id, "approved")
                            }
                          >
                            Approve
                          </button>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="next-button btn btn-danger pointer border"
                            onClick={() =>
                              handleApproveReject(stake._id, "rejected")
                            }
                          >
                            Reject
                          </button>
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
                    className="next-button btn btn-success pointer border m-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    className="next-button btn btn-success pointer border m-2 "
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages} // ✅ fixed
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

export default ApproveStaking;
