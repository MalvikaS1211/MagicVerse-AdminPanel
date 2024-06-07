import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import * as XLSX from "xlsx";

import { Row, Col, Card, Table } from "react-bootstrap";
import { allUser } from "../../../services/api_function";
import { Link } from "react-router-dom";
import { COLUMNS } from "../../components/table/FilteringTable/Columns";
import MOCK_DATA from "../../components/table/FilteringTable/MOCK_DATA_2.json";

export const StakingUser = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const pageSize = 100;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const result = await allUser(
          currentPage,
          { searchQuery: search },
          token
        );
        setApiData(result.data);
        setFilteredData(result.data);
        const total = result.totalUsers;
        const pages = Math.ceil(total / pageSize);
        setTotalPages(pages > 0 ? pages : 1);
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

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter, pageIndex } = state;

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
                All Users
              </Card.Title>
            </Card.Header>
            <Card.Body
              style={{
                background: "black",
                border: "1px solid white",
                borderRadius: "3px",
              }}
            >
              <Table
                responsive
                style={{
                  background: "black",
                  color: "white",
                  borderBottom: "0.5px solid white",
                }}
              >
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>
                      <strong>NO.</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong> UserID</strong>
                    </th>
                    <th>
                      <strong>User wallet</strong>
                    </th>
                    <th>
                      <strong>Ratio</strong>
                    </th>
                    <th>
                      <strong>Stake</strong>
                    </th>
                    <th>
                      <strong>Topup</strong>
                    </th>
                    <th>
                      <strong>Team Business</strong>
                    </th>
                   
                    <th>
                      <strong>Date&Time</strong>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((user, index) => (
                    <tr>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{user.name}</td>
                
                      <td>{user.userId}</td>
                      <td>
                        {" "}
                        <span className="smaller-font">
                          {user?.user?.slice(0, 4) +
                            "..." +
                            user?.user.slice(-12)}
                        </span>
                      </td>
                   

                      {/* <td className="text-center">
                        {user?.stake_amount.toFixed(2)}
                      </td> */}
                      {/* <td className="text-center">
                        {user?.additional_data?.token ?? "-"}
                      </td> */}
                      <td className="text-center">
                        {user?.additional_data?.ratio}
                      </td>
                      <td>
                        {(user?.stakeamount?.totalAmount ?? 0).toFixed(2)}
                      </td>
                      <td>
                        {(user?.topup2_data?.totalAmount ?? 0).toFixed(2)}
                      </td>
                      <td >
                        {Number(user?.staketeambusiness ?? 0).toFixed(2)}
                      </td>
                      <td>{formatTimestamp(user.createdAt)}</td>
                      {/* <td>
                        {user?.additional_data?.ratio == "10"
                          ? (
                              (user?.additional_data?.amount * 0.1) /
                              20
                            ).toFixed(2)
                          : user?.additional_data?.ratio == "20"
                          ? (
                              (user?.additional_data?.amount * 0.2) /
                              20
                            ).toFixed(2)
                          : user?.additional_data?.ratio == "30"
                          ? (
                              (user?.additional_data?.amount * 0.3) /
                              20
                            ).toFixed(2)
                          : user?.additional_data?.ratio == "40"
                          ? (
                              (user?.additional_data?.amount * 0.4) /
                              20
                            ).toFixed(2)
                          : user?.additional_data?.ratio == "50"
                          ? (
                              (user?.additional_data?.amount * 0.5) /
                              20
                            ).toFixed(2)
                          : user?.additional_data?.ratio == "15" &&
                            user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (
                              (user?.additional_data?.amount * 0.15) /
                              20
                            ).toFixed(2)
                          : user?.additional_data?.ratio == "20" &&
                            user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (
                              (user?.additional_data?.amount * 0.2) /
                              20
                            ).toFixed(2)
                          : user?.additional_data?.ratio == "25" &&
                            user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (
                              (user?.additional_data?.amount * 0.25) /
                              20
                            ).toFixed(2)
                          : "0.00"}
                      </td> */}
                      {/* <td>
                        {" "}
                        {user?.additional_data?.ratio == "10"
                          ? (user?.additional_data?.amount * 0.9).toFixed(2)
                          : user?.additional_data?.ratio == "20"
                          ? (user?.additional_data?.amount * 0.8).toFixed(2)
                          : user?.additional_data?.ratio == "30"
                          ? (user?.additional_data?.amount * 0.7).toFixed(2)
                          : user?.additional_data?.ratio == "40"
                          ? (user?.additional_data?.amount * 0.6).toFixed(2)
                          : user?.additional_data?.ratio == "50"
                          ? (user?.additional_data?.amount * 0.5).toFixed(2)
                          : user?.additional_data?.ratio == "15" &&
                            user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (user?.additional_data?.amount * 0.85).toFixed(2)
                          : user?.additional_data?.ratio == "20" &&
                            user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (user?.additional_data?.amount * 0.8).toFixed(2)
                          : user?.additional_data?.ratio == "25" &&
                            user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (user?.additional_data?.amount * 0.75).toFixed(2)
                          : "0.00"}
                      </td> */}
                      {/* <td>
                        {user?.additional_data?.ratio == "15" &&
                        user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (user?.additional_data?.amount * 0.15).toFixed(2)
                          : user?.additional_data?.ratio == "20" &&
                            user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (user?.additional_data?.amount * 0.2).toFixed(2)
                          : user?.additional_data?.ratio == "25" &&
                            user?.additional_data?.token == "sUSDT-stUSDT"
                          ? (user?.additional_data?.amount * 0.25).toFixed(2)
                          : "0.00"}
                      </td> */}
                      {/* <td>
                        {(user?.stakeamount?.totalAmount ?? 0).toFixed(2)}
                      </td> */}
                      {/* <td>
                        {(user?.topup2_data?.totalAmount ?? 0).toFixed(2)}
                      </td> */}
                      {/* <td className="text-center">
                        {Number(user?.staketeambusiness ?? 0).toFixed(2)}
                      </td> */}
                      {/* <td>
                        <a
                          href={`https://wyzthscan.org/tx/${user.txhash}`}
                          className="text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.txhash
                            ? `${user.txhash.slice(0, 5)}...${user.txhash.slice(
                                -5
                              )}`
                            : ""}
                        </a>
                      </td> */}
                      {/* <td>{formatTimestamp(user.createdAt)}</td> */}
                      {/* <td>
                        <div className="text-center ">
                          <Link
                            to={`/commission-data?user=${encodeURIComponent(
                              user.user
                            )}`}
                            className="btn btn-primary light shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td> */}
                      {/* <td>
                        <div className="d-flex align-items-center table-action-icon">
                          <Link
                            to={`/team-list?user=${encodeURIComponent(
                              user.user
                            )}`}
                            className="btn btn-primary light shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td> */}
                    </tr>
                  ))}
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

                  <span className="bg-black text-white">
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

export default StakingUser;
