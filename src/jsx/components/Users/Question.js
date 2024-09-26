import React, { useEffect, useState } from "react";
import {
  createQuestionInContest,
  getContestId,
} from "../../../services/api_function";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function Question() {
  const [contestId, setContestId] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    contestId: "",
    questionId: "",
    question: "",
    img: null,
    marksPerQuestion: "",
    negativeMarks: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correct: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value, // Handle file input
    });
  };

  const uploadImage = async (imageFile) => {
    if (!imageFile) return null; // If no image is provided, return null
    const storage = getStorage();
    const storageRef = ref(storage, `questions_images/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleSubmit = async () => {
    try {
      const imageUrl = await uploadImage(formData.img);
      const questionData = {
        contestId: formData.contestId,
        id: formData.questionId,
        correct_answer: formData.correct,
        image_url: imageUrl,
        marks: formData.marksPerQuestion,
        negative: formData.negativeMarks,
        options: [formData.optionA, formData.optionB, formData.optionC, formData.optionD],
        question: formData.question,
      };

      const res = await createQuestionInContest(questionData);
      if(res){
        toast.success("Question Inserted SuccessFully")
      }
      console.log(res);
    } catch (error) {
      console.error("Error submitting questions:", error);
    }
  };

  const getConstestID = async () => {
    try {
      const res = await getContestId();
      setContestId(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConstestID();
  }, []);

  return (
    <div className="row col-lg-12 contest">
      <div className="col-lg-3">
        <label htmlFor="contestId">Select Contest Id</label>
        <select name="contestId" onChange={handleChange}>
          <option value="">
            Choose Contest
          </option>
          {contestId &&
            contestId.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
      </div>
      <div className="col-lg-3">
        <label htmlFor="questionId">Question Id</label>
        <input
          type="text"
          name="questionId"
          placeholder="Enter Question Id"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          name="question"
          placeholder="Enter Question"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="img">Image</label>
        <input
          type="file"
          name="img"
          placeholder="Select img"
          onChange={handleChange}
          style={{ paddingTop: "4px" }}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="marksPerQuestion">Marks/question</label>
        <input
          type="number"
          name="marksPerQuestion"
          placeholder="Enter marks per question"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="negativeMarks">Negative Marks</label>
        <input
          type="text"
          name="negativeMarks"
          placeholder="Negative marks per question"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="optionA">Option A</label>
        <input
          type="text"
          name="optionA"
          placeholder="Enter Option A"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="optionB">Option B</label>
        <input
          type="text"
          name="optionB"
          placeholder="Enter Option B"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="optionC">Option C</label>
        <input
          type="text"
          name="optionC"
          placeholder="Enter Option C"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="optionD">Option D</label>
        <input
          type="text"
          name="optionD"
          placeholder="Enter Option D"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3">
        <label htmlFor="correct">Correct Answer</label>
        <input
          type="text"
          name="correct"
          placeholder="Enter Correct Answer"
          onChange={handleChange}
        />
      </div>
      <div className="col-lg-3 d-flex justify-content-start position-relative">
        {/* <button
          className="btn btn-info position-absolute"
          style={{ width: "fit-content", bottom: "3px" }}
          onClick={handleAddQuestion} // Add question to the array
        >
          Add Question
        </button> */}
        <button
          className="btn btn-success position-absolute"
          style={{ width: "fit-content", bottom: "3px" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Question;
