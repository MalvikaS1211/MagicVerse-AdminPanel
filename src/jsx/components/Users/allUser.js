import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import axios from "axios";
import Papa from "papaparse";
import {
  cutAfterDecimal,
  getAllStakeUsers,
  URLApi,
} from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import moment from "moment";
import { getusdt, stakeUsdtByAdmin } from "./web3/transfert";

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

export const Alluser = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [licenseList, setLicenseList] = useState([]);

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

  const [token, setToken] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("adminToken");
        setToken(userDetails);
        const token = userDetails;
        const response = await axios.post(
          `${URLApi}/get-license-purchases`,
          {
            page: 1,
            limit: 10000000,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        setIsdeposit(response.data.isDepositStopped);
        let alllicensesList = response.data.allLicenses;
        alllicensesList.shift();
        setLicenseList(alllicensesList);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function on component mount
    fetchData();
  }, []);
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
          console.log(result.data);
        },
        header: true,
      });
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleIsDeposit = async (status) => {
    try {
      const response = await axios.post(
        `${URLApi}/stop-deposit`,
        {
          depositStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [stringInput, setStringInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [isdeposit, setIsdeposit] = useState(false);
  // Handle input changes
  const handleStringChange = (e) => setStringInput(e.target.value);
  const handleNumberChange = (e) => setNumberInput(e.target.value);
  const handleLicenseChange = (e) => setLicenseType(Number(e.target.value));

  const handleSubmit = async () => {
    try {
      console.log({ stringInput, numberInput });
      if (licenseType !== 1 && licenseType !== 2) {
        return toast.error("Invalid License type!");
      }
      const formattedNumber = Number(numberInput * 1e18);
      console.log("Amount:", formattedNumber);
      console.log("licenseType", licenseType);
      const result = await stakeUsdtByAdmin(
        formattedNumber,
        licenseType,
        stringInput
      );

      toast.success("Transaction successful!");
    } catch (error) {
      console.log("Error submitting data:", error);
      toast.error("Error!");
    }
  };
  return (
    <Fragment>
      <Row className="mb-4">
        <Col lg={7}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="formStringInput">
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User"
                    value={stringInput}
                    onChange={handleStringChange}
                  />
                </Form.Group>

                <Form.Group controlId="formNumberInput" className="mt-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Amount"
                    value={numberInput}
                    onChange={handleNumberChange}
                  />
                </Form.Group>

                <Form.Group controlId="formSelectLicenseType" className="mt-3">
                  <Form.Label>License Type</Form.Label>
                  <Form.Select
                    value={licenseType}
                    onChange={handleLicenseChange}
                  >
                    <option value="0">Select any License Type</option>
                    <option value="1">Radiant</option>
                    <option value="2">Quantum</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} className="deposit-btn-containet">
          <Card
            className="d-flex justify-content-center"
            style={{ width: "18rem" }}
          >
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text></Card.Text>
              <Button
                className="next-button btn btn-success pointer border m-2 "
                variant="secondry"
                onClick={() => {
                  handleIsDeposit(isdeposit ? false : true);
                }}
                style={{ width: "100%" }}
                // disabled={isdeposit}
              >
                {isdeposit ? "Active deposit" : "Stop Deposit"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <div className="display_end">
          <div className="input-group " style={{ maxWidth: "300px" }}>
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
              <Card.Title>All USERS</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>referral</th>
                    <th>Quantum Deposite</th>
                    <th>Radiant Deposit</th>
                    <th>Tx Hash</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {!licenseList?.[0] ? (
                    <tr>
                      <td className="text-light text-center" colSpan="7">
                        {/* {recordStatus} */}
                      </td>
                    </tr>
                  ) : (
                    licenseList?.map((license, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {license?.user?.slice(0, 5)}...
                          {license?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(license?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>
                          {license?.referal?.slice(0, 5)}...
                          {license?.referal?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(license?.referal)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        {/* <td>{license?.stakeRank || "--"}</td> */}
                        {/* <td>{license?.nodeGroupName || "--"}</td> */}
                        <td>
                          ${cutAfterDecimal(license?.totalDepositQuantum, 2)}
                        </td>
                        <td>
                          <div>
                            {cutAfterDecimal(license?.totalDepositRadiant, 2)}{" "}
                            USDT{" "}
                          </div>
                        </td>

                        {/* <td>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              {"  "}${cutAfterDecimal(license?.teamBusiness, 2)}{" "}
                              {"  "}
                            </div>
                            <div className="text-end">
                              <div>
                                {"  "}
                                {cutAfterDecimal(
                                  license?.teamBusinesswithCoin.dsc,
                                  2
                                )}{" "}
                                DSC {"  "}
                              </div>
                              <div>
                                {"  "}
                                {cutAfterDecimal(
                                  license?.teamBusinesswithCoin.usdt,
                                  2
                                )}{" "}
                                USDT {"   "}
                              </div>
                            </div>
                          </div>
                        </td> */}
                        {/* <td>${cutAfterDecimal(license?.totalUnStake, 2)}</td>
                        <td>${cutAfterDecimal(license?.totalProfitIncome, 2)}</td> */}
                        <td>{license?.transactionHash}</td>

                        <td>
                          {moment
                            .unix(license?.timestamp)
                            .format("DD/MM/YYYY HH:mm:ss")}
                        </td>
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
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className=" filter-pagination mt-3 ">
                  <button
                    className="previous-button btn border m-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    className="next-button btn btn-success pointer border m-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>

                  <span>
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

export default Alluser;
