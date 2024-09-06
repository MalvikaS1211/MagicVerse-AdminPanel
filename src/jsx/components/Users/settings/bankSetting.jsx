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
  const [formData, setFormData] = useState({
    account_no: "",
    ifsc_code: "",
  });

  const formHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!formData.account_no) {
      toast.error("Please Select account_no");
      return;
    }
    if (!formData.ifsc_code) {
      toast.error("Please Enter ifsc_code");
      return;
    }
    const userDetail = localStorage.getItem("userDetails");
    const token = JSON.parse(userDetail).token;
    const apiSubUrl = "update-bank-detail";
    const res = await AdminSettings(formData, apiSubUrl, token);
    if (res.status === 200) {
      toast.success("bank Update Successfully!");
      setFormData({
        account_no: "",
        ifsc_code: "",
      });
    }
  };
  return (
    <Fragment>
      <div className="col-md-6 m-auto">
        <div className="card">
          <div className="card-body">
            <form className="">
              <div>

              <div class="mb-3">
                  <label for="account_name" className="form-label">
                    Account Name
                  </label>
                  <span>
                    <input
                      type="number"
                      name="account_name"
                      id="account_name"
                      className="form-control"
                      placeholder="Enter account name"
                      // onChange={formHandle}
                      // required
                      // value={formData.account_no}
                    />
                  </span>
                </div>

                <div class="mb-3">
                  <label for="account_no" className="form-label ">
                    Account Number
                  </label>
                  <span>
                    <input
                      type="number"
                      name="account_no"
                      id="account_no"
                      className="form-control"
                      placeholder="Enter account number"
                      onChange={formHandle}
                      required
                      value={formData.account_no}
                    />
                  </span>
                </div>
                <div class="mb-3">
                  <label for="ifsc_code" className="form-label ">
                    IFSC Code
                  </label>
                  <span>
                    <input
                      type="text"
                      name="ifsc_code"
                      id="ifsc_code"
                      className="form-control"
                      placeholder="Enter IFSC code"
                      onChange={formHandle}
                      required
                      value={formData.ifsc_code}
                    />
                  </span>
                </div>

                <div class="mb-3">
                  <label for="bank_name" className="form-label ">
                    Bank Name
                  </label>
                  <span>
                    <input
                      type="text"
                      name="bank_name"
                      id="bank_name"
                      className="form-control"
                      placeholder="Enter Bank Name"
                      // onChange={formHandle}
                      // required
                      // value={formData.ifsc_code}
                    />
                  </span>
                </div>

                <button className="action_btn" onClick={formSubmit}>
                  Save 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </Fragment>
  );
};

export default BankSetting;
