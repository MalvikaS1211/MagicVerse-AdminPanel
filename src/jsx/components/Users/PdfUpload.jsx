import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import Web3 from "web3";
import { RiDeleteBinLine } from "react-icons/ri";
import { Row, Col, Card, Table } from "react-bootstrap";
import {
  deleteReport,
  getMintRecord,
  getReports,
  uploadPdf,
  url,
  url2,
} from "../../../services/api_function";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setChainAction } from "../../../store/actions/AuthActions";
export const PdfUpload = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiStatus, setApiStatus] = useState("Loading...");
  const selectChain = useSelector((state) => state.auth.selectChain);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    quater: "",
    title: "",
    pdf: "",
  });

  useEffect(() => {
    console.log(currentPage);
    const userDetails = localStorage.getItem("userDetails");
    const parsedDetails = JSON.parse(userDetails);
    const token = parsedDetails.token;
    const fetchData = async () => {
      try {
        const res = await getReports(currentPage);
        setApiData(res.data.data);
        setTotalPages(res.data.totalPages);
        if (res.data.data) {
          setApiStatus("No Record");
        }
      } catch (error) {
        console.log("Error in mintpage", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const setInput = (e) => {
    if (e.target.name !== "pdf") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pdf) {
      return toast.error("Please Select Pdf");
    }
    try {
      const res = await uploadPdf(formData);
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setApiData((prevData) => {
          return [...prevData, res.data.data];
        });
        setFormData({
          quater: "",
          title: "",
          pdf: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePdf = async (id) => {
    if (window.confirm("Are You Want To Delete This Report ?")) {
      try {
        const res = await deleteReport(id);
        if (res.data.status === 200) {
          setApiData(apiData.filter((it) => it._id != id));
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(apiData, "done");

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <form className="row" onSubmit={handleSubmit}>
                <div className="col-lg-3">
                  <div>
                    <label for="quater" className="form-label">
                      Quater
                    </label>
                    <span>
                      <select
                        className="form-control"
                        name="quater"
                        id="quater"
                        required
                        onChange={setInput}
                      >
                        <option
                          value=""
                          selected={formData.quater ? false : true}
                        >
                          ---Select Quater---
                        </option>
                        <option value="January 1 - March 31">
                          January 1 - March 31
                        </option>
                        <option value="April 1 - June 30">
                          April 1 - June 30
                        </option>
                        <option value="July 1 - September 30">
                          July 1 - September 30
                        </option>
                        <option value="October 1 - December 31">
                          October 1 - December 31
                        </option>
                      </select>
                    </span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <label for="title" className="form-label">
                    Title
                  </label>
                  <span>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-control"
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={setInput}
                      required
                    />
                  </span>
                </div>
                <div className="col-lg-3">
                  <div>
                    <label for="pdf" className="form-label">
                      Pdf
                    </label>
                    <span>
                      <input
                        type="file"
                        name="pdf"
                        id="pdf"
                        className="form-control"
                        onChange={setInput}
                        required
                      />
                    </span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <label for="button" className="form-label">
                    &nbsp;
                  </label>
                  <div>
                    <button className="action_btn" type="submit">
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Report</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table">
                  {/* Conditionally render the table header only if there is data */}
                 
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">File (Pdf)</th>
                        <th scope="col">Title</th>
                        <th scope="col">Quarter</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                 
                  <tbody>
                    {!apiData[0] ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          {apiStatus}
                        </td>
                      </tr>
                    ) : (
                      apiData.map((item, index) => (
                        <tr key={index}>
                          <td scope="col">{index + 1}</td>
                          <td scope="col">
                            <a
                              href={`${url}/${item?.file.replace(
                                "uploads",
                                "support"
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="shadow-sm"
                                src="pdf-preview.png"
                                alt="report"
                                height={50}
                                width={80}
                              />
                            </a>
                          </td>
                          <td scope="col">{item?.title}</td>
                          <td scope="col">{item?.quater}</td>
                          <td scope="col">
                            <div
                              className="text-danger cursor-pointer"
                              onClick={() => deletePdf(item?._id)}
                            >
                              <RiDeleteBinLine className="fs-4" />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {apiData[0] && (
              <div className="text-center mb-3 col-lg-6 m-auto">
                <div className="filter-pagination mt-5">
                  <button
                    className="previous-button"
                    onClick={() => setCurrentPage((pre) => pre - 1)}
                    disabled={currentPage == 1 ? 1 : 0}
                  >
                    Previous
                  </button>
                  <button
                    className="next-button"
                    onClick={() => setCurrentPage((pre) => pre + 1)}
                    disabled={currentPage === totalPages ? 1 : 0}
                  >
                    Next
                  </button>
                  <span className="  ms-2">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PdfUpload;
