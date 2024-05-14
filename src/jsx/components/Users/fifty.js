import React, { Fragment, useEffect, useState, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { FiftyList } from "../../../services/api_function";

const Fifty = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const pageSize = 100;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;

        const result = await FiftyList(
          currentPage,
          { searchQuery: search },
          token
        );
        setApiData(result);
        const total = result.totalCount;
        const pages = Math.ceil(total / pageSize);
        setTotalPages(pages > 0 ? pages : 1);
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
  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
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
                50 50 List
              </Card.Title>
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
                      <strong>NO.</strong>
                    </th>
                    {/* <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Phone</strong>
                    </th> */}
                    <th>
                      {/* <thead>
                      <input
                          type="text"
                          class="form-control"
                          style={{ width: "70%" }}
                          placeholder="Search here..."
                         onChange={handleSearch}
                        />
                      </thead> */}
                      <strong> User</strong>
                    </th>
                    <th>
                      {/* <thead>
                      <input
                          type="text"
                          class="form-control"
                          // style={{ width: "70%" }}
                          placeholder="Search here..."
                         // onChange={handleSearch}
                        />
                      </thead> */}
                      <strong>wysAmount</strong>
                    </th>
                    <th>
                      <strong>Total Amount</strong>
                    </th>
                    <th>
                      <strong>Plan</strong>
                    </th>
                   
                    <th>
                      {" "}
                      <strong>Duration</strong>
                    </th>
                    <th>
                      {" "}
                      <strong>Transaction ID</strong>
                    </th>
                    <th>
                      {" "}
                      <strong>Date&Time</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiData && apiData.data ? (
                    apiData.data.map((user, index) => {
                      // console.log("User data:", user);
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <span className="smaller-font">{user.user}</span>
                          </td>
                          <td>{(user.wysAmount / 1e18).toFixed(2)}</td>
                         
                          <td>{(user.ttlAmt / 1e18).toFixed(2)}</td>
                           <td>
                          {user.planId == 1 && "WYS"}
                          {user.planId == 2 && "ARB"}
                          {user.planId == 3 && "BNB"}
                          {user.planId == 4 && "WYZ(50:50)"}
                          {user.planId == 5  && "WYZ(70:30)"}
                          {user.planId == 6  && "USDT"}
                        </td>
                          <td>{user.duration}</td>
                          <td>
                            <a
                              href={`https://wyzthscan.org/tx/${user.txHash}`}
                              className="text-white"
                              target="_blank"
                            >
                              {user.txHash.slice(0, 5)}...{" "}
                              {user.txHash.slice(-5)}
                            </a>
                          </td>
                          <td>
                          <td>{formatTimestamp(user.createdAt)}</td>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between">
                <span>
                  {/* Page{" "} */}
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
                </span>
                {/* <span className="table-index">
                      Go to page :{" "}
                      <input
                        type="number"
                        className="ml-2"
                        min="1"
                        max={totalPages}
                        value={inputPage}
                        onChange={(e) => setInputPage(e.target.value)}
                        style={{ width: "50px" }}
                      />
                      <button
                        className="btn btn-primary ml-2"
                        onClick={handleGoToPage}
                      >
                        Go
                      </button>
                    </span> */}
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
                    {"<<"}
                  </button>

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
                    {">>"}
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

export default Fifty;
