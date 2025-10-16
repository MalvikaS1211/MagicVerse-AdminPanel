import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ChangeStatusFn, getAllTicket } from "../../../services/api_function";
import moment from "moment";
import toast from "react-hot-toast";

const ChatSupport = () => {
  const [allTicket, setAllTicket] = useState([]);
  const navigate = useNavigate();

  const getAllTickets = async () => {
    try {
      const res = await getAllTicket();
      setAllTicket(res.data);
    } catch (error) {
      console.log("error in getAllTickets", error);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Support </Card.Title>
      </Card.Header>
      <Card.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>Ticket ID</th>
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
                <td>{item?.Subject}</td>
                <td>{moment(item?.createdAt).format("DD-MM-YYYY h:mm A")}</td>

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
                    {item?.Status == true ? "Open" : "Closed"}
                  </a>
                </div>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ChatSupport;
