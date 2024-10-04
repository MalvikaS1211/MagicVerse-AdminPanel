import React, { useState } from "react";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        result.push({ rank: rank.trim(), prize: parseInt(prize.trim()) });
      }
    });

    setFormData((prevData) => ({
      ...prevData,
      winnings: result,
    }));
  };

  const handleSubmit = async () => {
    // Check for empty fields
    const requiredFields = [
      "buyAmount",
      "description",
      "endTime",
      "duration",
      "firstPrize",
      "reschedule",
      "quizTitle",
      "totalPrizeMoney",
      "totalSpot",
    ];
  
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return; // Exit the function if any field is empty
      }
    }
  
    try {
      setLoading(true);
      const res = await createContest(formData);
      if (res) {
        toast.success("Successfully Contest Created");
        setLoading(false);
        setFormData({
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
      } else {
        toast.error("Failed to Create Contest");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Create Contest in Catch");
      setLoading(false);
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
          value={formData.contestId}
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
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          onChange={handleChange}
          value={formData.description}
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
          value={formData.name}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="firstPrize">1st Prize</label>
        <input
          type="text"
          name="firstPrize"
          placeholder="first prize amount"
          onChange={handleChange}
          value={formData.firstPrize}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="reschedule">Reschedule</label>
        <div className="d-flex gap-2 justify-content-start align-content-center">
          <span className="" style={{ height: "fit-content" }}>
            True
          </span>
          <input
            type="radio"
            name="reschedule"
            value="true"
            onChange={handleChange}
            checked={formData.reschedule === "true"}
            style={{ height: "fit-content" ,position:'relative',top:'2px' }}
          />
          <span style={{ height: "fit-content" }}>False</span>
          <input
            type="radio"
            name="reschedule"
            value="false"
            onChange={handleChange}
            checked={formData.reschedule === "false"}
            style={{ height: "fit-content",position:'relative',top:'2px' }}
          />
          {/* False */}
        </div>
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
          placeholder="Total no of user"
          onChange={handleChange}
          value={formData.totalSpot}
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
          // value={formData.winnings}
        />
      </div>
      <div className="col-lg-3 d-flex justify-content-start position-relative">
        <button
          className="btn btn-info position-absolute"
          style={{ width: "fit-content", bottom: "3px" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            "Submit"
          )}
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
                  console.log(win);
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
