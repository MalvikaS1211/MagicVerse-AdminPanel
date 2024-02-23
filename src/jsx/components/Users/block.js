import React, { Fragment, useState } from "react";
import { WithdrawBlock,LavelBlock } from "../../../services/api_function";
import { NotificationManager } from "react-notifications";
const BlockData = () => {

    const [userInputBlock, setUserInputBlock] = useState("");
    const [userInputUnblock, setUserInputUnblock] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userlebal, setuserlebal] = useState("");

    const handleBlock = () => {
        if (userInputBlock.trim() !== "") {
            WithdrawBlock(userInputBlock, "block")
                .then((response) => {
                    NotificationManager.success(response.message)
                })
                .catch((error) => {
                    NotificationManager.error(error.message)
                });
        } else {
            setErrorMessage("User input for blocking is empty!");
        }
    };
    const handleUnblock = () => {
        if (userInputUnblock.trim() !== "") {
            WithdrawBlock(userInputUnblock, "unblock")
                .then((response) => {
                  NotificationManager.success(response.message)
                })
                .catch((error) => {
                    NotificationManager.error(error.message)
                });
        } else {
            setErrorMessage("User input for unblocking is empty!");
        }
    };
    const handleLavel = () => {
        if (userlebal.trim() !== "") {
            LavelBlock(userlebal)
                .then((response) => {
                    NotificationManager.success(response.message)
                })
                .catch((error) => {
                    NotificationManager.error(error.message)
                });
        } else {
            setErrorMessage("User input for unblocking is empty!");
        }
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title center" style={{ margin: "auto" }}>Withdraw Block</h4>
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
                                    <button type="button" className="btn btn-danger" onClick={handleBlock}>Block</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title center" style={{ margin: "auto" }}>Withdraw Unblock</h4>
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
                                    <button type="button" className="btn btn-success" onClick={handleUnblock}>Unblock</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title center" style={{ margin: "auto" }}>Leval Block</h4>
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
                                    <button type="button" className="btn btn-success" onClick={handleLavel}>Block</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Fragment>
    );
};

export default BlockData;
