import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Row, Col, Card, Table } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { cutAfterDecimal, getAllRewardList } from "../../../services/api_function";
import toast from "react-hot-toast";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#dadde9",
    fontSize: "12px",
    fontWeight: 400,
    border: "1px solid #25262B",
  },
}));

export const RewardList = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [rewardType, setRewardType] = useState("Referral");


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
        const result = await getAllRewardList(rewardType,currentPage,15, search,token);
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
  }, [currentPage,search,isFetch,rewardType]);


  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

    // Handle change event when a new option is selected
    const handleSelectChange = (event) => {
        setRewardType(event.target.value);
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
              <Card.Title>Reward List</Card.Title>
              <div>
                 <select class="form-select" aria-label="Default select example"
                    value={rewardType}
                    onChange={handleSelectChange}
                    >
                    <option selected value="Referral">Referral</option>
                    <option value="Dao">Dao</option>
                    <option value="SystemReward">SystemReward</option>
                </select>
            </div>
            </Card.Header>
            <Card.Body>

              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>To Address</th>
                    <th>From Address</th>
                    <th>Rank</th>
                    <th>Type</th>
                    <th>Stake From user($)</th>
                    <th>Stake From user</th>
                    <th>Reward</th>
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
                        <td>{data?.fromAddress?.slice(0,5)}...{data?.fromAddress?.slice(-4)}</td>
                        <td>{data?.toAddress?.slice(0,5)}...{data?.toAddress?.slice(-4)}</td>
                        <td>{data?.stakeId?.stakeRank || "--"}</td>
                        <td>{data?.type || "--"}</td>
                        <td>${data?.stakingId?.stakeAmount || "0"}</td>
                        <td>
                          <div>{cutAfterDecimal(data?.stakingId?.coinAmount,4)} DSC</div>
                          <div>{cutAfterDecimal(data?.stakingId?.tokenAmount,4)} USDT </div>
                        </td>

                        <td>
                          <div>{cutAfterDecimal(data?.reward?.dsc,4)} DSC</div>
                          <div>{cutAfterDecimal(data?.reward?.usdt,4)} USDT </div>
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

export default RewardList;
