import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import Web3 from "web3";

import { Row, Col, Card, Table } from "react-bootstrap";
import { deleteReport, getMintRecord, getReports, uploadPdf, url, url2 } from "../../../services/api_function";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setChainAction } from "../../../store/actions/AuthActions";
export const PdfUpload = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiStatus, setApiStatus] = useState("Loading...");
  const selectChain  = useSelector((state=>state.auth.selectChain));

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
    if(e.target.name!=="pdf"){
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    else{
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!formData.pdf){
      return toast.error("Please Select Pdf")
    }
    try {
      const res = await uploadPdf(formData)
      if(res.data.status===200){
        toast.success(res.data.message)
        setApiData(prevData => {
          return [...prevData, res.data.data];
        });
        setFormData({
          quater: "",
          title: "",
          pdf: "",
        })
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletePdf = async(id)=>{
   if(window.confirm("Are You Want To Delete This Report ?")){
    try {
      const res = await deleteReport(id)
      if(res.data.status===200){
        setApiData(apiData.filter(it=>it._id!=id))
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
   }
  }

  console.log(apiData,"done")

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Report
              </Card.Title>
            </Card.Header>
            <Card.Body
              style={{
                background: "black",
                border: "1px solid white",
                borderRadius: "3px",
              }}
            >
              <div className="col-md-12">
                <div className="float-end">
                </div>
                <div className="container">
                  <form className="ms-5" onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label fs-4 text-white"
                      >
                        Quater
                      </label>
                      <span>
                        <select
                          className="form-control"
                          style={{ width: "30rem" }}
                          name="quater"
                          id="quater"
                          required
                          onChange={setInput}
                        >
                          <option value="" selected={formData.quater?false:true}>---Select Quater---</option>
                          <option value="January 1 - March 31">January 1 - March 31</option>
                          <option value="April 1 - June 30">April 1 - June 30</option>
                          <option value="July 1 - September 30">July 1 - September 30</option>
                          <option value="October 1 - December 31">October 1 - December 31</option>
                        </select>
                      </span>
                      <label
                        for="exampleInputEmail1"
                        className="form-label fs-4 text-white mt-3"
                      >
                        Title
                      </label>
                      <span>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="form-control"
                          placeholder="Enter title"
                          style={{ width: "30rem" }}
                          value={formData.title}
                          onChange={setInput}
                          required
                        />
                      </span>
                    </div>
                    <div class="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label fs-4 text-white"
                      >
                        Pdf
                      </label>
                      <span>
                        <input
                          type="file"
                          name="pdf"
                          id="pdf"
                          className="form-control"
                          style={{ width: "30rem" }}
                          onChange={setInput}
                          required
                        />
                      </span>
                    </div>
                    <button
                      className="btn btn-md"
                      style={{
                        background:
                          " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                        color: "black",
                      }}
                      type="submit"
                    >
                      Upload
                    </button>
                  </form>
                </div>
              </div>

              <table className="table border mt-5">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-center text-white fs-4"
                      colspan="5"
                    >
                      All Records
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr className="text-center text-white">
                    <th scope="col">No</th>
                    <th scope="col">Pdf</th>
                    <th scope="col">Title</th>
                    <th scope="col">Quater</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!apiData[0] ? (
                    <td colSpan="3" className="text-center">
                      {apiStatus}
                    </td>
                  ) : (
                    apiData?.map((item, index) => (
                      <tr className="text-center text-white" key={index}>
                        <th scope="col">{index + 1}</th>
                        <th scope="col"><a href={`${url}/${(item?.file).replace("uploads","support")}`} target="_blanck">
                            <img src="pdf-preview.png" alt="" height={50} width={80}/>
                          </a></th>
                        <th scope="col">{item?.title}</th>
                        <th scope="col">{item?.quater}</th>
                        <th scope="col"><button className="btn btn-outline-danger btn-sm" onClick={()=>deletePdf(item?._id)}>Delete</button></th>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="text-center">
                <button
                  className="btn btn-md"
                  style={{
                    background:
                      " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                    color: "black",
                  }}
                  onClick={() => setCurrentPage((pre) => pre - 1)}
                  disabled={currentPage == 1 ? 1 : 0}
                >
                  Previous
                </button>
                <button
                  className="btn btn-md ms-2"
                  style={{
                    background:
                      " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                    color: "black",
                  }}
                  onClick={() => setCurrentPage((pre) => pre + 1)}
                  disabled={currentPage === totalPages ? 1 : 0}
                >
                  Next
                </button>
                <span className="bg-black text-white ms-2">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PdfUpload;
