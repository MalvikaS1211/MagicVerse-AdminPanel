import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg6 from "../../images/background/bg3.jpg";

import { adminLogin, getLoginCredential } from "../../services/api_function";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/reducer";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const adminLogin = async () => {
    try {
      let error = false;
      const errorObj = { ...errorsObj };
      if (email === "") {
        errorObj.email = "Username or Email is Required";
        error = true;
      }
      if (password === "") {
        errorObj.password = "Password is Required";
        error = true;
      }
      setErrors(errorObj);
      if (error) {
        return;
      }
      const res = await getLoginCredential(email, password);
      console.log(res, "login API");

      if (res?.success) {
        toast.success("Login Successfully !");
        dispatch(setLogin(true));
        navigate("/admin/dashboard");
      } else {
        toast.error(res?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className=" overflow-hidden"
          style={{
            backgroundImage: `url(${bg6})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <div className="row gx-0">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 vh-100 bg-white ">
              <div
                id="mCSB_1"
                className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                style={{ maxHeight: "653px" }}
              >
                <div
                  id="mCSB_1_container"
                  className="mCSB_container"
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    dir: "ltr",
                  }}
                >
                  <div className="login-form style-2">
                    <div className="card-body">
                      <div className="logo-header">
                        <Link to={"#"} className="logo">
                          <img
                            src="../images/Logo.png"
                            alt=""
                            className=" mCS_img_loaded"
                            style={{ width: "281px" }}
                          />
                        </Link>
                      </div>
                      <div className="nav nav-tabs border-bottom-0">
                        <div className="tab-content w-100" id="nav-tabContent">
                          <div
                            className="tab-pane fade active show"
                            id="nav-personal"
                          >
                            {props.errorMessage && (
                              <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                                {/* {props.errorMessage} */}
                              </div>
                            )}
                            {props.successMessage && (
                              <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                                {props.successMessage}
                              </div>
                            )}
                            <form
                              className="dz-form pb-3"
                              // onSubmit={adminLogin}
                            >
                              <div>
                                <h3 className="form-title m-t0">Welcome</h3>
                                <p>Please Login to Admin Dashboard</p>
                              </div>

                              <div className="form-group mb-3">
                                {/* <label className="form-label" for="form1">
                                  Username
                                </label> */}
                                <input
                                  type="text"
                                  className="form-control"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Enter Username"
                                />
                                {errors.email && (
                                  <div className="text-danger fs-12">
                                    {errors.email}
                                  </div>
                                )}
                              </div>

                              <div className="form-group mb-3">
                                {/* <label className="form-label" for="form1">
                                  Password
                                </label> */}
                                <input
                                  type="password"
                                  className="form-control"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="Enter Password"
                                />
                                {errors.password && (
                                  <div className="text-danger fs-12">
                                    {errors.password}
                                  </div>
                                )}
                              </div>

                              <div className="form-group text-left mb-5">
                                <button
                                  type="button"
                                  className="btn btn-success dz-xs-flex m-r5"
                                  onClick={adminLogin}
                                >
                                  Log In
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
