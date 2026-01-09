import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { getAllBulkPackages } from "../../../services/api_function";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";

import { useAccount } from "wagmi";
import moment from "moment";
export const BulkPackage = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);

  const { address } = useAccount();
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [BulkPackage, setBulkPackage] = useState([]);

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const ShowBulkPackage = async () => {
    const res = await getAllBulkPackages();

    setBulkPackage(res?.userMaturedNfts);
  };

  useEffect(() => {
    ShowBulkPackage();
  }, [address, search]);

  return (
    <Fragment>
      <Row>
        {/* <div className="display_end">
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
        </div> */}

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Bulk Package</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>NFT Id</th>

                    <th>Date & Time</th>
                    <th>Creator</th>
                    <th>Last Buyer</th>
                    <th>Status</th>
                    <th>Tx Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {BulkPackage?.length > 0 ? (
                    BulkPackage?.map((pkg, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>{pkg?.tokenId}</td>

                        <td>
                          {moment(pkg.createdAt).format("M/D/YYYY h:mm:ss A")}
                        </td>

                        <td>{`${pkg?.nftCreatedDetails?.creator.slice(
                          0,
                          5
                        )}...${pkg?.nftCreatedDetails?.creator.slice(-4)}`}</td>

                        <td>
                          {pkg?.soldData?.[0]?.toUser
                            ? `${pkg.soldData[0].toUser.slice(
                                0,
                                5
                              )}...${pkg.soldData[0].toUser.slice(-4)}`
                            : "N/A"}
                        </td>

                        {/* <td>{pkg?.soldData[0]?.toUser}</td> */}

                        <td
                          style={{
                            color: pkg?.soldData[0]?.toUser ? "green" : "red",
                          }}
                        >
                          {pkg?.soldData[0]?.toUser ? "Sold" : "Not Sold"}
                        </td>
                        <td>
                          <a
                            href={`https://opbnb.bscscan.com/tx/${pkg?.soldData[0]?.transactionHash}`}
                            target="_blank"
                          >
                            {pkg?.soldData[0]?.transactionHash
                              ? `${pkg?.soldData[0]?.transactionHash.slice(
                                  0,
                                  5
                                )}...${pkg?.soldData[0]?.transactionHash.slice(
                                  -4
                                )}`
                              : "N/A"}
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Records Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

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

export default BulkPackage;
