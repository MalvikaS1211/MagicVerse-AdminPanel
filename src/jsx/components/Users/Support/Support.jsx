import "./Support.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatTime, getAmPm } from "./actionHandler";
import { FaExchangeAlt } from "react-icons/fa";
import { IoRefresh } from "react-icons/io5";
import {
  raisedTicketList,
  replyTicket,
  url2,
} from "../../../../services/api_function";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import socket from "../../../../socket";

const Support = () => {
  const user = useSelector((state) => state.auth.userTask);
  const [replymessage, setReplyMessage] = useState("");
  const [replyfile, setReplyFile] = useState("");
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [closed, setClosed] = useState(false);

  function sendReply(ticketId,subject) {
    setLoading(true);
    const userDetails = localStorage.getItem("userDetails");
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token;
    replyTicket(ticketId, replymessage, replyfile, closed,token,subject)
      .then((resp) => {
        setLoading(false);
        const res = resp?.data;
        // console.log(res, "res");
        setReplyFile("");
        setReplyMessage("");
        if (res?.status == 200) {
          socket.emit("message",user?.mobile);
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e, "Error in sendReply()");
      });
  }

  function getList() {
    try {
      setRefreshing(true);
      raisedTicketList(user?.mobile, user?.tokenId)
        .then((res) => {
          setRefreshing(false);
          if (res?.status == 200) {            
            setlist(res?.data);
          }
        })
        .catch((e) => {
          setRefreshing(false);
          console.log(e, "Error in getList raisedTicketList()/support page");
        });
    } catch (e) {
      setRefreshing(false);
      console.log(e, "Error in getList");
    }
  }

  useEffect(() => {
    getList();
  }, [user]);
  
  useEffect(() => {
    console.log("is socket connected", socket.connected);
    if (socket.connected) {
      socket.on("update-chat", (msg) => {        
          getList();
      });
    }
    return () => {
      socket.off();
    };
  }, [socket.connected]);

  return (
    <>
      {/* <Header />
    <Sidebar /> */}
      <main className="pt-5 support_main">
        <div className="container-fluid">
          <div className="mb-3 d-flex justify-content-between">
            <h1 className="heading text-white">Support</h1>
          </div>
          {/* accordian start */}
          {list?.length > 0
            ? list.map((item, i) => {
                return (
                  <div className="" key={i + "support-query-list"}>
                    <div
                      className="accordion accordion-flush"
                      id={"accordionFlushExample" + i}
                      style={{ backgroundColor: "#0D0D0D" }}
                    >
                      <div className="accordion-item mb-2 rounded">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#flush-collapseOne" + i}
                            aria-expanded="false"
                            aria-controls={"flush-collapseOne" + i}
                          >
                            <div className="card-body p-0 overflow-x-auto">
                              <div className="d-flex gap-4">
                                <div className="col mob-font ">
                                  <div className="d-flex align-items-center gap-3">
                                    <div className="text-success">
                                      <img
                                        src="https://auth.inrx.io/images/message.svg"
                                        alt="message"
                                      />
                                    </div>
                                    <div className="">
                                      <div className="text-muted fst-normal fs-8 mb-1 text-nowrap text-nowrap">
                                        ID Ticket
                                      </div>
                                      <div className="text-nowrap">
                                        #{item?.ticketId}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col mob-font ">
                                  <div className="text-muted fst-normal fs-8 mb-1 text-nowrap">
                                    Subject of the appeal
                                  </div>
                                  <div className="text-nowrap">
                                    {item?.query_subject}
                                  </div>
                                </div>
                                <div className="col mob-font ">
                                  <div className="mb-1 text-muted fst-normal fs-8 text-nowrap">
                                    Last Update
                                  </div>
                                  <div className="text-nowrap">
                                    {new Date(
                                      item?.querytime * 1000
                                    ).toLocaleString()}
                                  </div>
                                </div>

                                <div className="col mob-font ">
                                  <div className="text-muted fst-normal fs-8 mb-1 text-nowrap">
                                    Status of the request
                                  </div>
                                  <div className="text-nowrap">
                                    <i className="fa-regular fa-message text-success"></i>{" "}
                                    Response from support . 3 {item?.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>
                        </h2>
                        <div
                          id={"flush-collapseOne" + i}
                          className="accordion-collapse collapse"
                          data-bs-parent={"#accordionFlushExample" + i}
                        >
                          <div className="accordion-body">
                            {/* {item?.query_meggage} */}
                            <div
                              style={{
                                background: "#0d0d0d",
                                height: "500px",
                                overflow: "scroll",
                                overflowX: "hidden",
                              }}
                              className=" px-3 chat_custom-scrollbar"
                            >
                              <div className="row">
                                <div className="col-lg-12 col-sm-12 mb-2">
                                  <div>
                                    <h6 className="py-2" style={{color:"#6C757D"}}>
                                      Your Chats
                                    </h6>

                                    {item?.messages?.map((it, i) => {
                                      if (it.type == "user1") {
                                        return (
                                          <div
                                            className="col-lg-12 col-sm-12 mb-2"
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent: "flex-start",
                                            }}
                                          >
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                              <div
                                                style={{
                                                  flex: 1,
                                                  border: "1px solid #222",
                                                  borderRadius: 10,
                                                  padding: 10,
                                                }}
                                                className=" my-2"
                                              >
                                                <div className="d-flex gap-2 align-items-center">
                                                  <div className="">
                                                    <img
                                                      src={
                                                        item?.user_picture
                                                          ? `data:image/jpeg;base64,${item?.user_picture}`
                                                          : `images/user.svg`
                                                      }
                                                      alt="user"
                                                      style={{
                                                        height: "45px",
                                                        width: "45px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                      }}
                                                    />
                                                  </div>
                                                  <div style={{ flex: 1 }}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                      <h6
                                                        className=" fw-bold"
                                                        style={{
                                                          color: "#02FF01",
                                                        }}
                                                      >
                                                        {item?.userName}
                                                      </h6>
                                                      <div className="text-muted mob-font ">
                                                        {/* {new Date(
                                              item?.querytime * 1000
                                            ).toLocaleTimeString()} */}
                                                      </div>
                                                    </div>
                                                    <p className="mb-0 mob-font text-muted">
                                                      {/* {item?.query_meggage} */}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div
                                                  style={{
                                                    flex: 1,
                                                    flexDirection: "column",
                                                  }}
                                                >
                                                  <div
                                                    className="py-2"
                                                    style={{ flex: 0.7 ,color:"#6C757D"}}
                                                  >
                                                    {it.message}
                                                  </div>
                                                </div>

                                                {it?.file ? (
                                                  <img
                                                    src={(
                                                      url2 +
                                                      "/" +
                                                      it?.file
                                                    ).replace(
                                                      "/uploads",
                                                      "/support"
                                                    )}
                                                    className="chat-image"
                                                    alt="Query Image"
                                                  />
                                                ) : null}
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-end",
                                                  }}
                                                >
                                                  <span style={{color:"#6C757D"}}>
                                                    {new Date(
                                                      it.createdAt
                                                    ).toLocaleDateString() +
                                                      " / " +
                                                      formatTime(
                                                        new Date(
                                                          it.createdAt
                                                        ).getHours()
                                                      ) +
                                                      ":" +
                                                      formatTime(
                                                        new Date(
                                                          it.createdAt
                                                        ).getSeconds()
                                                      ) +
                                                      " " +
                                                      getAmPm(
                                                        new Date(
                                                          it.createdAt
                                                        ).getTime()
                                                      )}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div
                                            className="col-lg-12 col-sm-12 mb-2"
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent: "flex-end",
                                            }}
                                          >
                                            <div
                                              className="col-lg-6 col-sm-12 mb-2"
                                              style={{
                                                flexDirection: "row",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  flex: 1,
                                                  border: "1px solid #222",
                                                  borderRadius: 10,
                                                  padding: 10,
                                                  alignSelf: "flex-end",
                                                }}
                                              >
                                                <div className="d-flex gap-2 align-items-center">
                                                  <div className="">
                                                    <img
                                                      alt="user"
                                                      src={
                                                        item?.replier_picture
                                                          ? `data:image/jpeg;base64,${item?.replier_picture}`
                                                          : `images/user.svg`
                                                      }
                                                      style={{
                                                        height: "45px",
                                                        width: "45px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                      }}
                                                    />
                                                  </div>
                                                  <div style={{ flex: 1 }}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                      <h6
                                                        className=" fw-bold"
                                                        style={{
                                                          color: "#02FF01",
                                                        }}
                                                      >
                                                        {item?.replierName
                                                          ? item?.replierName
                                                          : "Boface"}
                                                      </h6>
                                                      <div className="text-muted mob-font "></div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  style={{
                                                    flex: 1,
                                                    flexDirection: "column",
                                                  }}
                                                >
                                                  <div
                                                    style={{ flex: 0.7,color:"#6C757D"}}
                                                  >
                                                    {it.message}
                                                  </div>
                                                </div>

                                                {it?.file ? (
                                                  <img
                                                    src={(
                                                      url2 +
                                                      "/" +
                                                      item?.file
                                                    ).replace(
                                                      "/uploads",
                                                      "/support"
                                                    )}
                                                    style={{
                                                      height: "105px",
                                                      width: "105px",
                                                      // borderRadius: "50%",
                                                      objectFit: "cover",
                                                    }}
                                                    alt="Query Image"
                                                  />
                                                ) : null}
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-end",
                                                  }}
                                                >
                                                  <span className="" style={{color:"#6C757D"}}>
                                                    {formatTime(
                                                      new Date(
                                                        it.createdAt
                                                      ).getHours()
                                                    ) +
                                                      ":" +
                                                      formatTime(
                                                        new Date(
                                                          it.createdAt
                                                        ).getSeconds()
                                                      ) +
                                                      " " +
                                                      getAmPm(
                                                        new Date(
                                                          it.createdAt
                                                        ).getTime()
                                                      )}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 col-sm-12 mb-2 px-2" style={{backgroundColor:"#6C757D"}}>
                            {item?.status == "pending" ? (
                              <div className="d-flex justify-content-between align-items-center pt-2">
                                <div
                                  className="support_input"
                                  style={{ flex: 2 }}
                                >
                                  <div className="support-inputs2">
                                  <input
                                    type="text"
                                    placeholder="Write your message..."
                                    className="form-control p-1  rounded-pill text-center"
                                    id="exampleInputPassword1"
                                    style={{ width: "50%",backgroundColor:"black" }}
                                    value={replymessage}
                                    onChange={(e) => {
                                      let msg = e.target.value;
                                      if (e?.target?.value?.length > 500) {
                                        msg = msg.slice(0, 500);
                                      }
                                      setReplyMessage(msg);
                                    }}
                                  />
                                  <input type="checkbox" name="suppot-close" className="ms-5" onChange={(e)=>setClosed(e.target.checked)}/> <span className="text-white mt-3 ms-1">{"Ticket Close"}</span>
                                  </div>
                                  <div className=" text-black px-2">
                                    {500 - replymessage?.length}/500
                                  </div>
                                </div>
                                <div
                                  className="mb-3"
                                  style={{
                                    justifyContent: "flex-end",
                                    display: "flex",
                                  }}
                                >
                                  <div className="d-flex gap-4 align-items-center ">
                                    <div
                                      className="text-white"
                                      onClick={() =>
                                        document
                                          .getElementById("replyfile")
                                          .click()
                                      }
                                    >
                                      <i className="fa-solid fa-paperclip fs-4" />
                                    </div>
                                    <input
                                      type="file"
                                      className=" d-none"
                                      id="replyfile"
                                      onChange={(e) => {
                                        // console.log(e.target.files[0],' file name ')
                                        setReplyFile(e?.target?.files[0]);
                                      }}
                                    />
                                    <div
                                      className="coin_style3"
                                      onClick={() => sendReply(item?.ticketId,item?.query_subject)}
                                    >
                                      {loading ? (
                                        <div
                                          className="spinner-border text-black load-icon mx-1"
                                          role="status"
                                        ></div>
                                      ) : (
                                        <i className="fa-solid fa-arrow-up "></i>
                                      )}
                                    </div>
                                    {/* <IoRefresh
                                      size={22}
                                      onClick={() => {
                                        if (!refreshing) {
                                          getList();
                                        }
                                      }}
                                      className={
                                        refreshing ? "chat-refresh-round" : ""
                                      }
                                      style={{ cursor: "pointer",color:'white' }}
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            {replyfile ? (
                              <div
                                style={{
                                  border: "7px solid #666",
                                  width: "210px",
                                  justifyContent: "center",
                                  display: "flex",
                                  borderRadius: 25,
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(replyfile)}
                                  style={{
                                    height: "200px",
                                    width: "200px",
                                    backgroundSize: "contain",
                                    borderRadius: 20,
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}

          {/* accordian end */}
        </div>
      </main>
    </>
  );
};

export default Support;
