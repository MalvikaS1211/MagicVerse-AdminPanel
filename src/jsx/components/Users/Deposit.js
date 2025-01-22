import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { URLApi } from "../../../services/api_function";

export const Deposit = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [depositList, setDepositList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");

  const itemPerpage = 20;

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        `${URLApi}/getUserDepositList`,
        {
          page: currentPage,
          limit: itemPerpage,
          search: search,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const allDepositList = response.data.data;
      setDepositList(allDepositList);

      setTotalPages(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

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
        <div className="display_end">
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
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Deposit</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Tx Hash</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {depositList?.length > 0 ? (
                    depositList?.map((deposit, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>
                          {deposit?.user?.slice(0, 5)}...
                          {deposit?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(deposit?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{deposit?.amount.toFixed(2)}</td>
                        <td>{deposit?.txHash}</td>
                        <td>
                          {moment(deposit.createdAt).format(
                            "M/D/YYYY h:mm:ss A"
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

              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className="filter-pagination mt-3">
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

export default Deposit;
