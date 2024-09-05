import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { url, withdrawClaim } from "../../../services/api_function";
import {
  contract_address,
  ploygon_token,
  ploygon_token_abi,
  polygon_abi,
  token_abi,
  token_address,
  transfer_abi,
  transfer_addres,
  transfer_polygon,
} from "../../config/config";
import Web3 from "web3";
import { NotificationManager } from "react-notifications";

export const WithdrawClaim = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [approveLoading, setapproveLoading] = useState({});
  const [rejectLoading, setrejectLoading] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const pageSize = 20;

  const fetchData = async () => {
    try {
      const userDetails = localStorage.getItem("userDetails");
      const parsedDetails = JSON.parse(userDetails);
      const token = parsedDetails.token;
      const response = await withdrawClaim(
        currentPage,
        {
          searchQuery: search,
          paymentMethod: paymentMethod,
        },
        pageSize,
        token
      );
      if (response && response.status == 200 && !response.error) {
        const { data, totalCount } = response;
        setFilteredData(data);
        const pages = Math.ceil(totalCount / pageSize);
        setTotalPages(pages > 0 ? pages : 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, search, paymentMethod]);

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

  const sendTransaction = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(transfer_abi, transfer_addres);
    const token = new web3.eth.Contract(token_abi, token_address);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];
      const recipients = selectedUsers.map((data) => data.user);
      const amounts = selectedUsers.map((data) => data.withdrawAmount * 0.95);
      const id = selectedUsers.map((data) => data._id.toString().slice(0, 1));

      const objid = selectedUsers.map((data) => data._id);

      const totalAmount = web3.utils.toWei(
        selectedUsers
          .reduce((total, data) => total + data.withdrawAmount * 0.95, 0)
          .toString(),
        "ether"
      );

      const amountsInWei = amounts.map((amount) =>
        web3.utils.toWei(amount.toString(), "ether")
      );
      const gasPrice = await web3.eth.getGasPrice();
      console.log(
        recipients,
        amountsInWei,
        totalAmount,
        id,
        senderAddress,
        "multisend"
      );
      console.log(contract.methods, ":::::::::::::");
      const tokengas = await token.methods
        .approve(transfer_addres, totalAmount+Number(20))
        .estimateGas({ from: senderAddress });
        console.log(tokengas,"tokengas")
      const approve = await token.methods
        .approve(transfer_addres, totalAmount+Number(20))
        .send({
          from: senderAddress,
          gas: tokengas,
          gasPrice: gasPrice,
        });

      if (approve) {
        NotificationManager.success("Approve successfull");
        const gas = await contract.methods
          .multisendToken(
            recipients,
            amountsInWei,   
            totalAmount,
            id,
            "0x55d398326f99059ff775485246999027b3197955"
          )
          .estimateGas({ from: senderAddress });

        console.log(gasPrice, gas, "hey");

        var receipt = await contract.methods
          .multisendToken(
            recipients,
            amountsInWei,
            totalAmount,
            id,
            "0x55d398326f99059ff775485246999027b3197955"
          )
          .send({
            from: senderAddress,
            gas: gas,
            gasPrice: gasPrice,
          });
        console.log(receipt, ":::");
      }

      const apiResponse = await fetch(url + "/approve-withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          txHash: receipt.transactionHash,
          user: recipients,
          id: objid,
        }),
      });

      if (apiResponse.status == 200) {
        fetchData();
        NotificationManager.success(
          "Transaction successful",
          apiResponse.message
        );
     
      } else {
        NotificationManager.error("Failed to send transaction data");
      }
    } catch (error) {
      console.log("Error sending transaction:", error);
      NotificationManager.error("Error sending transaction:");
    }
  };

  const polygonTransaction = async () => {
    console.log("Called");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(polygon_abi, transfer_polygon);
    const token = new web3.eth.Contract(ploygon_token_abi, ploygon_token);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];
      const recipients = selectedUsers.map((data) => data.user);
      const amounts = selectedUsers.map((data) => data.withdrawAmount * 0.95);
      const id = selectedUsers.map((data) => data._id.toString().slice(0, 1));

      const objid = selectedUsers.map((data) => data._id);

      const totalAmount = web3.utils.toWei(
        selectedUsers
          .reduce((total, data) => total + data.withdrawAmount * 0.95, 0)
          .toString(),
        "ether"
      );

      const amountsInWei = amounts.map((amount) =>
        web3.utils.toWei(amount.toString(), "ether")
      );
      const gasPrice = await web3.eth.getGasPrice();
      console.log(
        recipients,
        amountsInWei,
        totalAmount,
        id,
        senderAddress,
        "multisend"
      );
      console.log(contract.methods, ":::::::::::::");
      const tokengas = await token.methods
        .approve(transfer_addres, totalAmount+Number(20))
        .estimateGas({ from: senderAddress });
        console.log(tokengas,"tokengas")
      const approve = await token.methods
        .approve(transfer_addres, totalAmount+Number(20))
        .send({
          from: senderAddress,
          gas: tokengas,
          gasPrice: gasPrice,
        });

      if (approve) {
        NotificationManager.success("Approve successfull");
        const gas = await contract.methods
          .multisendToken(
            recipients,
            amountsInWei,
            totalAmount,
            id,
            "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
          )
          .estimateGas({ from: senderAddress });

        console.log(gasPrice, gas, "hey");

        var receipt = await contract.methods
          .multisendToken(
            recipients,
            amountsInWei,
            totalAmount,
            id,
            "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
          )
          .send({
            from: senderAddress,
            gas: gas,
            gasPrice: gasPrice,
          });
        console.log(receipt, ":::");
      }

      const apiResponse = await fetch(url + "/approve-withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          txHash: receipt.transactionHash,
          user: recipients,
          id: objid,
        }),
      });

      if (apiResponse.status == 200) {
        NotificationManager.success("Transaction successful");
        fetchData();
      } else {
        NotificationManager.error("Failed to send transaction data");
      }
    } catch (error) {
      console.log("Error sending transaction:", error);
      NotificationManager.error("Error sending transaction:");
    }
  };
  const handleReject = async (user,_id, amount) => {
    setapproveLoading({ ...approveLoading, [user]: true });
    const userDetails = localStorage.getItem("userDetails");
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token;
    const apiResponse = await fetch(url + "/reject-withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: user,
        amount: amount,
        id:_id
      }),
    });

    if (apiResponse.status == 200) {
      const errorMessage = await apiResponse.json();
      setapproveLoading(false);
      NotificationManager.success(errorMessage.message);
      fetchData();
    } else {
      if (apiResponse.status == 400) {
        const errorMessage = await apiResponse.json();
        setapproveLoading(false);
        NotificationManager.error(errorMessage.message);
      } else {
        NotificationManager.error("Failed to send transaction data");
        setapproveLoading(false);
      }
    }
  };
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleCheckboxChange = (data, event) => {
    if (event.target.checked) {
      setSelectedUsers((prev) => [...prev, data]);
    } else {
      setSelectedUsers((prev) =>
        prev.filter((user) => user.user !== data.user)
      );
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length == filteredData.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredData);
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
              
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Withdraw Referral
              </Card.Title>
              <button
                type="button"
                class="btn btn-success"
                onClick={sendTransaction}
                style={{ marginRight: "50px" }}
              >
                Approve BEP20
              </button>

              <button
                type="button"
                class="btn btn-primary"
                onClick={polygonTransaction}
                style={{ marginRight: "50px" }}
              >
                Approve Polygon
              </button>
              {/* <button
                type="button"
                class="btn btn-warning"
             
              >
                Approve ERC20
              </button> */}
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                style={{ width: "200px" }}
                value={paymentMethod}
                onChange={(e) => {
                  handlePaymentMethodChange(e);
                }}
              >
                <option value="">Select</option>
                <option value="Bep20">Bep20</option>
                <option value="Polygon">Polygon</option>
                {/* <option value="stUsdt">stUsdt</option>
                          <option value="RetopUp">RetopUp</option> */}
                       
              </select>
            </Card.Header>

            <Card.Body
              
            >
              <Table
                responsive
               
              >
                <thead>
                  <tr>
                    <td>
                      <strong>
                        {" "}
                        <input
                          type="checkbox"
                          checked={selectedUsers.length == filteredData.length}
                          onClick={toggleSelectAll}
                        />
                      </strong>
                    </td>
                    <th>
                      <strong>NO.</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>User</strong>
                    </th>
                    <th>
                      <strong>Total</strong>
                    </th>
                    <th>
                      <strong>Fess(5%)</strong>
                    </th>
                    <th>
                      <strong>Amount</strong>
                    </th>
                    <th>
                      <strong>Payment Method</strong>
                    </th>
                    <th>
                      <strong>Reject</strong>
                    </th>
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map((Data, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedUsers.some(
                              (u) => u.user == Data.user
                            )}
                            onChange={(event) =>
                              handleCheckboxChange(Data, event)
                            }
                          />
                        </td>
                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td>{Data?.Name}</td>
                        <td>{Data.user}</td>
                        <td>{(Data?.withdrawAmount).toFixed(2)}</td>
                        <td>{(Data?.withdrawAmount * 0.05).toFixed(2)}</td>
                        <td>{(Data?.withdrawAmount * 0.95).toFixed(2)}</td>

                        <td className="text-center">{Data?.payment_method}</td>
                        <td>
                          {" "}
                          <button
                            style={{
                              cursor: "pointer",
                              padding: "5px 10px",
                              color: "white",
                              backgroundColor: "red",
                              fontWeight: "bold",
                              border: "none",
                              borderRadius: "4px",
                              outline: "none",
                            }}
                            onClick={() =>
                              handleReject(Data.user,Data._id, Data.withdrawAmount)
                            }
                            disabled={approveLoading[Data.user]}
                          >
                            {rejectLoading[Data.user]
                              ? "Rejecting..."
                              : "Reject"}
                          </button>
                        </td>
                        <td>{formatTimestamp(Data.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No data found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between">
                <span>
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
                </span>
              </div>
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className="filter-pagination  mt-3 ">
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
                    {"<<"}
                  </button>

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
                    {">>"}
                  </button>

                  <span className="text-white">
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

export default WithdrawClaim;
