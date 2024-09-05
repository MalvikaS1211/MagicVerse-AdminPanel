import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Topteams } from "../../../services/api_function";

const TopTeams = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const result = await Topteams(token);
        setUserData(result.data);

      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
              
            >
              <Card.Title >
                Top 10 Team{" "}
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
                      <strong> UserID</strong>
                    </th>
                    <th>
                      <strong>User</strong>
                    </th>
                    <th>
                      <strong>referrerId</strong>
                    </th>
                    <th>
                      <strong>Stake Amount</strong>
                    </th>
                    <th>
                      <strong>Team Business</strong>
                    </th>
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.map((user, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{user?.name}</td>
                      <td>{user?.userId}</td>
                      <td>{user?.user}</td>
                      <td>{user?.referrerId}</td>
                      <td>{Number(user?.topup_amount).toFixed(2)}</td>
                      <td>{Number(user?.teamBussines ).toFixed(2)}</td>
                      {/* <td>{user.referrerId}</td>
                      <td>{user.level}</td> */}
                      {/* <td>{(user.teamBusiness>0?(user.teamBusiness/1e18).toFixed(2):0)}</td> */}
                      {/* <td>
                        <a
                          href={`https://wyzthscan.org/tx/${user.txHash}`}
                          className="text-white"
                          target="_blank"
                        >
                          {user.txHash.slice(0, 5)}... {user.txHash.slice(-5)}
                        </a>
                      </td> */}
                      {/* <td>{(user.teamBusiness>0?(user.teamBusiness/1e18).toFixed(2):0)}</td> */}
                      <td>
                        {formatTimestamp(user.createdAt )}
                      </td>
                      <td></td>
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
};

export default TopTeams;
