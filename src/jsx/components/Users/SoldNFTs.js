import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Tooltip, IconButton, Pagination } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { getAllSoldNFTs } from "../../../services/api_function";

export const SoldNFTs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [NFTList, setNFTList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");

  const itemPerpage = 20;

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const ShowNFTList = async () => {
    const res = await getAllSoldNFTs(currentPage, itemPerpage);

    setTotalPages(res?.pagination?.totalPages);
    setNFTList(res?.data);
  };

  useEffect(() => {
    ShowNFTList();
  }, [currentPage]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <Fragment>
      <Row>
        {/* <div className="display_end">
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search by user..."
              autoComplete="off"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div> */}

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Last Transaction Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Token Id</th>
                    <th>Buyer</th>
                    <th>Seller</th>
                    <th>New Price</th>

                    <th>Tx Hash</th>

                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {NFTList?.length > 0 ? (
                    NFTList?.map((NFT, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>

                        <td>{NFT?.tokenId}</td>

                        <td>
                          {NFT?.buyer?.slice(0, 5)}...
                          {NFT?.buyer?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(NFT?.buyer)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>
                          {NFT?.seller?.slice(0, 5)}...
                          {NFT?.seller?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(NFT?.buyer)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{(NFT?.newPrice / 1e18).toFixed(4)}</td>
                        <td>
                          <a
                            href={`https://bscscan.com/tx/${NFT?.transactionHash}`}
                            target="_blank"
                          >
                            {NFT?.transactionHash.slice(0, 5)}...
                            {NFT?.transactionHash.slice(-4)}
                          </a>
                        </td>
                        <td>
                          {moment(NFT?.createdAt).format(
                            "DD/MM/YYYY h:mm:ss A"
                          )}
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

              <div className="filter-pagination mt-3 d-flex justify-content-center">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#0c0c0cff",
                      border: "1px solid #cbcbcb",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#047dff !important",
                      color: "#fff !important",
                      fontWeight: "600",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: "#c9a14a22",
                    },
                  }}
                  shape="rounded"
                  siblingCount={1}
                  boundaryCount={1}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SoldNFTs;
