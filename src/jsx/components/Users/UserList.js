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
        console.log(error,"in fetchUser")
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="row col-lg-12 mainDiv  table-responsive">
      <table class="table  table-hover" style={{ height: "fit-content" }}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
