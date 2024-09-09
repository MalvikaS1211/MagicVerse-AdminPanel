import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Row, Col, Card, Table } from "react-bootstrap";
import { SingleUserActivity, allUser } from "../../../../services/api_function";
import { Link } from "react-router-dom";
import { COLUMNS } from "../../table/FilteringTable/Columns";
import { Dropdown } from "react-bootstrap";

export const Activity = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [activity,setActivity]=useState("Deposit")
  const pageSize = 100;

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const table = "activity";
        // const collection  = activity
        const res = await SingleUserActivity(
          id,
          activity,
          currentPage,
        );
        console.log(res.data,"activity")
        setApiData(res?.data);
        setFilteredData(res?.data);
        setTotalPages(res?.totalPages);
        if (!res?.data[0]?.date[0]) {
          setRecordStatus("No Record");
        }
        if (res.status == 404) {
          navigate("/login");
          localStorage.removeItem("userDetails");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, activity]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
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

  const handleDay=()=>{

  }
  const tableRef = useRef(null);
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
              
            >
              <Card.Title>
                User Activity
              </Card.Title>
              <Dropdown className="me-3">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  
                >
                  {activity}
                </Dropdown.Toggle>

                <Dropdown.Menu
                 
                >
                  <Dropdown.Item onClick={() => setActivity("Deposit")}>
                    Deposit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setActivity("Claim")}>
                    Claim
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setActivity("Currency")}>
                    Currency
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setActivity("Login")}>
                    Login
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setActivity("Stake")}>
                    Stake
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setActivity("Swap")}>
                    Swap
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setActivity("Wallet")}>
                    Wallet
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setActivity("Withdraw")}>
                    Withdraw
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Link className="btn btn-dark btn-sm" to="/allusers">
                Back
              </Link>
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
                      <strong>Activity</strong>
                    </th>
                    <th>
                      <strong>Date & Time</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { !apiData[0]?(
                    <tr><td colSpan="3" className="text-center">{recordStatus}</td></tr>
                  ) : (apiData?.map((data,index)=>{
                    return(
                      <tr>
                        <td>{index+1}</td>
                        <td>{activity}</td>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                      </tr>
                    )
                  }))}
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

export default Activity;
