import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllTicket, getDepostList } from "../../../services/api_function";
import moment from "moment";

const ChatSupport = () => {
  const [depositList, setDepositList] = useState([]);
  const [allTicket, setAllTicket] = useState([]);
  const navigate = useNavigate();

  // const ShowDepositList = async () => {
  //   const res = await getDepostList(1, 20); // Adjust pagination as needed
  //   setDepositList(res?.data || []);
  // };

  // useEffect(() => {
  //   ShowDepositList();
  // }, []);

  const tableArray = [
    { uniqueId: 1, Subject: "NFT", UpdateDate: "24/4/25", Status: "Success" },
    { uniqueId: 2, Subject: "NFT2", UpdateDate: "29/4/25", Status: "Success" },
  ];

  const getAllTickets = async () => {
    const res = await getAllTicket();
    console.log("getAllTickets", res);
    setAllTicket(res.data);
  };
  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Support Queries</Card.Title>
      </Card.Header>
      <Card.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Subject</th>
              <th>Ticket Generate Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allTicket.map((item, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/admin/support-chat?msgId=${item._id}&userAddress=${item.UserAddress}`
                  )
                }
              >
                <td>{index + 1}</td>
                <td>{item?.Subject}</td>
                <td>
                  {moment(item?.createdAt).format("DD-MM-YYYY h:mm:ss A")}
                </td>
                <td>{item?.Status == true ? "Open" : "Closed"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ChatSupport;
