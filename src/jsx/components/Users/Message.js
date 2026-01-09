import React, { useEffect, useState } from "react";
import { addMessage, getMessage } from "../../../services/api_function";
import moment from "moment";
import toast from "react-hot-toast";
import { Card, Col, Row, Table } from "react-bootstrap";

const Message = () => {
  const [message, setMessage] = useState("");

  const [news, setNews] = useState("");
  const handleSendMsg = async () => {
    try {
      const res = await addMessage(message);

      if (res.success == true) {
        toast.success("Message Created!");
        setMessage("");
        setTimeout(() => {
          handleMsg();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMsg = async () => {
    try {
      const res = await getMessage();
      setNews(res?.data?.Message || "");
    } catch (error) {
      console.error("Error fetching message:", error);
      setNews("Error loading news");
    }
  };

  useEffect(() => {
    handleMsg();
  }, []);
  return (
    <div className="col-xxl-11">
      <ul className="notification1 px-3"></ul>
      <div className="col-lg-12 pb-4">
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
              style={{ height: "100%", fontSize: "15px" }}
              rows={6}
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
              Add
            </button>
          </div>
        </div>
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Messages</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {news ? (
                    <tr>
                      <td>1</td>
                      <td>{news}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No message found
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* <tbody>
                  {packageHistory?.length > 0 ? (
                    packageHistory?.map((pkg, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemPerpage + index + 1}</td>
                        <td>{pkg?.packages[0]?.uniqueRandomId}</td>
                        <td>
                          {`${pkg?.user.slice(0, 7)}...${pkg?.user.slice(-6)}`}
                        </td>

                        <td>{pkg?.userPackage}</td>
                        <td>$ {pkg?.amount / 1e18}</td>

                        <td>
                          <a
                            href={`https://opbnb.bscscan.com/tx/${pkg?.transactionHash}`}
                            target="_blank"
                          >
                            {pkg?.transactionHash.slice(0, 5)}...
                            {pkg?.transactionHash.slice(-4)}
                          </a>
                        </td>

                        <td>
                          {moment(pkg?.createdAt).format("M/D/YYYY h:mm:ss A")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Records Found
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Message;
