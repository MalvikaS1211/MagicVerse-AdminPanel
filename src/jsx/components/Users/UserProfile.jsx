import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { BiBriefcase, BiCopy } from "react-icons/bi";
import { ImStack } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserInfo } from "../../../services/api_function";
import ApexChart from "./ApexChart";

export const UserProfile = () => {
  const [apiData, setApiData] = useState([]);
  const [config, setcofig] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const navigate = useNavigate();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const id = query.get('id');
  console.log(id,"id")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const table = "Userinfo";
        const result = await UserInfo(
          table,
          token,
          id?.toString()
        );
        if(result?.data?.length > 0){
          setApiData(result?.data?.[0]);
        }else{
          setApiData({});
        }
        setcofig(result?.config);


      console.log("API Data:", result);

       
        if (!result?.data[0]) {
          setRecordStatus("No Record");
        }
        if (result.status == 404) {
          navigate("/login");
          localStorage.removeItem("userDetails");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img
                src={apiData?.profile_image?.indexOf('https')>-1?
                apiData?.profile_image:
                apiData?.profile_image
                  ? `data:image/jpeg;base64,${apiData?.profile_image}`
                  : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                alt="avatar"
                class="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 class="my-3">{apiData?.name}</h5>
              <p class="text-muted mb-1">Full Stack Developer</p>
              <p class="text-muted mb-4">{apiData?.full_address}</p>
              <div class="d-flex justify-content-center mb-2">
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="action_btn"
                >
                  Follow
                </button>
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="action_btn_outline ms-1"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
          <div class="card mb-4 mb-lg-0">
            <div class="card-body p-0">
              <ul class="list-group list-group-flush rounded-3">
               
                <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-4">
                 
                  <p class="mb-0"> Assets</p>
                <p class="mb-0">54.23</p>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-4">
                  
                  <p class="mb-0"> Staking</p>
                 <p class="mb-0">0.000</p>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-4">
                 
                  <p class="mb-0">Referral</p>
                 <p class="mb-0">0.000</p>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-4">
                  
                  <p class="mb-0">Deposited</p>
                 <p class="mb-0">0.000</p>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-4">                
                  <p class="mb-0">Withdrawal</p>
                 <p class="mb-0">0.000</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{apiData?.name || "--"}</p>
                </div>
              </div>
              <hr className="hr_line"/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{apiData?.email || "--"} </p>
                </div>
              </div>
               <hr className="hr_line"/>
             
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Mobile</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{apiData?.mobile || "--"}</p>
                </div>
              </div>
               <hr className="hr_line"/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Address</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{apiData?.full_address || "--"}</p>
                </div>
              </div>
              <hr className="hr_line"/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Wallet</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5 <Link className="text-teal"><BiCopy/></Link></p>
                </div>
              </div>
               <hr className="hr_line"/>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="card">
              <div class="card-body">
              <p class="mb-4">
                    <span class="text-teal me-1">Login</span>{" "}
                   Activity
                  </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                  <p class="mb-0">IP</p>
                </div>
                <div class="">
                  <p class="text-muted mb-0">127.0.0.1</p>
                </div>
              </div>
              <hr className="hr_line"/>
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                  <p class="mb-0">Browser Name </p>
                </div>
                <div class="">
                  <p class="text-muted mb-0">Chrome</p>
                </div>
              </div>
               
              <hr className="hr_line"/>
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                  <p class="mb-0">OS</p>
                </div>
                <div class="">
                  <p class="text-muted mb-0">	Android</p>
                </div>
              </div>
              <hr className="hr_line"/>
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                  <p class="mb-0">Status</p>
                </div>
                <div class="">
                  <p class="text-muted mb-0">	Connected</p>
                </div>
              </div>
              <hr className="hr_line"/>
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                  <p class="mb-0">Action</p>
                </div>
                <div class="">
                  <p class="text-muted mb-0"> <div className="text-danger">Logout</div></p>
                </div>
              </div>
               
            </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card mb-4 mb-md-0">
                <div class="card-body pb-3">
                  <p class="mb-2">
                    <span class="text-teal me-1"> Collateral </span>{" "}
                   vs Acquisition
                  </p>
                
                 <ApexChart/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
