import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Tooltip, IconButton, Pagination } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import moment from "moment";
import { getDepostList } from "../../../services/api_function";

export const Deposit = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [depositList, setDepositList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tooltipText, setTooltipText] = useState("Copy address");

  const itemPerpage = 20;

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy address"), 2000);
  };

  const ShowDepositList = async () => {
    const res = await getDepostList(currentPage, itemPerpage);
 
    setTotalPages(res?.totalPages);
    setDepositList(res?.data);
  };

  useEffect(() => {
    ShowDepositList();
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
              <Card.Title>Deposit</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Tx Hash</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {depositList?.length > 0 ? (
                    depositList?.map((deposit, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>
                          {deposit?.user?.slice(0, 5)}...
                          {deposit?.user?.slice(-4)}
                          <Tooltip title={tooltipText} arrow>
                            <IconButton
                              onClick={() => handleCopy(deposit?.user)}
                              size="small"
                              style={{ marginLeft: 4 }}
                            >
                              <FaRegCopy />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td>$ {deposit?.amount / 1e18}</td>

                        <td>
                          <a
                            href={`https://bscscan.com/tx/${deposit?.transactionHash}`}
                            target="_blank"
                          >
                            {deposit?.transactionHash.slice(0, 5)}...
                            {deposit?.transactionHash.slice(-4)}
                          </a>
                        </td>
                        <td>
                          {moment(deposit.createdAt).format(
                            "DD/MM/YYYY h:mm:ss A"
                          )}
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

export default Deposit;
