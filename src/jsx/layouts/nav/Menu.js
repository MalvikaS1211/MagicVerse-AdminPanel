import React from "react";
import { useDispatch } from "react-redux";
import { Logout } from "../../../store/actions/AuthActions";
import { IoSettingsSharp } from "react-icons/io5";
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
    iconStyle: <TbUserShield  className="fs-3" />,
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
  //	Crypto
  // {
  //     title: 'Crypto',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons">currency_bitcoin</i>,
  //     content: [
  //         {
  //             title: 'Market Watch',
  //             to: 'crypto',
  //         },
  //         {
  //             title: 'ICO Listing Filter',
  //             to: 'ico-listing-filter',
  //         },
  //         {
  //             title: 'Coin Details',
  //             to: 'coin-details',
  //         },
  //         {
  //             title: 'Exchange',
  //             to: 'exchange',
  //         },
  // 		{
  //             title: 'Banking',
  //             to: 'banking',
  //         },
  //     ]
  // },
  //  Reports
  // {
  //     title: 'Reports',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons">description</i>,
  //     content: [
  //         {
  //             title:'History',
  //             to: 'history'
  //         },
  //         {
  //             title:'Orders',
  //             to: 'orders'
  //         },
  //         {
  //             title:'Report',
  //             to: 'reports'
  //         },
  // 		{
  //             title:'User',
  //             to: 'user'
  //         },
  // 		{
  //             title:'Contacts',
  //             to: 'contact'
  //         },
  // 		{
  //             title:'Activity',
  //             to: 'activity'
  //         },
  //     ],
  // },

  // Apps
  // {
  //     title: 'Apps',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons"> app_registration </i>,
  //     content: [
  //         {
  //             title: 'Profile',
  //             to: 'app-profile'
  //         },
  //         {
  //             title: 'Edit Profile',
  //             to: 'edit-profile'
  //         },
  //         {
  //             title: 'Post Details',
  //             to: 'post-details'
  //         },
  //         {
  //             title: 'Email',
  //             //to: './',
  //             hasMenu : true,
  //             content: [
  //                 {
  //                     title: 'Compose',
  //                     to: 'email-compose',
  //                 },
  //                 {
  //                     title: 'Index',
  //                     to: 'email-inbox',
  //                 },
  //                 {
  //                     title: 'Read',
  //                     to: 'email-read',
  //                 }
  //             ],
  //         },
  //         {
  //             title:'Calendar',
  //             to: 'app-calender'
  //         },
  //         {
  //             title: 'Shop',
  //             //to: './',
  //             hasMenu : true,
  //             content: [
  //                 {
  //                     title: 'Product Grid',
  //                     to: 'ecom-product-grid',
  //                 },
  //                 {
  //                     title: 'Product List',
  //                     to: 'ecom-product-list',
  //                 },
  //                 {
  //                     title: 'Product Details',
  //                     to: 'ecom-product-detail',
  //                 },
  //                 {
  //                     title: 'Order',
  //                     to: 'ecom-product-order',
  //                 },
  //                 {
  //                     title: 'Checkout',
  //                     to: 'ecom-checkout',
  //                 },
  //                 {
  //                     title: 'Invoice',
  //                     to: 'ecom-invoice',
  //                 },
  //                 {
  //                     title: 'Customers',
  //                     to: 'ecom-customers',
  //                 },
  //             ],
  //         },
  //     ],
  // },
  // Charts
  // {
  //     title: 'Charts',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons"> assessment </i>,
  //     content: [

  //         {
  //             title: 'RechartJs',
  //             to: 'chart-rechart',
  //         },
  //         {
  //             title: 'Chartjs',
  //             to: 'chart-chartjs',
  //         },
  //         {
  //             title: 'Sparkline',
  //             to: 'chart-sparkline',
  //         },
  //         {
  //             title: 'Apexchart',
  //             to: 'chart-apexchart',
  //         },
  //     ]
  // },
  //  Boosttrap
  // {
  //     title: 'Bootstrap',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons"> favorite </i>,
  //     content: [
  //         {
  //             title: 'Accordion',
  //             to: 'ui-accordion',
  //         },
  //         {
  //             title: 'Alert',
  //             to: 'ui-alert',
  //         },
  //         {
  //             title: 'Badge',
  //             to: 'ui-badge',
  //         },
  //         {
  //             title: 'Button',
  //             to: 'ui-button',
  //         },
  //         {
  //             title: 'Modal',
  //             to: 'ui-modal',
  //         },
  //         {
  //             title: 'Button Group',
  //             to: 'ui-button-group',
  //         },
  //         {
  //             title: 'List Group',
  //             to: 'ui-list-group',
  //         },
  //         {
  //             title: 'Cards',
  //             to: 'ui-card',
  //         },
  //         {
  //             title: 'Carousel',
  //             to: 'ui-carousel',
  //         },
  //         {
  //             title: 'Dropdown',
  //             to: 'ui-dropdown',
  //         },
  //         {
  //             title: 'Popover',
  //             to: 'ui-popover',
  //         },
  //         {
  //             title: 'Progressbar',
  //             to: 'ui-progressbar',
  //         },
  //         {
  //             title: 'Tab',
  //             to: 'ui-tab',
  //         },
  //         {
  //             title: 'Typography',
  //             to: 'ui-typography',
  //         },
  //         {
  //             title: 'Pagination',
  //             to: 'ui-pagination',
  //         },
  //         {
  //             title: 'Grid',
  //             to: 'ui-grid',
  //         },
  //     ]
  // },
  //  plugins
  // {
  //     title:'Plugins',
  //     classsChange: 'mm-collapse',
  //     iconStyle : <i className="material-icons"> extension </i>,
  //     content : [
  //         {
  //             title:'Select 2',
  //             to: 'uc-select2',
  //         },
  //         // {
  //         //     title:'Noui Slider',
  //         //     to: 'uc-noui-slider',
  //         // },
  //         {
  //             title:'Sweet Alert',
  //             to: 'uc-sweetalert',
  //         },
  //         {
  //             title:'Toastr',
  //             to: 'uc-toastr',
  //         },
  //         {
  //             title:'Jqv Map',
  //             to: 'map-jqvmap',
  //         },
  //         {
  //             title:'Light Gallery',
  //             to: 'uc-lightgallery',
  //         },
  //     ]
  // },
  //  Widget
  // {
  //     title:'Widget',
  //     //classsChange: 'mm-collapse',
  //     iconStyle: <i className="bi bi-gear-wide"></i>,
  //     to: 'widget-basic',
  // },
  //  Forms
  // {
  //     title:'Forms',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons"> insert_drive_file </i>,
  //     content : [
  //         {
  //             title:'Form Elements',
  //             to: 'form-element',
  //         },
  //         {
  //             title:'Wizard',
  //             to: 'form-wizard',
  //         },
  //         {
  //             title:'CkEditor',
  //             to: 'form-ckeditor',
  //         },
  //         {
  //             title:'Pickers',
  //             to: 'form-pickers',
  //         },
  //         {
  //             title:'Form Validate',
  //             to: 'form-validation',
  //         },

  //     ]
  // },
  // Table
  // {
  //     title:'Table',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons"> table_chart </i>,
  //     content : [
  //         {
  //             title:'Table Filtering',
  //             to: 'table-filtering',
  //         },
  //         {
  //             title:'Table Sorting',
  //             to: 'table-sorting',
  //         },
  //         {
  //             title:'Bootstrap',
  //             to: 'table-bootstrap-basic',
  //         },

  //     ]
  // },
  // Pages
  // {
  //     title:'Pages',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="material-icons">article</i>,
  //     content : [
  //         {
  //             title:'Error',
  //             hasMenu : true,
  //             content : [
  //                 {
  //                     title: 'Error 400',
  //                     to : 'page-error-400',
  //                 },
  //                 {
  //                     title: 'Error 403',
  //                     to : 'page-error-403',
  //                 },
  //                 {
  //                     title: 'Error 404',
  //                     to : 'page-error-404',
  //                 },
  //                 {
  //                     title: 'Error 500',
  //                     to : 'page-error-500',
  //                 },
  //                 {
  //                     title: 'Error 503',
  //                     to : 'page-error-503',
  //                 },
  //             ],
  //         },
  //         {
  //             title:'Lock Screen',
  //             to: 'page-lock-screen',
  //         },

  //     ]
  // },
  {
    title: "Logout",
    // classsChange: 'mm-collapse',
    iconStyle: <i class="material-icons"> logout </i>,
    onClick: Logout,
  },
];
