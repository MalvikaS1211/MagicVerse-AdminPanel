import React, { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import toast from "react-hot-toast";
import { createContest } from "../../../services/api_function";

function Contest() {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target.result;
        parseCSV(csv);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csv) => {
    const lines = csv.split("\n");
    const result = [];

    lines.forEach((line) => {
      const [rank, prize] = line.split(",");
      if (rank && prize) {
        result.push({ rank: rank.trim(), prize: prize.trim() });
      }
    });

    setFormData((prevData) => ({
      ...prevData,
      winnings: result,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await createContest(formData);
      if (res) {
        toast.success("SuccessFully Contest Created");
      } else {
        toast.error("Failed to Create Contest");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Create Contest in Catch");
    }
  };

  return (
    <div className="row col-lg-12 contest">
      <div className="col-lg-3">
        <label htmlFor="contestId">Contest Id</label>
        <input
          type="text"
          name="contestId"
          placeholder="Ex- contest-1"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="buyAmount">Buy Amount</label>
        <input
          type="text"
          name="buyAmount"
          placeholder="Enter contest price"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="endTime">End Time</label>
        <input
          type="datetime-local"
          name="endTime"
          placeholder="Enter End Time"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          name="duration"
          placeholder="Enter quiz duration in minutes"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="firstPrize">1st Prize</label>
        <input
          type="text"
          name="firstPrize"
          placeholder="first prize amount"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="reschedule">Reschedule</label>
        <input
          type="text"
          name="reschedule"
          placeholder="true or false"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="quizTitle">Quiz Title</label>
        <input
          type="text"
          name="quizTitle"
          placeholder="Enter Quiz Title"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="totalPrizeMoney">Total Prize Money</label>
        <input
          type="text"
          name="totalPrizeMoney"
          placeholder="Enter Total Prize Amount"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="totalSpot">Total Spot</label>
        <input
          type="text"
          name="totalSpot"
          placeholder="Total no of user"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="totalSpot">Winning distribuiton</label>
        <input
          type="file"
          name="totalSpot"
          placeholder="Total no of user"
          onChange={handleFileChange}
          className="pt-1"
        />
      </div>
      <div className="col-lg-3 d-flex justify-content-start position-relative">
        <button
          className="btn btn-info position-absolute"
          style={{ width: "fit-content", bottom: "3px" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div className="col-lg-12 table-responsive">
        {formData.winnings.length > 0 && (
          <div className="col-lg-12 mt-4">
            <h4>Winning Distribution</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                {formData.winnings.map((win, index) => {
                  console.log(win)
                  return (
                    <tr key={index}>
                      <td>{win.rank}</td>
                      <td>{win.prize}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contest;
