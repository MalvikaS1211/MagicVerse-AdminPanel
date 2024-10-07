import React, { useEffect, useState } from "react";
import {
  deleteContestById,
  getAllContest,
  updateContestDetailsById,
} from "../../../services/api_function";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

function ContestList() {
  const [allContest, setAllContest] = useState([]);
  const [active, setActiveItem] = useState(null);
  const [win, setWin] = useState();
  const [formData, setFormData] = useState({
    contestId: "",
    buyAmount: "",
    description: "",
    endTime: "",
    duration: "",
    firstPrize: "",
    reschedule: "",
    quizTitle: "",
    totalPrizeMoney: "",
    totalSpot: 0,
    winnings: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchContest = async () => {
    console.log("infetchContest");
    try {
      const res = await getAllContest();
      setAllContest(res);
    } catch (error) {
      console.log(error, ":: in contestlist");
      setAllContest([]);
    }
  };

  const updateContest = async () => {
    try {
      const res = await updateContestDetailsById(formData);
      if (res) {
        fetchContest(); // Refresh the contest list after update
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContest();
  }, []);

  return (
    <div className="row col-lg-12 mainDiv table-responsive">
      <h2>Contest List</h2>
      <table className="table table-hover" style={{ height: "fit-content" }}>
        <thead>
          <tr>
          {/* <th>Contest Name</th> */}
            <th scope="col">Exam Name</th>
            <th scope="col">Total Prize</th>
            <th scope="col">First Prize</th>
            <th scope="col">Total Spots</th>
            <th scope="col">Total Marks</th>
            <th scope="col">Total No Of Question</th>
            <th scope="col">Duration</th>
            <th scope="col">Contest EndTime</th>
            <th scope="col">Entry Fee</th>
            <th scope="col">Reschedule</th>
            <th scope="col">Winnings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allContest &&
            allContest.map((item) => (
              <tr key={item?.id}>
                <td>{item?.title}</td>
                <td>{item?.totalPrize}</td>
                <td>{item?.prize}</td>
                <td>{item?.totalSpots}</td>
                <td>{item?.totalMarks}</td>
                <td>{item?.totalNoOfQuestion}</td>
                <td>{item?.overall_time + " Minutes"}</td>
                <td>
                  {new Date(item.endTime).toLocaleDateString()}{" "}
                  {new Date(item.endTime).toLocaleTimeString()}
                </td>
                <td>{item?.buy}</td>
                <td>{item?.reschedule ? "YES" : "NO"}</td>
                <td
                  className="text-center"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropTable"
                  onClick={() => {
                    setWin(item?.winnings);
                  }}
                >
                  <FaEye className="fs-3" />
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => {
                    setActiveItem(item);
                    setFormData({
                      contestId: item?.id,
                      buyAmount: item?.buy,
                      description: item?.description || "",
                      endTime: new Date(item?.endTime)
                        .toISOString()
                        .slice(0, 16), // Format for datetime-local input
                      duration: item?.overall_time,
                      firstPrize: item?.prize,
                      reschedule: item?.reschedule ? "true" : "false",
                      quizTitle: item?.title,
                      totalPrizeMoney: item?.totalPrize,
                      totalSpot: item?.totalSpots,
                    });
                  }}
                >
                  <FaEdit className="fs-3" />
                </td>
                <td style={{ cursor: "pointer" }}>
                  <AiFillDelete
                    className="fs-3"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the click event from bubbling up
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this contest?"
                      );
                      if (confirmDelete) {
                        deleteContestById(item?.id);
                        setTimeout(() => {
                          fetchContest();
                        }, 2000);
                        toast.success("Contest deleted successfully");
                      } else {
                        toast.error("Delete cancelled");
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for Updating Contest */}
      <div
        className="modal fade col-lg-12"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog col-lg-8">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Update Contest
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body contest row">
              {/* Form Fields */}
              <div className="col-lg-3">
                <label htmlFor="contestId">Contest Id</label>
                <input
                  type="text"
                  name="contestId"
                  placeholder="Contest Id"
                  value={formData.contestId}
                  readOnly
                />
              </div>

              <div className="col-lg-3">
                <label htmlFor="buyAmount">Buy Amount</label>
                <input
                  type="text"
                  name="buyAmount"
                  placeholder="Enter contest price"
                  onChange={handleChange}
                  value={formData.buyAmount}
                />
              </div>

              <div className="col-lg-3">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  placeholder="Enter End Time"
                  onChange={handleChange}
                  value={formData.endTime}
                />
              </div>

              <div className="col-lg-3">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="Enter quiz duration in minutes"
                  onChange={handleChange}
                  value={formData.duration}
                />
              </div>

              <div className="col-lg-3">
                <label htmlFor="firstPrize">1st Prize</label>
                <input
                  type="text"
                  name="firstPrize"
                  placeholder="First prize amount"
                  onChange={handleChange}
                  value={formData.firstPrize}
                />
              </div>

              <div className="col-lg-3">
                <label htmlFor="reschedule">Reschedule</label>
                <input
                  type="text"
                  name="reschedule"
                  placeholder="true or false"
                  onChange={handleChange}
                  value={formData.reschedule}
                />
              </div>

              <div className="col-lg-3">
                <label htmlFor="quizTitle">Quiz Title</label>
                <input
                  type="text"
                  name="quizTitle"
                  placeholder="Enter Quiz Title"
                  onChange={handleChange}
                  value={formData.quizTitle}
                />
              </div>

              <div className="col-lg-3">
                <label htmlFor="totalPrizeMoney">Total Prize Money</label>
                <input
                  type="text"
                  name="totalPrizeMoney"
                  placeholder="Enter Total Prize Amount"
                  onChange={handleChange}
                  value={formData.totalPrizeMoney}
                />
              </div>

              <div className="col-lg-3">
                <label htmlFor="totalSpot">Total Spot</label>
                <input
                  type="text"
                  name="totalSpot"
                  placeholder="Total no of users"
                  onChange={handleChange}
                  value={formData.totalSpot}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateContest}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* table*/}
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
              <table className="table table-bordered">
                <tr>
                  <th>Rank</th>
                  <th>Prize</th>
                </tr>
                {win?.map((it) => {
                  console.log(it, ":::::=>");
                  return (
                    <tr>
                      <td>{it?.rank}</td>
                      <td>{it?.prize}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestList;
