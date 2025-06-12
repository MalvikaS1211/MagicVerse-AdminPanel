import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Tooltip, IconButton, useForkRef } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import {
  AddNFTInQueue,
  DeleteNFt,
  getAllNFTInQueue,
} from "../../../services/api_function";
import toast from "react-hot-toast";

export const AddNFTToQueue = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [tokenId, setTokenId] = useState();
  const [tokenIdToDelete, setTokenIdToDelete] = useState();

  const [dataList, setDataList] = useState({});
  const itemPerpage = 20;

  const handleAddNFT = async () => {
    try {
      const response = await AddNFTInQueue(tokenId);
      if (response.sucess == true) {
        toast.success("NFT addes in queue !");
      } else {
        toast.error(response?.message);
      }
      setTokenId("");
      setTimeout(() => {
        handleDataShow();
      }, 3000);
    } catch (error) {
      const msg = error?.response?.data?.message;
      toast.error(msg);
    }
  };
  const handleDataShow = async () => {
    try {
      const res = await getAllNFTInQueue(currentPage, itemPerpage);
      console.log(currentPage, itemPerpage, "pages:");
      setTotalPages(res?.pagination?.totalPages);
      console.log(res, "show data");
      setDataList(res?.data);
    } catch (error) {
      console.log("Error in handleshowdata", error);
    }
  };

  const handleDeleteNFT = async () => {
    try {
      const response = await DeleteNFt(tokenIdToDelete);
      toast.success("NFT deleted !");
      setTimeout(() => {
        handleDataShow();
      }, 3000);
    } catch (error) {
      const msg = error?.response?.data?.message;
      toast.error(msg);
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
    handleDataShow();
  }, [currentPage]);

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Add NFT to queue</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <label>Add NFT</label>
                <Col className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2 "
                    style={{ padding: "23px" }}
                    placeholder="Enter Token Id"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddNFT}
                  >
                    Submit
                  </button>
                </Col>
              </Row>
              <Row className="mb-4">
                <label>Delete NFT</label>
                <Col className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2 "
                    style={{ padding: "23px" }}
                    placeholder="Enter Token Id"
                    value={tokenIdToDelete}
                    onChange={(e) => setTokenIdToDelete(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleDeleteNFT}
                  >
                    Submit
                  </button>
                </Col>
              </Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>NFT</th>
                    <th>Status </th>
                    <th>Sales Count</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.length > 0 ? (
                    dataList.map((data, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>

                        <td>{data?.tokenId}</td>
                        <td>{data?.Status ? "true" : "false"}</td>
                        <td>{data?.soldDetail?.salesCount}</td>
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

export default AddNFTToQueue;
