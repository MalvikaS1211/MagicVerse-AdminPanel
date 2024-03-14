import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Withdrawdata } from "../../../services/api_function";

const Withdrawal = (props) => {
  const location = useLocation();
  const data = new URLSearchParams(location.search).get("user");
  const [user, setUser] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  const [apiTimestamp, setApiTimestamp] = useState(null);
  const isInitialRender = useRef(true);
  const memoizedUser = useMemo(() => user, [user]);
  const pageSize = 30;
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token
      Withdrawdata(memoizedUser,currentPage,token)
        .then((response) => {
          setUserData(response.data);
          const total = response.totalCount;
          const pages = Math.ceil(total / pageSize);
          setTotalPages(pages > 0 ? pages : 1);
        })
        .catch((error) => {
          console.error("Error fetching team data:", error);
        });
  }, [memoizedUser]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const navigate = useNavigate();

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <i class="fas fa-circle-left "style={{fontSize:"2rem",}} onClick={() => navigate(-1)}></i>
              <Card.Title style={{ color: "white",margin:"auto"}}>Withdraw</Card.Title>
            </Card.Header>
            <Card.Body
              style={{ background: "black", border: "1px solid white" }}
            >
              <Table
                responsive
                style={{
                  background: "black",
                  color: "white",
                  borderBottom: "1px solid white",
                }}
              >
                <thead>
                  <tr>
                    <th>
                      <strong>No</strong>
                    </th>
                    <th>
                      <strong>User</strong>
                    </th>
                    <th>
                      <strong>ROI</strong>
                    </th>
                    <th>
                      <strong>Amount</strong>
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
                  {userData.map((data, index) => {
                    // console.log("Data:123654", data); // Log each data object
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.user}</td>
                        <td>
                          {data.roi > 0 ? (data.roi / 1e18).toFixed(2) : 0}
                        </td>
                        <td>
                          {data.amount > 0
                            ? (data.amount / 1e18).toFixed(2)
                            : 0}
                        </td>
                        {/* <td>{data.txHash.slice(0, 9)}...{data.txHash.slice(-5)}</td> */}
                        <td>
                          <a
                            href={`https://wyzthscan.org/tx/${data.txHash}`}
                            className="text-white"
                            target="_blank"
                          >
                            {data.txHash.slice(0, 9)}... {data.txHash.slice(-5)}
                          </a>
                        </td>
                        <td>
                          {new Date(data.timestamp * 1000).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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

export default Withdrawal;
