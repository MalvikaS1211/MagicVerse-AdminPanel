import React from "react";
import { useDispatch } from "react-redux";
import { Logout } from "../../../store/actions/AuthActions";
import { IoShieldHalfSharp, IoTriangleOutline } from "react-icons/io5";
import { ImStack } from "react-icons/im";
import { LuUser2 } from "react-icons/lu";
import { BiBriefcase } from "react-icons/bi";
import { BiArchiveOut } from "react-icons/bi";
import { BiArchiveIn } from "react-icons/bi";
import { BsCurrencyRupee } from "react-icons/bs";
import { TbExchange } from "react-icons/tb";
import { TbActivity } from "react-icons/tb";
import { RiLeafLine } from "react-icons/ri";
import { SlSupport } from "react-icons/sl";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { SlSettings } from "react-icons/sl";
import { FaParachuteBox } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import {
  FaFileSignature,
  FaUserFriends,
  FaCoins,
  FaMoneyBag,
} from "react-icons/fa";
import { PiStepsLight } from "react-icons/pi";
import Widget from "../../pages/Widget";

//import { LOGOUT_ACTION } from "../../../store/actions/AuthActions"
export const MenuList = [
  //Dashboard
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="material-icons">grid_view</i>,
    to: "dashboard",
  },
  {
    title: "User",
    iconStyle: <LuUser2 className="fs-3" />,
    to: "allUsers",
  },
  {
    title: "Hot Wallet",
    iconStyle: <IoWalletOutline className="fs-3" />,
    to: "hot-wallet",
  },
  {
    title: "Coins",
    iconStyle: <FaCoins className="fs-3" />,
    to: "coin",
  },
  {
    title: "Matrix Master",
    iconStyle: <IoWalletOutline className="fs-3" />,
    to: "matix-master",
  },

  {
    title: "Matrix Summary",

    iconStyle: <IoTriangleOutline className="fs-3" />,
    to: "metrics-summary",
  },
  {
    title: "Self Metrics",

    iconStyle: <IoTriangleOutline className="fs-3" />,
    to: "self-metrics",
  },
  {
    title: "Level Summary",

    iconStyle: <IoTriangleOutline className="fs-3" />,
    to: "level-summary",
  },

  {
    title: "Level Income",

    iconStyle: <PiStepsLight className="fs-3" />,
    to: "level-income",
  },

  {
    title: "Contract Address",
    iconStyle: <FaFileSignature className="fs-3" />,
    to: "contract-address",
  },
  {
    title: "Referral Income",
    iconStyle: <FaUserFriends className="fs-3" />,
    to: "referral",
  },

  {
    title: "Deposit ",
    iconStyle: <BiArchiveOut className="fs-3" />,
    to: "user-deposit",
  },
  {
    title: "Withdrawal",
    iconStyle: <i className="material-icons">account_circle</i>,
    to: "user-Withdrawal",
  },

  {
    title: "Airdrop",
    classsChange: "mm-collapse",
    iconStyle: Widget,
    iconStyle: <FaParachuteBox className="fs-3" />,
    to: "airdrop",
  },
  {
    title: "Scratchcard",
    iconStyle: <CiGift className="fs-3" />,
    to: "scratchcard",
  },

  {
    title: "Logout",
    // classsChange: 'mm-collapse',
    iconStyle: <i class="material-icons"> logout </i>,

    onClick: Logout,
  },
];
