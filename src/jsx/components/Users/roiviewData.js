import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function RoiviewData() {
  const location = useLocation();
  // Extract the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); // Get the 'id' parameter

  const [roiWithdrawData, setRoiWithdrawData] = useState({});
  const [reload, setReload] = useState(false);
  const [adminTxHash, setAdminTxHash] = useState("");

  console.log(id, "id");

  const token = localStorage.getItem("adminToken");
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${URLApi}/getDataByid`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let roiWithdraw = response.data.data;
      console.log(roiWithdraw, "res");
      setRoiWithdrawData(roiWithdraw);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id, reload]);

  const handleReject = async ({ id, user, licenseType, claimType }) => {
    try {
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

  const handleApprove = async ({ id, user, licenceType, txHash }) => {
    try {
      if (!roiWithdrawData) {
        toast.error("Error");
        return;
      }

      if (!txHash.startsWith("0x")) {
        toast.error("Invalid transaction hash");
        return;
      }
      if (!txHash || txHash === "") {
        toast.error("enter txHash!");
        return;
      }
      console.log(
        id,
        user,
        licenceType,
        txHash,
        "id, user, licenseType, txHash"
      );
      const response = await axios.post(
        `${URLApi}/approveWithdrawal`,
        {
          id,
          user,
          licenceType,
          txHash,
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
    <>
      <Fragment>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>ROI Withdraw Data</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="card">
                  <div className="card-body">
                    <div className="g-2">
                      <div className="d-flex g-2 justify-content-between mb-3">
                        <div>User</div>
                        <div>{roiWithdrawData?.user}</div>
                      </div>
                      <div className="d-flex g-2 justify-content-between mb-3">
                        <div>Total Amount</div>
                        <div>{roiWithdrawData?.totalAmount}</div>
                      </div>
                      <div className="d-flex g-2 justify-content-between mb-3">
                        <div>Withdraw Amount</div>
                        <div>{roiWithdrawData?.claimedAmount}</div>
                      </div>
                      <div className="d-flex g-2 justify-content-between mb-3">
                        <div>Fee</div>
                        <div>
                          {roiWithdrawData?.totalAmount -
                            roiWithdrawData?.claimedAmount}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>Status</div>
                        <div>{roiWithdrawData?.status}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="fw-bold h4">
                    WithDraw Amount: {roiWithdrawData?.claimedAmount}
                  </div>
                  {roiWithdrawData?.status === "pending" && (
                    <div>
                      <label className="form-lable">Txn Hash</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Tx Hash"
                        onChange={(e) => setAdminTxHash(e.target.value)}
                      ></input>
                      <button
                        className="next-button btn btn-success pointer border m-2"
                        onClick={() =>
                          handleApprove({
                            id: roiWithdrawData?._id,
                            user: roiWithdrawData?.user,
                            licenceType: roiWithdrawData?.licenceType,
                            txHash: adminTxHash,
                          })
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="next-button btn btn-danger pointer border m-2"
                        onClick={() =>
                          handleReject({
                            id: roiWithdrawData?._id,
                            user: roiWithdrawData?.user,
                            licenseType: roiWithdrawData?.licenceType,
                            claimType: roiWithdrawData?.claimType,
                          })
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {roiWithdrawData?.status === "success" && (
                    <div>Txn Confirm</div>
                  )}
                  {roiWithdrawData?.status === "rejected" && (
                    <div>Txn Reject</div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Fragment>
    </>
  );
}
