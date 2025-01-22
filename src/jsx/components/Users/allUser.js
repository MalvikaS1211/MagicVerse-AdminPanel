import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import { cutAfterDecimal, URLApi } from "../../../services/api_function";

export const Alluser = () => {
  const [usersList, setUsersList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemPerPage = 20;

  const [tooltipText, setTooltipText] = useState("Copy address");
  const [searchValue, setSearchValue] = useState("");

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  // Fetch user list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${URLApi}/getUserList`,
          {
            page: currentPage,
            limit: itemPerPage,
            search: searchValue,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response, "response --------");
        setUsersList(response.data.data);

        setTotalPages(response.data.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, searchValue]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    setCurrentPage(1);
  };
  console.log(searchValue, "search----------Value");

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
      <Row className="mb-4"></Row>
      <Row>
        <div className="display_end">
          <div className="input-group " style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              autoComplete="off"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
          <label className="form-label" htmlFor="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>Referral</th>
                    <th>Deposit Wallet</th>
                    <th>Tx Hash</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList?.length > 0 ? (
                    usersList?.map((user, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                        <td>
                          {user?.user?.slice(0, 5)}...
                          {user?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(user?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>
                          {user?.referrer?.slice(0, 5)}...
                          {user?.referrer?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(user?.referrer)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{cutAfterDecimal(user?.depositWallet, 2)}</td>
                        <td>{user?.txHash}</td>
                        <td>
                          {moment(user.createdAt).format("M/D/YYYY h:mm:ss A")}
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

export default Alluser;
