import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";


export const AddressWithdraw = () => {
  const [formData, setFormData] = useState({
    chain: "",
    address: "",
    key: "",
  });

  const inputHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="col-md-6 m-auto">
        <div className="card">
          <div className="card-body">
            <form>
              <div class="mb-3">
                <span className="form-label">Select Chain</span>
                <span>
                  <select
                    className="form-select form-select-lg mt-1 text-dark"
                    value={formData.chain}
                    name="chain"
                    onChange={inputHandle}
                  >
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
                <label for="address" className="form-label">
                  Address
                </label>
                <span>
                  <input
                    type="number"
                    name="address"
                    id="address"
                    className="form-control"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={inputHandle}
                  />
                </span>
              </div>
              <div class="mb-3">
                <label for="key" className="form-label">
                  Key
                </label>
                <span>
                  <input
                    type="number"
                    name="key"
                    id="key"
                    className="form-control"
                    placeholder="Enter key"
                    value={formData.key}
                    onChange={inputHandle}
                  />
                </span>
              </div>

              <button className="action_btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressWithdraw;
