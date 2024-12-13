import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Papa from "papaparse";
import {
  cutAfterDecimal,
  daoUsersAdd,
  getDAOUserList,
} from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

// const HtmlTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: "#dadde9",
//     fontSize: "12px",
//     fontWeight: 400,
//     border: "1px solid #25262B",
//   },
// }));

export const DaoUsers = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);

  const [tooltipText, setTooltipText] = useState("Copy address");

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000); // Reset tooltip text after 2 seconds
  };

  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  async function createDaoAddress() {
    const userDetails = localStorage.getItem("adminToken");
    // const parsedDetails = JSON.parse(userDetails);
    const token = userDetails;
    const res = await daoUsersAdd(daoAddress, token);

    if (res.status === 200) {
      toast.success(res?.message);
      setIsFetch(!isFetch);
    } else {
      toast.error(res?.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("adminToken");
        const token = userDetails;
        const result = await getDAOUserList(search, token);
        console.log(result);
        setApiData(result?.data);
        if (!result?.data?.[0]) {
          setRecordStatus("No Record");
        }
        // setTotalPages(result.totalPages);
        // if (result.status == 404) {
        //   navigate("/login");
        //   localStorage.removeItem("userDetails");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search, isFetch]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log(result.data); // Logs the CSV data to console
        },
        header: true, // if you want the first row as headers
      });
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click(); // Programmatically click the hidden input
  };

  const [Radiant, setRadiant] = useState("");
  const [Quantum, setQuantum] = useState("");

  // Handle input changes

  const handleRadiant = (e) => setRadiant(e.target.value);
  const handleQuantum = (e) => setQuantum(e.target.value);
  const handleSubmit = async () => {
    try {
      console.log({ Radiant, Quantum });

      // const result = await stakeUsdtByAdmin(Radiant, Quantum);

      toast.success("Transaction successful!");
    } catch (error) {
      console.log("Error submitting data:", error);
      toast.error("Error!");
    }
  };
  return (
    <Fragment>
      <Row className="mb-4">
        <Col lg={6} className="mx-auto">
          <Card>
            <Card.Body>
              <Form>
                {/* Radiant Input and Submit */}
                <Form.Group controlId="formRadiantInput">
                  <Form.Label>Radiant</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      placeholder="Enter Radiant value"
                      value={Radiant}
                      onChange={handleRadiant}
                      className="me-2"
                    />
                    <Button variant="primary">Submit</Button>
                  </div>
                </Form.Group>

                {/* Quantum Input and Submit */}
                <Form.Group controlId="formQuantumInput" className="mt-4">
                  <Form.Label>Quantum</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      placeholder="Enter Quantum value"
                      value={Quantum}
                      onChange={handleQuantum}
                      className="me-2"
                    />
                    <Button variant="primary">Submit</Button>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <div className="display_end">
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              onChange={handleSearch}
            />
          </div>
          <label className="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>ROI Percentage</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="form-label m-2">Address</div>
              <div className="pb-3 d-flex gap-2">
                <div className="input-group" style={{ maxWidth: "300px" }}>
                  <input
                    type="search"
                    id="form1"
                    className="form-control"
                    placeholder="Enter Dao Address"
                    // value={daoAddress}
                    onChange={(e) => {
                      console.log(e, "MANTHAN");
                      setDaoAddress(e.target.value);
                    }}
                  />
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    createDaoAddress();
                  }}
                >
                  ADD
                </button>

                <label className="form-label" for="form1"></label>
              </div>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Dao Address</th>
                    <th>Referral Address</th>
                    <th>Type</th>
                    <th>Rank</th>
                    <th>Stake</th>
                    <th>Team Business</th>
                    <th>Total Referrals</th>
                    <th>Reward Amount($)</th>
                    <th>Rewad DSC</th>
                    <th>Rewad USDT</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {!apiData?.[0] ? (
                    <tr>
                      <td className="text-light text-center" colSpan="7">
                        {/* {recordStatus} */}
                      </td>
                    </tr>
                  ) : (
                    apiData?.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {data?.address?.slice(0, 6)}...
                          {data?.address?.slice(-6)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(data?.address)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>
                          {data?.stakeUserData?.referralAddress?.slice(0, 6)}...
                          {data?.stakeUserData?.referralAddress?.slice(-6)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() =>
                                handleCopy(data?.stakeUserData?.referralAddress)
                              }
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>{data?.type}</td>
                        <td>{data?.stakeUserData?.stakeRank}</td>
                        <td>
                          {cutAfterDecimal(data?.stakeUserData?.totalStake, 2)}
                        </td>
                        <td>
                          $
                          {cutAfterDecimal(
                            data?.stakeUserData?.teamBusiness,
                            2
                          )}
                        </td>
                        <td>{data?.stakeUserData?.totalReferrals}</td>
                        {/* <td>${cutAfterDecimal(data?.stakeUserData?.totalStake,2)}</td> */}
                        <td>${cutAfterDecimal(data?.rewardAmount, 2)}</td>
                        <td>
                          {cutAfterDecimal(data?.rewardwithCoin?.dsc, 2)} DSC
                        </td>
                        <td>
                          {cutAfterDecimal(data?.rewardwithCoin?.usdt, 2)} USDT
                        </td>
                        <td>{new Date(data?.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
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
                <div className="filter-pagination mt-3">
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

export default DaoUsers;
