import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { RiNftFill, RiQuestionnaireFill } from "react-icons/ri";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { PiExamFill } from "react-icons/pi";
import { FaIdCardAlt } from "react-icons/fa";
import { PiHandDepositFill } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";
import { SlSupport } from "react-icons/sl";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { GiLevelEndFlag } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineCollection } from "react-icons/hi";
import { FaThList } from "react-icons/fa";
import { GiAbstract074 } from "react-icons/gi";
import { GiAbstract047 } from "react-icons/gi";
import { BiLogOut, BiSupport } from "react-icons/bi";
import { TbCircleTriangle } from "react-icons/tb";

export const MenuList = [
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: (
      <LuLayoutDashboard className="material-icons"></LuLayoutDashboard>
    ),
    to: "admin/dashboard",
  },

  {
    title: "User List",
    to: "admin/userList",
    iconStyle: <FaUserGraduate className="fs-3" />,
  },

  // {
  //   title: "Total NFT List",
  //   to: "admin/totalnft",
  //   iconStyle: <HiOutlineCollection className="fs-3" />,
  // },

  {
    title: "NFT Creation List",
    to: "admin/NFTCreationList",
    iconStyle: <RiNftFill className="fs-3" />,
  },
  // {
  //   title: "Matured NFT List",
  //   to: "admin/maturedNft",
  //   iconStyle: <GiAbstract074 className="fs-3" />,
  // },
  {
    title: "Bulk Package",
    to: "admin/bulkpackage",
    iconStyle: <GiAbstract047 className="fs-3" />,
  },
  {
    title: "Package History",
    to: "admin/packagehistory",
    iconStyle: <TbCircleTriangle className="fs-3" />,
  },
  {
    title: "Deposit List",
    to: "admin/deposit",
    iconStyle: <PiHandDepositFill className="fs-3" />,
  },

  {
    title: "User Holding",
    to: "admin/userholding",
    iconStyle: <FaUserShield className="fs-3" />,
  },

  {
    title: "Support",
    to: "admin/support",
    iconStyle: <BiSupport className="fs-3" />,
  },

  {
    title: "Logout",
    iconStyle: <BiLogOut className="fs-3">logout</BiLogOut>,
    to: "admin/login",
  },
];
