import Web3 from "web3";
import { contract_address, token_abi } from "../../../config/config";

export const web3 = new Web3(new Web3(window.ethereum));
// export const web3 = new Web3(new Web3("https://rpc-testnet.wyzthchain.org/"));
export const isRegisteredInContract = false;

export async function registration(userId, price, address, web3) {
  console.log("In registration", userId, price, address);
  const contract = new web3.eth.Contract(token_abi, contract_address);
  try {
    const gasprice = await web3.eth.getGasPrice();
    const weiAmount = web3.utils.toWei(price,'ether');
    const estimate = await contract.methods
      .mint(userId, weiAmount)
      .estimateGas({ from: address });
    // const bufferEstimate = 1.1*estimate;
    console.log("resultup:::");
    const reslut = await contract.methods
      .mint(
        userId,
        weiAmount
      )
      .send({
        from: address,
        gasprice:gasprice,
        gas: estimate
      });
    console.log(reslut, "resultinslize:::");
    return reslut;
  } catch (e) {
    console.log(e, "Error in contract call og reg");
    return false;
  }
}
