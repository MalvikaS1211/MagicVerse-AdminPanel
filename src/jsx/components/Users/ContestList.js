import React, { useEffect, useState } from "react";
import { getAllContest } from "../../../services/api_function";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function ContestList() {
  const [allContest, setAllContest] = useState();

  const fetchContest = async () => {
    try {
      const res = await getAllContest();
      setAllContest(res);
    } catch (error) {
      console.log(error, ":: in contestlist");
    }
  };
  useEffect(() => {
    fetchContest();
  }, []);

  return (
    <div className="row col-lg-12 mainDiv  table-responsive">
      <h2>Contest List</h2>

      <table class="table  table-hover" style={{ height: "fit-content" }}>
        <thead>
          <tr>
            <th scope="col">Contest Name</th>
            <th scope="col">Total Prize</th>
            <th scope="col">Total Spots</th>
            <th scope="col">Contest EndTime</th>
            <th scope="col">Entry Fee</th>
            <th scope="col">Reschedule</th>
            <th scope="col">Question</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allContest &&
            allContest.map((item) => {
              return (
                <tr>
                  <td>{item?.id}</td>
                  <td>{item?.totalPrize}</td>
                  <td>{item?.totalSpots}</td>
                  <td>
                    {" "}
                    {new Date(item.endTime).toLocaleDateString()}{" "}
                    {new Date(item.endTime).toLocaleTimeString()}
                  </td>
                  <td>{item?.buy}</td>
                  <td>{item?.reschedule}</td>
                  <td className="text-center" style={{cursor:'pointer'}}>
                    <FaEye className="fs-3" />
                  </td>
                  <td style={{cursor:'pointer'}}>
                    <FaEdit className="fs-3" />
                  </td>
                  <td style={{cursor:'pointer'}}>
                    <AiFillDelete className="fs-3"/>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ContestList;
