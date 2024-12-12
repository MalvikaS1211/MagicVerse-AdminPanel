import "./Support.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatTime, getAmPm } from "./actionHandler";
import { FiSend } from "react-icons/fi";
import {
  getAllChatsList,
  // raisedTicketList,
  replyTicket,
  // url2,
} from "../../../../services/api_function";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import socket from "../../../../socket";

const SupportCharts = () => {
  //   const user = useSelector((state) => state.auth.userTask);
  const user = useSelector((state) => state.userTask);
  const [replymessage, setReplyMessage] = useState("");
  const [replyfile, setReplyFile] = useState("");
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [closed, setClosed] = useState(false);

  function sendReply(ticketId, subject) {
    setLoading(true);
    const userDetails = localStorage.getItem("userDetails");
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token;
    replyTicket(ticketId, replymessage, replyfile, closed, token, subject)
      .then((resp) => {
        setLoading(false);
        const res = resp?.data;
        console.log(res, "res");
        setReplyFile("");
        setReplyMessage("");
        if (res?.status == 200) {
          socket.emit("message", user?.tokenId);
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
      const token = localStorage.getItem("adminToken");
      setRefreshing(true);
      getAllChatsList(token)
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
            <h1 className="heading">Support</h1>
          </div>
          {/* accordian start */}
          {list?.length > 0
            ? list.map((item, i) => {
                return (
                  <div className="" key={i + "support-query-list"}>
                    <div
                      className="accordion accordion-flush"
                      id={"accordionFlushExample" + i}
                      // style={{ backgroundColor: "#fff" }}
                      onClick={() => setReplyMessage("")}
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
                                    <div className="d-flex gap-2 align-items-center">
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
                                      <div >
                                      <div className="text-muted fst-normal fs-8 mb-1 text-nowrap text-nowrap">
                                    Name
                                  </div>
                                        {item?.userName}
                                      </div>
                                      {/* <img
                                        src="https://auth.inrx.io/images/message.svg"
                                        alt="message"
                                        className="ms-3"
                                      /> */}
                                    </div>
                                  </div>
                                </div>

                                <div className="col mob-font">
                                  <div className="text-muted fst-normal fs-8 mb-1 text-nowrap text-nowrap">
                                    ID Ticket
                                  </div>
                                  <div className="text-nowrap">
                                    #{item?.ticketId}
                                  </div>
                                </div>

                                <div className="col mob-font ">
                                  <div className="text-muted fst-normal fs-8 mb-1 text-nowrap">
                                    Subject
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
                                    Status
                                  </div>
                                  <div className="text-nowrap">
                                    <span
                                      className={`fs-14 fw-normal text-capitalize ${
                                        item?.status === "success"
                                          ? "text-success"
                                          : "text-warning"
                                      }`}
                                    >
                                      {item?.status}
                                    </span>
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
                            {/* Customer Chats */}
                            <div
                              style={{
                                minHeight:"auto",
                                maxHeight: "500px",
                                overflow: "scroll",
                                overflowX: "hidden",
                              }}
                              className="px-3 chat_custom-scrollbar"
                            >
                              <div className="">
                                <div className="col-lg-12 col-sm-12 mb-2">
                                  <div>
                                    {/* <h6>Your Chats</h6> */}
                                    <div className="">
                                      {item?.message?.map((it, i) => {
                                        if (it.type == "user1") {
                                          return (
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                              <div className="border-0 shadow-none">
                                                <div className="">
                                                  <div className="d-flex gap-2">
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
                                                    <div className="card border-0 mb-2 shadow-none bg_green">
                                                      <div className="card-body py-3">
                                                        <h6 className="mb-0">
                                                          {item?.userName}
                                                        </h6>
                                                        <div>
                                                          <div className="text_gray">
                                                            {it.message}
                                                          </div>
                                                          {it?.file ? (
                                                            <img
                                                              src={(
                                                                // url2 +
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
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  {/* Custome Time Stamp */}
                                                  <div className="ms-5 ps-3 mb-3">
                                                    <span className="text_gray fs-12">
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
                                            <div className="row justify-content-end mb-2 bg-danger--">
                                              <div className="col-lg-6 col-sm-12 mb-2">
                                                <div className="d-flex gap-2 align-items-center justify-content-end">
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
                                                  <div className="card mb-2 border-0 shadow-none bg_gray">
                                                    <div className="card-body py-3">
                                                      <h6 className="mb-0">
                                                        {item?.replierName
                                                          ? item?.replierName
                                                          : "Boface"}
                                                      </h6>
                                                      <div className="text_gray">
                                                        {it.message}
                                                      </div>
                                                      <div>
                                                        {it?.file ? (
                                                          <img
                                                            src={(
                                                              // url2 +
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
                                                              objectFit:
                                                                "cover",
                                                            }}
                                                            alt="Query Image"
                                                          />
                                                        ) : null}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                {/* Time and Date */}
                                                <div className="text-end mb-3 fs-12">
                                                  <span className="text_gray">
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
                                          );
                                        }
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Admin Chats */}
                          <div className="col-lg-12 col-sm-12">
                            {item?.status == "pending" ? (
                              <div className="card-footer bg_lgray">
                                <div className="row justify-content-end">
                                  <div className="row align-items-center">
                                    <div className="col-lg-3">
                                      <div className="text-end">
                                        <div className="mb-2">
                                          {" "}
                                          <input
                                            type="checkbox"
                                            id="suppot-close"
                                            name="suppot-close"
                                            className=""
                                            onChange={(e) => {
                                              setClosed(e.target.checked);
                                              e.stopPropagation();
                                            }}
                                          />
                                          <label
                                            for="suppot-close"
                                            className="ms-2 text_gray"
                                          >
                                            {"Support Close"}
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-9">
                                      <div className="d-flex gap-2">
                                        <div style={{ flex: "auto" }}>
                                          <textarea
                                            type="text"
                                            rows="2"
                                            placeholder="Write your message..."
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value={replymessage}
                                            onChange={(e) => {
                                              let msg = e.target.value;
                                              if (
                                                e?.target?.value?.length > 500
                                              ) {
                                                msg = msg.slice(0, 500);
                                              }
                                              setReplyMessage(msg);
                                            }}
                                          />
                                          <div className="text_gray fs-12 text-end px-2">
                                            {500 - replymessage?.length}/500
                                          </div>
                                        </div>
                                        <div className="d-flex gap-4 ">
                                          <div
                                            className="anchor_link"
                                            style={{ lineHeight: "47px" }}
                                            onClick={() =>
                                              document
                                                .getElementById("replyfile")
                                                .click()
                                            }
                                          >
                                            <i className="fa-solid fa-paperclip text_gray fs-4" />
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
                                            onClick={() =>
                                              sendReply(
                                                item?.ticketId,
                                                item?.query_subject
                                              )
                                            }
                                          >
                                            {loading ? (
                                              <div
                                                className="spinner-border text-black load-icon mx-1"
                                                role="status"
                                              ></div>
                                            ) : (
                                              <FiSend />
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
                                      style={{
                                        cursor: "pointer",
                                        color: "white",
                                      }}
                                    /> */}
                                        </div>
                                      </div>
                                    </div>
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

export default SupportCharts;
