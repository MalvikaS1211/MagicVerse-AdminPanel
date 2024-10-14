import React, { useEffect, useState } from "react";
import {
  getContestId,
  getDepositList,
  getLeaderBoardDetails,
} from "../../../services/api_function";
import { FaEye } from "react-icons/fa";

function DepositList() {
  const [allContest, setAllContest] = useState();
  const [leaderboard, setLeaderBoard] = useState([]);
  const [tableData, setTableData] = useState();
  const getContest = async () => {
    try {
      const res = await getContestId();
      if (res) {
        setAllContest(res);
      }
    } catch (error) {
      console.log(error, "In getContestId");
    }
  };

  const fetchLeaderBoardDetails = async (selectedContest) => {
    try {
      const res = await getDepositList(selectedContest);
      setLeaderBoard(res);
      console.log(res, ":::: depositList");
    } catch (error) {
      console.log(error);
      setLeaderBoard([]);
      return false;
    }
  };

  useEffect(() => {
    getContest();
  }, []);

  return (
    <>
      <div className="row col-lg-12 mainDiv  table-responsive">
        <h2>Deposit List</h2>

        <div
          className="col-lg-12 mb-5 contest"
          style={{ height: "fit-content", display: "flex", gap: "10px" }}
        >
          <label htmlFor="">Select Content</label>
          <select
            onChange={(e) => {
              const selectedContest = e.target.value;
              if (selectedContest) {
                fetchLeaderBoardDetails(selectedContest);
              }
            }}
          >
            <option value="0">Select Contest</option>
            {allContest &&
              allContest.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div> 

        <table class="table  table-hover" style={{ height: "fit-content" }}>
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">User Id</th>
              <th scope="col">Phone</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.leader?.length > 0 &&
              leaderboard?.leader?.map((it, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{it?.id}</td>
                    <td>{it?.mobile ?? "N/A"} </td>
                    <td className="text-center">
                      {leaderboard?.entryFee ?? "N/A"}{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>                                                                   
      </div>
    </>
  );
}

export default DepositList;
