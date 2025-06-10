import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { getAllNFTs, getDepostList } from "../../../services/api_function";

export const NewNFTsList = () => {
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
    const res = await getAllNFTs(currentPage, itemPerpage);
    console.log(res, "getDepostList");
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
              <Card.Title>New NFT List</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Creator</th>
                    <th>Price</th>

                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {NFTList?.length > 0 ? (
                    NFTList?.map((NFT, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>
                          {NFT?.creator?.slice(0, 5)}...
                          {NFT?.creator?.slice(-4)}
                          {/* <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(NFT?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip> */}
                        </td>
                        <td>$ {NFT?.price / 1e18}</td>

                        <td>
                          {moment(NFT.createdAt).format("DD/MM/YYYY h:mm:ss A")}
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

export default NewNFTsList;
