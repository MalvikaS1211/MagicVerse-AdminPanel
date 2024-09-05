import React, { Fragment, useEffect, useState, useMemo } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { allUser, url, withdrawInrAction, withdrawRoi } from "../../../services/api_function";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from "react-hot-toast";

export const WithdrawalINRInfo = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [loader, setLoader] = useState(false);
  const pageSize = 100;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const id = query.get('id'); // Retrieves the id parameter from the URL

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const table = "withdraw-inr-info"
        const result = await allUser(
          table,
          currentPage,
          { searchQuery: search },
          token,
          id?.toString()
        );
        setApiData(result?.data);
        if (!result?.data[0]) {
          setRecordStatus("No Record");
        }
        if (result.status == 404) {
          Navigate("/login");
          localStorage.removeItem("userDetails");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, search,loader]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleEditClick = (phoneNumber) => {
    console.log("Edit Clicked for phoneNumber:", phoneNumber);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handleAction = async (hashId,type)=> {
    setLoader(true)
    try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const result = await withdrawInrAction(
            token,
            hashId,
            type
        );
        if (result.status == 200) {
            setLoader(false)
            toast.success(result.message);
          }
        if (result.status == 404) {
            setLoader(false)
          Navigate("/login");
          localStorage.removeItem("userDetails");
        }
      } catch (error) {
        setLoader(false)
        console.error("Error fetching data:", error);
      }
  }

 



  return (
    <Fragment>
      <Row>
        {/* <div
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
        </div> */}

        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Withdraw INR User INFO
              </Card.Title>
              {/* <button type="button" class="btn btn-success">Approve</button> */}
            </Card.Header>

            <Card.Body style={{ background: "black", border: "1px solid white" }} >
             <div>
               {!apiData[0] ? (
                    <tr>
                      <td className="text-light text-center" colSpan="7">
                        {recordStatus && recordStatus}
                      </td>
                    </tr>
                  ): (<div className="row align-items-center">
                     <div className="col-sm-12 col-md-6 col-lg-6">
                        {(apiData?.[0]?.bankDetails && Object.keys(apiData[0].bankDetails).length > 0)  && 
                            <div className="d-flex justify-content-between" >
                                <div>
                                    <p>Account Holder Name:</p>
                                    <p>Account Number:</p>
                                    <p>IFSC Code:</p>
                                    <p>Bank Name:</p>

                                </div>
                                <div>
                                <p>{apiData?.[0]?.bankDetails?.data?.full_name}</p>
                                    <p>{apiData?.[0]?.bankDetails?.account_number}</p>
                                    <p>{apiData?.[0]?.bankDetails?.data?.ifsc_details?.ifsc}</p>
                                    <p>{apiData?.[0]?.bankDetails?.data?.ifsc_details?.bank_name}</p>
                                </div>
                            </div>
                        }
                        {(apiData?.[0]?.upiDetails && Object.keys(apiData[0].upiDetails).length > 0) && 
                            <div className="d-flex justify-content-between" s>
                                <div>
                                    <p>Name:</p>
                                    <p>UPI ID:</p>
                                    <p>QR:</p>

                                </div>
                                <div>
                                <p>{apiData?.[0]?.upiDetails?.data?.full_name}</p>
                                    <p>{apiData?.[0]?.upiDetails?.data?.upi_id}</p>
                                 {  apiData?.[0]?.upiDetails?.upiQr ?    
                                    <p><img src={`https://backoffice.inrx.io/api/support/images/bankqr/${apiData?.[0]?.upiDetails?.upiQr}`} alt="QR Code" style={{ width: '100%', maxWidth: '200px' }} /></p>
                                    :"--"
                                 }
                                </div>
                            </div>
                        }
                     </div>   
                     <div className="col-sm-12 col-md-6 col-lg-6">
                          <div>
                          <div className="d-flex justify-content-between bg-secondary p-3 rounded">
                                <div>
                                    <p>Withdraw Amount:</p>
                                    <p>Withdraw Fee:</p>
                                    <p>Name:</p>
                                    <p>Status</p>
                                    <p>createdAt:</p>

                                </div>
                                <div>
                                <p>{apiData?.[0]?.amount} INR</p>
                                    <p>{apiData?.[0]?.fee} INR </p>
                                    <p>{apiData?.[0]?.name}</p>
                                    <p style={{color:apiData?.[0]?.status ?( (apiData?.[0]?.status === "-1")?"yellow": (apiData?.[0]?.status === "2") ?"red":"green"):apiData?.[0]?.success?"green":"red"}}>{apiData?.[0]?.status === "-1"? "Pending" : apiData?.[0]?.status === "1"?"Success":"Rejected"}</p>

                                    <p>{new Date(apiData?.[0]?.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                          </div>  
                     </div>   

                     <div>
                        <div className="d-flex justify-content-center h3 p-2 text-light">
                            <div className="p-1 rounded">Total Amount Transfer : {apiData?.[0]?.amount - apiData?.[0]?.fee} INR</div>
                        </div>
                       {apiData?.[0]?.status === "-1" && <div className="d-flex justify-content-center align-item-center gap-2">
                            <button className="btn btn-success" onClick={()=>handleAction(apiData?.[0]?.hash,"approve")} disabled={loader}>
                                Approve
                            </button>
                            <button className="btn btn-danger" onClick={()=>handleAction(apiData?.[0]?.hash,"reject")} disabled={loader}>
                                Reject
                            </button>
                        </div>}

                        {apiData?.[0]?.status === "1" && 
                            <div  className="d-flex justify-content-center align-item-center">
                                <div className="btn btn-success">Amount Paid successfully</div>
                            </div>
                        }
                        {apiData?.[0]?.status === "2" && 
                            <div  className="d-flex justify-content-center align-item-center">
                                <div className="btn btn-danger">Payment Rejected</div>
                            </div>
                        }
                     </div>
                </div>)}
             </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default WithdrawalINRInfo;
