import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { getROIList, roiApproveOrReject } from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useAccount } from "wagmi";
import moment from "moment";
import { payROI } from "./web3/transfert";
export const GiveRoi = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [limit] = useState(1);
  const { address } = useAccount();
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [roiList, setRoiList] = useState([]);
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

  const RoiList = async () => {
    try {
      setLoading(true);
      const res = await getROIList(
        currentPage,
        itemPerpage,
        "pending",
        walletAddress
      );
      console.log("ROI List response:", res);

      setRoiList(res.data || []);
      setCurrentPage(res.pagination?.currentPage || 1);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotalCount(res.pagination?.totalDocs || 0);
    } catch (error) {
      console.error("Error fetching ROI list:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleApproveRejectRoi = async (Id, action) => {
    try {
      const roiItem = roiList.find((item) => item._id === Id);

      if (!roiItem) {
        toast.error("ROI item not found");
        return;
      }

      const response = await roiApproveOrReject(
        roiItem.user,
        Id,
        action, // pass "approve" or "reject"
        roiItem.txHash
      );

      if (response.success) {
        toast.success(`${action === "approve" ? "Approved" : "Rejected"}!`);
      } else {
        toast.error(response?.message || "Action failed");
      }
      setTimeout(() => {
        RoiList();
      }, 3000);
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  useEffect(() => {
    RoiList();
  }, [currentPage]);

  const payRoi = async () => {
    try {
      const res = payROI(roiList.user, roiList.amount);
      console.log(res, "payRoi");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Row>
        {/* <div className="display_end " style={{ display: "flex", gap: "3px" }}>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here by buyer..."
              autoComplete="off"
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                // ShowDueNFT(value); // fetch data with search tokenId
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-success p-2 pointer border "
            onClick={() => {
              RoiList(searchValue);
            }}
          >
            Serach
          </button>
          <label className="form-label" htmlFor="form1"></label>
        </div> */}
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>ROI List</Card.Title>
              {/* <Card.Title>Total Count : {totalcount} NFT</Card.Title> */}
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th></th>
                    <th>S.No.</th>
                    <th>User Address</th>
                    <th>Amount</th>
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
                  ) : roiList?.length > 0 ? (
                    roiList?.map((roi, index) => (
                      <tr key={roi._id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={roi?.isSelected || false}
                            onChange={(e) => {
                              const updated = roiList.map((item) =>
                                item._id === roi._id
                                  ? { ...item, isSelected: e.target.checked }
                                  : item
                              );
                              setRoiList(updated);
                            }}
                          />
                        </td>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>{roi?.user}</td>
                        <td>{roi?.amount.toFixed(4)}</td>
                        <td>
                          <button
                            type="button"
                            className="next-button btn btn-success pointer border"
                            onClick={() =>
                              handleApproveRejectRoi(roi._id, "approved")
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
                              handleApproveRejectRoi(roi._id, "rejected")
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

export default GiveRoi;
