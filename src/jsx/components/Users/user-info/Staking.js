import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { Row, Col, Card, Table } from "react-bootstrap";
import { SingleUserDetail, allUser } from "../../../../services/api_function";
import { Link } from "react-router-dom";
import { COLUMNS } from "../../../components/table/FilteringTable/Columns";
import { IoChevronBack } from "react-icons/io5";

export const Staking = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const pageSize = 100;

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const table = "stake";
        const result = await SingleUserDetail(table, id, currentPage);
        setApiData(result?.data);
        setFilteredData(result?.data);
        setTotalPages(result?.totalPages);
        if (!result.data[0]) {
          setRecordStatus("No Record");
        }
        if (result.status == 404) {
          navigate("/login");
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

  //   const formatTimestamp = (timestamp) => {
  //     const date = new Date(timestamp);
  //     const day = String(date.getDate()).padStart(2, "0");
  //     const month = String(date.getMonth() + 1).padStart(2, "0");
  //     const year = date.getFullYear();
  //     const hours = String(date.getHours()).padStart(2, "0");
  //     const minutes = String(date.getMinutes()).padStart(2, "0");
  //     return `${day}-${month}-${year} ${hours}:${minutes}`;
  //   };
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
  //   const exportToExcel = (data, fileName) => {
  //     const wb = XLSX.utils.book_new();

  //     const ws = XLSX.utils.json_to_sheet(data);

  //     XLSX.utils.book_append_sheet(wb, ws, "Data");

  //     XLSX.writeFile(wb, `${fileName}.xlsx`);
  //   };
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
              <Card.Title>Stake Details</Card.Title>
              <Link className="custom_btn text-black" to="/allusers">
              <IoChevronBack /> Back
              </Link>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>Count</th>
                    <th>Token Amt</th>
                    <th>Stake Amt</th>
                    <th>Claim Amt</th>
                    <th>Total Amt</th>
                    <th>Available Amt</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Stake Price</th>
                    <th>Status</th>
                    {/* <th>
                      <strong>Date & Time</strong>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {!apiData[0] ? (
                    <tr>
                      <td colSpan="12" className="text-center">
                        {recordStatus}
                      </td>
                    </tr>
                  ) : (
                    apiData.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.count}</td>
                        <td>{data?.tokenAmount.toFixed(2)} (USDT)</td>
                        <td>{data?.stakeAmount.toFixed(2)}</td>
                        <td>{data?.claimAmount.toFixed(2)}</td>
                        <td>{data?.totalAmount.toFixed(2)}</td>
                        <td>{data?.availableAmount.toFixed(2)}</td>
                        <td>
                          {new Date(
                            data.startTimestamp * 1000
                          ).toLocaleString()}
                        </td>
                        <td>
                          {new Date(data.endTimestamp * 1000).toLocaleString()}
                        </td>
                        <td>{data.stakePrice}</td>
                        <td
                          style={{
                            color: data?.isStakeCompleted ? "green" : "red",
                          }}
                        >
                          {data.isStakeCompleted ? "Success" : "Failed"}
                        </td>
                        {/* <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                      </tr>
                    ))
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

export default Staking;
