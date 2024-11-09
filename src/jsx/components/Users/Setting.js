import React, { useContext, useEffect, useReducer, useState } from "react";
import { getStakeSetting, updateStakeSetting } from "../../../services/api_function";
import toast from "react-hot-toast";

const Setting = () => {
  "";
  const token = localStorage.getItem("adminToken");
  const [stakeSettings, setStakeSettings] = useState({
    stakeDsc: false,
    stakeUsdt: false,
    stakeDscAndUsdt: false,
  });



  // Function to send updated settings to the server
  const updateSettings = async (newSettings) => {
    try {
      const data = await updateStakeSetting(newSettings, token);
      if(data?.status ===200){
        toast.success(data.message)
        console.log("Settings updated successfully:", data);
      }else{
        console.log("Settings error:", data);
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error("Error updating settings:", error);
    }
  };

  // Handle change for each toggle switch
  const handleToggleChange = async (e) => {
    const { name, checked } = e.target;

    // Update the local state immediately
    const newSettings = {
      ...stakeSettings,
      [name]: checked,
    };
    setStakeSettings(newSettings);

    // Update settings on the server
    await updateSettings(newSettings);
  };

  useEffect(()=>{
    getStakeSetting(token).then((res)=>{
      console.log(res,"data")
      if(res?.status === 200){
        const data ={
          stakeDsc: res?.data?.stakeDsc,
          stakeUsdt: res?.data?.stakeUsdt,
          stakeDscAndUsdt: res?.data?.stakeDscAndUsdt,
        }
        setStakeSettings(data);
      } else {
        setStakeSettings({  
          stakeDsc: false,
          stakeUsdt: false,
          stakeDscAndUsdt: false
        })
      }
    })
  },[token])

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div class="form-check form-switch mt-2 mb-2">
            <input
              class="form-check-input"
              name="stakeDsc"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={stakeSettings.stakeDsc}
              onChange={handleToggleChange}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Stake DSC
            </label>
          </div>
          <div class="form-check form-switch mt-2 mb-2">
            <input
              class="form-check-input"
              name="stakeUsdt"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={stakeSettings.stakeUsdt}
              onChange={handleToggleChange}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Stake USDT
            </label>
          </div>
          <div class="form-check form-switch mt-2 mb-2">
            <input
              class="form-check-input"
              name="stakeDscAndUsdt"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={stakeSettings.stakeDscAndUsdt}
              onChange={handleToggleChange}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Stake DSC & USDT
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
