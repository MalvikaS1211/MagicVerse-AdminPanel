import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import moment from "moment";
import { getIncomeRequest } from "../../../services/api_function";
import { multiSend } from "./web3/transfert";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
export const SalaryRequests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [NFTList, setNFTList] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");
  const itemPerpage = 20;

  const [selectedUser, setSelectedUser] = useState([]);

  const isAllSelected =
    NFTList?.length > 0 &&
    NFTList?.every((item) => selectedUser.includes(item._id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newIds = NFTList?.map((nft) => nft._id);
      const uniqueIds = Array.from(new Set([...selectedUser, ...newIds]));
      setSelectedUser(uniqueIds);
    } else {
      const currentIds = NFTList.map((nft) => nft._id);
      setSelectedUser(selectedUser.filter((id) => !currentIds.includes(id)));
    }
  };

  const handleSelect = (id) => {
    if (selectedUser.includes(id)) {
      setSelectedUser(selectedUser.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedUser([...selectedUser, id]);
    }
  };

  const handleApproveSelected = async () => {
    if (selectedUser.length === 0) return;

    const selectedData = NFTList.filter((item) =>
      selectedUser.includes(item._id),
    );

    const users = selectedData.map((item) => item.user);
    const amounts = selectedData.map((item) => (item.income * 1e18));
    const objectIds = selectedData.map((item) => item._id);
    const statusArr = selectedData.map(() => "claimed");

    try {
      console.log("Approving:", users, amounts, statusArr, objectIds);

      const tx = await multiSend(users, amounts, statusArr, objectIds);

      console.log("Transaction Receipt:", tx);

      toast.success("Approved Successfully!");
      setTimeout(() => {
        ShowNFTList();
        setSelectedUser([]);
      }, 3000);
    } catch (error) {
      console.error("Approve Error:", error);
      toast.error("Approve failed!");
    }
  };

  const handleRejectSelected = async () => {
    if (selectedUser.length === 0) return;

    const selectedData = NFTList.filter((item) =>
      selectedUser.includes(item._id),
    );

    const users = selectedData.map((item) => item.user);
    const amounts = selectedData.map(
      (item) => (item.income * 1e18), // Ensure BigInt for wei conversion
    );
    const objectIds = selectedData.map((item) => item._id);
    const statusArr = selectedData.map(() => "rejected");

    try {
      console.log("Rejecting:", users, amounts, statusArr, objectIds);

      const tx = await multiSend(users, amounts, statusArr, objectIds);

      console.log("Transaction Receipt:", tx);

      toast.success("Rejected Successfully!");
      setTimeout(() => {
        ShowNFTList();
        setSelectedUser([]);
      }, 3000);
    } catch (error) {
      console.error("Reject Error:", error);
      toast.error("Reject failed!");
    }
  };
  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    setTooltipText("Token Id Copied !");
    setTimeout(() => setTooltipText("Copy Token Id"), 2000);
  };
  const { account } = useAccount();
  const ShowNFTList = async () => {
    const res = await getIncomeRequest(
      currentPage,
      itemPerpage,
      search,
      "pending",
    );

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
      prevPage < totalPages ? prevPage + 1 : prevPage,
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <Fragment>
      <Row>
        <div className="display_end">
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
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title>Salary Requests</Card.Title>
              <div>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={handleApproveSelected}
                  disabled={selectedUser?.length === 0}
                >
                  Approve Selected
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleRejectSelected}
                  disabled={selectedUser.length === 0}
                >
                  Reject Selected
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                          style={{ cursor: "pointer" }}
                        />
                        S.No.
                      </div>
                    </th>
                    <th>Creator</th>
                    <th>Income</th>

                    <th>Income Type</th>

                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {NFTList?.length > 0 ? (
                    NFTList?.map((NFT, index) => (
                      <tr key={index}>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedUser.includes(NFT?._id)}
                              onChange={() => handleSelect(NFT?._id)}
                              style={{ cursor: "pointer" }}
                            />
                            {(currentPage - 1) * itemPerpage + index + 1}
                          </div>
                        </td>
                        <td>
                          {NFT?.user?.slice(0, 5)}...
                          {NFT?.user?.slice(-4)}
                        </td>
                        <td>{NFT?.income}</td>
                        <td>{NFT?.incomeType}</td>

                        <td>
                          {moment
                            .unix(NFT.timestamp)
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

              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className="filter-pagination mt-3">
                  <button
                    className="next-button btn btn-success pointer border m-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
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

export default SalaryRequests;
