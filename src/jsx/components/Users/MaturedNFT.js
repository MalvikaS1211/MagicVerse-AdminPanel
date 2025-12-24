import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Papa from "papaparse";
import { getMaturedNFTs } from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useAccount } from "wagmi";
import moment from "moment";
import { getNfts } from "./web3/transfert";
export const MaturedNFT = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const itemPerpage = 20;
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

  const ShowNFTList = async () => {
    const res = await getMaturedNFTs(address, currentPage, itemPerpage);
    console.log(res, "getDepostList");
    setTotalPages(res?.totalPages);

    const NFTListRes = res?.userMaturedNfts || [];
    const fetchedNFTs = await Promise.all(
      NFTListRes.map(async (nft) => {
        try {
          const res = await getNfts(nft.tokenId);
          console.log(res, "getNfts");

          return {
            ...nft,
            title: res[0] || "",
            description: res[1] || "",
            price: (Number(res[4]) / 1e18).toFixed(4) || 0,
            owner: res[6],
            metadataURI: res[2],
            creator: res[3],
            soldDetail: nft?.soldDetail || null,
            currentPrice:
              nft?.soldDetail?.newPrice || nft?.currentPrice || res[4] || 0,
            salesCount: res[5] ? Number(res[5]) : 0,
          };
        } catch (err) {
          console.error(
            `Error fetching metadata for Token ID ${nft.tokenId}:`,
            err.message
          );

          return {
            ...nft,
            title: "",
            description: "Error loading",
          };
        }
      })
    );

    setMaturedNFT(fetchedNFTs);
  };

  useEffect(() => {
    ShowNFTList();
  }, [address, currentPage]);

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
                    <th>Price </th>
                    <th>Sales Count</th>

                    {/* <th>Date & Time</th> */}
                  </tr>
                </thead>
                <tbody>
                  {MaturedNFT?.length > 0 ? (
                    MaturedNFT?.map((nft, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>{nft?.tokenId}</td>
                        <td>{nft?.owner}</td>
                        <td>{nft?.price}</td>
                        <td>{nft?.salesCount}</td>

                        {/* <td>
                          {moment(nft?.createdAt).format("M/D/YYYY h:mm:ss A")}
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

export default MaturedNFT;
