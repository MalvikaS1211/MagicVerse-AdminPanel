import React, { useEffect, useState } from "react";
import { getContestId } from "../../../services/api_function";
import Papa from "papaparse";
import { createQuestionInContest } from "../../../services/api_function"; // Assuming it's in the same service file
import { toast } from "react-hot-toast"; // For notifications

function Csv() {
  const [contestId, setContestId] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [formData, setFormData] = useState({
    contestId: "",
    questionId: "",
    correct: "",
    img: "",
    marksPerQuestion: "",
    negativeMarks: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    question: "",
  });

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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value, // Handle file input
    });
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log(result.data);
          setCsvData(result.data);
        },
        header: true,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];
        const questionData = {
          contestId: formData.contestId,
          id: row.id,
          correct_answer: row.correct_answer,
          marks: parseInt(row.marksPerQuestion),
          negative: parseInt(row.negative),
          options: [row.optionA, row.optionB, row.optionC, row.optionD],
          question: row.question,
        };
        console.log(questionData, ":qqq");
        const result = await createQuestionInContest(
          questionData,
          formData.contestId
        );
        if (result) {
          toast.success(`Question ${questionData.id} added successfully`);
        } else {
          toast.error(`Error adding question ${questionData.id}`);
        }
      }
    } catch (error) {
      console.error("Error submitting questions: ", error);
    }
  };

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

      {/* CSV Upload Section */}

      <div className="col-lg-3">
        <label htmlFor="csvUpload">Upload CSV</label>
        <input
          type="file"
          id="csvUpload"
          accept=".csv"
          onChange={handleCsvUpload}
          style={{ paddingTop: "5px" }}
        />
      </div>

      {/* Display extracted CSV data */}
      <div className="col-lg-12 mt-5">
        {csvData && csvData.length > 0 && (
          <table className="csvTable">
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData
                .map((row) => {
                  const trimmedRow = {};
                  Object.keys(row).forEach((key) => {
                    trimmedRow[key.trim()] = row[key].trim(); // Trim both key and value
                  });
                  return trimmedRow;
                })
                .filter((row) =>
                  Object.values(row).some((value) => value.trim() !== "")
                ) 
                .map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Submit Button */}
      <div className="col-lg-3 mt-3">
      {csvData.length > 0 && 
        <button className="btn btn-primary" onClick={handleSubmit} style={{background:'blue'}}>
          Submit Questions
        </button>
      }
      </div>
    </div>
  );
}

export default Csv;
