import React, { useState } from "react";

function ContestList() {
  const [allContest, setAllContest] = useState();
  return (
    <div className="row col-lg-12 mainDiv  table-responsive">
      <h2>Contest List</h2>

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

export default ContestList;
