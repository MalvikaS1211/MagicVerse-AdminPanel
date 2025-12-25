// import Web3 from "web3";

import {
  fetchBalance,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";

import { toast } from "react-hot-toast";
import {
  MiraiVault_CONTRACT_ADDRESS,
  MiraiVault_CONTRACT_ADDRESS_ABI,
  USDT_TOKEN,
  USDT_TOKEN_ABI,
} from "../../../../config/config";

export async function payROI(recipients, amounts) {
  const result = await writeContract({
    abi: MiraiVault_CONTRACT_ADDRESS_ABI,
    address: MiraiVault_CONTRACT_ADDRESS,
    functionName: "payROI",
    args: [recipients, amounts],
  });
  const res = waitForTransaction(result);
  const data = await toast.promise(res, {
    loading: "Update ROI is pending...",
    success: "ROI updated successfully!",
    error: (error) => error.message ?? "request failed.",
  });
  return data;
}
export async function buyNFTFn(
  tokenId,
  initialPrice,
  v,
  r,
  s,
  title,
  description,
  metadataURI
) {
  try {
    console.log({
      tokenId,
      initialPrice,
      v,
      r,
      s,
      title,
      description,
      metadataURI,
    });
    const formattedPrice = initialPrice.toLocaleString("fullwide", {
      useGrouping: false,
    });

    const result = await writeContract({
      address: MiraiVault_CONTRACT_ADDRESS,
      abi: MiraiVault_CONTRACT_ADDRESS_ABI,
      functionName: "buyNFT",
      args: [tokenId, formattedPrice, v, r, s, title, description, metadataURI],
    });

    const res = await waitForTransaction(result);
    return res;
  } catch (error) {
    console.error("Error in buyNFTFn:", error);
    return null;
  }
}

export async function approveToken(amt) {
  console.log("Approve Result:", amt);
  const result = await writeContract({
    address: USDT_TOKEN,
    abi: USDT_TOKEN_ABI,
    functionName: "approve",
    args: [
      MiraiVault_CONTRACT_ADDRESS,
      (amt * 1e18).toLocaleString("fullwide", { useGrouping: false }),
    ],
  });

  const res = waitForTransaction(result);
  return res;
}

export async function fetchUserTokenBalance(address) {
  try {
    const balance = await fetchBalance({
      address,
      token: USDT_TOKEN,
    });
    return balance.formatted;
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return null;
  }
}

export async function getNfts(tokenId) {
  try {
    const result = await readContract({
      address: MiraiVault_CONTRACT_ADDRESS,
      abi: MiraiVault_CONTRACT_ADDRESS_ABI,
      functionName: "nfts",
      args: [tokenId],
    });
    // console.log("NFT Details:", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
