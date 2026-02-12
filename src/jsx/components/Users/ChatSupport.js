import React, { useEffect, useState } from "react";
import { Card, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  ChangeStatusFn,
  getAllTicket,
  getDepostList,
} from "../../../services/api_function";
import moment from "moment";
import toast from "react-hot-toast";
import { Tooltip, IconButton } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";

const ChatSupport = () => {
  const [allTicket, setAllTicket] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tooltipText, setTooltipText] = useState("Copy address");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemPerpage = 20;
  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    setTooltipText("User Address Copied !");
    setTimeout(() => setTooltipText("Copy user address"), 2000);
  };
  const getAllTickets = async () => {
    try {
      const res = await getAllTicket(currentPage, itemPerpage, search);
      setTotalPages(res.totalPages);
      setAllTicket(res.data);
    } catch (error) {
      console.log("error in getAllTickets", error);
    }
  };

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

  useEffect(() => {
    getAllTickets();
  }, [currentPage, search]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Support </Card.Title>
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
        </Row>
      </Card.Header>
      <Card.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>User Address</th>

              <th>User Name</th>

              <th>Subject</th>
              <th>Ticket Generated Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allTicket.map((item, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  if (item?.Status === true) {
                    navigate(
                      `/admin/support-chat?msgId=${item._id}&userAddress=${item.UserAddress}`
                    );
                  } else {
                    e.stopPropagation();
                    toast.error("Window is Closed!");
                  }
                }}
              >
                <td>{index + 1}</td>
                <td>
                  {item?.UserAddress?.slice(0, 6)}...
                  {item?.UserAddress?.slice(-6)}
                  <Tooltip title={tooltipText} arrow>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // prevents parent click
                        handleCopy(item?.UserAddress); // your copy logic
                      }}
                      size="small"
                      style={{ marginLeft: 4 }}
                    >
                      <FaRegCopy />
                    </IconButton>
                  </Tooltip>
                </td>
                <td>{item?.UserName}</td>
                <td
                  style={{
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                    whiteSpace: "pre-wrap",
                    width: "50%",
                  }}
                >
                  {item?.Subject}
                </td>
                <td>{moment(item?.createdAt).format("DD-MM-YYYY h:mm A")}</td>

                <td>
                  <div className="d-flex">
                    <a
                      // type="button"
                      // className="next-button btn btn-success pointer border m-2"
                      className=""
                      style={{ color: "#0f0fed" }}
                      onClick={async (e) => {
                        e.stopPropagation();
                        await ChangeStatusFn(item._id, !item.Status);
                        toast.success("Status Changed !");
                        setTimeout(() => {
                          getAllTickets();
                        }, 1000);
                      }}
                    >
                      {item?.Status === true ? "Open" : "Closed"}
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center mb-3 col-lg-6" style={{ margin: "auto" }}>
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
  );
};

export default ChatSupport;
