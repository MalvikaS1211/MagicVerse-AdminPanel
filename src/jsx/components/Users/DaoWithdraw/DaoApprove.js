import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Toast } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Papa from "papaparse";
import { cutAfterDecimal, getDscprice, getStakeSetting, getUserAffilateWithdrawal, getUserDaoWithdrawal, getUserUnstakeWithdrawal, updateMultisend, updateStakeSetting } from "../../../../services/api_function";
import toast from "react-hot-toast";
import { multisendCoin } from "../web3/transfert";

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

export const DaoApprove = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [priceDsc, setPriceDsc] = useState(0);
  const [livePriceEnable, setLivePriceEnable] = useState({livePriceDsc:false});

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserDaoWithdrawal(currentPage,10, search,"approve",token);
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

//   const updateSettings = async (newSettings) => {
//     try {
//       const data = await updateStakeSetting(newSettings, token);
//       if(data?.status ===200){
//         toast.success(data.message)
//         console.log("Settings updated successfully:", data);
//       }else{
//         console.log("Settings error:", data);
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//       console.error("Error updating settings:", error);
//     }
//   };

//   const handleToggleChange = async (e) => {
//     const { name, checked } = e.target;

//     // Update the local state immediately
//     const newSettings = {
//       ...livePriceEnable,
//       [name]: checked,
//     };
//     setLivePriceEnable(newSettings);

//     // Update settings on the server
//     await updateSettings(newSettings);
//   };

  useEffect(()=>{
    getDscprice().then((res)=>{
        console.log(res,"resprice")
        setPriceDsc(res)
    })
  },[currentPage,isFetch])

//   useEffect(()=>{
//     getStakeSetting(token).then((res)=>{
//       console.log(res,"data")
//       if(res?.status === 200){
//         const data ={
//             livePriceDsc: res?.data?.livePriceDsc,
//         }
//         setLivePriceEnable(data);
//       } else {
//         setLivePriceEnable({  
//             livePriceDsc: false
//         })
//       }
//     })
//   },[token])

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
              <Card.Title>DAO APPROVE WITHDRAW</Card.Title>
              {/* <div className="d-flex align-items-center">          
              <div class="form-check form-switch mt-2 mb-2">
                <input
                class="form-check-input"
                name="livePriceDsc"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={livePriceEnable.livePriceDsc}
                onChange={handleToggleChange}
                />
               
            </div>
            <div class="form-check-label" for="flexSwitchCheckDefault">
                Live Price Withdraw
                </div>
            </div> */}
            </Card.Header>
            <Card.Body>

              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>User</th>
                        <th>Withdraw Amount($)</th>
                        <th>Withdraw DSC</th>
                        <th>Withdraw USDT</th>
                        <th>WithDraw</th>
                        <th>WithDraw DSC Status</th>
                        <th>WithDraw USDT Status</th>
                        <th>Date & Time</th>
                        {/* <th>Action Approve</th> */}
                        {/* <th>Action Reject</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {!apiData?.[0] ? (
                        <tr>
                        <td className="text-light text-center" colSpan="16">
                            No records found
                        </td>
                        </tr>
                    ) : (
                        apiData?.map((data, index) => (
                        <tr key={index}>
                        
                            <td>{index + 1}</td>
                            <td>
                            {data?.userAddress?.slice(0, 6)}...
                            {data?.userAddress?.slice(-6)}
                            </td>
                            <td>${cutAfterDecimal(data?.withdrawAmount,4)}</td>

                            <td>{cutAfterDecimal(data?.iswithdrawUserDSC,4) || 0} DSC</td>
                            <td>{cutAfterDecimal(data?.iswithdrawUserUSDT,4) || 0} USDT</td>
                            <td
                            className={`fw-bold ${
                                data?.status === 'Pending'
                                ? 'text-warning'
                                : data?.status === 'Approve'
                                ? 'text-success'
                                : 'text-danger'
                            }`}
                            >
                            {data?.status}
                            </td>
                            <td>
                            <div
                                className={`${
                                data?.isWithdrawCompleted.dsc ? 'text-success' : 'text-warning'
                                } fw-bold`}
                            >
                                {data.isTransfer.dsc
                                ? data?.isWithdrawCompleted.dsc
                                    ? 'Success'
                                    : 'Pending'
                                : '--'}
                            </div>
                            </td>
                            <td>
                            <div
                                className={`${
                                data?.isWithdrawCompleted.usdt ? 'text-success' : 'text-warning'
                                } fw-bold`}
                            >
                                {data.isTransfer.usdt
                                ? data?.isWithdrawCompleted.usdt
                                    ? 'Success'
                                    : 'Pending'
                                : '--'}
                            </div>
                            </td>
                            <td>{new Date(data?.withdrawTimestamp).toLocaleString()}</td>

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

export default DaoApprove;
