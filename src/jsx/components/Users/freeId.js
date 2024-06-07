import React, { Fragment, useEffect, useState, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { FreeIdlist, Topup_data } from "../../../services/api_function";
import moment from "moment";
const FreeIddata = () => {
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
        const result = await Topup_data(
          currentPage,
          { searchQuery: search },
          token
        );
        setApiData(result);
        setFilteredData(result.data);
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
        {/* <div
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
        </div> */}
        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
               TopUp List
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
                    <th>
                      <strong>Name</strong>
                    </th>
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
                      <strong>Amount</strong>
                    </th>
                  
                    {/* <th>
                      <strong>Plan</strong>
                    </th> */}
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
                  {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.map((data, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.user}</td>
                        <td>{(data.amount).toFixed(2)}</td>
                        {/* <td>
                          {data.planId == 1 && "WYS"}
                          {data.planId == 2 && "ARB"}
                          {data.planId == 3 && "BNB"}
                          {data.planId == 4 && "WYZ(50:50)"}
                          {data.planId == 5 && "WYZ(70:30)"}
                          {data.planId == 6 && "USDT"}
                        </td> */}
                        {/* <td className="text-center">{data.duration}</td> */}
                        <td>
                          <a
                            href={`https://wyzthscan.org/tx/${data.txHash}`}
                            className="text-white"
                            target="_blank"
                          >
                            {data.txHash.slice(0, 5)}... {data.txHash.slice(-5)}
                          </a>
                        </td>
                        <td>{formatTimestamp(data.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No data found</td>
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

export default FreeIddata;
