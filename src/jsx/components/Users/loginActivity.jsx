import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { Row, Col, Card, Table } from "react-bootstrap";
import { LogoutuserByAdmin, allUser, getAllLoginUser } from "../../../services/api_function";
import { COLUMNS } from "../table/FilteringTable/Columns";
import { IoLogOut } from "react-icons/io5";
import toast from "react-hot-toast";


export const LoginActivity = () => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const result = await getAllLoginUser(
          currentPage,
          { searchQuery: search },
          token
        );

        setApiData(result?.data?.data);
        setFilteredData(result?.data?.data);
        setTotalPages(result?.data?.totalPages);
        if (!result?.data?.data[0]) {
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

  const LogoutUser=async(userid,sessionid,login)=>{
    const userDetails = localStorage.getItem("userDetails");
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token;
    const res = await LogoutuserByAdmin(userid,sessionid,login,token)
    if(res?.status===200){
      toast.success("User logout Successfully")
      const updatearr = apiData.map(it=>it.userId == userid?{...it,login:false}:it)
      setApiData(updatearr);
    }
  }


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
                Swap
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
                      <strong>IP</strong>
                    </th>
                    <th>
                      <strong>Browser Name</strong>
                    </th>
                    <th>
                      <strong>Os</strong>
                    </th>
                    <th>
                      <strong>Status</strong>
                    </th>
                    <th>
                      <strong>Action</strong>
                    </th>
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
                    apiData.map((data, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <th>{data?.name}</th>
                        <th>{(data?.agentinfo?.ip).split(":").pop()}</th>
                        <th>{data?.agentinfo?.browser?.name}</th>
                        <th>{data?.agentinfo?.os?.name}</th>
                        <th style={{color:data?.login?"green":"red"}}>{data?.login?"Login":"Logout"}</th>
                        <th style={{color:data?.login?"red":""}}>{data?.login?<button className="btn btn-danger btn-sm" onClick={()=>LogoutUser(data?.userId,data?.sessionId,data?.login)}><IoLogOut /> Logout</button>:""}</th>
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
                <div className="filter-pagination  mt-3 bg-black">
                  {/* <button
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
                  </button> */}

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

                  {/* <button
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
                  </button> */}

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

export default LoginActivity;
