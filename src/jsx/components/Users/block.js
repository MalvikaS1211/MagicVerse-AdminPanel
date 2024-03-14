import React, { Fragment, useState } from "react";
import {
  WithdrawBlock,
  LavelBlock,
  FiftyActivate,
  FreeID,
  url,
} from "../../../services/api_function";
import { NotificationManager } from "react-notifications";
import { checkUser } from "../../config/config";
import { isRegisteredInContract } from "./web3/web3Helper";
import { toast } from "react-toastify";
import axios from "axios";
const BlockData = () => {
  const [userInputBlock, setUserInputBlock] = useState("");
  const [userInputUnblock, setUserInputUnblock] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userlebal, setuserlebal] = useState("");
  const [user, setUser] = useState("");
  const [plan1, setPlan1] = useState("");
  const [plan, setplan] = useState("");
  const [wysAmount, setWysAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [user1, setUser1] = useState("");
  const [wysAmount1, setWysAmount1] = useState("");
  const [duration1, setDuration1] = useState("");
  const userDetails = localStorage.getItem('userDetails');
  const parsedDetails = JSON.parse(userDetails);
  const token = parsedDetails.token

  const handleBlock = () => {
    if (userInputBlock.trim() !== "") {
      WithdrawBlock(userInputBlock, "block",token)
        .then((response) => {
          if (response.status == 200) {
            NotificationManager.success(response.message);
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
      WithdrawBlock(userInputUnblock, "unblock",token)
        .then((response) => {
          if (response.status == 200) {
            NotificationManager.success(response.message);
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
    if (userlebal.trim() !== "",token) {
      LavelBlock(userlebal)
        .then((response) => {
          if (response.status == 200) {
            NotificationManager.success(response.message);
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
    e.preventDefault()
    const apiregister = await axios.post(url + "/isUserExist", {
      address: user,
    });
    if (apiregister?.data?.exist === true) {
      const reg = await isRegisteredInContract(user);
      if (reg) {
        FiftyActivate(user, wysAmount, duration, plan,token)
          .then((response) => {
            if (response.status == 200) {
              NotificationManager.success(response.message);
              clearFormData1()
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
    const apiregister = await axios.post(url + "/isUserExist", {
      address: user1,
    });
   // console.log(apiregister?.data.exist,"::::::::::::::::")
    if (apiregister?.data?.exist == true) {
      console.log("from contract in ",user1)
      const reg = await isRegisteredInContract(user1);
      console.log(reg,"from contract step 2")
      if (reg) {
        console.log(reg,"step 2")
        if (
          user1.trim() !== "" &&
          wysAmount1.trim() !== "" &&
          duration1.trim() !== "" &&
          plan1
        ) {
          FreeID(user1, wysAmount1, duration1, true, plan1,token)
            .then((response) => {
              if (response.status === 200) {
                NotificationManager.success(response.message);
                clearFormData()
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

  const clearFormData = () => {

    setUser1("");
    setWysAmount1("");
    setDuration1("");
    setPlan1("");
}
const clearFormData1 = () => {

  setUser("");
  setWysAmount("");
  setDuration("");
  setplan("");
}
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title center" style={{ margin: "auto" }}>
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
      </div>
    </Fragment>
  );
};

export default BlockData;
