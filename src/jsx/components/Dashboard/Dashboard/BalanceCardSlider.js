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
  <a class="action_btn text-black dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  All Record
  </a>

  <ul class="dropdown-menu">
    <li><Link class="dropdown-item" onClick={() => handleDay("All Record")}> All Record</Link></li>
    <li><Link class="dropdown-item" onClick={() => handleDay("Today")}> Today</Link></li>
    <li><Link class="dropdown-item" onClick={() => handleDay("Yesterday")}>  Yesterday</Link></li>
  </ul>
</div>

        {/* <Dropdown className="me-3">
          <Dropdown.Toggle id="dropdown-basic">{day}</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDay("All Record")}>
              All Record
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDay("Today")}>
              Today
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDay("Yesterday")}>
              Yesterday
            </Dropdown.Item>
           
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            <DatePicker
              label="Calender"
              sx={{ borderColor: "white", color: "white" }}
              onChange={(date) => setFilterRecord(date?.$d.toString())}
            />
          </Box>
        </LocalizationProvider> */}
      </div>
      {data ? (
        <div className="row">
          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                  <img src="/images/user-avatar.png" className="img_50" />
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
                    <p className="text_gray mb-0">Deposit</p>
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
                    <p className="text_gray mb-0">Withdraw</p>
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
                    <img src="/images/usdt-logo.png" className="img_50" />
                   
                  </div>
                  <div className="-info">
                    <h4 className="count-num">
                      {data.usdtDeposite?.toFixed(2)}
                    </h4>
                    <p className="text_gray mb-0">Deposit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="">
                  <h4>{data.usdtStaking?.toFixed(2)}</h4>

                 <p className="text_gray mb-0"> Total Staking Amount (USDT)</p>
                </div>
              </div>
              <div className="back-icon">
                <svg
                  width="115"
                  height="123"
                  viewBox="0 0 115 123"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.05">
                    <path
                      d="M15.3627 66.1299L0.487194 95.8762C-0.228022 97.3054 -0.151221 99.0034 0.687599 100.362C1.52882 101.719 3.00965 102.546 4.60689 102.546H26.9838L40.4097 120.447C41.2821 121.614 42.6514 122.29 44.0926 122.29C46.0066 122.29 47.5151 121.148 48.2159 119.744L62.2334 91.7073C43.2814 89.8952 26.5722 80.2854 15.3627 66.1299Z"
                      fill="#9568FF"
                    />
                    <path
                      d="M137.06 95.8762L122.184 66.1299C110.975 80.2854 94.2658 89.8952 75.3137 91.7073L89.3324 119.744C90.0321 121.148 91.5405 122.29 93.4545 122.29C94.8958 122.29 96.2662 121.614 97.1386 120.447L110.563 102.546H132.94C134.537 102.546 136.018 101.719 136.86 100.362C137.698 99.0034 137.775 97.3054 137.06 95.8762Z"
                      fill="#9568FF"
                    />
                    <path
                      d="M76.4862 10.3573L68.7736 -1.96338L61.0634 10.3573C60.431 11.3677 59.4314 12.0937 58.2758 12.383L44.1766 15.9098L53.5105 27.0509C54.2761 27.9641 54.6577 29.1389 54.5749 30.3282L53.5705 44.8269L67.0504 39.3932C67.6912 39.1352 69.0016 38.7908 70.4956 39.3932L83.9768 44.8269L82.9735 30.3282C82.8919 29.1389 83.2735 27.9641 84.0392 27.0509L93.373 15.9098L79.2738 12.383C78.1182 12.0937 77.1186 11.3677 76.4862 10.3573Z"
                      fill="#9568FF"
                    />
                    <path
                      d="M127.676 23.9022C127.676 -8.57659 101.252 -35 68.7736 -35C36.2949 -35 9.87146 -8.57659 9.87146 23.9022C9.87146 56.3797 36.2949 82.8043 68.7736 82.8043C101.252 82.8043 127.676 56.3809 127.676 23.9022ZM105.166 16.1848L92.2966 31.5451L93.679 51.5352C93.7882 53.1192 93.0754 54.6481 91.7914 55.5817C90.5061 56.5141 88.8321 56.7205 87.3596 56.1277L68.7736 48.6359L50.1876 56.1277C49.6896 56.3281 47.7059 56.9977 45.7559 55.5817C44.4719 54.6481 43.759 53.1192 43.8682 51.5352L45.2531 31.5451L32.384 16.186C31.364 14.968 31.0424 13.3119 31.5332 11.8023C32.024 10.2926 33.2576 9.14062 34.7984 8.75541L54.2365 3.8929L64.8675 -13.0935C65.71 -14.4387 67.186 -15.2559 68.7736 -15.2559C70.3613 -15.2559 71.8373 -14.4387 72.6797 -13.0935L83.3132 3.8929L102.751 8.75541C104.292 9.14062 105.526 10.2926 106.016 11.8023C106.507 13.3119 106.186 14.968 105.166 16.1848Z"
                      fill="#9568FF"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div> */}

          <div className="col-lg-3">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex gap-3">
                  <div className="circle_bg">
                    <img src="/images/rupee.png" className="img_50" />
                   
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{data.inrDeposite}</h4>
                    <p className="text_gray mb-0">Deposit</p>
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
                    <h4 className="count-num"> {data.inrWithdraw}</h4>
                    <p className="text_gray mb-0">Withdraw</p>
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
                    <img src="/images/usdt-logo.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num"> {data.usdtClaim?.toFixed(2)}</h4>
                    <p className="text_gray mb-0">Claim Amount</p>
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
                    <img src="/images/bnb-logo.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">
                      {" "}
                      {(data.bscMint / 1e18)?.toFixed(2)}
                    </h4>
                    <p className="text_gray mb-0">BSC Mint</p>
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
                    <img src="/images/polygon-logo.png" className="img_50" />
                  </div>
                  <div className="-info">
                    <h4 className="count-num">                      
                    {(data.polygonMint / 1e18)?.toFixed(2)}
                    </h4>
                    <p className="text_gray mb-0">Polygon Mint</p>
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
