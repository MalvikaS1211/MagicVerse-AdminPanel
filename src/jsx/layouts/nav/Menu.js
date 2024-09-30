import React from "react";
import { useDispatch } from "react-redux";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

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
    title:"User List",
    to:"userList",
    iconStyle:<FaUserGraduate className="fs-3"/>
  },
  {
    title:"Question List",
    to:"questionList",
    iconStyle:<RiQuestionnaireFill className="fs-3"/>
  },
  {
    title:"Leader Board",
    to:"leaderBoard",
    iconStyle:<FaRankingStar className="fs-3"/>
  },
  {
    title: "Logout",
    iconStyle: <i class="material-icons">logout</i>,
    to: "login",
  },
];
