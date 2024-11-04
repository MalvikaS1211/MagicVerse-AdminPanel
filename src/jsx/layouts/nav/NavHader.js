import React, { useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

//images
import logo1 from "../../../images/logo.png";

// import logo1 from "./../../../images/logo/logo.png";
import logotext1 from "./../../../images/logo/logo-text.png";
import logoColor from "./../../../images/logo/logo-color.png";
import logoColorText from "./../../../images/logo/logo-text-color.png";
import image from "../../../images/t Text.svg";
import { PiDotsNineBold } from "react-icons/pi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

export function NavMenuToggle() {
  setTimeout(() => {
    let mainwrapper = document.querySelector("#main-wrapper");
    if (mainwrapper.classList.contains("menu-toggle")) {
      mainwrapper.classList.remove("menu-toggle");
    } else {
      mainwrapper.classList.add("menu-toggle");
    }
  }, 200);
}

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } =
    useContext(ThemeContext);
  return (
    <div className="nav-header">
      <Link to="/admin/dashboard" className="brand-logo">
        {/* //for mobile */}
        <img src={logo1} className="logo-color" alt="" />
        {/* for // Desktop */}
        <img src={logo1} className="logo-abbr" alt="" width="100" />
        {/* <img src="../../images/logo.png" class="brand-title" alt="" /> */}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          //openMenuToggle();
          NavMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <div className="">
            {" "}
            <i className="fa fa-arrow-left-long fs-3 text_green lines"></i>
          </div>
          {/* <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span> */}
          <PiDotsNineBold style={{ fontSize: "2.5rem" }} />
        </div>
      </div>
    </div>
  );
};

export default NavHader;
