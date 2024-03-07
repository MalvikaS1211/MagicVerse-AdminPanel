import { writeContract, readContract, fetchBalance } from "@wagmi/core";
import { waitForTransaction } from "@wagmi/core";
export const contract_address = "0x06b5d78b5386a58a276598dfbd6a1abf5b473709";
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

export async function checkUser(userAddress,userRef) {
    console.log(userAddress,userRef,":uuu")
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
