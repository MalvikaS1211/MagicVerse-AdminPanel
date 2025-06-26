import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import moment from "moment";
import { nftValueTracking } from "../../../services/api_function";

export const NFTValueTracking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [NFTList, setNFTList] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [totalNftValue, setTotalNftValue] = useState(0);

  const itemPerpage = 20;

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const ShowNFTList = async () => {
    const res = await nftValueTracking(currentPage, itemPerpage);
    console.log(res, "nftValueTracking");
    setTotalNftValue(res?.totalPrice);
    setTotalPages(res?.pagination?.totalPages);
    setNFTList(res?.data);
  };

  useEffect(() => {
    ShowNFTList();
  }, [currentPage]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>NFT Value Tracking</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <div className="d-flex">
                  <h4 style={{ marginRight: "10px" }}>Total NFT Value: </h4>
                  <h4 style={{ fontWeight: 300 }}>
                    {(totalNftValue / 1e18).toFixed(4) || 0}
                  </h4>
                </div>
              </Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Token Id</th>
                    <th>Current Estimated NFT Value</th>
                    <th>Selling Price</th>
                    <th>Tx Hash</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {NFTList?.length > 0 ? (
                    NFTList.map((NFT, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>{NFT?.tokenId}</td>
                        <td>
                          {NFT?.details?.tokenId
                            ? (Number(NFT?.details?.nftPrice) / 1e18).toFixed(4)
                            : (Number(NFT?.price) / 1e18).toFixed(4)}
                        </td>
                        <td>
                          {NFT?.details?.tokenId
                            ? (Number(NFT?.details?.newPrice) / 1e18).toFixed(4)
                            : (
                                (Number(NFT?.price) +
                                  Number(NFT?.price) * 0.03) /
                                1e18
                              ).toFixed(4)}
                        </td>
                        <td>
                          <a
                            href={`https://opbnb.bscscan.com/tx/${NFT?.transactionHash}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {NFT?.transactionHash?.slice(0, 5)}...
                            {NFT?.transactionHash?.slice(-4)}
                          </a>
                        </td>
                        <td>
                          {moment(NFT?.createdAt).format(
                            "DD/MM/YYYY h:mm:ss A"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
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
                <div className="filter-pagination mt-3">
                  <button
                    className="btn btn-success m-2"
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                  >
                    First
                  </button>
                  <button
                    className="btn btn-success m-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-success m-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                  <button
                    className="btn btn-success m-2"
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                  >
                    Last
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

export default NFTValueTracking;
