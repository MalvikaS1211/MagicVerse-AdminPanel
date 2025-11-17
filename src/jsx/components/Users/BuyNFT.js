import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import {
  getStakingList,
  approveRejectStaking,
  getReadyForBuyFn,
  getLastNFTs,
  getTradeUserFn,
} from "../../../services/api_function";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useAccount } from "wagmi";
import moment from "moment";
import {
  approveToken,
  buyNFTFn,
  fetchUserTokenBalance,
  getNfts,
} from "./web3/transfert";
import axios from "axios";
export const BuyNFT = () => {
  const { wallet } = useSelector((state) => state.login);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [recordStatus, setRecordStatus] = useState("Loading...");
  //   const [isFetch, setIsFetch] = useState(false);
  const [isfetch, setIsFetch] = useState(false);
  const [limit] = useState(1);
  const { address } = useAccount();
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [NFTList, setNFTList] = useState([]);
  const [totalvalue, setTotalValue] = useState(0);
  const [totalcount, setTotalCount] = useState(0);
  const itemPerpage = 10;
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [allTrade, setAllTrade] = useState([]);
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const NFTListing = async () => {
    try {
      setLoading(true);

      const res = await getLastNFTs(currentPage, itemPerpage);
      const data = res?.data || [];
      const pagination = res?.pagination || res?.data?.pagination || {};

      const mappedData = await Promise.all(
        data.map(async (trade) => {
          try {
            const res = await getNfts(trade.tokenId);
            const ipfsHash = res[2].replace("ipfs://", "");

            const gateways = [
              "https://ipfs.io/ipfs/",
              "https://gateway.pinata.cloud/ipfs/",
              "https://cloudflare-ipfs.com/ipfs/",
            ];

            let metadata;

            for (const gateway of gateways) {
              try {
                const response = await axios.get(`${gateway}${ipfsHash}`, {
                  timeout: 5000,
                });
                metadata = response.data;
                break;
              } catch {
                console.warn(`Failed to fetch from ${gateway}, trying next...`);
              }
            }

            if (!metadata) throw new Error("All IPFS gateways failed");

            const imageUrl = metadata.image
              ? metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
              : "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31";

            return {
              ...trade,
              title: metadata.name || "",
              description: metadata.description || "",
              img: imageUrl,
              price: res[4],
              owner: res[6],
              metadataURI: res[2],
              creator: res[3],
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
              img: "",
            };
          }
        })
      );

      console.log(mappedData, "mappedData");
      // setCurrentPage(res.page || 1);
      setTotalPages(res.totalPages || 1);
      setTotalCount(res.totalItems || 0);

      // Set NFT list
      setNFTList(mappedData);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    NFTListing();
  }, [currentPage, searchValue]);

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
      console.log("123");

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
        // console.log("time :");
      }, 5000);
      // socket.emit("TradeDone", tokenId);
      setIsLoading(false);
    }
  };

  const getTrade = async () => {
    try {
      if (!address) {
        return;
      }
      setApiLoading(true);

      const { data: userTrades } = await getLastNFTs();
      console.log(userTrades, "userTrades");
      return;
      const fetchedTrades = await Promise.all(
        userTrades.map(async (trade) => {
          try {
            const res = await getNfts(trade.tokenId);
            console.log(res, "getNfts");
            const ipfsHash = res[2].replace("ipfs://", "");

            const gateways = [
              "https://ipfs.io/ipfs/",
              "https://gateway.pinata.cloud/ipfs/",
              "https://cloudflare-ipfs.com/ipfs/",
            ];

            let metadata, metadataUrl;

            for (const gateway of gateways) {
              try {
                metadataUrl = `${gateway}${ipfsHash}`;
                const response = await axios.get(metadataUrl, {
                  timeout: 5000,
                });
                metadata = response.data;
                break;
              } catch (error) {
                console.warn(`Failed to fetch from ${gateway}, trying next...`);
              }
            }

            if (!metadata) throw new Error("All IPFS gateways failed");

            // Fix image URL
            const imageUrl = metadata.image
              ? metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
              : "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31";

            return {
              ...trade,
              title: metadata.name || "",
              description: metadata.description || "",
              img: imageUrl,
              price: res[4],
              owner: res[6],
              metadataURI: res[2],
              creator: res[3],
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
              img: "",
            };
          }
        })
      );
      console.log(
        fetchedTrades.length,
        "fetchedTrades length",
        userTrades.length
      );
      setAllTrade(fetchedTrades);
      return;
    } catch (error) {
      setApiLoading(false);
      console.error("Error fetching user-created NFTs:", error);
    }
  };

  useEffect(() => {
    getTrade();
  }, []);

  return (
    <Fragment>
      <Row>
        <div className="display_end " style={{ display: "flex", gap: "3px" }}>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here by User Address..."
              autoComplete="off"
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                // ShowDueNFT(value); // fetch data with search tokenId
              }}
            />
          </div>
          {/* <button
            type="button"
            className="btn btn-success p-2 pointer border "
            onClick={() => {
              NFTListing(searchValue);
            }}
          >
            Serach
          </button> */}
          <label className="form-label" htmlFor="form1"></label>
        </div>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Buy NFT</Card.Title>
              {/* <Card.Title>Total Count : {totalcount} NFT</Card.Title> */}
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Token Id</th>
                    <th>Buyer</th>
                    <th>Sales Count</th>
                    <th>NFT Price</th>
                    <th>Date & Time</th>
                    <th>Buy </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        <div className="d-flex justify-content-center align-items-center py-4">
                          <div
                            className="spinner-border text-success"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : NFTList?.length > 0 ? (
                    NFTList?.map((nft, index) => (
                      <tr key={nft._id}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>{nft?.tokenId}</td>

                        <td>{nft?.buyer}</td>
                        <td>{nft?.salesCount}</td>
                        <td>
                          {isNaN(Number(nft?.price))
                            ? "0.0000"
                            : (Number(nft.price) / 1e18).toFixed(4)}
                        </td>

                        <td>
                          {moment(nft.createdAt).format("M/D/YYYY h:mm:ss A")}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="next-button btn btn-success pointer border"
                            onClick={() => {
                              console.log(
                                nft.price,
                                nft.title,
                                nft.description,
                                nft.metadataURI,
                                nft.tokenId,
                                Number(nft.price),
                                "testing"
                              );
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
                    className="next-button btn btn-success pointer border m-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    className="next-button btn btn-success pointer border m-2 "
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages} // ✅ fixed
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

export default BuyNFT;
