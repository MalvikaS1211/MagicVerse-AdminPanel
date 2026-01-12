import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Tooltip, IconButton, Pagination } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import {
  getActiveUserslast24Hours,
  getAdminDashboard,
} from "../../../services/api_function";
import { useAccount } from "wagmi";

export const Alluser = () => {
  const { address } = useAccount();
  const [usersList, setUsersList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeList, setActiveList] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemPerPage = 20;

  const [tooltipText, setTooltipText] = useState("Copy address");
  const [searchValue, setSearchValue] = useState("");

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const allUsers = async (search) => {
    try {
      setLoading(true);
      const res = await getAdminDashboard(currentPage, itemPerPage, search);
      setTotalPages(res?.totalPages);
      setUsersList(res.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ShowActiveUserList = async () => {
    const res = await getActiveUserslast24Hours(1, 500);

    setActiveList(res?.data);
    // setNFTList(res?.data);
  };
  useEffect(() => {
    allUsers("");
  }, [currentPage]);
  useEffect(() => {
    ShowActiveUserList();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchValue(query);
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
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Fragment>
      <Row className="mb-4"></Row>
      <Row>
        <div className="display_end gap-1">
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              className="form-control"
              placeholder="Search here by address..."
              autoComplete="off"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>

          <button
            type="button"
            className="next-button btn btn-success pointer border"
            onClick={() => {
              allUsers(searchValue);
            }}
            style={{ padding: "5px 10px" }}
          >
            Search
          </button>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User Id</th>
                    <th>Active User</th>
                    <th>User</th>
                    <th>Referral</th>
                    <th>Tx Hash</th>
                    <th>Team</th>
                    <th>Direct</th>
                    <th>Date & Time</th>
                    <th>Package</th>
                    <th>Amount</th>
                    <th>Allow</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList?.length > 0 ? (
                    usersList?.map((user, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                        <td>{user?.uniqueRandomId}</td>
                        <td>
                          {user?.user?.slice(0, 5)}...
                          {user?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(user?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>
                          {activeList?.some((it) => it._id === user.user)
                            ? "TRUE"
                            : "FALSE"}
                        </td>

                        <td>
                          {user?.referrer?.slice(0, 5)}...
                          {user?.referrer?.slice(-4)}
                          {/* <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(user?.referrer)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip> */}
                        </td>
                        {/* <td>{cutAfterDecimal(user?.depositWallet, 2)}</td> */}
                        <td>
                          <a
                            href={`https://bscscan.com/tx/${user?.transactionHash}`}
                            target="_blank"
                          >
                            {`${user?.transactionHash.slice(
                              0,
                              5
                            )}...${user?.transactionHash.slice(-4)}`}
                          </a>
                        </td>
                        <td>{user?.totalTeamCount}</td>
                        <td>{user?.totalDirectCount}</td>

                        <td>
                          {moment(user.createdAt).format(
                            "DD/MM/YYYY h:mm:ss A"
                          )}
                        </td>
                        <td>
                          {user?.packages[0]?.userPackage
                            ? user?.packages[0]?.userPackage
                            : "No Package"}
                        </td>
                        <td>
                          {user?.packages[0]?.amount
                            ? `$ ${user?.packages[0]?.amount / 1e18}`
                            : "0"}
                        </td>
                        <td>{user?.isAllowed ? "True" : "False"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center">
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

export default Alluser;
