import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../store/actions/AuthActions";
import bg6 from "../../images/background/bg6.jpg";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
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

    dispatch(loginAction(email, password, navigate));
  }

  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix overflow-hidden"
          style={{ background: "#fff url(" + bg6 + ")", height: "100vh" }}
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
                            src="inrxlogo1.jpeg"
                            alt=""
                            className="width-230 mCS_img_loaded"
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
                            <form className=" dz-form pb-3" onSubmit={onLogin}>
                              <h3 className="form-title m-t0">
                                Personal Information
                              </h3>
                              <div className="dz-separator-outer m-b5">
                                <div className="dz-separator bg-primary style-liner"></div>
                              </div>
                              <p>
                                Enter your e-mail address and your password.{" "}
                              </p>
                              <div className="form-group mb-3">
                                {/* <input name="dzName" required="" className="form-control" placeholder="User Name" type="text" /> */}
                                <input
                                  type="text"
                                  className="form-control"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                  <div className="text-danger fs-12">
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                              <div className="form-group mb-3">
                                {/* <input name="dzName" required="" className="form-control " placeholder="Type Password" type="password" /> */}
                                <input
                                  type="password"
                                  className="form-control"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                  <div className="text-danger fs-12">
                                    {errors.password}
                                  </div>
                                )}
                              </div>
                              <div className="form-group text-left mb-5">
                                <button
                                  type="submit"
                                  className="btn btn-primary dz-xs-flex m-r5"
                                >
                                  Log In
                                </button>
                                {/* <span className="form-check d-inline-block ms-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="example1"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="check1"
                                  >
                                    Remember me
                                  </label>
                                </span> */}
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
