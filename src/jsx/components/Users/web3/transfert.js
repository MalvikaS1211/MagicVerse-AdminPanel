import Web3 from "web3";
import { transfer_abi, transfer_addres } from "../../../config/config";
export const web3 = new Web3(new Web3(window.ethereum));

export const contract = new web3.eth.Contract(farming_abi, contract_address);

export async function connectWallet(cb) {
  console.log("called");
  if (window.ethereum) {
    try {
      console.log("In try connectWallet ");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log("MetaMask Accounts:", accounts);

      if (accounts.length > 0) {
        cb(accounts[0]);
      } else {
        console.error("No accounts available");
      }
    } catch (error) {
      console.error("Error connecting or retrieving accounts:", error);
    }
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}
