import { writeContract, readContract, fetchBalance } from "@wagmi/core";
import { waitForTransaction } from "@wagmi/core";
export const contract_address = "0x06b5d78b5386a58a276598dfbd6a1abf5b473709";//mainet cintract address
export const farming_abi = [
  {
    type: "event",
    name: "EvStake",
    inputs: [
      { type: "address", name: "user", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "planId",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "wysAmount",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "otherAmt",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "ttlAmt",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "duration",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Registration",
    inputs: [
      { type: "address", name: "user", internalType: "address", indexed: true },
      {
        type: "address",
        name: "referrer",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "userId",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "referrerId",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Topup",
    inputs: [
      { type: "address", name: "user", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "wysAmount",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Withdraw",
    inputs: [
      { type: "address", name: "user", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "ARB",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "ARBPrice",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "BNB",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "BNBPrice",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "Pause",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "TIME_STEP",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "UnPause",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "WYS",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "WYSPrice",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "changeARBPrice",
    inputs: [{ type: "uint256", name: "price", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "changeBNBPrice",
    inputs: [{ type: "uint256", name: "price", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "changeWYSPrice",
    inputs: [{ type: "uint256", name: "price", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getNextDepositMinimum",
    inputs: [
      { type: "address", name: "_user", internalType: "address" },
      { type: "uint256", name: "_planId", internalType: "uint256" },
      { type: "uint256", name: "_duration", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getPackageToWYSAmt",
    inputs: [{ type: "uint256", name: "package", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getWYSToUSDAmt",
    inputs: [{ type: "uint256", name: "amount", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "idToAddress",
    inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "initialize",
    inputs: [
      { type: "address", name: "_arb", internalType: "address" },
      { type: "address", name: "_bnb", internalType: "address" },
      { type: "address", name: "_wys", internalType: "address" },
      { type: "address", name: "_owner", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isUserExists",
    inputs: [{ type: "address", name: "user", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "lastUserId",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "operator",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "paused",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256", name: "farmTokenAmt", internalType: "uint256" },
      { type: "uint256", name: "maxFarmToken", internalType: "uint256" },
      { type: "uint256", name: "apy", internalType: "uint256" },
      { type: "uint256", name: "percentDivider", internalType: "uint256" },
      { type: "uint256", name: "multipler", internalType: "uint256" },
      { type: "uint256", name: "duration", internalType: "uint256" },
    ],
    name: "plans",
    inputs: [
      { type: "uint256", name: "", internalType: "uint256" },
      { type: "uint256", name: "", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "priceOperator",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "registration",
    inputs: [
      { type: "address", name: "_user", internalType: "address" },
      { type: "address", name: "_referal", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "sendIncome",
    inputs: [
      { type: "address[]", name: "_users", internalType: "address[]" },
      { type: "uint256[]", name: "_amounts", internalType: "uint256[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setOperator",
    inputs: [{ type: "address", name: "_operator", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setPriceOperator",
    inputs: [
      { type: "address", name: "_priceOperator", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "stakeWYS",
    inputs: [
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "address", name: "_refferal", internalType: "address" },
      { type: "uint256", name: "duration", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "stakeWYSAndARB",
    inputs: [
      { type: "uint256", name: "package", internalType: "uint256" },
      { type: "address", name: "_refferal", internalType: "address" },
      { type: "uint256", name: "duration", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "stakeWYSAndBNB",
    inputs: [
      { type: "uint256", name: "package", internalType: "uint256" },
      { type: "address", name: "_refferal", internalType: "address" },
      { type: "uint256", name: "duration", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "topup",
    inputs: [{ type: "uint256", name: "amount", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256", name: "userId", internalType: "uint256" },
      { type: "address", name: "referrer", internalType: "address" },
      { type: "uint256", name: "partnerCount", internalType: "uint256" },
      { type: "uint256", name: "totalDeposit", internalType: "uint256" },
    ],
    name: "users",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "withdrawToken",
    inputs: [
      { type: "address", name: "_token", internalType: "address" },
      { type: "address", name: "_to", internalType: "address" },
      { type: "uint256", name: "_amount", internalType: "uint256" },
    ],
  },
];
// export const token_address = "0x5E63305B60C3AeF9194a9d799F737479E6a89467";//testnet
export const token_address = "0x804075813fc537f284233e88784469ea390c25f2";//mainet
export const token_abi = [
  { type: "constructor", stateMutability: "nonpayable", inputs: [] },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "_owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "_spender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "_value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Burn",
    inputs: [
      {
        type: "address",
        name: "_from",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "_value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Multisended",
    inputs: [
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        type: "address",
        name: "_from",
        internalType: "address",
        indexed: true,
      },
      { type: "address", name: "_to", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "_value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "_creator",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "allowance",
    inputs: [
      { type: "address", name: "", internalType: "address" },
      { type: "address", name: "", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "success", internalType: "bool" }],
    name: "approve",
    inputs: [
      { type: "address", name: "_spender", internalType: "address" },
      { type: "uint256", name: "_value", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "balanceOf",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "success", internalType: "bool" }],
    name: "burn",
    inputs: [{ type: "uint256", name: "_value", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "success", internalType: "bool" }],
    name: "burnFrom",
    inputs: [
      { type: "address", name: "_from", internalType: "address" },
      { type: "uint256", name: "_value", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint8", name: "", internalType: "uint8" }],
    name: "decimals",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "multisendTRX",
    inputs: [
      { type: "address", name: "_user", internalType: "address payable" },
      { type: "uint256", name: "_balance", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "name",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "symbol",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalSupply",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "success", internalType: "bool" }],
    name: "transfer",
    inputs: [
      { type: "address", name: "_to", internalType: "address" },
      { type: "uint256", name: "_value", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "success", internalType: "bool" }],
    name: "transferFrom",
    inputs: [
      { type: "address", name: "_from", internalType: "address" },
      { type: "address", name: "_to", internalType: "address" },
      { type: "uint256", name: "_value", internalType: "uint256" },
    ],
  },
];
// function getInstance() {
//   (abi = abi), (address = contract_address);
// }

// export async function registerUser(userAddress, userRef) {
//   try {
//     const data = await writeContract({

//       functionName: "registration",
//       args: [userAddress, userRef],
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function checkUser(userAddress, userRef) {
  console.log(userAddress, userRef, ":uuu");
  try {
    const data = await writeContract({
      address: contract_address,
      abi: farming_abi,
      functionName: "registration",
      args: [userAddress, userRef],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
