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
  const [formData, setFormData] = useState({
    token: "",
    price: "",
  });

  const formHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!formData.token) {
      toast.error("Please Select Token");
      return;
    }
    if (!formData.price) {
      toast.error("Please Enter Price");
      return;
    }
    const userDetail = localStorage.getItem("userDetails");
    const token = JSON.parse(userDetail).token;
    const apiSubUrl = "price-setting";
    const res = await AdminSettings(formData, apiSubUrl, token);
    if (res.status === 200) {
      toast.success("Price Update Successfully!");
      setFormData({
        token: "",
        price: "",
      });
    }
  };
  return (
    <>
      <div className="col-lg-6 m-auto">
        <div className="card">
          <div className="card-body">
            <form>
              <div>
                <div class="mb-3">
                  <span className="form-label">Select</span>
                  <span>
                    <select
                      className="form-select form-select-lg mt-2"
                      name="token"
                      onChange={formHandle}
                      value={formData.token}
                      required
                    >
                      <option value="">Please Select</option>
                      <option value="INRX">USDT / INRX</option>
                      <option value="INR">INRX / INR</option>
                    </select>
                  </span>
                </div>
                <div class="mb-3">
                  <label for="price" className="form-label">
                    Price
                  </label>
                  <span>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="form-control"
                      placeholder="Enter Price"
                      onChange={formHandle}
                      required
                      value={formData.price}
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
    </>
  );
};

export default PriceSetting;
