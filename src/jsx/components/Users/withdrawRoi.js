import React, { Fragment, useEffect, useState,useMemo } from "react";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { Row, Col, Card, Table } from "react-bootstrap";
import { withdrawRoi } from "../../../services/api_function";
import { Link } from "react-router-dom";
import { DownloadExcel } from "react-excel-export";

export const WithdrawRoi=()=>{
    const [apiData, setApiData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [search, setSearch] = useState("");
    const pageSize = 30;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await withdrawRoi(currentPage, pageSize);
          setApiData(result.Data );
          const total = result.totalUsers;
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
  
    const handleEditClick = (phoneNumber) => {
      console.log("Edit Clicked for phoneNumber:", phoneNumber);
    };
  //   const handleGoToPage = () => {
  //     const pageNumber = parseInt(inputPage);
  //     if (pageNumber >= 1 && pageNumber <= totalPages) {
  //       setCurrentPage(pageNumber);
  //       setInputPage("");
  //     } else {
  //       console.error("Invalid page number");
  //     }
  //   };
  const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    };
      
  return(
    <Fragment>
    <Row>
        <Col lg={12}>
          <Card>
          <Card.Header style={{ background: "black", border: '1px solid white' }}>
                            <Card.Title style={{ color: "white",margin:"auto" }}>Withdraw ROI</Card.Title>
                            <DownloadExcel
                data={(apiData)}
                buttonLabel="Export Data"
                fileName="withdrwaRoi"
                //   className="export-button 0.5px solid white"
                style={{ border: '0.5px solid white', background: " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)" }}
              />
                        </Card.Header>
                  
                        <Card.Body style={{ background: "black", border: '1px solid white' }} >
                            <Table responsive style={{ background: 'black', color: 'white', borderBottom: '1px solid white' }}>
             <thead>

             </thead>
             <thead>
             </thead>
              <thead>
                  <tr>
                    {/* <th className="width50"></th> */}
                    <th>
                      <strong>NO.</strong>
                    </th>
                    
                    {/* <th>
                      <strong> UserID</strong>
                    </th> */}
                    <th>
                      <strong>User</strong>
                    </th>
                    <th>
                      <strong>PlanId</strong>
                    </th>
                    <th>
                      <strong>ROI</strong>
                    </th>
                    <th>
                      <strong>Transaction Id</strong>
                    </th>
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                    {/* <th>  <strong>Team</strong></th> */}
                  </tr>
                </thead>
                <tbody>
                  {apiData?.map((Data, index) => (
                    <tr>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      {/* <td>{user.userId}</td> */}
                      <td> <span className="smaller-font">{Data.user}</span></td>
                      <td>{Data.planId}</td>
                      <td>{Data.roi/1e18}</td>
                      {/* <td>{Data.txHash.slice(0, 10)}...{Data.txHash.slice(-5)}</td> */}
                      <td>
                        <a
                          href={`https://wyzthscan.org/tx/${Data.txHash}`}
                          className="text-white"
                          target="_blank"
                        >
                           {Data.txHash.slice(0, 10)}... {Data.txHash.slice(-5)}
                        </a>
                       
                      </td>
                      <td>{formatTimestamp(Data.createdAt)}</td>
                      <td>
                        {/* <div className="d-flex align-items-center table-action-icon">
                          <Link
                            to={`/team-list?user=${encodeURIComponent(
                              user.user
                            )}`}
                            className="btn btn-primary light shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div> */}
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
          <div className="filter-pagination  mt-3 bg-black"  >
                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",color:"black"}}
                  >
                    {"<<"}
                  </button>

                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",color:"black"}}
                  >
                    Previous
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",color:"black"}}
                  >
                    Next
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",color:"black"}}
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
  )
}

export default WithdrawRoi