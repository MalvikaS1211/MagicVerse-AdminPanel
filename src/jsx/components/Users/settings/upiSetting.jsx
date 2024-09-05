import React, { Fragment, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import toast from "react-hot-toast";
import { AdminSettings } from "../../../../services/api_function";

export const UpiSetting = () => {
  const [formDataState, setFormDataState] = useState({
    upi_id: "",
    filedata: null // Stores the file object
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
    formData.append("deposit", formDataState.filedata, formDataState.filedata.name);

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
        filedata: null
      });
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header
             
            >
              <Card.Title>
                UPI Setting
              </Card.Title>
            </Card.Header>
            <Card.Body
            
            >
              <div className="col-md-12">
                <div className="container">
                  <form className="ms-5" onSubmit={formSubmit}>
                    <div>
                      {/* UPI ID Input */}
                      <div className="mb-3">
                        <label className="form-label fs-4 text-white">UPI ID</label>
                        <span>
                          <input
                            type="text"
                            name="upi_id"
                            id="upi_id"
                            className="form-control"
                            placeholder="Enter UPI ID"
                            style={{ width: "30rem" }}
                            onChange={formHandle}
                            required
                            value={formDataState.upi_id}
                          />
                        </span>
                      </div>

                      {/* QR Image Upload */}
                      <div className="mb-3">
                        <label className="form-label fs-4 text-white">Upload QR Image</label>
                        <span>
                          <input
                            type="file"
                            name="qr_image"
                            id="qr_image"
                            className="form-control"
                            accept="image/*"
                            style={{ width: "30rem" }}
                            onChange={formHandle}
                            required
                          />
                        </span>
                      </div>

                      {/* Submit Button */}
                      <button
                        className="btn btn-md"
                        style={{
                          background: "linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                          color: "black",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UpiSetting;
