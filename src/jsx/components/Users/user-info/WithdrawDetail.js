import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";

import { Row, Col, Card, Table } from "react-bootstrap";
import { SingleUserDetail } from "../../../../services/api_function";
import { Link } from "react-router-dom";
import { COLUMNS } from "../../../components/table/FilteringTable/Columns";

export const WithdrawDetail = () => {
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
  const id = searchParams.get('id');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const table="withdraw"
        const result = await SingleUserDetail(
          table,
          id,
          currentPage,
        );
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
               Withdraw Details
              </Card.Title>
                <Link className="btn btn-dark btn-sm" to="/allusers">Back</Link>
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
                      <strong>Amount</strong>
                    </th>
                    <th>
                      <strong>Reciever</strong>
                    </th>
                    <th>
                      <strong>Hash</strong>
                    </th>
                    <th>
                      <strong>Type</strong>
                    </th>
                    <th>
                      <strong>Status</strong>
                    </th>
                    <th>
                      <strong>Date & Time</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {!apiData[0] ? (<tr><td colSpan="6" className="text-center">{recordStatus}</td></tr>) :(apiData.map((data,index)=>(
                        <tr>
                            <td>{index+1}</td>
                            <td>{data?.amount.toFixed(2) } ({data?.symbol})</td>
                            <td>{(data.reciever)?data.reciever.slice(0,6)+"...."+data?.reciever.slice(-6):"Self"}</td>
                            <td>{(data.reciever.length>25)?data?.hash.slice(0,5)+"........"+data?.hash.slice(-15):data?.hash}</td>
                            <td>{data?.type}</td>
                            <td style={{color:data?.success?"green":"red"}}>{(data?.success)?"Success":"Failed" }</td>
                            <td>{new Date(data?.createdAt).toLocaleString()}</td>
                        </tr>)
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

export default WithdrawDetail;
