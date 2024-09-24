import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { Row, Col, Card, Table } from "react-bootstrap";
import { allUser } from "../../../services/api_function";
import { COLUMNS } from "../table/FilteringTable/Columns";

export const Currency = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [config, setConfig] = useState([]);
  const pageSize = 100;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const table = "currency";
        const result = await allUser(
          table,
          currentPage,
          { searchQuery: search },
          token
        );
        // console.log(result.totalPages);
        setApiData(result?.data);
        setFilteredData(result?.data);
        setConfig(result?.config);
        // const total = result.totalCount;
        // const pages = Math.ceil(total / pageSize);
        setTotalPages(result.totalPages);
        if (!result.data[0]) {
          setRecordStatus("No Record");
        }
        if (result.status == 404) {
          navigate("/login");
          localStorage.removeItem("userDetails");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => apiData, [apiData]);

  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };
  const exportToExcel = (data, fileName) => {
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Data");

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };
  const tableRef = useRef(null);
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
            <Card.Header>
              <Card.Title>Currency</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>INR</th>
                    <th>INRX</th>
                    <th>USDT</th>
                    <th>USDC</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {!apiData[0] ? (
                    <tr>
                      <td className="text-light text-center" colSpan="7">
                        {recordStatus}
                      </td>
                    </tr>
                  ) : (
                    apiData?.map((data, index) => {
                      const total = data?.currency?.reduce((pre, it) => {
                        const fn = config?.find(
                          (t) =>
                            t.symbol.toLowerCase() === it.symbol.toLowerCase()
                        );
                        const price = fn ? fn.price : 1;
                        const tt = pre + it.available * price;
                        return tt;
                      }, 0);
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.name}</td>
                          <td>
                            {data.currency
                              ?.find((it) => it.symbol?.toLowerCase() === "inr")
                              ?.available?.toFixed(2)}
                            <img
                              src={`${
                                data.currency?.find(
                                  (it) => it.symbol?.toLowerCase() === "inr"
                                )?.icon
                              }`}
                              height="20"
                              widtd="20"
                              className="ms-2"
                            />
                          </td>
                          <td>
                            {data.currency
                              ?.find(
                                (it) => it.symbol?.toLowerCase() === "inrx"
                              )
                              ?.available?.toFixed(2)}
                            <img
                              src={`${
                                data.currency?.find(
                                  (it) => it.symbol?.toLowerCase() === "inrx"
                                )?.icon
                              }`}
                              height="20"
                              widtd="20"
                              className="ms-2"
                            />
                          </td>
                          <td>
                            {data.currency
                              ?.find(
                                (it) => it.symbol?.toLowerCase() === "usdt"
                              )
                              ?.available?.toFixed(2)}
                            <img
                              src={`${
                                data.currency?.find(
                                  (it) => it.symbol?.toLowerCase() === "usdt"
                                )?.icon
                              }`}
                              height="20"
                              widtd="20"
                              className="ms-2"
                            />
                          </td>
                          <td>
                            {data.currency
                              ?.find(
                                (it) => it.symbol?.toLowerCase() === "usdc"
                              )
                              ?.available?.toFixed(2)}
                            <img
                              src={`${
                                data.currency?.find(
                                  (it) => it.symbol?.toLowerCase() === "usdc"
                                )?.icon
                              }`}
                              height="20"
                              widtd="20"
                              className="ms-2"
                            />
                          </td>
                          <td>{total?.toFixed(2)} (INR)</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between">
                <span>
                  {/* Page{" "} */}
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
                </span>
              </div>
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className="filter-pagination  mt-3 ">               

                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <button
                    className="next-button"
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

export default Currency;
