import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
import { json, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { Row, Col, Card, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { AdminSettings } from "../../../../services/api_function";
// import { allUser } from "../../../services/api_function";
// import { COLUMNS } from "../table/FilteringTable/Columns";

export const BankSetting = () => {
  const [formData,setFormData]=useState({
    account_no:"",
    ifsc_code:""
  })

  const formHandle=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const formSubmit=async(e)=>{
    e.preventDefault()
    if(!formData.account_no){
      toast.error("Please Select account_no")
      return
    }
    if(!formData.ifsc_code){
      toast.error("Please Enter ifsc_code")
      return
    } 
    const userDetail= localStorage.getItem("userDetails")
    const token=JSON.parse(userDetail).token
    const apiSubUrl= "update-bank-detail"
    const res = await AdminSettings(formData,apiSubUrl,token)
   if(res.status===200){
    toast.success("bank Update Successfully!")
     setFormData({
      account_no:"",
      ifsc_code:""
    })
   }
  }
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
             
            >
              <Card.Title>
                Bank Setting
              </Card.Title>
            </Card.Header>
            <Card.Body
             
            >
              <div className="col-md-12">
                <div className="container">
                    <form className="ms-5">
                      <div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label fs-4 text-white">
                          Account Number
                        </label>
                        <span>
                          <input
                            type="number"
                            name="account_no"
                            id="account_no"
                            className="form-control"
                            placeholder="Enter account number"
                            style={{ width: "30rem" }}
                            onChange={formHandle}
                            required
                            value={formData.account_no}
                          />
                        </span>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label fs-4 text-white">
                          IFSC Code
                        </label>
                        <span>
                          <input
                            type="text"
                            name="ifsc_code"
                            id="ifsc_code"
                            className="form-control"
                            placeholder="Enter ifsc code"
                            style={{ width: "30rem" }}
                            onChange={formHandle}
                            required
                            value={formData.ifsc_code}
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
                        onClick={formSubmit}
                      >
                        Save
                      </button>
                      </div>
                    </form>

                </div>
              </div>
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                {/* <div className="filter-pagination  mt-3 ">
                  <button
                    className="previous-button"
                    style={{
                      background:
                        " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                      color: "black",
                    }}
                  >
                    Save
                  </button>
                </div> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BankSetting;
