import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { getActiveUserslast24Hours } from "../../../services/api_function";

export const ActiveUserslast24Hours = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [NFTList, setNFTList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [totalUsers, setTotalUsers] = useState(0);
  const itemPerpage = 20;

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const ShowNFTList = async () => {
    const res = await getActiveUserslast24Hours(currentPage, itemPerpage);
    
    setTotalPages(res?.pagination?.totalPages);
    setTotalUsers(res?.pagination?.totalCount);
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
              <Card.Title>Active Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <div className="d-flex">
                  <h4 style={{ marginRight: "10px" }}>Total Users : </h4>
                  <h4 style={{ fontWeight: 300 }}>{totalUsers}</h4>
                </div>
              </Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>

                    <th>Buyer</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {NFTList?.length > 0 ? (
                    NFTList?.map((NFT, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>

                        <td>{NFT?._id}</td>

                        <td>{NFT?.count}</td>
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

export default ActiveUserslast24Hours;
