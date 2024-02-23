import React, {Fragment, useState, useEffect, useMemo, useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {  TeamData as fetchTeamData } from "../../../services/api_function";

const TeamDetails = (props) => {
  const location = useLocation();
  const phoneNumberFromUrl = new URLSearchParams(location.search).get('user');
  const [user, setUser] = useState(phoneNumberFromUrl);
  const [userData, setUserData] = useState(null);
  const [apiTimestamp, setApiTimestamp] = useState(null);
  const isInitialRender = useRef(true);
  const memoizedUser = useMemo(() => user, [user]);
  useEffect(() => {
    if (!isInitialRender.current && memoizedUser) {
      fetchTeamData(memoizedUser) 
        .then((response) => {
          // console.log(response.data);
          setUserData(response.data);
          setApiTimestamp(response.timestamp);
          // console.log(response.timestamp)
        })
        .catch((error) => {
          console.error('Error fetching team data:', error);
        });
    } else {
      isInitialRender.current = false;
    }
  }, [memoizedUser]);
  const navigate = useNavigate();
    return (
        <Fragment>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header style={{background:"black", border: '1px solid white'}}>
                <i class="fas fa-circle-left "style={{fontSize:"2rem",}} onClick={() => navigate(-1)}></i>
                  <Card.Title style={{color:"white",margin:"auto"}}>Team</Card.Title>
                </Card.Header>
                <Card.Body  style={{background:"black", border: '1px solid white'}} >
                  <Table responsive style={{ background: 'black', color: 'white' , borderBottom: '1px solid white' }}>

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
                        {/* <th>
                          <strong>referrerId</strong>
                        </th> */}
                        {/* <th>
                          <strong>Leval</strong>
                        </th> */}
                        <th>
                          <strong>Team Business</strong>
                        </th>
                        <th>
                          <strong>Date&Time</strong>
                        </th>
                        {/* <th>  <strong>Team</strong></th> */}
                      </tr>
                    </thead>
                    <tbody>
                    {userData?.map((user, index) => (
                    <tr>
                      <td>{ index + 1}</td>
                      <td>{user.userId}</td>
                      <td>  <span className="smaller-font">{user.user}</span></td>
                      {/* <td>{user.referrerId}</td> */}
                      {/* <td>{user.rank}</td> */}
                      <td>{(user.teamBusiness>0?(user.teamBusiness/1e18).toFixed(2):0)}</td>
                      <td>{new Date(user.timestamp * 1000).toLocaleString()}</td>
                      <td>
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