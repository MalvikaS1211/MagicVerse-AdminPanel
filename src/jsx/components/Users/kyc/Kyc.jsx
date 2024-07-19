import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Card, Table } from "react-bootstrap";
// import { allUser } from "../../../services/api_function";
import { COLUMNS } from "../../../components/table/FilteringTable/Columns";
import { HiSelector } from "react-icons/hi";

import { useDispatch } from "react-redux";
import {
  getAllUserKyc,
  updateKycStatus,
  url2,
} from "../../../../services/api_function";
import toast from "react-hot-toast";

export const Kyc = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [config, setcofig] = useState([]);
  const [params, setPamras] = useState("");
  const location = useLocation();
  const getLastPathSegment = () => {
    let paths = location.pathname.split("/");
    paths = paths[paths.length - 1];
    paths = paths.split("-");
    return paths[0];
  };

  const kycStatusParam = getLastPathSegment();
  const userDetails = localStorage.getItem("userDetails");
  const parsedDetails = JSON.parse(userDetails);
  const token = parsedDetails.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUserKyc(token, kycStatusParam, search);
        setApiData(result?.data?.data);
        // setcofig(result?.config);
        // setFilteredData(result?.data);
        setTotalPages(result?.data?.totalPages);
        if (!result?.data[0]) {
          setRecordStatus("No Record");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, search, kycStatusParam]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => apiData, [apiData]);

  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handleSelect = async (id, status) => {
    console.log(id, status, "select");
    try {
      const res = await updateKycStatus(id, status, token);
      if (res.data.status === 200) {
        setApiData(
          apiData.filter((it) => it._id != id && it.kyc_status != status)
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              onChange={handleSearch}
            />
          </div>
          <label class="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Kyc
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
                <thead>
                  <tr>
                    <th>
                      <strong>NO.</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>Email</strong>
                    </th>
                    <th>
                      <strong>IDNumber</strong>
                    </th>
                    <th>
                      <strong>Type</strong>
                    </th>
                    <th>
                      <strong>Doc Front</strong>
                    </th>
                    <th>
                      <strong>Doc Back</strong>
                    </th>
                    <th>
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!apiData[0] ? (
                    <tr>
                      <td className="text-light text-center" colSpan="7">
                        {recordStatus}
                      </td>
                    </tr>
                  ) : (
                    apiData.map((data, index) => {
                      const total = data?.currency?.reduce((pre, it) => {
                        const price = config.find(
                          (itm) =>
                            itm.symbol.toLowerCase() == it.symbol.toLowerCase()
                        );
                        const fp = price ? price.price : 1;
                        const tt = pre + it.available * fp;
                        return tt;
                      }, 0);

                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data?.name}</td>
                          <td>{data?.email}</td>
                          <td>{data?.doc_number}</td>
                          <td>{data?.doc_type}</td>
                          <td>
                            <img
                              src={(url2 + "/" + data?.doc_front).replace(
                                "/uploads",
                                "/support"
                              )}
                              alt=""
                              height={70}
                              width={150}
                            />
                          </td>
                          <td>
                            <img
                              src={(url2 + "/" + data?.doc_back).replace(
                                "/uploads",
                                "/support"
                              )}
                              alt=""
                              height={70}
                              width={150}
                            />
                          </td>
                          <td>
                            <select
                              className="form-control text-center"
                              width="100"
                              value={data?.kyc_status}
                              style={{ background: "transparent" }}
                              onChange={(e) =>
                                handleSelect(data?._id, e.target.value)
                              }
                              aria-label="Default select example"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between">
                <span>
                  {/* Page{" "} */}
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
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

                  {/* <button
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
                  </button> */}

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

export default Kyc;
