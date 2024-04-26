import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
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

export const AllUser = () => {
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
        const result = await allUser(
          currentPage,
          { searchQuery: search },
          token
        );
        setApiData(result.usersData);
        setFilteredData(result.usersData);
        const total = result.totalUsers;
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
                      <strong>Phone</strong>
                    </th>
                    <th>
                      <thead></thead>
                      <strong> UserID</strong>
                    </th>
                    <th>
                      {/* <thead>
                        <input
                          type="text"
                          class="form-control"
                          // style={{ width: "70%" }}
                          placeholder="Search here..."
                          onChange={handleSearch}
                        />
                      </thead> */}
                      <strong>User wallet</strong>
                    </th>
                    <th>
                      <strong>referrerId</strong>
                    </th>
                    {/* <th>
                      <strong>Level</strong>
                    </th> */}
                    <th>
                      <strong>WYS Farm</strong>
                    </th>
                    <th>
                      <strong>Team Business</strong>
                    </th>

                    <th>
                      <strong>Transaction ID</strong>
                    </th>
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                    <th>
                      {" "}
                      <strong>Team</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((user, index) => (
                    <tr>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.userId}</td>
                      <td>
                        {" "}
                        <span className="smaller-font">
                          {user?.user?.slice(0, 4) +
                            "..." +
                            user?.user.slice(-12)}
                        </span>
                      </td>
                      <td>{user.referrerId}</td>
                      {/* <td>{user.rank}</td> */}
                      <td>{(user.wysStaked / 1e18).toFixed(2)}</td>
                      <td>
                        {(user.teamBusiness20level || 0) == 0
                          ? (user.teamBusiness / 1e18).toFixed(2)
                          : (user.teamBusiness20level / 1e18).toFixed(2)}
                      </td>

                      <td>
                        <a
                          href={`https://wyzthscan.org/tx/${user.txHash}`}
                          className="text-white"
                          target="_blank"
                        >
                          {user.txHash.slice(0, 5)}... {user.txHash.slice(-5)}
                        </a>
                      </td>
                      <td>{formatTimestamp(user.createdAt)}</td>
                      <td>
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
                      </td>
                    </tr>
                  ))}
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

export default AllUser;
