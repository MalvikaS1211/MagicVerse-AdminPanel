import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Commissiondata } from "../../../services/api_function";

const CommissionData = (props) => {
  const location = useLocation();
  const phoneNumberFromUrl = new URLSearchParams(location.search).get("user");
  const [user, setUser] = useState(phoneNumberFromUrl);
  const [userData, setUserData] = useState([]);
  const [apiTimestamp, setApiTimestamp] = useState(null);
  const isInitialRender = useRef(true);
  const User = useMemo(() => user, [user]);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token;
    Commissiondata(User, token)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, [User]);

  // console.log("UserData:", userData);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <i
                class="fas fa-circle-left "
                style={{ fontSize: "2rem" }}
                onClick={() => navigate(-1)}
              ></i>
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Commission
              </Card.Title>
            </Card.Header>
            <Card.Body
              style={{ background: "black", border: "1px solid white" }}
            >
              <Table
                responsive
                style={{
                  background: "black",
                  color: "white",
                  borderBottom: "1px solid white",
                }}
              >
                <thead>
                  <tr>
                    <th>
                      <strong>Rank Bonus</strong>
                    </th>
                    <th>
                      <strong>Recuring Bonus</strong>
                    </th>
                    <th>
                      <strong>Level Bonus</strong>
                    </th>
                    <th>
                      <strong>Direct Bonuss</strong>
                    </th>
                    <th>
                      <strong>Pool Bonus</strong>
                    </th>
                    <th>
                      <strong>Total Withdraw</strong>
                    </th>
                    <th>
                      <strong>TopUp Amount</strong>
                    </th>
                    <th>
                      <strong>Total Income</strong>
                    </th>
                    <th>
                      <strong>Team Business</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{(userData?.users?.rankbonus ?? 0).toFixed(2)}</td>
                    <td>{(userData?.users?.recurrIncome ?? 0).toFixed(2)}</td>
                    <td>{(userData?.users?.levelIncome ?? 0).toFixed(2)}</td>
                    <td>{(userData?.users?.referalIncome ?? 0).toFixed(2)}</td>
                    <td>0.00</td> {/* This is already a fixed number */}
                    <td>{(userData?.users?.totalWithdraw ?? 0).toFixed(2)}</td>
                    <td>{(userData?.users?.topup_amount ?? 0).toFixed(2)}</td>
                    <td>{(userData?.users?.totalIncome ?? 0).toFixed(2)}</td>
                    <td>{(userData?.teamBussines ?? 0).toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CommissionData;
