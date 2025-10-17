// import Web3 from "web3";

import {
  readContract,
  readContracts,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { toast } from "react-hot-toast";
import {
  ATLANTIS_CONTRACT_ABI,
  ATLANTIS_CONTRACT_ADDRESS,
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_ABI,
  MULTI_SEND_ABI,
  MULTI_SEND_ADDRESS,
  MULTI_SEND_ADDRESS_USDT,
  MVerse_CONTRACT_ADDRESS,
  MVerse_CONTRACT_ADDRESS_ABI,
  TOKEN_ABI,
  TOKEN_ADDRESS_USDT,
} from "../../../../config/config";

// export const web3 = new Web3(new Web3(window.ethereum));

// export const contract = new web3.eth.Contract(farming_abi, contract_address);

// export async function connectWallet(cb) {
//   console.log("called");
//   if (window.ethereum) {
//     try {
//       console.log("In try connectWallet ");
//       await window.ethereum.request({ method: "eth_requestAccounts" });

//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });
//       console.log("MetaMask Accounts:", accounts);

//       if (accounts.length > 0) {
//         cb(accounts[0]);
//       } else {
//         console.error("No accounts available");
//       }
//     } catch (error) {
//       console.error("Error connecting or retrieving accounts:", error);
//     }
//   } else {
//     console.log(
//       "Non-Ethereum browser detected. You should consider trying MetaMask!"
//     );
//   }
// }

const multiSendDSC = {
  abi: MULTI_SEND_ABI,
  address: MULTI_SEND_ADDRESS,
};

const multiSendUSDT = {
  abi: MULTI_SEND_ABI,
  address: MULTI_SEND_ADDRESS_USDT,
};

export async function getTokenAllowance(walletAddress) {
  const result = await readContract({
    abi: TOKEN_ABI,
    address: TOKEN_ADDRESS_USDT,
    functionName: "allowance",
    args: [walletAddress, MULTI_SEND_ADDRESS_USDT],
  });
  return Number(result);
}

export async function approveContract(tokenAmount) {
  const result = await writeContract({
    // mode: "recklesslyUnprepared",
    abi: TOKEN_ABI,
    address: TOKEN_ADDRESS_USDT,
    functionName: "approve",
    args: [MULTI_SEND_ADDRESS_USDT, tokenAmount],
  });
  const res = waitForTransaction(result);
  const data = await toast.promise(res, {
    loading: "Token Approve is pending...",
    success: "Token Approve successfully!",
    error: (error) => error.message ?? "Token Approve request failed.",
  });
  return data;
}

export async function multisendCoin(address, _balances, totalBalance) {
  const value = Number(totalBalance)?.toLocaleString("fullwide", {
    useGrouping: false,
  });
  console.log(value, "NNNNN", _balances, totalBalance, "totalBalance");
  const result = await writeContract({
    ...multiSendDSC,
    functionName: "multisendCoin",
    args: [address, _balances, value],
    value: value, //parseEther(totalBalance),
  });
  const res = waitForTransaction(result);
  const data = await toast.promise(res, {
    loading: "Txn is pending...",
    success: "Txn successfully!",
    error: (error) => error.message ?? "Txn request failed.",
  });
  return data;
}

export async function multisendToken(address, _balances, totalBalance) {
  const value = Number(totalBalance)?.toLocaleString("fullwide", {
    useGrouping: false,
  });
  console.log(_balances, value, TOKEN_ADDRESS_USDT);
  const result = await writeContract({
    ...multiSendUSDT,
    functionName: "multisendToken",
    args: [address, _balances, value, TOKEN_ADDRESS_USDT],
    // value: totalBalance //parseEther(totalBalance),
  });
  const res = waitForTransaction(result);
  const data = await toast.promise(res, {
    loading: "Txn is pending...",
    success: "Txn successfully!",
    error: (error) => error.message ?? "Txn request failed.",
  });
  return data;
}

export async function stakeUsdtByAdmin(amount, licenseType, user) {
  const result = await writeContract({
    // mode: "recklesslyUnprepared",
    abi: ATLANTIS_CONTRACT_ABI,
    address: ATLANTIS_CONTRACT_ADDRESS,
    functionName: "stakeUSDTBYAdmin",
    args: [amount.toString(), licenseType, user],
  });
  const res = waitForTransaction(result);
  const data = await toast.promise(res, {
    loading: "Token Approve is pending...",
    success: "Token Approve successfully!",
    error: (error) => error.message ?? "Token Approve request failed.",
  });
  return data;
}
// export async function getOperator() {
//   const result = await readContract({
//     abi: ATLANTIS_CONTRACT_ABI,
//     address: ATLANTIS_CONTRACT_ADDRESS,
//     functionName: "operator",
//   });

//   return result;
// }

export async function getIsUserExist(user) {
  console.log(user, "in getIsUserExist");
  const result = await readContract({
    abi: ATLANTIS_CONTRACT_ABI,
    address: ATLANTIS_CONTRACT_ADDRESS,
    functionName: "isUserExist",
    args: [user],
  });
  console.log(result, "in getIsUserExist");
  return result;
}

export async function getpriceOperator() {
  const result = await readContract({
    abi: ATLANTIS_CONTRACT_ABI,
    address: ATLANTIS_CONTRACT_ADDRESS,
    functionName: "priceOperator",
  });

  return result;
}
export async function updateRadiantRewardPercent(percent) {
  const result = await writeContract({
    abi: ATLANTIS_CONTRACT_ABI,
    address: ATLANTIS_CONTRACT_ADDRESS,
    functionName: "updateRadiantRewardPercent",
    args: [percent],
  });
  const res = waitForTransaction(result);
  const data = await toast.promise(res, {
    loading: "Update radiant reward percent is pending...",
    success: " Radiant reward update successfully!",
    error: (error) => error.message ?? "request failed.",
  });
  return data;
}

export async function quantumRewardPercent(percent) {
  const result = await writeContract({
    abi: ATLANTIS_CONTRACT_ABI,
    address: ATLANTIS_CONTRACT_ADDRESS,
    functionName: "updateQuantumRewardPercent",
    args: [percent],
  });
  const res = waitForTransaction(result);
  const data = await toast.promise(res, {
    loading: "Update quantum reward percent is pending...",
    success: " Quantum reward update successfully!",
    error: (error) => error.message ?? "request failed.",
  });
  return data;
}

export async function getOperator() {
  const result = await readContract({
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "operator",
  });

  return result;
}

export async function payROI(recipients, amounts) {
  const result = await writeContract({
    abi: MVerse_CONTRACT_ADDRESS_ABI,
    address: MVerse_CONTRACT_ADDRESS,
    functionName: "payROI",
    args: [recipients, amounts],
  });
  const res = await waitForTransaction({ hash: result.hash });

  return res;
}
