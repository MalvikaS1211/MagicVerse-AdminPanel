import Web3 from "web3";
import { contract_address, farming_abi } from "../../../config/config";

const web3 = new Web3(new Web3(window?.ethereum));

const contract = new web3.eth.Contract(farming_abi, contract_address);

export async function registration(user, referal) {
  try {
    let address;
    await connectWallet((addr) => {
      address = addr;
    });
    console.log(address);
    const gasprice = await web3.eth.getGasPrice();
    console.log(gasprice, "gasprice");
    const estimate = await contract.methods
      .registration(user, referal)
      .estimateGas({ from: address });
    console.log(estimate, "estimate");
    const reslut = await contract.methods
      .registration(user, referal)
      .send({ from: address, value: 0, gasPrice: gasprice, gas: estimate });
    console.log(reslut, "result:::");
    return reslut;
  } catch (e) {
    console.log(e, "Error in contract call og reg");
    return false;
  }
}

export async function isRegisteredInContract(user) {
  console.log(user,":::")
  try {
    const reslut = await contract.methods.isUserExists(user).call();
    console.log("isRegisteredInContract:", reslut);
    return reslut;
  } catch (e) {
    return false;
  }
}

export async function connectWallet(cb) {
  console.log("called");
  if (window.ethereum) {
    try {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.error("User denied account access");
        }
      }
      const account = await web3.eth.getAccounts();
      cb(account[0]);
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}
