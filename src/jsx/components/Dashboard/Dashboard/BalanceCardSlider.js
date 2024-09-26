import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";

import "swiper/css";
const BalanceCardSlider = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [filterRecord, setFilterRecord] = useState("All Record");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData([]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [navigate, filterRecord]);

  const handleDay = () => {};

  return (
    <>
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
                    {/* <img src="/images/user.png" className="img_50" /> */}
                    <FaUserGraduate className="text-dark" style={{fontSize:'45px'}} />
                    
                  </div>
                  <div className="-info">
                    <h4 className="count-num">{data.user ?? 0}</h4>
                    <p className="text_gray mb-0">Total Users</p>
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
