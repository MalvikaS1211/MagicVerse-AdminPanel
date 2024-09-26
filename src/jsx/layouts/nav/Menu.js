import React from "react";
import { useDispatch } from "react-redux";
import { RiQuestionnaireFill } from "react-icons/ri";
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
    to: "login",
  },
];
