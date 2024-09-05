import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { AdminSettings } from "../../../../services/api_function";

export const WithdrawMinimum = () => {
  const [formData,setFormData]=useState({
    token:"",
    price:"",
    action:"withdraw"
  })

  const inputHandle =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const formSubmit=async(e)=>{
    e.preventDefault()
    if(!formData.token) return toast.error("Select Token!")
    if(!formData.price) return toast.error("Price field required!")

     const userData=localStorage.getItem("userDetails")
     const token = JSON.parse(userData).token
    const apiSubUrl='deposit-setting'
     const res = await AdminSettings(formData,apiSubUrl,token) 
     if(res.status===200){
       toast.success("Price update Successfully")
      setFormData({
        token:"",
        price:"",
        action:"withdraw"
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
              <Card.Title >
              Withdraw Minimum Setting
              </Card.Title>
            </Card.Header>
            <Card.Body
             
            >
              <div className="col-md-12">
                <div className="container">
                    <form className="ms-5">
                      <div class="mb-3">
                      <span  className="form-label fs-4 text-white">
                          Select Token
                        </span>
                        <span>
                          <select className="form-select form-select-lg mb-3 text-dark mt-3"  style={{ width: "30rem" }} onChange={inputHandle} name="token" value={formData.token}>
                            <option value="">Please Select</option>
                            <option value="inr">INR</option>
                            <option value="inrx">INRX</option>
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
                            onChange={inputHandle}
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

export default WithdrawMinimum;
