import React, { useEffect, useState } from "react";
import { getContestId } from "../../../services/api_function";
import Papa from "papaparse";
import { createQuestionInContest } from "../../../services/api_function";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./Firebase";

function Csv() {
  const [contestId, setContestId] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [formData, setFormData] = useState({ contestId: "" });
  const [imageFiles, setImageFiles] = useState({});

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
        },
        header: true,
      });
    }
  };

  const handleImageUpload = (file, questionId) => {
    const storageRef = ref(storage, `images/${questionId}`);
    return uploadBytes(storageRef, file).then(async () => {
      return await getDownloadURL(storageRef);
    });
  };

  const handleImageChange = (e, rowIndex) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) => ({
        ...prev,
        [rowIndex]: file,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.contestId) {
        return toast.error("Please Select Contest");
      }
      for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];
        const file = imageFiles[i];
        let downloadURL = "";
        if (file) {
          downloadURL = await handleImageUpload(file, row.id);
        }
        const questionData = {
          contestId: formData.contestId,
          id: row.id,
          correct_answer: row.correct_answer,
          marks: parseInt(row.marksPerQuestion),
          negative: parseInt(row.negative),
          options: [row.optionA, row.optionB, row.optionC, row.optionD],
          question: row.question,
          image_url: downloadURL,
        };

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
          <option value="">Choose Contest</option>
          {contestId &&
            contestId.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>

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

      <div className="col-lg-12 mt-5">
        {csvData.length > 0 && (
          <table className="csvTable">
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key, index) => (
                  <th key={index} className="p-2">
                    {key}
                  </th>
                ))}
                <th>Upload Image</th>
              </tr>
            </thead>
            <tbody>
              {csvData
                .filter((row) =>
                  Object.values(row).some((value) => value.trim() !== "")
                ) // Filter out empty rows
                .map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex} className="p-2">
                        {value}
                      </td>
                    ))} 
                    <td className="p-2">
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(e, rowIndex)}
                        style={{ paddingTop: "5px" }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="col-lg-3 mt-3">
        {csvData.length > 0 && (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            style={{ background: "blue" }}
          >
            Submit Questions
          </button>
        )}
      </div>
    </div>
  );
}

export default Csv;
