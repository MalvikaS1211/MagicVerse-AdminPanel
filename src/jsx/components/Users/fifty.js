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
        const response = await FiftyList(
          currentPage,
          { searchQuery: search },
          token
        );
        const { data, totalCount } = response;
        setApiData(data);
        setFilteredData(data);
        const pages = Math.ceil(totalCount[0].totalCount / pageSize);
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
        <div className="display_end">
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
             
            >
              <Card.Title>
             50-50
              </Card.Title>
            </Card.Header>

            <Card.Body
            
            >
              <Table
                responsive
               
              >
                <thead>
                  <tr>
                    <th>
                      <strong>NO</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>User</strong>
                    </th>

                    <th>
                      <strong> WYZ</strong>
                    </th>
                    <th>
                      <strong> stUSDT</strong>
                    </th>
                    <th>
                      <strong> sUSDT</strong>
                    </th>
                    <th>
                      <strong> Total</strong>
                    </th>
                    <th>
                      <strong>Token</strong>
                    </th>
                    <th>
                      <strong>Ratio</strong>
                    </th>
                    <th>
                      <strong>Transaction Id</strong>
                    </th>
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map((data, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td>{data.Name}</td>
                        <td>{data.user}</td>

                        <td>
                          {data.ratio == "10"
                            ? ((data.amount * 0.1) / 20).toFixed(2)
                            : data.ratio == "20"
                            ? ((data.amount * 0.2) / 20).toFixed(2)
                            : data.ratio == "30"
                            ? ((data.amount * 0.3) / 20).toFixed(2)
                            : data.ratio == "40"
                            ? ((data.amount * 0.4) / 20).toFixed(2)
                            : data.ratio == "50"
                            ? ((data.amount * 0.5) / 20).toFixed(2)
                            : data.ratio == "15" && data.token == "sUSDT-stUSDT"
                            ? ((data.amount * 0.15) / 20).toFixed(2)
                            : data.ratio == "20" && data.token == "sUSDT-stUSDT"
                            ? ((data.amount * 0.2) / 20).toFixed(2)
                            : data.ratio == "25" && data.token == "sUSDT-stUSDT"
                            ? ((data.amount * 0.25) / 20).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>
                          {" "}
                          {data.ratio == "10"
                            ? (data.amount * 0.9).toFixed(2)
                            : data.ratio == "20"
                            ? (data.amount * 0.8).toFixed(2)
                            : data.ratio == "30"
                            ? (data.amount * 0.7).toFixed(2)
                            : data.ratio == "40"
                            ? (data.amount * 0.6).toFixed(2)
                            : data.ratio == "50"
                            ? (data.amount * 0.5).toFixed(2)
                            : data.ratio == "15" && data.token == "sUSDT-stUSDT"
                            ? (data.amount * 0.85).toFixed(2)
                            : data.ratio == "20" && data.token == "sUSDT-stUSDT"
                            ? (data.amount * 0.8).toFixed(2)
                            : data.ratio == "25" && data.token == "sUSDT-stUSDT"
                            ? (data.amount * 0.75).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>
                          {data.ratio == "15" && data.token == "sUSDT-stUSDT"
                            ? (data.amount * 0.15).toFixed(2)
                            : data.ratio == "20" && data.token == "sUSDT-stUSDT"
                            ? (data.amount * 0.2).toFixed(2)
                            : data.ratio == "25" && data.token == "sUSDT-stUSDT"
                            ? (data.amount * 0.25).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>{Number(data.amount).toFixed(2)}</td>
                        <td>{data.token}</td>
                        <td>{data.ratio}</td>
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
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className="filter-pagination  mt-3">
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
