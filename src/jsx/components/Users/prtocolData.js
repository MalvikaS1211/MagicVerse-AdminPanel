import { Fragment, useEffect, useState } from "react";

import { Row, Col, Card, Table } from "react-bootstrap";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import { Protocal_data } from "../../../services/api_function";

const ProtocalData = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const ratio = new URLSearchParams(location.search).get("ratio");
  const [apidata, setApidata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 100;
  useEffect(() => {
    const fetchData = async () => {
      if (token && ratio) {
        try {
          const data = await Protocal_data(currentPage, ratio, token);
          setApidata(data.protocol);
          const pages = Math.ceil(data.totalUser / pageSize);
          setTotalPages(pages > 0 ? pages : 1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [currentPage]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          {/* <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              onChange={handleSearch}
            />
          </div> */}
          <label class="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
                 <i
                class="fas fa-circle-left "
                style={{ fontSize: "2rem" }}
                onClick={() => navigate(-1)}
              ></i>
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Protocol User
              </Card.Title>
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
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Phone</strong>
                    </th>
                    <th>
                      <strong> UserID</strong>
                    </th>
                    <th>
                      {/* <thead>
                        <input
                          type="text"
                          class="form-control"
                          // style={{ width: "70%" }}
                          placeholder="Search here..."
                          onChange={handleSearch}
                        />
                      </thead> */}
                      <strong>User wallet</strong>
                    </th>
                    <th>
                      <strong>Amount</strong>
                    </th>
                    <th>
                      <strong>referrerId</strong>
                    </th>
                    <th>
                      <strong>Transaction ID</strong>
                    </th>
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apidata.map((user, index) => (
                    <tr>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.userId}</td>
                      <td>
                        {" "}
                        <span className="smaller-font">
                          {user?.user?.slice(0, 4) +
                            "..." +
                            user?.user.slice(-12)}
                        </span>
                      </td>
                      <td>{user?.amount.toFixed(2)}</td>
                      <td>{user.referrerId}</td>

                      <td>
                        <a
                          href={`https://testnet.wyzthscan.org/tx/${user.txHash}`}
                          className="text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.txHash
                            ? `${user.txHash.slice(0, 5)}...${user.txHash.slice(
                                -5
                              )}`
                            : ""}
                        </a>
                      </td>
                      <td>{formatTimestamp(user.createdAt)}</td>
                      {/* <td>
                        <div className="d-flex align-items-center table-action-icon">
                          <Link
                            to={`/commission-data?user=${encodeURIComponent(
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
                            to={`/team-list?user=${encodeURIComponent(
                              user.user
                            )}`}
                            className="btn btn-primary light shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between">
                <span>
                  <strong></strong>
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

export default ProtocalData;
