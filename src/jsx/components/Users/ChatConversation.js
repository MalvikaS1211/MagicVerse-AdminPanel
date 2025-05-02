import React, { useEffect, useState } from "react";

import AdminIcon from "../../../../src/images/BlakeBanks.jpg";
import UserIcon from "../../../../src/images/creativeArt.jpg";
import {
  createMessageFn,
  GetMsgByTicket,
} from "../../../services/api_function";
import moment from "moment";
import toast from "react-hot-toast";

const ChatConversation = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [address, setAddress] = useState("");

  const getMessage = async () => {
    try {
      const res = new URLSearchParams(window.location.search);
      const ticketID = res.get("msgId");
      const userAdd = res.get("userAddress");
      setTicketId(ticketID);
      setAddress(userAdd);
      console.log(ticketID, userAdd, "in getMessage");
      if (ticketID && userAdd) {
        const res = await GetMsgByTicket(ticketID, userAdd);
        setMessages(res.data);
        console.log(res, "from getAll");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessage();
  }, [window.location.search]);
  const handleSendMsg = async () => {
    try {
      const res = await createMessageFn("Admin", address, message, ticketId);
      console.log("handleSendMsg", res);
      if (res.success == true) {
        toast.success("Message Created!");
        setMessage("");
        setTimeout(() => {
          getMessage();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-xxl-11">
      <ul className="notification1 px-3">
        {messages.map((msg, index) => (
          <li key={index}>
            <div
              className={`row ${
                msg.sender === "User" ? "flex-row-reverse" : ""
              }`}
            >
              <div className="col-lg-12">
                <div
                  className={`d-flex gap-3  ${
                    msg?.UserAddress != address && msg?.Sender == "Admin"
                      ? "admin"
                      : ""
                  }`}
                >
                  <img
                    src={msg?.Sender === "Admin" ? AdminIcon : UserIcon}
                    alt={`${msg.sender} avatar`}
                    className="circular-img"
                  />
                  <div className="notification1-body border border-primary border-opacity-50">
                    <div className="d-flex align-items-start gap-3 flex-wrap message-box">
                      <div className="flex-fill">
                        <h5 className="mb-1 fs-4 fw-medium">{msg.sender}</h5>
                        <p className="mb-0 text-muted msg-text">
                          {msg.Message}
                        </p>
                      </div>
                      <div className="msg-date-div">
                        <span className="badge bg-primary-transparent">
                          {moment(msg.Time).format("DD-MM-YYYY h:mm:ss A")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="col-lg-12">
        <div className="p-4 border rounded-md w-full max-w-4xl mx-auto mt-10 msg-container">
          <div class="mb-3 ">
            <div className="d-flex">
              <label className="form-label msg-label" for="form1">
                Message
              </label>
            </div>

            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              style={{ height: "40%", fontSize: "15px" }}
              value={message}
              placeholder="Enter your Message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex justify-content-end pt-4">
            <button
              type="button"
              className="next-button btn btn-success pointer border m-2"
              style={{ padding: "10px 19px" }}
              onClick={handleSendMsg}
            >
              Send
            </button>
            <button
              type="button"
              className="next-button btn btn-success pointer border m-2"
              style={{ padding: "10px 19px" }}
              onClick={getMessage}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
