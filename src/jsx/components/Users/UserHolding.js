import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import {
  AddNFTInQueue,
  getUserHolders,
  RemoveNFt,
} from "../../../services/api_function";
import toast from "react-hot-toast";

export const UserHolding = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [UserHoldingList, setUserHoldingList] = useState([]);

  const [tooltipText, setTooltipText] = useState("Copy Token Id");
  const [user, setUser] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const itemPerpage = 10;

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    setTooltipText("Token Id Copied!");
    setTimeout(() => setTooltipText("Copy Token Id"), 2000);
  };

  const ShowUserHoldingList = async () => {
    try {
      const res = await getUserHolders(user, currentPage, itemPerpage);
      console.log(res.data, "getUserHolders");
      setTotalPages(res?.summary?.totalPages);
      setUserHoldingList(res?.data);
      setTotalAmount(res?.summary?.totalAmount);
    } catch (error) {
      console.log("Error in ShowUserHoldingList", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  useEffect(() => {
    if (user) {
      ShowUserHoldingList();
    }
  }, [currentPage]);

  const handleAddNFT = async (tokenId) => {
    try {
      const response = await AddNFTInQueue(tokenId);
      if (response.success == true) {
        toast.success("NFT added !");
      } else {
        toast.error(response?.message);
      }

      setTimeout(() => {
        ShowUserHoldingList();
      }, 3000);
    } catch (error) {
      const msg = error?.response?.data?.message;
      toast.error(msg);
    }
  };

  const handleRemoveNFT = async (tokenId) => {
    try {
      const response = await RemoveNFt(tokenId);
      if (response.success == true) {
        toast.success("NFT removed !");
      } else {
        toast.error(response?.message);
      }

      setTimeout(() => {
        ShowUserHoldingList();
      }, 3000);
    } catch (error) {
      const msg = error?.response?.data?.message;
      toast.error(msg);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>User Holding</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2 "
                    style={{ padding: "23px" }}
                    placeholder="User Address"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={ShowUserHoldingList}
                  >
                    Search
                  </button>
                </Col>
              </Row>

              <Row>
                <div className="d-flex">
                  <h4 style={{ marginRight: "10px" }}>Total Amount : </h4>
                  <h4 style={{ fontWeight: 300 }}>
                    {(totalAmount / 1e18).toFixed(4)} USDT
                  </h4>
                </div>
              </Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>

                    <th>Buyer</th>
                    <th>New Price</th>
                    <th>Sales Count</th>
                    <th>Token Id</th>
                    <th>In queue</th>

                    <th>Add</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {UserHoldingList?.length > 0 ? (
                    UserHoldingList.map((holder, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>

                        <td>
                          {holder?.buyer.slice(0, 5)}...
                          {holder?.buyer.slice(-4)}
                        </td>
                        <td>{(holder?.newPrice / 1e18).toFixed(4)} USDT</td>
                        <td>{holder?.salesCount}</td>
                        <td>
                          {holder?.tokenId}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(holder?.tokenId)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{holder?.inQueue ? "True" : "False"}</td>

                        <td>
                          <button
                            type="button"
                            className="next-button btn btn-success pointer border "
                            onClick={() => handleAddNFT(holder?.tokenId)}
                          >
                            Add
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="next-button btn btn-success pointer border "
                            onClick={() => handleRemoveNFT(holder?.tokenId)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
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
                <div className="filter-pagination mt-3">
                  <button
                    className="next-button btn btn-success pointer border m-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
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

export default UserHolding;
