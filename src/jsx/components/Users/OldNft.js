import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import {
  AddNFTInQueue,
  burnNft,
  dueNft,
  getUserPackages,
  oldNftList,
} from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getOperator } from "./web3/transfert";
import { useAccount } from "wagmi";
import moment from "moment";
export const OldNft = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [limit] = useState(1);
  const { address } = useAccount();
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [packageHistory, setPackageHistory] = useState([]);
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

  const OldNftList = async (searchValue) => {
    try {
      const res = await oldNftList(currentPage, itemPerpage, searchValue);

      setCurrentPage(res.page); // current page from API
      setTotalPages(res.totalPages); // ✅ correct total pages
      setPackageHistory(res.data);
      setTotalValue(res.totalValue);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };
  const handleRelease = async (tokenId) => {
    try {
      const response = await AddNFTInQueue(tokenId);
      if (response.success == true) {
        toast.success("NFT released !");
        OldNftList();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      const msg = error?.response?.data?.message;
      toast.error(msg);
    }
  };
  useEffect(() => {
    OldNftList();
  }, [currentPage]);

  return (
    <Fragment>
      <Row>
        <div className="display_end " style={{ display: "flex", gap: "3px" }}>
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
              OldNftList(searchValue);
            }}
          >
            Serach
          </button>
          <label className="form-label" htmlFor="form1"></label>
        </div>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>
                Old NFT : {(Number(totalvalue) / 1e18).toFixed(2)} USDT
              </Card.Title>
              <Card.Title>Total Count : {totalcount} NFT</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Token Id</th>
                    <th>Owner</th>
                    <th>Value</th>
                    <th>Release</th>
                  </tr>
                </thead>
                <tbody>
                  {packageHistory?.length > 0 ? (
                    packageHistory?.map((pkg, index) => (
                      <tr key={pkg._id}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>

                        {/* Token ID */}
                        <td>{pkg?.tokenId}</td>
                        <td>{pkg?.owner}</td>
                        <td>{(pkg?.latestPrice / 1e18).toFixed(2)}</td>
                        <td>
                          <button
                            type="button"
                            className="next-button btn btn-success pointer border "
                            onClick={() => handleRelease(pkg?.tokenId)}
                          >
                            Release
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

export default OldNft;
