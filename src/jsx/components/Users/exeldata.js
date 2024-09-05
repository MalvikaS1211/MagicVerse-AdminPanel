import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
import { Exel_Data } from "../../../services/api_function";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import * as XLSX from "xlsx";

import { Row, Col, Card, Table } from "react-bootstrap";

import { Link } from "react-router-dom";
import { COLUMNS } from "../../components/table/FilteringTable/Columns";
import MOCK_DATA from "../../components/table/FilteringTable/MOCK_DATA_2.json";

export const ExelFormet = () => {
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
        const result = await Exel_Data(currentPage, { searchQuery: search });

        setFilteredData(result.Data);
          // console.log(result.totalUsers)
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

        <Col lg={16}>
          <Card>
            <Card.Header
              
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                All Users
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
                      <strong>NO.</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Phone</strong>
                    </th>
                    <th>
                      <strong> UserID</strong>
                    </th>
                    <th>
                      <strong>User wallet</strong>
                    </th>
                    <th>
                      <strong>Referrer Id</strong>
                    </th>

                    <th>
                      <strong>(Free, 50-50)</strong>
                    </th>
                    <th>
                      <strong>(Free, 50-50)Amount</strong>
                    </th>

                    <th>
                      <strong>Reward Withdraw</strong>
                    </th>
                    <th>
                      <strong>ROI Withdraw</strong>
                    </th>
                    <th>
                      <strong>Total Withdraw</strong>
                    </th>
                    <th>
                      <strong>Available Withdraw</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((user, index) => (
                    <tr >
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.userId}</td>
                      <td>
                        <span>
                          {user?.user?.slice(0, 4) +
                            "..." +
                            user?.user.slice(-12)}
                        </span>
                      </td>
                      <td>{user.referrerId}</td>
                      <td className="text-center">
                        {user.freeid_status
                          ? "Free ID"
                          : user.freeid_status === false
                          ? "50-50"
                          : ""}
                      </td>

                      <td className="text-center">
                        {user.adminstake_ttl
                          ? (user.adminstake_ttl / 1e18).toFixed(2)
                          : ""}
                      </td>
                      <td className="text-center">{(user.withdrawalReward / 1e18).toFixed(2)}</td>
                      <td className="text-center">{(user.claimedRoi / 1e18).toFixed(2)}</td>
                      <td className="text-center">
                        {(
                          (user.withdrawalReward + user.claimedRoi) /
                          1e18
                        ).toFixed(2)}
                      </td>
                      <td className="text-center">{(user.availabelReward / 1e18).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between">
                <span>
                  <strong></strong>
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

                  <span className=" text-white">
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

export default ExelFormet;
