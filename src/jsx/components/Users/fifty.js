import React,{ Fragment, useEffect, useState,useMemo } from "react";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { Row, Col, Card, Table } from "react-bootstrap";


const Fifty=()=>{



    return (
<Fragment>
      <Row>
        <Col lg={12}>
          <Card>
          <Card.Header style={{background:"black", border: '1px solid white'}}>
                  <Card.Title style={{color:"white",margin:"auto"}}>50 50 List</Card.Title>
                </Card.Header>
                <Card.Body  style={{background:"black", border: '1px solid white'}} >
                  <Table responsive style={{ background: 'black', color: 'white' , borderBottom: '1px solid white' }}>
              <thead>
                
                  <tr>
                    
                    <th>
                      <strong>NO.</strong>
                      
                    </th>
                    {/* <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Phone</strong>
                    </th> */}
                    <th>
                      <thead>
                      <input
                          type="text"
                          class="form-control"
                          style={{ width: "70%" }}
                          placeholder="Search here..."
                        //  onChange={handleSearch}
                        />
                      </thead>
                      <strong> UserID</strong>
                    </th>
                    <th>
                      <thead>
                      <input
                          type="text"
                          class="form-control"
                          // style={{ width: "70%" }}
                          placeholder="Search here..."
                         // onChange={handleSearch}
                        />
                      </thead>
                      <strong>User</strong>
                    </th>
                    <th>
                      <strong>referrerId</strong>
                    </th>
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                    <th>  <strong>Deposit</strong></th>
                    <th>  <strong>Withdraw</strong></th>
                  </tr>
                </thead>
                {/* <tbody>
                {filteredData.map((user, index) => (
                    <tr>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{user.userId}</td>
                      <td>   <span className="smaller-font">{user.user}</span></td>
                      <td>{user.referrerId}</td>
                      <td>{formatTimestamp(user.createdAt)}</td>
                      <td>
                        <div className="d-flex align-items-center table-action-icon">
                          <Link
                            to={`/deposit?user=${encodeURIComponent(
                              user.user
                            )}`}
                            className="btn btn-primary light shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center table-action-icon">
                          <Link
                            to={`/withdrawal?user=${encodeURIComponent(
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
                </tbody> */}
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
              {/* {filteredRowCount > 0 && (
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
                  )} */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
    )
}


export default Fifty