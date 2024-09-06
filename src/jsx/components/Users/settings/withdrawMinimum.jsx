import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { AdminSettings } from "../../../../services/api_function";

export const WithdrawMinimum = () => {
  const [formData, setFormData] = useState({
    token: "",
    price: "",
    action: "withdraw",
  });

  const inputHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!formData.token) return toast.error("Select Token!");
    if (!formData.price) return toast.error("Price field required!");

    const userData = localStorage.getItem("userDetails");
    const token = JSON.parse(userData).token;
    const apiSubUrl = "deposit-setting";
    const res = await AdminSettings(formData, apiSubUrl, token);
    if (res.status === 200) {
      toast.success("Price update Successfully");
      setFormData({
        token: "",
        price: "",
        action: "withdraw",
      });
    }
  };

  return (
    <>
      <div className="col-md-6 m-auto">
        <div className="card">
          <div className="card-body">
            <form>
              <div class="mb-3">
                <span className="form-label">Select Token</span>
                <span>
                  <select
                    className="form-select mt-2"
                    onChange={inputHandle}
                    name="token"
                    value={formData.token}
                  >
                    <option value="">Please Select</option>
                    <option value="inr">INR</option>
                    <option value="inrx">INRX</option>
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
                    onChange={inputHandle}
                    value={formData.price}
                  />
                </span>
              </div>

              <button className="action_btn" onClick={formSubmit}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawMinimum;
