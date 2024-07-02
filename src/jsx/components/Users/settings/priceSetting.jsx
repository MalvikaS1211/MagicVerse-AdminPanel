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

export const PriceSetting = () => {
  const [formData,setFormData]=useState({
    token:"",
    price:""
  })

  const formHandle=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const formSubmit=async(e)=>{
    e.preventDefault()
    if(!formData.token){
      toast.error("Please Select Token")
      return
    }
    if(!formData.price){
      toast.error("Please Enter Price")
      return
    } 
    const userDetail= localStorage.getItem("userDetails")
    const token=JSON.parse(userDetail).token
    const apiSubUrl= "price-setting"
    const res = await AdminSettings(formData,apiSubUrl,token)
   if(res.status===200){
    toast.success("Price Update Successfully!")
     setFormData({
      token:"",
      price:""
    })
   }
  }
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                Price Setting
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
                <div className="container">
                    <form className="ms-5">
                      <div>
                      <div class="mb-3">
                      <span  className="form-label fs-4 text-white">
                          Select
                        </span>
                        <span>
                          <select className="form-select form-select-lg mb-3 text-dark mt-3"  style={{ width: "30rem" }} name="token" onChange={formHandle} value={formData.token} required>
                            <option value="">Please Select</option>
                            <option value="INRX">USDT / INRX</option>
                            <option value="INR">INRX / INR</option>
                          </select>
                        </span>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label fs-4 text-white">
                          Price
                        </label>
                        <span>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="form-control"
                            placeholder="Enter Price"
                            style={{ width: "30rem" }}
                            onChange={formHandle}
                            required
                            value={formData.price}
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
                {/* <div className="filter-pagination  mt-3 bg-black">
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

export default PriceSetting;
