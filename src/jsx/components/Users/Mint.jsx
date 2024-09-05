import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import Web3 from "web3";

import { Row, Col, Card, Table } from "react-bootstrap";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { polygonMint, registration } from "./web3/web3Helper";
import { useAccount } from "wagmi";
import { getMintRecord } from "../../../services/api_function";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setChainAction } from "../../../store/actions/AuthActions";
export const Mint = () => {
  const web3 = new Web3(new Web3(window.ethereum));
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { address } = useAccount();
  const [apiStatus, setApiStatus] = useState("Loading...");
  const selectChain  = useSelector((state=>state.auth.selectChain));

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    address: "",
    price: "",
  });

  useEffect(() => {
    console.log(currentPage);
    const userDetails = localStorage.getItem("userDetails");
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token;
    const fetchData = async () => {
      try {
        const res = await getMintRecord(currentPage, token);
        setApiData(res.data.data);
        setTotalPages(res.data.totalPages);
        if (res.data.data) {
          setApiStatus("No Record");
        }
      } catch (error) {
        console.log("Error in mintpage", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const setInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mint = async (e) => {
    e.preventDefault();
    try {
      let res;
      if(selectChain==="bsc"){
        res = await registration(
         formData.address,
         formData.price,
         address,
         web3
       );
      }
      else{
        res = await polygonMint(
         formData.address,
         formData.price,
         address,
         web3
       );
      }
      console.log(res);
      if (res) {
        toast.success("Mint Successfully..!");
        setFormData({
          address: "",
          price: "",
        });
      } else {
        toast.error("Mint failed..!");
      }
    } catch (error) {
      console.log("Error in mint function()", error.message);
    }
  };
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
              
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Mint
              </Card.Title>
            </Card.Header>
            <Card.Body
            
            >
              <div className="col-md-12">
                <div className="float-end">
                  <ConnectButton />
                </div>
                <div className="container">
                  <form className="ms-5" onSubmit={mint}>
                    <div class="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label fs-4 text-white"
                      >
                        Chain
                      </label>
                      <span>
                        <select
                          className="form-control"
                          style={{ width: "30rem" }}
                          onChange={(e) =>(
                            dispatch(setChainAction(e.target.value))
                          )
                            
                          }
                          required
                        >
                          <option value="">---Select Chain---</option>
                          <option value="polygon">Polygon</option>
                          <option value="bsc">Bsc</option>
                        </select>
                      </span>
                      <label
                        for="exampleInputEmail1"
                        className="form-label fs-4 text-white mt-3"
                      >
                        Address
                      </label>
                      <span>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="form-control"
                          placeholder="Enter Address"
                          style={{ width: "30rem" }}
                          value={formData.address}
                          onChange={setInput}
                          required
                        />
                      </span>
                    </div>
                    <div class="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label fs-4 text-white"
                      >
                        Amount
                      </label>
                      <span>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className="form-control"
                          placeholder="Enter Amount"
                          style={{ width: "30rem" }}
                          value={formData.price}
                          onChange={setInput}
                          required
                        />
                      </span>
                    </div>

                    <button
                      className="btn btn-md"
                      style={{
                        background:
                          " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                        color: "black",
                      }}
                      // onClick={mint}
                      type="submit"
                    >
                      Mint
                    </button>
                  </form>
                </div>
              </div>
              <table className="table border mt-5">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-center text-white fs-4"
                      colspan="4"
                    >
                      Mint Records
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr className="text-center text-white">
                    <th scope="col">No</th>
                    <th scope="col">User Address</th>
                    <th scope="col">Chain</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {!apiData[0] ? (
                    <td colSpan="3" className="text-center">
                      {apiStatus}
                    </td>
                  ) : (
                    apiData?.map((item, index) => (
                      <tr className="text-center text-white" key={index}>
                        <th scope="col">{index + 1}</th>
                        <th scope="col">{item?.toAddress}</th>
                        <th scope="col">{item?.chain}</th>
                        <th scope="col">{(item?.value / 1e18).toFixed(2)}</th>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="text-center">
                <button
                  className="btn btn-md"
                  style={{
                    background:
                      " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                    color: "black",
                  }}
                  onClick={() => setCurrentPage((pre) => pre - 1)}
                  disabled={currentPage == 1 ? 1 : 0}
                >
                  Previous
                </button>
                <button
                  className="btn btn-md ms-2"
                  style={{
                    background:
                      " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                    color: "black",
                  }}
                  onClick={() => setCurrentPage((pre) => pre + 1)}
                  disabled={currentPage === totalPages ? 1 : 0}
                >
                  Next
                </button>
                <span className=" text-white ms-2">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Mint;
