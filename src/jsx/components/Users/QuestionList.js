import React, { useEffect, useState } from "react";
import { fetchQuestion, getContestId } from "../../../services/api_function";

function QuestionList() {
  const [question, setQuestionList] = useState();
  const [allContest, setAllContest] = useState();

  const getQuestionList = async () => {
    try {
      let contestId = "contest-1";
      const res = await fetchQuestion(contestId);
      if (res) {
        setQuestionList(res.questions);
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
    getQuestionList();
    getContest();
  }, []);

  return (
    <div className="row col-lg-12 mainDiv  table-responsive">
      <div className="col-lg-12 mb-5" style={{ height: "fit-content" }}>
        <select>
          <option value="">Select Contest</option>
          {allContest &&
            allContest.map((item) => {
              return <option value={item}>{item}</option>;
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
          </tr>
        </thead>
        <tbody>
          {question &&
            question?.map((ques) => {
              return (
                <tr>
                  <th scope="row">{ques?.questionId}</th>
                  <td>{ques?.question}</td>
                  <td>{ques?.optionA}</td>
                  <td>{ques?.optionB}</td>
                  <td>{ques?.optionC}</td>
                  <td>{ques?.optionD}</td>
                  <td>{ques?.correct_answer}</td>
                  <td>{ques?.marksPerQuestion}</td>
                  <td>{ques?.negativeMarks}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionList;
