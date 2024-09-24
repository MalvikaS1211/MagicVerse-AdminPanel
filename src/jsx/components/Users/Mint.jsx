import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import Web3 from "web3";

import { Row, Col, Card, Table, CardHeader } from "react-bootstrap";
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
  const selectChain = useSelector((state) => state.auth.selectChain);

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
      if (selectChain === "bsc") {
        res = await registration(
          formData.address,
          formData.price,
          address,
          web3
        );
      } else {
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
            <CardHeader>
            <div className="m-auto">
               <div> <ConnectButton /></div>
              </div>
            </CardHeader>
            <Card.Body>
             
              <form className="row" onSubmit={mint}>
                <div class="col-lg-3 mb-3">
                  <label for="selectchain" className="form-label">
                    Chain
                  </label>
                  <span>
                    <select
                      className="form-control"
                      onChange={(e) => dispatch(setChainAction(e.target.value))}
                      required
                    >
                      <option value="">---Select Chain---</option>
                      <option value="polygon">Polygon</option>
                      <option value="bsc">Bsc</option>
                    </select>
                  </span>
                </div>
                <div className="col-lg-3 mb-3">
                  <label for="address" className="form-label">
                    Address
                  </label>
                  <span>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="form-control"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={setInput}
                      required
                    />
                  </span>
                </div>
                <div class="col-lg-3 mb-3">
                  <label for="price" className="form-label">
                    Amount
                  </label>
                  <span>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="form-control"
                      placeholder="Enter Amount"
                      value={formData.price}
                      onChange={setInput}
                      required
                    />
                  </span>
                </div>

                <div className="col-lg-3">
                  <label for="button" className="form-label">
                    &nbsp;
                  </label>
                  <div>
                    <button className="action_btn" type="submit">
                    Mint
                    </button>
                  </div>
                </div>
                
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Mint</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <table className="table">                
                   
                  <thead>
                    <tr className="text-center">
                      <th scope="col">S.No.</th>
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
                        <tr className="text-center" key={index}>
                          <td scope="col">{index + 1}</td>
                          <td scope="col">{item?.toAddress}</td>
                          <td scope="col">{item?.chain}</td>
                          <td scope="col">{(item?.value / 1e18).toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="text-center mb-3 col-lg-6 m-auto">
                  <div className="filter-pagination mt-5">
                    <button
                      className="previous-button"
                      onClick={() => setCurrentPage((pre) => pre - 1)}
                      disabled={currentPage == 1 ? 1 : 0}
                    >
                      Previous
                    </button>
                    <button
                      className="next-button"
                      onClick={() => setCurrentPage((pre) => pre + 1)}
                      disabled={currentPage === totalPages ? 1 : 0}
                    >
                      Next
                    </button>
                    <span className="ms-2">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Mint;
