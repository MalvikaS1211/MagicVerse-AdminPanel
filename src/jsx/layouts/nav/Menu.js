import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { RiNftFill, RiQuestionnaireFill } from "react-icons/ri";
import {
  FaCommentDots,
  FaUserCheck,
  FaUserGraduate,
  FaUserShield,
} from "react-icons/fa";
import { FaMessage, FaRankingStar, FaRegMessage } from "react-icons/fa6";
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
import { BiLogoCodepen, BiLogOut, BiSupport } from "react-icons/bi";
import { TbCircleTriangle } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineSpatialTracking } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
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

  {
    title: "Approve Staking",
    to: "admin/approveStaking",
    iconStyle: <FaHandshake className="fs-3" />

  },

  {
    title: "Give Roi",
    to: "admin/giveRoi",
    iconStyle: <RiMoneyDollarCircleLine className="fs-3" />

  },

  {
    title: "NFT Creation List",
    to: "admin/NFTCreationList",
    iconStyle: <RiNftFill className="fs-3" />,
  },

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
    title: "New NFT Creation Log",
    to: "admin/newnftlist",
    iconStyle: <BiLogoCodepen className="fs-3" />,
  },
  {
    title: "Last Transaction Details",
    to: "admin/soldNFTs",
    iconStyle: <GrTransaction className="fs-3" />,
  },

  {
    title: "NFT Value Tracking",
    to: "admin/nfttracking",
    iconStyle: <MdOutlineSpatialTracking className="fs-3" />,
  },
  {
    title: "Add NFT to queue",
    to: "admin/addnftqueue",
    iconStyle: <GiAbstract074 className="fs-3" />,
  },
  {
    title: "Active Users",
    to: "admin/active-users",
    iconStyle: <FaUserCheck className="fs-3" />,
  },
  {
    title: "Due NFT",
    to: "admin/dueNft",
    iconStyle: <GiLevelEndFlag className="fs-3" />,
  },
  {
    title: "Old NFT",
    to: "admin/oldNftList",
    iconStyle: <GiLevelEndFlag className="fs-3" />,
  },
  {
    title: "Add Massage",
    to: "admin/addmessage",
    iconStyle: <FaRegMessage className="fs-3" />,
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
