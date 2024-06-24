import React, { Fragment, useEffect, useState, useMemo } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { allUser, url, withdrawRoi } from "../../../services/api_function";
import { Link, Navigate } from "react-router-dom";

export const Withdraw = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const pageSize = 100;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const table = "withdraw-history"
        const result = await allUser(
          table,
          currentPage,
          { searchQuery: search },
          token
        );
        setApiData(result?.data);
        setFilteredData(result?.data);
        setTotalPages(result?.totalPages);
        if (!result?.data[0]) {
          setRecordStatus("No Record");
        }
        if (result.status == 404) {
          Navigate("/login");
          localStorage.removeItem("userDetails");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, search]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleEditClick = (phoneNumber) => {
    console.log("Edit Clicked for phoneNumber:", phoneNumber);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

 



  return (
    <Fragment>
      <Row>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              onChange={handleSearch}
            />
          </div>
          <label class="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Withdraw History
              </Card.Title>
              {/* <button type="button" class="btn btn-success">Approve</button> */}
            </Card.Header>

            <Card.Body
              style={{ background: "black", border: "1px solid white" }}
            >
              <Table
                responsive
                style={{
                  background: "black",
                  color: "white",
                  borderBottom: "1px solid white",
                }}
              >
                <thead>
                  <tr>
                    <th>
                      <strong>No</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Symbol</strong>
                    </th>
                    <th>
                      <strong>Amount</strong>
                    </th>
                    <th>
                      <strong>Reciever</strong>
                    </th>
                    <th>
                      <strong>Hash</strong>
                    </th>
                    <th>
                      <strong>Status</strong>
                    </th>
                    <th>
                      <strong>Date & Time</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!apiData[0] ? (
                    <tr>
                      <td className="text-light text-center" colSpan="7">
                        {recordStatus && recordStatus}
                      </td>
                    </tr>
                  ) : (
                    apiData?.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data?.name}</td>
                        <td>{data?.symbol}</td>
                        <td>{data?.amount}</td>
                        <td>
                          {!data?.reciever?("Self"):(data?.reciever.slice(0, 5) +
                            "...." +
                            data?.reciever.slice(-5))}
                        </td>
                        <td>
                          {data?.hash.slice(0, 5) + "...." + data?.hash.slice(-5)}
                        </td>
                        <td style={{color:(data?.success)?"green":"red"}}>{(data?.success)?"Success":"Failed"}</td>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between">
                <span>
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
                </span>
              </div>
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className="filter-pagination  mt-3 bg-black">
                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{
                      background:
                        " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                      color: "black",
                    }}
                  >
                    Previous
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{
                      background:
                        " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                      color: "black",
                    }}
                  >
                    Next
                  </button>

                  <span className="text-white">
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

export default Withdraw;
