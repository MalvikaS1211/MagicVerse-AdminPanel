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
    isPaid: "",
    duration: "",
    firstPrize: "",
    reschedule: "",
    quizTitle: "",
    totalPrizeMoney: "",
    totalSpot: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          type="text"
          name="endTime"
          placeholder="Enter End Time"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="isPaid">Is Paid</label>
        <input
          type="text"
          name="isPaid"
          placeholder="paid or not"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          name="duration"
          placeholder="Enter quiz duration"
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
          placeholder="reschedulable or not"
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
      <div className="col-lg-3 d-flex justify-content-start position-relative">
        <button
          className="btn btn-info position-absolute"
          style={{ width: "fit-content", bottom: "3px" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Contest;
