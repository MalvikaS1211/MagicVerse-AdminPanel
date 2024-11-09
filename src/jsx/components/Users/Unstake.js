import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Papa from "papaparse";
import { daoUsersAdd, getAllUnstakes, getDAOUserList } from "../../../services/api_function";
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

export const Unstake = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("adminToken");
        const token = userDetails;
        const result = await getAllUnstakes(currentPage,10, search,token);
        // console.log(result,"RELLLLLLL");
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
  }, [currentPage, isFetch]);


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
        <div className="display_end"        
        >
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
            //   onChange={handleSearch}
            />
          </div>
          <label className="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>UNSTAKE USERS</Card.Title>
            </Card.Header>
            <Card.Body>

              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>Unstake Amount</th>
                    <th>Unstake DSC</th>
                    <th>Unstake USDT</th>
                    <th>WithDraw</th>
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
                        <td>{data?.stakeId?.userAddress?.slice(0,6)}...{data?.stakeId?.userAddress?.slice(-6)}</td>
                        <td>${data?.unstakeAmount}</td>
                        <td>{data?.stakingId?.coinAmount} DSC</td>
                        <td>{data?.stakingId?.tokenAmount} USDT</td>
                        <td>{data?.isUnstakeCompleted ? "Success": "Pending"}</td>
                        <td>{new Date(data?.unstakeTimestamp).toLocaleString()}</td>
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

export default Unstake;
