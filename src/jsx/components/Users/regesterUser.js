import React, { Fragment, useState } from "react";
import { UserRegesation, idToaddress } from "../../../services/api_function";
import { toast } from "react-toastify";
import { isRegisteredInContract, registration } from "./web3/web3Helper";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const UserRegester = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    referrerId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      NotificationManager.error("Name and phone are required fields");
      return; 
    }
    try {
      const refaddr = await idToaddress(formData);
      console.log(refaddr?.data, "rrdddd");

      if (refaddr?.status == 200) {
        const isreg = await isRegisteredInContract(formData.address);
        console.log(isreg, "is registered or not");

        if (!isreg) {
          console.log("let rock")
          await registration(formData.address, refaddr?.data?.data?.user);
          console.log('worked is reg');
        }
        
        if (isreg) {
          console.log("worked");
          const response = await UserRegesation(formData);
          if (response?.data?.status == 201) {
            NotificationManager.success(response?.data?.message);
            navigate("/block");

            console.log(response?.data?.message, response, "::::::::::::::::");
          } else {
            NotificationManager.error(response?.data?.message);
            // toast.error(response?.data?.message);
            console.log(
              response?.data?.data?.message,
              response,
              "::::::::::::::::"
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <form autoComplete="off">
        <div class="mb-3 col-lg-4">
          <label>Name</label>
          <input
            type="text"
            name="name" // Add name attribute
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        <div class="mb-3 col-lg-4">
          <label>Phone</label>
          <input
            type="text"
            name="phone" // Add name attribute
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required 
          />
        </div>
        <div class="mb-3 col-lg-4">
          <label for="exampleInputPassword1" class="form-label">
            Wallet
          </label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3 col-lg-4">
          <label for="exampleInputPassword1" class="form-label">
            Referral
          </label>
          <input
            type="text"
            name="referrerId"
            className="form-control"
            value={formData.referrerId}
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default UserRegester;
