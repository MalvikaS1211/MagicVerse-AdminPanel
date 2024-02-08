import React, {Fragment, useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TeamData } from "../../../services/api_function";

const TeamDetails=(props)=>{
    const location = useLocation();
    const phoneNumberFromUrl = new URLSearchParams(location.search).get(
      "user"
    );
    const [user, setUser] = useState(phoneNumberFromUrl);
    const [userData, setUserData] = useState(null);
  
    const isInitialRender = useRef(true);
    const memoizeduser = useMemo(() => user, [user]);
  
    useEffect(() => {
        console.log("bdhsdeb",memoizeduser)
      if (!isInitialRender.current && memoizeduser) {
        TeamData(memoizeduser)
          .then((response) => {
            console.log(response)
            setUserData(response);
          })
          .catch((error) => {
            // NotificationManager.error("Something Went Wrong");
          });
      } else {
        isInitialRender.current = false;
      }
    }, [memoizeduser]);
    return (
        <Fragment>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Team</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        {/* <th className="width50"></th> */}
                        <th>
                          <strong>NO.</strong>
                        </th>
                        <th>
                          <strong> UserID</strong>
                        </th>
                        <th>
                          <strong>User</strong>
                        </th>
                        <th>
                          <strong>referrerId</strong>
                        </th>
                        <th>
                          <strong>Leval</strong>
                        </th>
                        <th>
                          <strong>Team Business</strong>
                        </th>
                        <th>
                          <strong>Date</strong>
                        </th>
                        <th>  <strong>Team</strong></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {apiData?.map((user, index) => (
                        <tr>
                          <td>{(currentPage - 1) * pageSize + index + 1}</td>
                          <td>{user.userId}</td>
                          <td>   <span className="smaller-font">{user.user}</span></td>
                          <td>{user.referrerId}</td>
                          <td>{user.rank}</td>
                          <td>{user.teamBusiness}</td>
                          <td>{formatTimestamp(user.createdAt)}</td> */}
                          {/* <Link
                              href="#"
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </Link> */}
                       
                       
                          {/* <td> */}
                            {/* <div className="d-flex align-items-center table-action-icon">
                              <Link
                                to={`/user-profile?phoneNumber=${encodeURIComponent(
                                  user.userId
                                )}`}
                                className="btn btn-primary light shadow btn-xs sharp me-1"
                              >
                                <i className="fas fa-pencil-alt"></i>
                              </Link>
                            </div> */}
                          {/* </td> */}
                        {/* </tr> */}
                      {/* ))} */}
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
                  {/* <div
                    className="text-center mb-3 col-lg-6"
                    style={{ margin: "auto" }}
                  >
                    <div className="filter-pagination  mt-3">
                      <button
                        className="previous-button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        {"<<"}
                      </button>
    
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
    
                      <button
                        className="next-button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        {">>"}
                      </button>
    
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                  </div> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Fragment>
      );


}
export default TeamDetails