import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Protocal } from "../../../services/api_function";
import { Link } from "react-router-dom";
const Protocol = () => {
  const [api, setApi] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const result = await Protocal(token);
        setApi(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Protocol
              </Card.Title>
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
                      <strong> Protocol</strong>
                    </th>
                    <th>
                      <strong>Ratio</strong>
                    </th>

                    <th>
                      <strong>Tenure</strong>
                    </th>
                    <th>
                      <strong>Amount</strong>
                    </th>
                    <th>
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> WYZ + stUSDT</td>
                    <td> 10:90</td>
                    <td>12 Month</td>
                    <td>{api.firstdata ?? 0}</td>
                    <td>
                    <Link
                        to="/protocol-data?token=WYZ-stUSDT&ratio=10"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td> WYZ + stUSDT</td>
                    <td> 20:80</td>
                    <td>24 Month</td>
                    <td>{api.seconddata ?? 0}</td>
                    <td>
                    <Link
                        to="/protocol-data?token=WYZ-stUSDT&ratio=20"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td> WYZ + stUSDT</td>
                    <td> 30:70</td>
                    <td>36 Month</td>
                    <td>{api.thirddata ?? 0}</td>
                    <td>
                    <Link
                        to="/protocol-data?token=WYZ-stUSDT&ratio=30"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td> WYZ + stUSDT</td>
                    <td> 40:60</td>
                    <td>48 Month</td>
                    <td>{api.fourthdata ?? 0}</td>
                    <td>
                      <Link
                        to="/protocol-data?token=WYZ-stUSDT&ratio=40"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td> WYZ + stUSDT</td>
                    <td> 50:50</td>
                    <td>60 Month</td>
                    <td>{api.fifthdata ?? 0}</td>
                    <td>
                    <Link
                        to="/protocol-data?token=WYZ-stUSDT&ratio=50"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td> bUSDT+stUSDT</td>
                    <td> 15:85</td>
                    <td>18 Month</td>
                    <td>{api.sixdata ?? 0}</td>
                    <td>
                    <Link
                        to="/protocol-data?token=bUSDT-stUSDT&ratio=15"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td> bUSDT+stUSDT</td>
                    <td> 20:80</td>
                    <td>24 Month</td>
                    <td>{api.sevendata ?? 0}</td>
                    <td>
                    <Link
                        to="/protocol-data?token=bUSDT-stUSDT&ratio=20"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td> bUSDT+stUSDT</td>
                    <td>25:75</td>
                    <td>30 Month</td>
                    <td>{api.eightdata ?? 0}</td>
                    <td>
                    <Link
                        to="/protocol-data?token=bUSDT-stUSDT&ratio=25"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="d-flex justify-content-between">
                <span>
                  {/* Page{" "} */}
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
                </span>
              </div>
              {/* <div
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
              </div> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Protocol;
