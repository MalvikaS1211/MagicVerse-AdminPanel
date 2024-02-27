import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { DownloadExcel } from "react-excel-export";
import { useLocation } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DepositeHistory } from "../../../services/api_function";

const Deposit = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const pageSize = 30;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DepositeHistory(currentPage, pageSize);
        setApiData(result.data);
        console.log(result)
        //  setFilteredData(result.data);
        const total = result.totalCount;
        const pages = Math.ceil(total / pageSize);
        setTotalPages(pages > 0 ? pages : 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

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
        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Deposit Hisory
              </Card.Title>
              <DownloadExcel
                data={apiData}
                buttonLabel="Export Data"
                fileName="deposite"
             //   className="export-button 0.5px solid white"
                style={{ border: '0.5px solid white', background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)" }}
              />
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
                      <strong>NO</strong>
                    </th>
                    <th>
                      <strong>User</strong>
                    </th>
                    <th>
                      <strong>WYS Amount</strong>
                    </th>
                    <th>
                      <strong>Other Amount</strong>
                    </th>
                    <th>
                      <strong>Total Amount</strong>
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
                  {apiData.map((data, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{data.user}</td>
                      {/* <td>{data.wysAmount / 1e18}</td> */}
                      <td>
                        {data.wysAmount > 0
                          ? (data.wysAmount / 1e18).toFixed(2)
                          : 0}{" "}
                      </td>
                      <td>
                        {data.otherAmt > 0
                          ? (data.otherAmt / 1e18).toFixed(2)
                          : 0}
                      </td>
                      <td>
                        {data.ttlAmt > 0 ? (data.ttlAmt / 1e18).toFixed(2) : 0}
                      </td>
                      <td>
                        <a
                          href={`https://wyzthscan.org/tx/${data.txHash}`}
                          className="text-white"
                          target="_blank"
                        >
                          {data.txHash.slice(0, 5)}... {data.txHash.slice(-5)}
                        </a>
                      </td>
                      {/* <td>{data.txHash.slice(0, 9)}...{data.txHash.slice(-5)}</td> */}

                      <td>
                        {new Date(data.timestamp * 1000).toLocaleString(
                          "en-US",
                          { hour12: false }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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

export default Deposit;
