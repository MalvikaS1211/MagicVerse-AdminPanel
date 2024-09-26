import React from "react";
import { useDispatch } from "react-redux";
// import { Logout } from "../../../store/actions/AuthActions";
import { IoShieldHalfSharp, IoTriangleOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { BiArchiveOut } from "react-icons/bi";
import { FaParachuteBox } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { RiQuestionnaireFill } from "react-icons/ri";

import { CiGift } from "react-icons/ci";
import {
  FaFileSignature,
  FaUserFriends,
  FaCoins,
  FaMoneyBag,
} from "react-icons/fa";
import { PiStepsLight } from "react-icons/pi";
import Widget from "../../pages/Widget";
import { Logout } from "../../../store/actions/AuthActions";
export const MenuList = [
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="material-icons">grid_view</i>,
    to: "dashboard",
  },
  {
    title: "Add Question",
    iconStyle: <RiQuestionnaireFill className="fs-3"/>,
    to: "addQuestion",
  },
  {
    title: "Logout",
    iconStyle: <i class="material-icons">logout</i>,
    onClick: Logout,
    to: "login",
  },
];
