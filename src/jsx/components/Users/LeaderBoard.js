import React, { useEffect, useState } from "react";
import { getContestId, getLeaderBoardDetails } from "../../../services/api_function";

function LeaderBoard() {
  const [allContest, setAllContest] = useState();
  const getContest = async () => {
    try {
      const res = await getContestId();
      if (res) {
        setAllContest(res);
      }
      console.log(res);
    } catch (error) {
      console.log(error, "In getContestId");
    }
  };


  const fetchLeaderBoardDetails = async()=>{
    try {
      const res = await getLeaderBoardDetails()
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    getContest();
  }, []);

  return (
    <div className="row col-lg-12 mainDiv  table-responsive">
      <h2>Leader Board</h2>

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
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Country</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">DOB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;
