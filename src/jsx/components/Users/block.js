import React, { Fragment, useState } from "react";
import {
  WithdrawBlock,
  LavelBlock,
  FiftyActivate,
  FreeID,
  url,
  team_Busness,
} from "../../../services/api_function";

// import { web3 } from "./web3/web3Helper";
import { NotificationManager } from "react-notifications";
import { checkUser, token_abi, token_address } from "../../config/config";
import { isRegisteredInContract, web3 } from "./web3/web3Helper";
import {
  farming_abi,
  contract_address,
  testing_abi,
  contract_testing,
} from "../../config/config";
import { toast } from "react-toastify";
import axios from "axios";
import Web3 from "web3";

const BlockData = () => {
  const [userInputBlock, setUserInputBlock] = useState("");
  const [userInputUnblock, setUserInputUnblock] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showData, setShowData] = useState(false);
  const [userlebal, setuserlebal] = useState("");
  const [user, setUser] = useState("");
  const [plan1, setPlan1] = useState("");
  const [plan, setplan] = useState("");
  const [percentage, setPercentage] = useState("");
  const [apiData, setapiData] = useState();
  const [wysAmount, setWysAmount] = useState("");
  const [userInput, setUserInput] = useState("");
  const [duration, setDuration] = useState("");
  const [user1, setUser1] = useState("");
  const [wysAmount1, setWysAmount1] = useState("");
  const [duration1, setDuration1] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userDetails = localStorage.getItem("userDetails");
  const parsedDetails = JSON.parse(userDetails);
  const token = parsedDetails.token;

  const handleBlock = () => {
    if (userInputBlock.trim() !== "") {
      WithdrawBlock(userInputBlock, "block", token)
        .then((response) => {
          if (response.status == 200) {
            NotificationManager.success(response.message);
            setUserInputUnblock("");
          } else {
            NotificationManager.error(response.message);
          }
        })
        .catch((error) => {
          NotificationManager.error(error.message);
        });
    } else {
      setErrorMessage("User input for blocking is empty!");
    }
  };
  const handleUnblock = () => {
    if (userInputUnblock.trim() !== "") {
      WithdrawBlock(userInputUnblock, "unblock", token)
        .then((response) => {
          if (response.status == 200) {
            NotificationManager.success(response.message);
            setUserInputUnblock("");
          } else {
            NotificationManager.error(response.message);
          }
        })
        .catch((error) => {
          NotificationManager.error(error.message);
        });
    } else {
      setErrorMessage("User input for unblocking is empty!");
    }
  };
  const handleLavel = () => {
    if (userlebal.trim() !== "") {
      LavelBlock(userlebal, token)
        .then((response) => {
          if (response.status == 200) {
            NotificationManager.success(response.message);
            setuserlebal("");
          } else {
            NotificationManager.error(response.message);
          }
        })
        .catch((error) => {
          NotificationManager.error(error.message);
        });
    } else {
      setErrorMessage("User input for unblocking is empty!");
    }
  };
  const handleActivate = async (e) => {
    e.preventDefault();

    const checksumAddress = web3.utils.toChecksumAddress(user);
    console.log("cheksumaddd", checksumAddress);
    const apiregister = await axios.post(url + "/isUserExist", {
      address: checksumAddress,
    });
    if (apiregister?.data?.exist === true) {
      const reg = await isRegisteredInContract(user);
      console.log(reg);
      if (reg) {
        FiftyActivate(checksumAddress, wysAmount, duration, plan, token)
          .then((response) => {
            if (response.status == 200) {
              NotificationManager.success(response.message);
              clearFormData1();
            } else {
              NotificationManager.error(response.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        NotificationManager.error("Please Register First");
      }
    } else {
      NotificationManager.error("Please Signup");
    }
  };
  const handleFree = async (e) => {
    e.preventDefault();
    const checksumAddress = web3.utils.toChecksumAddress(user1);
    console.log("check-sum", checksumAddress);
    const apiregister = await axios.post(url + "/isUserExist", {
      address: checksumAddress,
    });
    console.log(apiregister?.data.exist, "::::::::::::::::");
    if (apiregister?.data?.exist == true) {
      console.log("from contract in ", user1);
      const reg = await isRegisteredInContract(user1);
      console.log(reg, "from contract step 2");
      if (reg) {
        console.log(reg, "step 2");
        if (
          checksumAddress.trim() !== "" &&
          wysAmount1.trim() !== "" &&
          duration1.trim() !== "" &&
          plan1
        ) {
          FreeID(checksumAddress, wysAmount1, duration1, true, plan1, token)
            .then((response) => {
              if (response.status === 200) {
                NotificationManager.success(response.message);
                clearFormData();
              } else {
                NotificationManager.error(response.message);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          setErrorMessage("User, WYS Amount, or Duration is empty!");
        }
      } else {
        // toast.error("Please register User");
        NotificationManager.error("Please Register First");
      }
    } else {
      NotificationManager.error("Please Signup first");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log({ user: userInput }, ":::::::");
    team_Busness(userInput.trim())
      .then((response) => {
        //  console.log("Success:", response);
        setapiData(response);

        setShowData(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log();
  const [pAmount, setPAmount] = useState(0);

  const percentageAmount = (percentage1) => {
    try {
      const p = percentage1;
      const paidAmount = apiData?.result / 1e18;
      const finalAmount = (paidAmount * p) / 100;
      setPAmount(finalAmount);
    } catch (e) {
      console.log(e);
    }
  };

  const sendTransaction = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(token_abi, token_address);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];
      const amt = web3.utils.toWei(pAmount.toString(), "ether");

      const gas = await contract.methods
        .transfer(userInput, amt)
        .estimateGas({ from: senderAddress });
      const gasPrice = await web3.eth.getGasPrice();

      const receipt = await contract.methods.transfer(userInput, amt).send({
        from: senderAddress,
        gas: gas,
        gasPrice: gasPrice,
      });

      const apiResponse = await fetch(url + "/comisson-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          txHash: receipt.transactionHash,
          user: userInput,
          amount: apiData.result,
          percentage: percentage,
          PaidWYS: amt,
          userId: apiData.userId,
          freeId: apiData.freeid,
          monthlyTeamBusiness: apiData.monthlyTeamBusiness,
        }),
      });

      if (apiResponse.status == 200) {
        NotificationManager.success("Transaction successful");
      } else {
        NotificationManager.error("Failed to send transaction data");
      }
    } catch (error) {
      console.log("Error sending transaction:", error);
      NotificationManager.error("Error sending transaction:");
    }
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    sendTransaction();
  };

  const styletext = {
    fontSize: "20px",
    fontWeight: 600,
    color: "#000",
    textTransform: "capitalize",
  };

  const clearFormData = () => {
    setUser1("");
    setWysAmount1("");
    setDuration1("");
    setPlan1("");
  };
  const clearFormData1 = () => {
    setUser("");
    setWysAmount("");
    setDuration("");
    setplan("");
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="center" style={{ margin: "auto" }}>
                Withdraw Block
              </h4>
            </div>
            <div className="card-body ">
              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control input-default"
                      placeholder="User"
                      value={userInputBlock}
                      onChange={(e) => setUserInputBlock(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleBlock}
                  >
                    Block
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title center" style={{ margin: "auto" }}>
                Withdraw Unblock
              </h4>
            </div>
            <div className="card-body ">
              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control input-default"
                      placeholder="User"
                      value={userInputUnblock}
                      onChange={(e) => setUserInputUnblock(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleUnblock}
                  >
                    Unblock
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title center" style={{ margin: "auto" }}>
                Level Unblock
              </h4>
            </div>
            <div className="card-body ">
              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control input-default"
                      placeholder="User"
                      value={userlebal}
                      onChange={(e) => setuserlebal(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleLavel}
                  >
                    Unblock
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title center" style={{ margin: "auto" }}>
                50 Activate
              </h4>
            </div>
            <div className="card-body ">
              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control input-default"
                      placeholder="User"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </div>
                  <div class="row">
                    <div className="form-group mb-3 col-lg-6">
                      <input
                        type="text"
                        className="form-control input-default"
                        placeholder="WYS Amount"
                        value={wysAmount}
                        onChange={(e) => setWysAmount(e.target.value)}
                      />
                    </div>
                    <div class="col-6">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option selected>Duration</option>
                        <option value="24">24 Month</option>
                        <option value="36">36 Month</option>
                      </select>
                    </div>
                    <div class="col-6">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={plan}
                        onChange={(e) => setplan(e.target.value)}
                      >
                        <option selected>Plan</option>
                        <option value="1">WYS</option>
                        <option value="2">WYS:ARB</option>
                        <option value="3">WYS:BNB</option>
                      </select>
                    </div>
                    <button
                      type="button "
                      className="btn btn-success"
                      onClick={handleActivate}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title center" style={{ margin: "auto" }}>
                Free ID
              </h4>
            </div>
            <div className="card-body ">
              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control input-default"
                      placeholder="User"
                      value={user1}
                      onChange={(e) => setUser1(e.target.value)}
                    />
                  </div>
                  <div class="row">
                    <div className="form-group mb-3 col-lg-6">
                      <input
                        type="text"
                        className="form-control input-default"
                        placeholder="WYS Amount"
                        value={wysAmount1}
                        onChange={(e) => setWysAmount1(e.target.value)}
                      />
                    </div>
                    <div class="col-6">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={duration1}
                        onChange={(e) => setDuration1(e.target.value)}
                      >
                        <option selected>Duration</option>
                        <option value="24">24 Month</option>
                        <option value="36">36 Month</option>
                      </select>
                    </div>
                    <div class="col-6">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={plan1}
                        onChange={(e) => setPlan1(e.target.value)}
                      >
                        <option selected>Plan</option>
                        <option value="1">WYS</option>
                        <option value="2">WYS:ARB</option>
                        <option value="3">WYS:BNB</option>
                      </select>
                    </div>
                    <div></div>
                    <button
                      type="button "
                      className="btn btn-success"
                      onClick={handleFree}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title center" style={{ margin: "auto" }}>
                Offer
              </h4>
            </div>
            <div className="card-body ">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3"></div>
                  <div class="row">
                    <div className="form-group mb-3 col-lg-6">
                      <input
                        type="text"
                        className="form-control input-default"
                        placeholder="User"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                      />
                    </div>
                    <div class="col-6">
                      <button type="submit" class="btn btn-success">
                        Fetch
                      </button>
                    </div>
                    {showData && apiData.result >= 0 && (
                      <>
                        <div className="col-6">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            // value={plan}
                            onChange={(e) => {
                              setPercentage(e.target.value);
                              percentageAmount(e.target.value);
                            }}
                          >
                            <option selected value="0">
                              Select percentage
                            </option>
                            <option value="3">3%</option>
                            <option value="6">6%</option>
                            <option value="9">9%</option>
                          </select>
                        </div>
                      </>
                    )}
                    {showData && (
                      <>
                        <div className="form-group mb-3 col-lg-6">
                          <div>
                            <h2 style={styletext}>
                              Monthly:{" "}
                              {(apiData.monthlyTeamBusiness / 1e18).toFixed(2)}
                            </h2>
                          </div>
                        </div>
                        <div className="form-group mb-3 col-lg-6 mt-2">
                          <div>
                            <h2 style={styletext}>
                              Free Id :{(apiData.freeid / 1e18).toFixed(2)}
                            </h2>
                          </div>
                        </div>
                        <div className="form-group mb-3 col-lg-6 mt-2">
                          <div>
                            <h2 style={styletext}>
                              Paid WYS:{(apiData.result / 1e18).toFixed(2)}
                            </h2>
                          </div>
                        </div>
                        <div className="form-group mb-3 col-lg-6">
                          <div>
                            <h2 style={styletext}>userId:{apiData.userId}</h2>
                          </div>
                        </div>
                        <div>
                          <h2 style={styletext}>
                            offer amount:{pAmount.toFixed(2)}
                          </h2>
                        </div>
                      </>
                    )}

                    {showData && apiData.result >= 0 && (
                      <>
                        <button
                          type="button"
                          className="btn btn-success"
                          disabled={isSubmitting}
                          onClick={handleSubmitButton}
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlockData;
