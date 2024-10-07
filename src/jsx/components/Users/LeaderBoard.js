import React, { useEffect, useState } from "react";
import {
  getContestId,
  getLeaderBoardDetails,
} from "../../../services/api_function";
import { FaEye } from "react-icons/fa";

function LeaderBoard() {
  const [allContest, setAllContest] = useState();
  const [leaderboard, setLeaderBoard] = useState([]);
  const [tableData,setTableData]=useState()
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

  const fetchLeaderBoardDetails = async (selectedContest) => {
    try {
      const res = await getLeaderBoardDetails(selectedContest);
      setLeaderBoard(res);
      console.log(res, "::::");
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
              <th scope="col">Phone</th>
              <th scope="col">Total Marks</th>
              <th scope="col">Total No of Question</th>
              <th scope="col">Attempted Question</th>
              <th scope="col">Unattempted Question</th>
              <th scope="col">Corrected Question</th>
              <th scope="col">Marks Obtained</th>
              <th scope="col">Time Taken</th>
              <th scope="col">Money Won</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.map((it) => {
              {/* console.log(
                Object.keys(it?.answeredQuestions).length,
                "attempted Question"
              ); */}
              return (
                <tr>
                  <td className="text-center">{it?.rank} </td>
                  <td className="text-center">{it?.phoneNumber ?? "N/A"} </td>
                  <td className="text-center">{it?.totalMarks} </td>
                  <td className="text-center">{it?.totalQuestions}</td>
                  <td className="text-center"  onClick={() => {
                        setTableData([it?.answeredQuestions])
                      }}>
                    {Object.keys(it?.answeredQuestions).length}{" "}
                    <FaEye
                      style={{
                        paddingLeft: "5px",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropTable"
                     
                    />
                  </td>
                  <td className="text-center">
                    {Object.keys(it?.unattemptedQuestions).length}
                    <FaEye
                      style={{
                        paddingLeft: "5px",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropTable"
                      
                    />
                  </td>
                  <td className="text-center">{it?.correctAnswers}</td>
                  <td className="text-center">{it?.totalScore}</td>
                  <td className="text-center">{it?.timeTaken + "Second"}</td>
                  <td className="text-center">{it?.payment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {modal} */}
      <div
        class="modal fade"
        id="staticBackdropTable"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog col-lg-3">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Winning Distribuition
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table className="table">
                <tr>
                  <th>Rank</th>
                  <th>Prize</th>
                </tr>
              
                <tbody>
      {tableData && Object.values(tableData).map((it, index) => {
        return (
          <tr key={index}>
            <td>{it.question || 'N/A'}</td>
            <td>{it.selectedAnswer || 'N/A'}</td>
            <td>{it.correctAnswer || 'N/A'}</td>
            <td>{it.marks || 'N/A'}</td>
            <td>{it.status || 'N/A'}</td>
            <td>{it.isCorrect ? 'Yes' : 'No'}</td>
          </tr>
        );
      })}
    </tbody>
                
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderBoard;
