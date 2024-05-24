import Web3 from "web3";
import { contract_address, farming_abi } from "../../../config/config";

export const web3 = new Web3(new Web3(window.ethereum));
// export const web3 = new Web3(new Web3("https://rpc-testnet.wyzthchain.org/"));

export const contract = new web3.eth.Contract(farming_abi, contract_address);

export async function registration(user, referal) {
  console.log("In registration");
  try {
    let address;
    await connectWallet((addr) => {
      address = addr;
    });
    if (!address) {
      console.error("Failed to retrieve user's address.");
      return false;
    }
    const gasprice = await web3.eth.getGasPrice();
    console.log(Number(gasprice), "gasprice");
    const estimate = await contract.methods
      .registration(user, referal)
      .estimateGas({ from: address });
    console.log(
      Number(estimate),
      "estimate",
      address,
      "from address",
      user,
      referal,
      gasprice,
      estimate
    );
    console.log("resultup:::");
    const reslut = await contract.methods.registration(user, referal).send({
      from: address,
      value: 0,
      gasPrice: Number(gasprice).toString(),
      gas: Number(estimate).toString(),
    });
    console.log(reslut, "resultinslize:::");
    return reslut;
  } catch (e) {
    console.log(e, "Error in contract call og reg");
    return false;
  }
}

export async function isRegisteredInContract(user) {
  console.log(user, ":::");
  try {
    console.log(":::::::::::::::123654987", user);
    const reslut = await contract.methods.isUserExists(user).call();
    console.log("isRegisteredInContract:", reslut);
    return reslut;
  } catch (e) {
    console.log("coming catch");
    console.log(e, "e from contract register");
    return false;
  }
}

// export async function connectWallet(cb) {
//   console.log("called");
//   if (window.ethereum) {
//     try {
//       if (window.ethereum) {
//         try {
//           console.log("In try connectWallet ")
//           await window.ethereum.request({ method: "eth_requestAccounts" });
//         } catch (error) {
//           console.error("User denied account access");
//         }
//       }
//       console.log("Before account",web3.eth.getAccounts())
//       const account = await web3.eth.getAccounts();
//       console.log(account[0],account)
//       cb(account[0]);
//     } catch (error) {
//       console.error("User denied account access");
//     }
//   } else {
//     console.log(
//       "Non-Ethereum browser detected. You should consider trying MetaMask!"
//     );
//   }
// }

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
