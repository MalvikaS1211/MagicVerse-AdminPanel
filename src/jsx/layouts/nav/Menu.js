import React from "react";
import { useDispatch } from "react-redux";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { PiExamFill } from "react-icons/pi";
import { FaIdCardAlt } from "react-icons/fa";
import { PiHandDepositFill } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";
import { SlSupport } from "react-icons/sl";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { GiLevelEndFlag } from "react-icons/gi";

export const MenuList = [
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="material-icons">grid_view</i>,
    to: "admin/dashboard",
  },

  {
    title: "User List",
    to: "admin/userList",
    iconStyle: <FaUserGraduate className="fs-3" />,
  },

  {
    title: "ROI Percentage",
    to: "admin/roipercentage",
    iconStyle: <PiHandDepositFill className="fs-3" />,
  },
  {
    title: "Deposit",
    to: "admin/deposit",
    iconStyle: <SlSupport className="fs-3" />,
  },
  {
    title: "ROI Withdraw",
    to: "admin/roiWithdraw",
    iconStyle: <RiMoneyDollarCircleLine className="fs-3" />,
  },
  // {
  //   title: "Rejected Withdrawal",
  //   to: "admin/rejected-withdrawal",
  //   iconStyle: <PiHandDepositFill className="fs-3" />,
  // },
  // {
  //   title: "Approved Withdrawal",
  //   to: "admin/approved-withdrawal",
  //   iconStyle: <GiLevelEndFlag className="fs-3" />,
  // },
  // {
  //   title: "Team Profit Trade Withdraw",
  //   to: "admin/team-profit-trade",
  //   iconStyle: <FaHandshake className="fs-3" />,
  // },

  // {
  //   title: "Level Reward Withdraw",
  //   to: "admin/level-reward",
  //   iconStyle: <GiLevelEndFlag className="fs-3" />,
  // },
  // {
  //   title: "Node Group",
  //   // to:"admin/unstake",
  //   iconStyle: <PiHandDepositFill className="fs-3" />,
  //   content: [
  //     {
  //       title: "Approved",
  //       to: "admin/node-approve",
  //     },
  //     {
  //       title: "Pending",
  //       to: "admin/node-pending",
  //     },
  //   ],
  // },
  // {
  //   title:"Deposit List",
  //   to:"depositList",
  //   iconStyle:<PiHandDepositFill className="fs-3"/>
  // },

  // {
  //   title: "Support",
  //   iconStyle: <SlSupport className="fs-3" />,
  //   to: "admin/support-chats",
  // },

  // {
  //   title: "Setting",
  //   to: "admin/setting",
  //   iconStyle: <IoIosSettings className="fs-3" />,
  // },
  {
    title: "Logout",
    iconStyle: <i class="material-icons">logout</i>,
    to: "admin/login",
  },
];
