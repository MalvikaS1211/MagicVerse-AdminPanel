import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Tooltip, IconButton, Pagination } from "@mui/material";
import { FaRegCopy, FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import { getDirectUsers } from "../../../services/api_function";
import { useParams } from "react-router-dom";

export const DirectUser = () => {
  const { userid } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [NFTList, setNFTList] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [showTable, setShowTable] = useState(false);
  const itemPerpage = 20;
  const [refAddress, setRefAddress] = useState("");

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    setTooltipText("Token Id Copied !");
    setTimeout(() => setTooltipText("Copy Token Id"), 2000);
  };

  useEffect(() => {
    if (userid) {
      setRefAddress(userid);
      const fetchData = async () => {
        const res = await getDirectUsers(currentPage, itemPerpage, userid);
        setTotalPages(res?.totalPages);
        setNFTList(res?.data);
        setShowTable(true);
      };
      fetchData();
    }
  }, [userid, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>
                <IconButton onClick={() => window.history.back()}>
                  <FaArrowLeft />
                </IconButton>{" "}
                User Directs List
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Token Id</th>
                      <th>Creator</th>

                      <th>Price</th>
                      <th>Tx Hash</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NFTList?.length > 0 ? (
                      NFTList?.map((NFT, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                          <td>
                            {NFT?.tokenId}
                            <Tooltip title={tooltipText} arrow>
                              <IconButton
                                onClick={() => handleCopy(NFT?.tokenId)}
                                size="small"
                                style={{ marginLeft: 4 }}
                              >
                                <FaRegCopy />
                              </IconButton>
                            </Tooltip>
                          </td>
                          <td>
                            {NFT?.buyer?.slice(0, 5)}...
                            {NFT?.buyer?.slice(-4)}
                          </td>

                          <td>$ {Number(NFT?.buyerPaid / 1e18).toFixed(4)}</td>
                          <td>
                            <a
                              href={`https://bscscan.com/tx/${NFT?.transactionHash}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {NFT?.transactionHash?.slice(0, 5)}...
                              {NFT?.transactionHash?.slice(-4)}
                            </a>
                          </td>

                          <td>
                            {moment
                              .unix(NFT.time)
                              .format("DD/MM/YYYY h:mm:ss A")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No Records Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div className="filter-pagination mt-3 d-flex justify-content-center">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#0c0c0cff",
                        border: "1px solid #cbcbcb",
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#047dff !important",
                        color: "#fff !important",
                        fontWeight: "600",
                      },
                      "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "#c9a14a22",
                      },
                    }}
                  />
                </div>
              </>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DirectUser;
