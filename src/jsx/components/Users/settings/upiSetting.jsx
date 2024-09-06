import React, { Fragment, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import toast from "react-hot-toast";
import { AdminSettings } from "../../../../services/api_function";

export const UpiSetting = () => {
  const [formDataState, setFormDataState] = useState({
    upi_id: "",
    filedata: null, // Stores the file object
  });

  const formHandle = (e) => {
    const { name, value, files } = e.target;
    if (name === "qr_image" && files.length > 0) {
      setFormDataState({ ...formDataState, filedata: files[0] }); // Store file object
    } else {
      setFormDataState({ ...formDataState, [name]: value });
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    // Validate UPI ID and file
    if (!formDataState.upi_id) {
      toast.error("Please enter UPI ID");
      return;
    }
    if (!formDataState.filedata) {
      toast.error("Please upload a QR image");
      return;
    }

    // Create FormData and append values
    const formData = new FormData();
    formData.append("upi_id", formDataState.upi_id);
    formData.append(
      "deposit",
      formDataState.filedata,
      formDataState.filedata.name
    );

    // Fetch token from localStorage
    const userDetail = localStorage.getItem("userDetails");
    const token = JSON.parse(userDetail).token;

    // Call the API with FormData
    const apiSubUrl = "update-qr";
    const res = await AdminSettings(formData, apiSubUrl, token, true); // Pass `true` if your function expects multipart/form-data

    if (res.status === 200) {
      toast.success("UPI updated successfully!");
      setFormDataState({
        upi_id: "",
        filedata: null,
      });
    }
  };

  return (
    <>
      <div className="col-md-6 m-auto">
        <div className="card">
          <div className="card-body">
            <form onSubmit={formSubmit}>
              <div>
                {/* UPI ID Input */}
                <div className="mb-3">
                  <label className="form-label">UPI ID</label>
                  <span>
                    <input
                      type="text"
                      name="upi_id"
                      id="upi_id"
                      className="form-control"
                      placeholder="Enter UPI ID"
                      
                      onChange={formHandle}
                      required
                      value={formDataState.upi_id}
                    />
                  </span>
                </div>

                {/* QR Image Upload */}
                <div className="mb-3">
                  <label className="form-label">
                    Upload QR Image
                  </label>
                  <span>
                    <input
                      type="file"
                      name="qr_image"
                      id="qr_image"
                      className="form-control"
                      accept="image/*"
                      
                      onChange={formHandle}
                      required
                    />
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  className="action_btn"
                 
                >
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

export default UpiSetting;
