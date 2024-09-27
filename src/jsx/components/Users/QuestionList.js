import React, { useEffect, useState } from "react";
import { fetchQuestion, getContestId } from "../../../services/api_function";

function QuestionList() {
  const [question, setQuestionList] = useState();
  const [allContest, setAllContest] = useState();

  const getQuestionList = async (item) => {
    console.log(item, ":::::");
    try {
      let contestId = item;
      const res = await fetchQuestion(contestId);
      if (res) {
        setQuestionList(res.questions);
      } else {
        setQuestionList([]);
      }
      console.log(res, "::::: res from getQuestionList");
    } catch (error) {
      console.log(error, "In fetching Question");
    }
  };

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

  useEffect(() => {
    getContest();
  }, []);

  return (
    <div className="row col-lg-12 mainDiv  table-responsive">
      <div
        className="col-lg-12 mb-5 contest"
        style={{ height: "fit-content", display: "flex", gap: "10px" }}
      >
        <label htmlFor="">Select Content</label>
        <select
          onChange={(e) => {
            const selectedContest = e.target.value;
            if (selectedContest) {
              getQuestionList(selectedContest);
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
            <th scope="col">Question ID</th>
            <th scope="col">Question</th>
            <th scope="col">Option A</th>
            <th scope="col">Option B</th>
            <th scope="col">Option C</th>
            <th scope="col">Option D</th>
            <th scope="col">Correct Answer</th>
            <th scope="col">MarkPerQuestion</th>
            <th scope="col">Negative MarkPerQuestion</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {question &&
            question?.map((ques) => {
              return (
                <tr>
                  <th scope="row">{ques?.id}</th>
                  <td>{ques?.question}</td>
                  <td>{ques?.options[0]}</td>
                  <td>{ques?.options[1]}</td>
                  <td>{ques?.options[2]}</td>
                  <td>{ques?.options[3]}</td>
                  <td>{ques?.correct_answer}</td>
                  <td>{ques?.marks}</td>
                  <td>{ques?.negative}</td>
                  <td>
                    {ques?.image_url ? (
                      <img src={ques?.image_url} alt="" srcset=""  style={{height:'200px',width:'200px'}}/>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionList;
