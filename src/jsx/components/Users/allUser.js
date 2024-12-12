import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Papa from "papaparse";
import { cutAfterDecimal, getAllStakeUsers } from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from '@mui/material';
import { FaRegCopy } from "react-icons/fa";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("adminToken");
        const token = userDetails;
        const result = await getAllStakeUsers(currentPage,10, search,token);
        console.log(result,"RELLLLLLL");
        setApiData(result?.data);
        if (!result?.data?.[0]) {
          setRecordStatus("No Record");
        }
        setTotalPages(result?.pagination?.totalPages);
        // if (result.status == 404) {
        //   navigate("/login");
        //   localStorage.removeItem("userDetails");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage,search,isFetch]);


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

  return (
    <Fragment>
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
                    <th>Rank</th>
                    <th>Node Group Name</th>
                    <th>Total Stake</th>
                    <th>Stake</th>
                    <th>{"       "}Team Business { "      " } </th>
                    <th>Total Unstake</th>
                    <th>Profit Income</th>
                    <th>Total Referrals</th>

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
                        {data?.userAddress?.slice(0,5)}...{data?.userAddress?.slice(-4)}
                        <Tooltip title={tooltipText} arrow>
                          <IconButton onClick={()=>handleCopy(data?.userAddress)} size="small" style={{ marginLeft: 4 }}>
                          <FaRegCopy />
                          </IconButton>
                        </Tooltip>
                        </td>
                        <td>
                        {data?.referralAddress?.slice(0,5)}...{data?.referralAddress?.slice(-4)}
                        <Tooltip title={tooltipText} arrow>
                          <IconButton onClick={()=>handleCopy(data?.referralAddress)} size="small" style={{ marginLeft: 4 }}>
                          <FaRegCopy />
                          </IconButton>
                        </Tooltip>
                        </td>
                        <td>{data?.stakeRank || "--"}</td>
                        <td>{data?.nodeGroupName || "--"}</td>
                        <td>${cutAfterDecimal(data?.totalStake,2)}</td>
                        <td>
                          <div>{cutAfterDecimal(data?.totalCoinAmount,2)} DSC</div>
                          <div>{cutAfterDecimal(data?.totalTokenAmount,2)} USDT </div>
                        </td>

                        <td >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>{"  "}${cutAfterDecimal(data?.teamBusiness,2)} {"  "}</div>
                            <div className="text-end">
                              <div>{"  "}{cutAfterDecimal(data?.teamBusinesswithCoin.dsc,2)} DSC {"  "}</div>
                              <div>{"  "}{cutAfterDecimal(data?.teamBusinesswithCoin.usdt,2)} USDT {"   "}</div>

                            </div>
                          </div>
                        </td>
                        <td>${cutAfterDecimal(data?.totalUnStake,2)}</td>
                        <td>${cutAfterDecimal(data?.totalProfitIncome,2)}</td>
                        <td>{data?.totalReferrals}</td>

                        <td>{new Date(data?.timestamp).toLocaleString()}</td>
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
