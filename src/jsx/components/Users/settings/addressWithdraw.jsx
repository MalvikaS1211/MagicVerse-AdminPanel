import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { Row, Col, Card, Table } from "react-bootstrap";

export const AddressWithdraw = () => {
  const [formData,setFormData]=useState({
    chain:"",
    address:"",
    key:""
  })

  const inputHandle =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
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
              Address Withdraw Setting
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
                      <div class="mb-3">
                      <span  className="form-label fs-4 text-white">
                          Select Chain
                        </span>
                        <span>
                          <select className="form-select form-select-lg mb-3 text-dark mt-3"  style={{ width: "30rem" }} value={formData.chain} name="chain" onChange={inputHandle}>
                            <option value="someOption">Please Select</option>
                            <option value="otherOption">BEP 20</option>
                            <option value="otherOption">ERC 20</option>
                            <option value="otherOption">TRC</option>
                            <option value="otherOption">Sol</option>
                            <option value="otherOption">Polygon</option>
                          </select>
                        </span>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label fs-4 text-white">
                          Address
                        </label>
                        <span>
                          <input
                            type="number"
                            name="address"
                            id="address"
                            className="form-control"
                            placeholder="Enter Address"
                            style={{ width: "30rem" }}
                            value={formData.address}
                            onChange={inputHandle}
                          />
                        </span>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label fs-4 text-white">
                          Key
                        </label>
                        <span>
                          <input
                            type="number"
                            name="key"
                            id="key"
                            className="form-control"
                            placeholder="Enter key"
                            style={{ width: "30rem" }}
                            value={formData.key}
                            onChange={inputHandle}
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

export default AddressWithdraw;
