import React, { useState, useEffect } from "react";
const Header = ({ onNote }) => {
  const [rightSelect, setRightSelect] = useState("Eng");
  const [path,setPath]=useState()
  //For fix header
  const [headerFix, setheaderFix] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);
  useEffect(() => {
    var path = window.location.pathname.split("/");
    setPath(path)
  },[window.location.href]);

  return (
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              >
                {path && path[1]}
              </div>
            </div>
            <div className="navbar-nav header-right"></div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
