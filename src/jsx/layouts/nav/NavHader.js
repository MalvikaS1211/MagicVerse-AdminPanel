import React, { useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

//images
import logo1 from "../../../images/Favicon.png";

// import logo1 from "./../../../images/logo/logo.png";
import logotext1 from "./../../../images/logo/logo-text.png";
import logoColor from "./../../../images/logo/logo-color.png";
import logoColorText from "./../../../images/logo/logo-text-color.png";
import image from "../../../images/t Text.svg";
import { PiDotsNineBold } from "react-icons/pi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
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
        <img
          src={logo1}
          className="logo-color"
          alt=""
          style={{ width: "60%" }}
        />
        {/* for // Desktop */}
        <img
          src={logo1}
          alt=""
          className="logo-show"
          style={{ width: "20%" }}
        />
        {/* <img src="../../images/logo.png" class="brand-title" alt="" />   //className="logo-abbr" */}
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
            <i className="fa fa-arrow-left-long fs-3 text_green lines"></i>
          </div>
          {/* <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span> */}
          <TbGridDots style={{ fontSize: "2.5rem" }} />
        </div>
      </div>
    </div>
  );
};

export default NavHader;
