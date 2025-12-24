import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table, Pagination } from "react-bootstrap";
import {
  get15Nft,
  getDepostList,
  getReadyForBuyFn,
} from "../../../services/api_function";
import {
  approveToken,
  buyNFTFn,
  fetchUserTokenBalance,
  getNfts,
} from "./web3/transfert";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export const NFTList15 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [NFTList, setNFTList] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [isLoading, setIsLoading] = useState(false);
  const itemPerpage = 20;
  const { address } = useAccount();
  const [isfetch, setIsFetch] = useState(false);
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const ShowNFTList = async () => {
    const res = await get15Nft(currentPage, itemPerpage);
    console.log(res, "getDepostList");
    setTotalPages(res?.totalPages);
    setNFTList(res?.data);
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
            price: (Number(res[4]) / 1e18).toFixed(4) || 0,
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

    setNFTList(fetchedNFTs);
  };
  console.log(NFTList, "nft list");
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
  const tokenApp1 = async (amt) => {
    try {
      console.log("Approve Result:111", amt);
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
      console.log(totalAmount, "userBalance");
      if (Number(userBalance) < Number(totalAmount)) {
        setIsLoading(false);
        return toast.error(
          `You need at least ${Number(totalAmount)} USDT to Buy`
        );
      }
      const res = await getReadyForBuyFn(
        address,
        Number(initialPrice),
        title,
        description,
        metadataURI,
        tokenId,
        Number(totalAmount)
      );
      console.log(totalAmount, "totalAmount");
      if (res) {
        const tokenApp = await tokenApp1(Number(totalAmount) + 0.1);
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
              placeholder="Search by user..."
              autoComplete="off"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div> */}

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>15 $ NFT List</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Token Id</th>
                    <th>Price</th>
                    <th>Owner</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {NFTList?.length > 0 ? (
                    NFTList?.map((nft, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>{nft?.tokenId}</td>
                        <td>{nft?.price}</td>
                        <td>{nft?.owner}</td>
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
                                "nft buy 15"
                              );
                              BuyNft(
                                nft?.price,
                                nft?.title,
                                nft?.description,
                                nft?.metadataURI,
                                nft?.tokenId,
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

export default NFTList15;
