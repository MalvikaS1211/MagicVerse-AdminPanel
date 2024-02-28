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
  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    // if (!isInitialRender.current && memoizedUser) {
      Commissiondata(memoizedUser)
        .then((response) => {
          //  console.log("API Response:", response);
          setUserData(response.users);
          // setApiTimestamp(response.timestamp);
          // console.log(response.timestamp)
        })
        .catch((error) => {
          console.error("Error fetching team data:", error);
        });
    // } else {
    //   isInitialRender.current = false;
    // }
  }, [memoizedUser]);

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
              <Card.Title style={{ color: "white",margin:"auto" }}>Commission</Card.Title>
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
                      <strong>Pool Level</strong>
                    </th>
                    <th>
                      <strong>Direct Bonus</strong>
                    </th>
                    <th>
                      <strong>Level Bonus</strong>
                    </th>
                    <th>
                      <strong>Pool Bonus</strong>
                    </th>
                    <th>
                      <strong>Rank Bonus</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <td>1</td> */}
                    <td>{userData.poolLevel}</td>
                    <td>
                      {userData.directBonus > 0
                        ? (userData.directBonus / 1e18).toFixed(2)
                        : 0}
                    </td>
                    <td>
                      {userData.levelBonus > 0
                        ? (userData.levelBonus / 1e18).toFixed(2)
                        : 0}
                    </td>
                    <td>
                      {userData.poolBonus > 0
                        ? (userData.poolBonus / 1e18).toFixed(2)
                        : 0}
                    </td>
                    <td>
                      {userData.rankBonus > 0
                        ? (userData.rankBonus / 1e18).toFixed(2)
                        : 0}
                    </td>
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
