import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Table } from "react-bootstrap";

// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Papa from "papaparse";
import { getCreatedNFtList } from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton, Pagination } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useAccount } from "wagmi";
import moment from "moment";
import { getNfts } from "./web3/transfert";
export const NFTCreationList = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const itemPerpage = 20;
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);

  const { address } = useAccount();
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [NFTCreationList, setNFTCreationList] = useState([]);

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const ShowCreatedNFTs = async () => {
    try {
      const res = await getCreatedNFtList(currentPage, itemPerpage);
      console.log(res, "getCreatedNFtList");
      console.log(currentPage, itemPerpage, "pages");
      setTotalPages(res?.pagination?.totalPages);
      const NFTListRes = res?.data || [];
      const fetchedNFTs = await Promise.all(
        NFTListRes.map(async (nft) => {
          try {
            const res = await getNfts(nft.tokenId);
            console.log(res, "getNfts");

            return {
              ...nft,
              title: res[0] || "",
              description: res[1] || "",
              price: (Number(res[4])).toFixed(4) || 0,
              owner: res[6],
              metadataURI: res[2],
              creator: res[3],
              soldDetail: nft?.soldDetail || null,
              currentPrice:
                nft?.soldDetail?.newPrice || nft?.currentPrice || res[4] || 0,
            };
          } catch (err) {
            console.error(
              `Error fetching metadata for Token ID ${nft.tokenId}:`,
              err.message
            );

            return {
              ...nft,
              title: "",
              description: "Error loading",
            };
          }
        })
      );

      setNFTCreationList(fetchedNFTs);
    } catch (error) {}
  };
  console.log(totalPages, "1234:::");
  useEffect(() => {
    ShowCreatedNFTs();
  }, [currentPage]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
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
              value={search}
              onChange={handleSearch}
            />
          </div>
          <label className="form-label" for="form1"></label>
        </div> */}

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>NFT Creation List</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>NFT Id</th>
                    <th>Creator</th>
                    <th>Price</th>
                    <th>Tx hash</th>
                    {/* <th>Ready for Sale</th> */}

                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {NFTCreationList?.length > 0 ? (
                    NFTCreationList?.map((nft, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>{nft?.tokenId}</td>
                        <td>
                          {`${nft?.creator.slice(0, 5)}...${nft?.creator.slice(
                            -4
                          )}`}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(nft?.creator)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>$ {nft?.price / 1e18}</td>

                        <td>
                          <a
                            href={`https://bscscan.com/tx/${nft?.transactionHash}`}
                            target="_blank"
                          >
                            {`${nft?.transactionHash.slice(
                              0,
                              5
                            )}...${nft?.transactionHash.slice(-4)}`}
                          </a>
                        </td>
                        {/* <td>{nft?.isReadyForSale ? "True" : "False"}</td> */}

                        <td>
                          {moment(nft.createdAt).format("DD/MM/YYYY h:mm:ss A")}
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

              <div className="filter-pagination mt-3 d-flex justify-content-center">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
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
                  shape="rounded"
                  siblingCount={1}
                  boundaryCount={1}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NFTCreationList;
