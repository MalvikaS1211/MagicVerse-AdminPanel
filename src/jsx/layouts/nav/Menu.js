import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { RiNftFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { PiHandDepositFill } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiAbstract007, GiAbstract039, GiAbstract047, GiAbstract074 } from "react-icons/gi";
import { BiLogOut, BiSupport } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { FaMessage, FaRankingStar, FaRegMessage } from "react-icons/fa6";
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
    title: "Buy",
    to: "admin/buy-nft",
    iconStyle: <RiNftFill className="fs-3" />,
  },
  {
    title: "NFT Creation List",
    to: "admin/NFTCreationList",
    iconStyle: <RiNftFill className="fs-3" />,
  },
  {
    title: "Deposit List",
    to: "admin/deposit",
    iconStyle: <PiHandDepositFill className="fs-3" />,
  },
  {
    title: "Last Transaction Details",
    to: "admin/soldNFTs",
    iconStyle: <GrTransaction className="fs-3" />,
  },
  {
    title: "Add NFT to queue",
    to: "admin/addnftqueue",
    iconStyle: <GiAbstract074 className="fs-3" />,
  },
  {
    title: "15 $ NFT List",
    to: "admin/nftList15",
    iconStyle: <GiAbstract007 className="fs-3" />,
  },
  {
    title: "Matured NFT List",
    to: "admin/maturedNft",
    iconStyle: <GiAbstract047  className="fs-3" />,
  },
    {
    title: "Salary Requests",
    to: "admin/salryRequests",
    iconStyle: <GiAbstract047  className="fs-3" />,
  },
    {
    title: "Old NFT List",
    to: "admin/oldNFTs",
    iconStyle: <GiAbstract039   className="fs-3" />,
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
