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
      <div className="display_end">
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
              
            >
              <Card.Title>
                Protocol
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
                      <strong> Protocol</strong>
                    </th>
                    <th>
                      <strong>Ratio</strong>
                    </th>

                    <th>
                      <strong>Tenure</strong>
                    </th>
                    <th>
                      <strong>WYZ</strong>
                    </th>
                    <th>
                      <strong>USDT</strong>
                    </th>
                    <th>
                      <strong>Total</strong>
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
                    <td>{((api?.firstdata * 0.1) / 20).toFixed(2)}</td>
                    <td>{((api?.firstdata * 0.9)).toFixed(2)}</td>
                    <td>{api.firstdata ? api.firstdata.toFixed(2) : "0.00"}</td>

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
                    <td>{((api?.seconddata * 0.2) / 20).toFixed(2)}</td>
                    <td>{(api?.seconddata * 0.8).toFixed(2)}</td>
                    <td>
                      {api.seconddata ? api.seconddata.toFixed(2) : "0.00"}
                    </td>
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
                    <td>
                      {api?.thirddata
                        ? ((api.thirddata * 0.3) / 20).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>
                      {api?.thirddata
                        ? (api.thirddata * 0.7).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>{api.thirddata ? api.thirddata.toFixed(2) : "0.00"}</td>

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
                    <td>
                      {api?.fourthdata
                        ? ((api.fourthdata * 0.4) / 20).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>
                      {api?.fourthdata
                        ? (api.fourthdata * 0.6).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>
                      {api.fourthdata ? api.fourthdata.toFixed(2) : "0.00"}
                    </td>
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
                    <td>
                      {api?.fifthdata
                        ? ((api.fifthdata * 0.5) / 20).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>
                      {api?.fifthdata
                        ? (api.fifthdata * 0.5).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>{api.fifthdata ? api.fifthdata.toFixed(2) : "0.00"}</td>

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
                    <td> sUSDT+stUSDT</td>
                    <td> 15:85</td>
                    <td>18 Month</td>
                    <td>
                      {api?.sixdata ? (api.sixdata * 0.15).toFixed(2) : "0.00"}
                    </td>
                    <td>
                      {api?.sixdata ? (api.sixdata * 0.85).toFixed(2) : "0.00"}
                    </td>
                    <td>{api.sixdata ? api.sixdata.toFixed(2) : "0.00"}</td>

                    <td>
                      <Link
                        to="/protocol-data?token=sUSDT-stUSDT&ratio=15"
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
                    <td> sUSDT+stUSDT</td>
                    <td> 20:80</td>
                    <td>24 Month</td>
                    <td>
                      {api?.sevendata
                        ? (api?.sevendata * 0.2).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>
                      {api?.sevendata
                        ? (api?.sevendata * 0.8).toFixed(2)
                        : "0.00"}
                    </td>

                    <td>{api?.sevendata ? api?.sevendata.toFixed(2) : "0.00"}</td>

                    <td>
                      <Link
                        to="/protocol-data?token=sUSDT-stUSDT&ratio=20"
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
                    <td> sUSDT+stUSDT</td>
                    <td>25:75</td>
                    <td>30 Month</td>
                    <td>
                      {api?.eighthdata
                        ? (api.eighthdata * 0.25).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>
                      {api?.eighthdata
                        ? (api.eighthdata * 0.75).toFixed(2)
                        : "0.00"}
                    </td>

                    <td>{api.eightdata ? api.eightdata.toFixed(2) : "0.00"}</td>

                    <td>
                      <Link
                        to="/protocol-data?token=sUSDT-stUSDT&ratio=25"
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
          <div className="filter-pagination  mt-3 "  >
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
