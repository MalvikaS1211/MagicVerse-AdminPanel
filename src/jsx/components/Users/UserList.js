import React, { useEffect, useState } from "react";
import { getUserList } from "../../../services/api_function";

function UserList() {
  const [userList, setuserList] = useState();
  const fetchUser = async (search) => {
    try {
      const res = await getUserList(search);
      if (res) {
        setuserList(res);
      }
      console.log(res);
    } catch (error) {
      console.log(error, "in fetchUser");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="row col-lg-12 mainDiv  table-responsive">
      <div className="row justify-content-between mb-3">
        <h2 style={{ width: "fit-content" }}>User List</h2>
        <input
          type="text"
          placeholder="search from phone number"
          style={{ width: "fit-content", height: "35px", borderRadius: "10px" }}
          onChange={(e) => {
            fetchUser(e.target.value);
          }}
        />
      </div>
      <table class="table  table-hover" style={{ height: "fit-content" }}>
        <thead>
          <tr>
            <th className="col text-center">S. no</th>
            <th scope="col">Name</th>
            <th scope="col">Contact no</th>
            <th scope="col">Gender</th>
            <th scope="col">Country</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">DOB</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((user, i) => {
              return (
                <tr>
                  <td className="text-center">{i}</td>
                  <td> {user.username}</td>
                  <td> {user.mobile}</td>
                  <td> {user.gender}</td>
                  <td> {user.country}</td>
                  <td> {user.state}</td>
                  <td> {user.city}</td>
                  <td> {user.dob}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
