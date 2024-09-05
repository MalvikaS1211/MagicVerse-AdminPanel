import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table } from "react-bootstrap";
import { getReferralAmount, SingleUserDetail } from "../../../../services/api_function";
import { Link } from "react-router-dom";
import { COLUMNS } from "../../../components/table/FilteringTable/Columns";
import { useLocation } from 'react-router-dom';
export const ReferralIncome = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
//   const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const pageSize = 100;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const table="referral-income"
        const result = await getReferralAmount(
         table,
          id,
          currentPage,
        );

        setApiData(result?.data);
        setFilteredData(result?.data);
        setTotalPages(result?.totalPages);
        if (!result.data[0]) {
          setRecordStatus("No Referral Income");
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

  const tableRef = useRef(null);
  return (
    <Fragment>
      <Row>


        <Col lg={12}>
          <Card>
            <Card.Header
              
            >
              <Card.Title>
                 Referral Income
              </Card.Title>
                <Link className="btn btn-dark btn-sm" to="/allusers">Back</Link>
            </Card.Header>
            <Card.Body
              
            >
              <Table
                responsive
               
              >
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>
                      <strong>NO.</strong>
                    </th>
                    <th>
                      <strong>Sender name</strong>
                    </th>
                    <th>
                      <strong>Amount</strong>
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
                            <td>{data?.senderName}</td>
                            {/* <td>{data?.symbol}</td> */}
                            <td>{data?.amount} (USDT)</td>
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

export default ReferralIncome;
