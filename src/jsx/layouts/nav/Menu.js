import React from "react";
import { useDispatch } from "react-redux";
import { Logout } from "../../../store/actions/AuthActions";
import { IoSettingsSharp, IoShieldHalfSharp } from "react-icons/io5";
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
import { TbUserShield } from "react-icons/tb";
import { SlSettings } from "react-icons/sl";
import { GoVerified } from "react-icons/go";


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
    //classsChange: 'mm-collapse',
    // iconStyle: Widget,
    iconStyle: <LuUser2   className="fs-3" />,
    to: "allUsers",
  },
  {
    title: " Staking",
    //classsChange: 'mm-collapse',
    // iconStyle: Widget,
    iconStyle: <ImStack  className="fs-3" />,
    to: "staking-user",
  },
  // {
  //   title: "Claim History",
  //   iconStyle: <i className="material-icons text-white">account_circle</i>,
  //   to: "claim-history",
  // },


  // {
  //     title:'Announcements',
  //     //classsChange: 'mm-collapse',
  //     //iconStyle: Widget,
  //     iconStyle: <i className="material-icons">account_circle</i>,
  //     to: 'announcement',
  // },
  //    {
  //         title:'Withdraw ROI ',
  //         //classsChange: 'mm-collapse',
  //         //iconStyle: Widget,
  //         iconStyle: <i className="material-icons">account_circle</i>,
  //         to: 'withdrawRoi',
  //     },
      // {
      //     title:'Claim History',
      //     iconStyle: <i className="material-icons">account_circle</i>,
      //     to: 'withdrawClaim',
      // },
  // {
  //     title:'Commission',
  //     //classsChange: 'mm-collapse',
  //     //iconStyle: Widget,
  //     iconStyle: <i className="material-icons">account_circle</i>,
  //     to: 'commission',
  // },
  //   {  title: 'History',
  //     // classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons">grid_view</i>,
  //    },
  {
    title: "Pending Deposit ",
    iconStyle: <BiArchiveOut  className="fs-3"/>,
    to: "pending-deposit",
  },
  {
    title: "Deposit ",
    //classsChange: 'mm-collapse',
    //iconStyle: Widget,
    iconStyle: <BiArchiveOut  className="fs-3"/>,
    to: "deposite",
  },
  {
    title: "Withdraw ",
    iconStyle: <BiArchiveIn  className="fs-3"/>,
    to: "withdraw",
  },

  {
    title: "Withdraw-INR ",
    iconStyle: <BiArchiveIn  className="fs-3"/>,
    to: "withdrawal-inr",
  },
  
  {
    title: "Asset ",
    iconStyle: <BiBriefcase  className="fs-3"/>,
    to: "asset",
  },
  // {
  //   title: "User Asset ",
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "asset",
  // },
  {
    title: "Currency ",
    iconStyle: <BsCurrencyRupee  className="fs-3"/>,
    to: "currency",
  },
  {
    title: "Swap ",
    iconStyle:<TbExchange  className="fs-3"/>,
    to: "swap",
  },
  {
    title: "Login Activity",
    iconStyle: <TbActivity  className="fs-3"/>,
    to: "login-activity",
  },
  {
    title: "Mint",
    iconStyle: <RiLeafLine  className="fs-3"/>,
    to: "mint",
  },
  {
    title: "Support",
    iconStyle: <SlSupport  className="fs-3"/>,
    to: "support-chats",
  },
  {
    title: "Reports",
    iconStyle: <HiOutlineDocumentReport  className="fs-3"/>,
    to: "reports",
  },
  // {
  //   title: "Withdraw Approve ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "withdraw-approve",
  // },
  // {
  //   title: "Withdraw Reject ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "reject-withdraw",
  // },
  // {
  //   title: "Deposit ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "deposit-data",
  // },
  // {
  //   title: "Topup List ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "topup-list",
  // },
  // {
  //   title: "Fifty List ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "fifty-list",
  // },
  // {
  //   title: "Admin Change ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "block",
  // },

  // {
  //   title: "Block List ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "block-user",
  // },
  // {
  //   title: "Top Teams ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "top-team",
  // },
  // // {
  // //     title:"Excel Formet",
  // //     //classsChange: 'mm-collapse',
  // //     //iconStyle: Widget,
  // //     iconStyle: <i className="material-icons">account_circle</i>,
  // //     to: 'exel-formet',
  // // },
  // {
  //   title: "Protocol ",
  //   //classsChange: 'mm-collapse',
  //   //iconStyle: Widget,
  //   iconStyle: <i className="material-icons">account_circle</i>,
  //   to: "protocol",
  // },
  {
    title: 'Kyc',
    classsChange: 'mm-collapse',
    iconStyle: <IoShieldHalfSharp className="fs-3" />,
    content: [
        {
            title: 'Pending Kyc',
            to: 'pending-kyc',
        },
        {
            title: 'Approved Kyc',
            to: 'approved-kyc',
        },
        {
            title: 'Rejected Kyc',
            to: 'rejected-kyc',
        },
    ]
},
  {
      title: 'Settings',
      classsChange: 'mm-collapse',
      iconStyle: <SlSettings  className="fs-3"/>,
      content: [
            {
              title: 'Bank Settings',
              to: 'bank-setting',
          },
          {
            title: 'UPI Settings',
            to: 'upi-setting',
        },
          {
              title: 'Price',
              to: 'price-setting',
          },
          {
              title: 'Address Withdraw',
              to: 'address-setting',
          },
          {
              title: 'Deposit Minimum',
              to: 'deposit-setting',
          },
          {
              title: 'Withdraw Minimun',
              to: 'withdraw-setting',
          },
      ]
  },
  
  {
    title: "Logout",
    // classsChange: 'mm-collapse',
    iconStyle: <i class="material-icons"> logout </i>,    
    to: "#",
    onClick: Logout,
  },
];
