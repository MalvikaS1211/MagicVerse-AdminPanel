import React from "react";
import { useDispatch } from "react-redux";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { PiExamFill } from "react-icons/pi";
import { FaIdCardAlt } from "react-icons/fa";
import { PiHandDepositFill } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";



export const MenuList = [
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="material-icons">grid_view</i>,
    to: "admin/dashboard",
  },
  // {
  //   title: "Add Question",
  //   iconStyle: <RiQuestionnaireFill className="fs-3"/>,
  //   to: "addQuestion",
  // },
  {
    title:"User List",
    to:"admin/userList",
    iconStyle:<FaUserGraduate className="fs-3"/>
  },

  {
    title:"Stake List",
    to:"admin/stakeList",
    iconStyle:<RiQuestionnaireFill className="fs-3"/>
  },

  {
    title:"Reward List",
    to:"admin/rewardList",
    iconStyle:<FaRankingStar className="fs-3"/>
  },

  {
    title:"Dao Users",
    to:"admin/daousers",
    iconStyle:<PiHandDepositFill className="fs-3"/>
  },

  {
    title:"Unstake Users",
    to:"admin/unstake",
    iconStyle:<PiHandDepositFill className="fs-3"/>
  },
  {
    title:"Unstake Withdraw",
    // to:"admin/unstake",
    iconStyle:<PiHandDepositFill className="fs-3"/>,
    content: [
        
      {
          title: 'Approved',
          to: 'admin/unstake-approve',
      },
      {
        title: 'Pending',
        to: 'admin/unstake-pending',
      },
      // {
      //     title: 'Rejected',
      //     to: 'admin/unstake-reject',
      // }
    ]
  },
  {
    title:"Affilate Withdraw",
    // to:"admin/unstake",
    iconStyle:<PiHandDepositFill className="fs-3"/>,
    content: [
        
      {
          title: 'Approved',
          to: 'admin/affilate-approve',
      },
      {
        title: 'Pending',
        to: 'admin/affilate-pending',
      },
    ]
  },
  // {
  //   title:"Deposit List",
  //   to:"depositList",
  //   iconStyle:<PiHandDepositFill className="fs-3"/>
  // },

  {
    title:"Setting",
    to:"admin/setting",
    iconStyle:<IoIosSettings className="fs-3"/>
  },
  {
    title: "Logout",
    iconStyle: <i class="material-icons">logout</i>,
    to: "admin/login",
  },
];
