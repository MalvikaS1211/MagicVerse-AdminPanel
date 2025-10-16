import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { getMaturedNFTs } from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useAccount } from "wagmi";
import moment from "moment";
export const NFTAction = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);

  const { address } = useAccount();
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [MaturedNFT, setMaturedNFT] = useState([]);

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

  const ShowMaturedNFTs = async () => {
    const res = await getMaturedNFTs();
    console.log(res, "getMaturedNFTs");
    setMaturedNFT(res.data);
  };

  useEffect(() => {
    ShowMaturedNFTs();
  }, [address]);

  return (
    <Fragment>
      <Row>
        {/* <div className="display_end">
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              onChange={handleSearch}
            />
          </div>
          <label className="form-label" for="form1"></label>
        </div> */}

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Matured NFTs</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Token Id</th>
                    <th>Buyer </th>
                    <th>Seller </th>

                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {MaturedNFT?.length > 0 ? (
                    MaturedNFT?.map((nft, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>{nft?.tokenId}</td>
                        <td>{nft?.buyer}</td>
                        <td>{nft?.seller}</td>

                        <td>
                          {moment(nft?.createdAt).format("M/D/YYYY h:mm:ss A")}
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

export default NFTAction;
