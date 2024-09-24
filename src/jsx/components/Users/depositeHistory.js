import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Depositedata } from "../../../services/api_function";

const DepositHisory = (props) => {
  const location = useLocation();
  const data = new URLSearchParams(location.search).get("user");
  const [user, setUser] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  const [apiTimestamp, setApiTimestamp] = useState(null);
  const isInitialRender = useRef(true);
  const User = useMemo(() => user, [user]);
  const pageSize = 100;
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token
      Depositedata(User,currentPage,token)
        .then((response) => {
          setUserData(response.data);
          const total = response.totalUser;
          const pages = Math.ceil(total / pageSize);
          setTotalPages(pages > 0 ? pages : 1);
        })
        .catch((error) => {
          console.error("Error fetching team data:", error);
        });
  
  }, [User,currentPage]);

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

  const navigate = useNavigate();


  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
              
            >
              <i
                class="fas fa-circle-left "
                style={{ fontSize: "2rem" }}
                onClick={() => navigate(-1)}
              ></i>
              <Card.Title >Deposit</Card.Title>
            </Card.Header>
            <Card.Body
              
            >
              <Table
                responsive
              
              >
                <thead>
               
                  <tr>
                    <th>
                      <strong>NO</strong>
                    </th>
                    <th>
                      <strong>User</strong>
                    </th>
                    <th>
                      <strong> Amount</strong>
                    </th>
                    <th>
                      <strong>Token</strong>
                    </th>
                    <th>
                      <strong>Ratio</strong>
                    </th>
                    <th>
                      <strong>Transaction Id</strong>
                    </th>
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                
                  </tr>
                </thead>
                <tbody>
                  {userData.map((deposit, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{deposit.user}</td>

                      <td>
                         {deposit.amount}
                      </td>
                      <td>
                       {deposit.token}
                      </td>
                      <td>
                        {deposit.ratio}
                      </td>
                  
                      {/* <td>{deposit.user.txHash.slice(0, 9)}...{deposit.user.txHash.slice(-5)}</td> */}
                      <td>
                        <a
                          href={`https://testnet.wyzthscan.org/tx/${deposit.txHash}`}
                          className="text-white"
                          target="_blank"
                        >
                          {deposit.txHash.slice(0, 9)}...{" "}
                          {deposit.txHash.slice(-5)}
                        </a>
                      </td>
                      <td>
                        {formatTimestamp(deposit.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
  );
};

export default DepositHisory;
