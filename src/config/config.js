//export const  MULTI_SEND_ADDRESS = "0xAE3fCf55AA5eb191983798CD8aF1984C0A22C525";
export const MULTI_SEND_ADDRESS_USDT =
  "0x4DB1023A5F2b903B2EbBb2EBDD7b1821aeFA5540";
export const MULTI_SEND_ADDRESS = "0x28095C2B7E43d30bD0ea82161d8586A2EFB8A5a6";

export const TOKEN_ADDRESS_USDT = "0x55d398326f99059fF775485246999027B3197955";
export const MULTI_SEND_ABI = [
  {
    inputs: [
      { internalType: "address", name: "ownerAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "netAmt",
        type: "uint256",
      },
    ],
    name: "MemberPayment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "Multisended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "NetQty",
        type: "uint256",
      },
    ],
    name: "Payment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "WithAmt",
        type: "uint256",
      },
    ],
    name: "WithDraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable[]",
        name: "_contributors",
        type: "address[]",
      },
      { internalType: "uint256[]", name: "_balances", type: "uint256[]" },
      { internalType: "uint256", name: "totalQty", type: "uint256" },
    ],
    name: "multisendCoin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable[]",
        name: "_contributors",
        type: "address[]",
      },
      { internalType: "uint256[]", name: "_balances", type: "uint256[]" },
      { internalType: "uint256", name: "totalQty", type: "uint256" },
      { internalType: "contract IBEP20", name: "_TKN", type: "address" },
    ],
    name: "multisendToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IBEP20", name: "_token", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const TOKEN_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "supply_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "canMint_",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "canBurn_",
        type: "bool",
      },
      {
        internalType: "address",
        name: "addr_",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "canBurn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "canMint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const ATLANTIS_CONTRACT_ADDRESS =
  "0x40F4B1Ba7283C4e6dB5ebD3065b01e4DB3955Cb8";
export const ATLANTIS_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_operator", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountClaimed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
    ],
    name: "LevelIncomeClaimDetail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "userID",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "referralAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "referralUserID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalDirects",
        type: "uint256",
      },
    ],
    name: "UserRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rewardedUser",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "RewardFrom",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRecived",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "level",
        type: "uint256",
      },
    ],
    name: "levelRewardDetail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "licenceType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountPaid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "referal",
        type: "address",
      },
    ],
    name: "licenncePurchaseDetail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "percent",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "licenceType",
        type: "uint256",
      },
    ],
    name: "priceUpdateDetail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amounT",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "afterDeductionPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "licenceType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "claimType",
        type: "uint256",
      },
    ],
    name: "roiClaimDetail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "royalityRewardDetail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "userReferal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "LicenceType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "licenseEndTime",
        type: "uint256",
      },
    ],
    name: "stakeDetail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rewardedUser",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rewardedFrom",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "RewardAmount",
        type: "uint256",
      },
    ],
    name: "twoLevelBonusRewardFirstLevel",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rewardedUser",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rewardedFrom",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "RewardAmount",
        type: "uint256",
      },
    ],
    name: "twoLevelBonusRewardSecondLevel",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountClaimed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "twolevelIncomeClaimDetail",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "LicenceType",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "NetworkWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "QUANTUM_REWARD_PERCENT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "QuantumPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RADITANT_REWARD_PERCENT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "TradingWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "USDT",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "UserDetail",
    outputs: [
      { internalType: "uint256", name: "userID", type: "uint256" },
      { internalType: "address", name: "userReferalAddress", type: "address" },
      { internalType: "uint256", name: "totalDirects", type: "uint256" },
      {
        internalType: "uint256",
        name: "LicenceCategoryRadiant",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "LicenceCategoryQuantum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "userTotalStakedInRadiant",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "userTotalStakedInquantum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "userTotalRoiClaimedInquantum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "userTotalRoiClaimedInradiant",
        type: "uint256",
      },
      { internalType: "uint256", name: "levelReward", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "addressToId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "changePriceOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimLevelReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "license", type: "uint256" },
      { internalType: "uint256", name: "planId", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
      { internalType: "uint256", name: "amountToClaim", type: "uint256" },
      { internalType: "uint256", name: "claimType", type: "uint256" },
    ],
    name: "claimRoi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "directRequired",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "uint256", name: "amounts", type: "uint256" },
      { internalType: "uint256", name: "planId", type: "uint256" },
    ],
    name: "getHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "idProvider",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "idToAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isUserExist",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "signer", type: "address" },
      { internalType: "bytes32", name: "hash", type: "bytes32" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "isValidSignature",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "licenceTypeReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "operator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceDivider",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceOperator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "radiantPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "referalPercent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipients", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      {
        internalType: "contract IERC20",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "rescueBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "_licenseType", type: "uint256" },
    ],
    name: "stakeUSDT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "_licenseType", type: "uint256" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "stakeUSDTBYAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "stakingDetailQuantum",
    outputs: [
      { internalType: "uint256", name: "stakingTime", type: "uint256" },
      { internalType: "uint256", name: "lastTimeClaim", type: "uint256" },
      { internalType: "uint256", name: "stakedAmount", type: "uint256" },
      { internalType: "uint256", name: "stakeEndTime", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "stakingDetailRadiant",
    outputs: [
      { internalType: "uint256", name: "stakingTime", type: "uint256" },
      { internalType: "uint256", name: "lastTimeClaim", type: "uint256" },
      { internalType: "uint256", name: "stakedAmount", type: "uint256" },
      { internalType: "uint256", name: "stakeEndTime", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_percent", type: "uint256" }],
    name: "updateQuantumRewardPercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_percent", type: "uint256" }],
    name: "updateRadiantRewardPercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userNonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "referal", type: "address" }],
    name: "userRegister",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "verifyOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const CONTRACT_ADDRESS = "0x7a51DAF63E620DC00be296A2c237aE47Dd3B31A6";
export const CONTRACT_ADDRESS_ABI = [
  {
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "amount",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "userReferal",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "virtualTokenUsed",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "split",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "level",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "UserDepositDetail",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "amount",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "incomeType",
        internalType: "string",
        type: "string",
      },
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "centraliseIncomeUpdate",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "amount",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "userReferal",
        internalType: "address",
        type: "address",
      },
    ],
    name: "depositForFriend",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "recivedFrom",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "amount",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "level",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "levelVirtualTokenDistribution",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "amount",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "userReferal",
        internalType: "address",
        type: "address",
      },
    ],
    name: "reTopup",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "userReferal",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "registerDetail",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
    ],
    name: "user2xDetail",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
    ],
    name: "user4xDetail",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
    ],
    name: "userStandardRoiDetail",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "amount",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "userVirtualTokenClaimDetailOfRegistration",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "retopup",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "split",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "wallet",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "time",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
    ],
    name: "withdrawBalanceEvent",
    anonymous: false,
    type: "event",
  },
  {
    outputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "ReturnWithdrawBalance",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "StartingTime",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [
      { name: "userID", internalType: "uint256", type: "uint256" },
      { name: "userReferalAddress", internalType: "address", type: "address" },
      { name: "totalDirects", internalType: "uint256", type: "uint256" },
      { name: "RegistrationTime", internalType: "uint256", type: "uint256" },
      { name: "firstDeposit", internalType: "uint256", type: "uint256" },
      { name: "myTotalbussiness", internalType: "uint256", type: "uint256" },
      { name: "total4XAmount", internalType: "uint256", type: "uint256" },
      { name: "totalOrganicAmount", internalType: "uint256", type: "uint256" },
      { name: "mydirectBussiness", internalType: "uint256", type: "uint256" },
      { name: "latestRank", internalType: "uint256", type: "uint256" },
      {
        name: "TotalLevelVirtualToken",
        internalType: "uint256",
        type: "uint256",
      },
      {
        name: "TotalLevelVirtualTokenAvailable",
        internalType: "uint256",
        type: "uint256",
      },
      {
        name: "TotalLevelVirtualTokenUsed",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "UserDetail",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "addressToId",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userAddr", internalType: "address", type: "address" },
    ],
    name: "deposit",
    stateMutability: "payable",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [],
    name: "idProvider",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "address", type: "address" }],
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "idToAddress",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "isC50Started",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "isRegistrationVirtualTokenClaimed",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "isStandardRoiActive",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "isSuperRoi",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "isUserExist",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "lastTimeClaim",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "address", type: "address" }],
    inputs: [],
    name: "operator",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "address", type: "address" }],
    inputs: [],
    name: "ownership",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [{ name: "referal", internalType: "address", type: "address" }],
    name: "register",
    stateMutability: "payable",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "userAdr", internalType: "address", type: "address" }],
    name: "returnAvailableSplitWalletFund",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "string", type: "string" }],
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "returnRank",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "returnRankMaximumLimit",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "returnRankPercent",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "returnUserQualificationLength",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    inputs: [
      { name: "userAddress", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "rankInUint", internalType: "uint256", type: "uint256" },
    ],
    name: "returnVirtualTokenAmountCanBeUsed",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "totalClaimableIncome",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "totalIncome",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "totalWithdrawl",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "updateIncome",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [
      { name: "_newOperator", internalType: "address", type: "address" },
    ],
    name: "updateOperator",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [
      { name: "downlineUser", internalType: "address", type: "address" },
      { name: "addressWhoTopup", internalType: "address", type: "address" },
      { name: "status", internalType: "bool", type: "bool" },
    ],
    name: "updateUserDownLine",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [
      { name: "users", internalType: "address[]", type: "address[]" },
      { name: "amounts", internalType: "uint256[]", type: "uint256[]" },
      { name: "incomeTypes", internalType: "string[]", type: "string[]" },
    ],
    name: "updateUserIncome",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "userClaimedRegistredToken",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "userDownline",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "timeOfDeposit", internalType: "uint256", type: "uint256" },
      { name: "c50Active", internalType: "bool", type: "bool" },
      { name: "c50ActiveTime", internalType: "uint256", type: "uint256" },
      { name: "standardActive", internalType: "bool", type: "bool" },
      { name: "standardActiveTime", internalType: "uint256", type: "uint256" },
      { name: "lastClaimTime", internalType: "uint256", type: "uint256" },
    ],
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    name: "userQualificationDetail",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "time", internalType: "uint256", type: "uint256" },
    ],
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    name: "userSplitPackage",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "withdraw",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "withdrawBalance",
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const base_url = window.location.origin;
