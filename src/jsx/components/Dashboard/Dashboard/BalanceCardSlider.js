import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dashboardData, Protocal } from "../../../../services/api_function";
import "swiper/css";
import { Dropdown } from "react-bootstrap";
import { Box, FormGroup } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LuUser } from "react-icons/lu";

const BalanceCardSlider = () => {
  const [data, setData] = useState(null);
  const [protocal, setProtocal] = useState(null);
  const navigate = useNavigate();
  const [filterRecord, setFilterRecord] = useState("All Record");
  const [day, setDay] = useState("All Record");

  const [value, setValue] = useState(new Date().toISOString());
  const [formattedValue, setFormattedValue] = useState("");

  const handleChange = (value, formattedValue) => {
    setValue(value);
    setFormattedValue(formattedValue);
  };

  const protocolData = async () => {
    try {
      const userDetails = localStorage.getItem("userDetails");
      const parsedDetails = JSON.parse(userDetails);
      const token = parsedDetails.token;
      const response = await Protocal(token);
      setProtocal(response.data);

      console.log("Protocol Data:", response.data); // Log protocol data


      if (response.status == 404) {
        navigate("/login");
        localStorage.removeItem("userDetails");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const response = await dashboardData(token, filterRecord);
        setData(response);

        console.log("Dashboard Data:", response);// Log dashboard data

        if (response.status == 404) {
          navigate("/login");
          localStorage.removeItem("userDetails");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    protocolData();
    return () => {};
  }, [navigate, filterRecord]);

  function handleDay(day) {
    setDay(day);
    setFilterRecord(day);
  }
  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {/* <Swiper
        className="mySwiper"
        speed={1500}
        slidesPerView={4}
        spaceBetween={20}
        loop={false}
        //autoplay= {{
        //delay: 1200,
        //}}
        //modules={[ Autoplay ]}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          416: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1788: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      > */}
      <div className="d-flex justify-content-end mb-5">
        <div class="dropdown">
          <a
            class="action_btn text-black dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            All Record
          </a>

          <ul class="dropdown-menu">
            <li>
              <Link
                class="dropdown-item"
                onClick={() => handleDay("All Record")}
              >                
                All Record
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" onClick={() => handleDay("Today")}>                
                Today
              </Link>
            </li>
            <li>
              <Link
                class="dropdown-item"
                onClick={() => handleDay("Yesterday")}
              >
                Yesterday
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {data ? (
        <div className="row">
          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/user.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{data.user ?? 0}</h4>
                    <p className="text_gray mb-0">Total Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/inrx2.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{data.inrxDeposite}</h4>
                    <p className="text_gray mb-0">Deposit INRx</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/rupee.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{data.inrDeposite}</h4>
                    <p className="text_gray mb-0">Deposit INR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/inr-icon.svg" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">XXXXXXXX</h4>
                    <p className="text_gray mb-0">Pending Deposit INR </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/inrx2.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{data.inrxWithdraw}</h4>
                    <p className="text_gray mb-0">Withdrawal INRx</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/rupee-withdrawal.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{data.inrxWithdraw}</h4>
                    <p className="text_gray mb-0">Withdrawal INR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/inr-icon.svg" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">XXXXXX</h4>
                    <p className="text_gray mb-0">Pending INR Withdrawal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/stacked-user.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">
                     XXXXXXX
                    </h4>
                    <p className="text_gray mb-0"> Staked  User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>        

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/staked.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">XXXXXX</h4>
                    <p className="text_gray mb-0">Staked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/claim.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num"> {data.usdtClaim?.toFixed(2)}</h4>
                    <p className="text_gray mb-0">Claimed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/bonus.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num"> XXXXXX</h4>
                    <p className="text_gray mb-0">Bonus Distributed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/used-bonus.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num"> XXXXXX</h4>
                    <p className="text_gray mb-0">Bonus Used</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/stake-referral.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">
                      XXXXXX
                    </h4>
                    <p className="text_gray mb-0">Stake Referral</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/stake-commission.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">
                      XXXXXXX
                    </h4>
                    <p className="text_gray mb-0">Referral Commission</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BalanceCardSlider;
