import React, { useEffect, useState } from "react";
import { getUserList } from "../../../services/api_function";

function UserList() {
  const [userList, setuserList] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserList();
        if (res) {
          setuserList(res);
        }
        console.log(res);
      } catch (error) {
        console.log(error, "in fetchUser");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="row col-lg-12 mainDiv  table-responsive">
        <h2>User List</h2>
      <table class="table  table-hover" style={{ height: "fit-content" }}>
        <thead>
          <tr>
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
            userList.map((user) => {
              return (
                <tr>
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
