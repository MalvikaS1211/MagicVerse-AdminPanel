import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Tooltip, IconButton, useForkRef, Pagination } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import {
  AddNFTInQueue,
  DeleteNFt,
  getAllNFTInQueue,
  getReadyForBuyFn,
} from "../../../services/api_function";
import toast from "react-hot-toast";
import {
  approveToken,
  buyNFTFn,
  fetchUserTokenBalance,
  getNfts,
} from "./web3/transfert";
import { useAccount } from "wagmi";

export const AddNFTToQueue = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tokenId, setTokenId] = useState();
  const [tokenIdToDelete, setTokenIdToDelete] = useState();
  const [totalnft, setTotalNFT] = useState(0);
  const [dataList, setDataList] = useState({});
  const [totalNftValue, setTotalNftValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isfetch, setIsFetch] = useState(false);

  const { address } = useAccount();

  const itemPerpage = 20;
  const handleAddNFT = async () => {
    try {
      const response = await AddNFTInQueue(tokenId);
      if (response.success == true) {
        toast.success("NFT added in queue !");
      } else {
        toast.error(response?.message);
      }
      setTokenId("");
      setTimeout(() => {
        handleDataShow();
      }, 3000);
    } catch (error) {
      const msg = error?.response?.data?.message;
      toast.error(msg);
    }
  };
  const handleDataShow = async () => {
    try {
      const res = await getAllNFTInQueue(currentPage, itemPerpage);

      setTotalPages(res?.pagination?.totalPages);
      setTotalNFT(res?.pagination?.totalCount);
      setTotalNftValue(res?.TotalNFTValue?.[0]?.totalNewPrice);

      const mappedData = await Promise.all(
        (res?.data || []).map(async (trade) => {
          try {
            const nftRes = await getNfts(trade.tokenId);

            return {
              ...trade,
              title: nftRes?.[0] || "", 
              description: nftRes?.[1] || "",
              metadataURI: nftRes?.[2],
              creator: nftRes?.[3],
              price: Number(nftRes?.[4])  ,
              owner: nftRes?.[6],
            };
          } catch (err) {
            console.error(
              `Error fetching metadata for Token ID ${trade.tokenId}:`,
              err.message
            );
            return {
              ...trade,
              title: "",
              description: "Error loading",
            };
          }
        })
      );

      setDataList(mappedData);
    } catch (error) {
      console.log("Error in handleDataShow", error);
    }
  };
  const handleDeleteNFT = async () => {
    try {
      const response = await DeleteNFt(tokenIdToDelete);
      toast.success("NFT deleted !");
      setTimeout(() => {
        handleDataShow();
      }, 3000);
    } catch (error) {
      const msg = error?.response?.data?.message;
      toast.error(msg);
    }
  };

  useEffect(() => {
    handleDataShow();
  }, [currentPage]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const tokenApp1 = async (amt) => {
    try {
      const appres = await toast.promise(approveToken(amt), {
        loading: "Approval in process",
        success: "Successfully Approved",
        error: "Approval failed",
      });

      return appres;
    } catch (error) {
      console.error("Approval error:", error);
      return false;
    }
  };

  const BuyNft = async (
    initialPrice,
    title,
    description,
    metadataURI,
    tokenId,
    totalAmount
  ) => {
    try {
      setIsLoading(true);

      const userBalance = await fetchUserTokenBalance(address);

      if (Number(userBalance) < Number(totalAmount) / 1e18) {
        setIsLoading(false);
        return toast.error(
          `You need at least ${Number(totalAmount) / 1e18} USDT to Buy`
        );
      }

      const res = await getReadyForBuyFn(
        address,
        Number(initialPrice) / 1e18,
        title,
        description,
        metadataURI,
        tokenId,
        Number(totalAmount) / 1e18
      );

      if (res) {
        const tokenApp = await tokenApp1(Number(totalAmount) / 1e18 + 0.1);
        if (tokenApp) {
          const nft = buyNFTFn(
            tokenId,
            res.vrs.initialPrice,
            res.vrs.signature.v,
            res.vrs.signature.r,
            res.vrs.signature.s,
            res.vrs.title,
            res.vrs.description,
            res.vrs.metadataURI
          );
          await toast.promise(nft, {
            loading: "Processing buy...",
            success: "NFT Buy successfully!",
            error: "Nft Buy failed!",
          });

          setIsLoading(false);
        }
        setIsLoading(false);
      }

      setIsLoading(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
      setIsLoading(false);
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsFetch(!isfetch);
      }, 5000);
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Add NFT to queue</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <label>Add NFT</label>
                <Col className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2 "
                    style={{ padding: "23px" }}
                    placeholder="Enter Token Id"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddNFT}
                  >
                    Submit
                  </button>
                </Col>
              </Row>
              <Row className="mb-4">
                <label>Delete NFT</label>
                <Col className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2 "
                    style={{ padding: "23px" }}
                    placeholder="Enter Token Id"
                    value={tokenIdToDelete}
                    onChange={(e) => setTokenIdToDelete(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleDeleteNFT}
                  >
                    Submit
                  </button>
                </Col>
              </Row>

              <Row>
                <div className="d-flex">
                  <h4 style={{ marginRight: "10px" }}>Total NFT : </h4>
                  <h4 style={{ fontWeight: 300 }}>{totalnft} </h4>
                </div>
              </Row>

              <Row>
                <div className="d-flex">
                  <h4 style={{ marginRight: "10px" }}>Total NFT Value: </h4>
                  <h4 style={{ fontWeight: 300 }}>
                    {(totalNftValue / 1e18).toFixed(4)}
                  </h4>
                </div>
              </Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Token Id</th>
                    <th>Buyer</th>
                    <th>Sales Count</th>
                    <th>Current Price</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.length > 0 ? (
                    dataList.map((nft, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>

                        <td>{nft?.tokenId}</td>
                        <td>{nft?.soldDetail?.buyer}</td>
                        <td>{nft?.soldDetail?.salesCount || 0}</td>
                        <td>
                          {((nft?.price || 0) / 1e18).toFixed(4)}
                        </td>
                        <td>
                          {moment
                            .unix(nft.lastSoldTime)
                            .format("DD-MM-YYYY hh:mm A")}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="next-button btn btn-success pointer border"
                            onClick={() => {
                           
                              BuyNft(
                                nft.price,
                                nft.title,
                                nft.description,
                                nft.metadataURI,
                                nft.tokenId,
                                Number(nft.price)
                              );
                            }}
                          >
                            Buy
                          </button>
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

export default AddNFTToQueue;
