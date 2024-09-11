import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { BiBriefcase, BiCopy, BiRupee } from "react-icons/bi";
import { ImStack } from "react-icons/im";
import { Link } from "react-router-dom";
import ApexChart from "./ApexChart";
import { LuIndianRupee } from "react-icons/lu";

export const UserProfile = () => {
  return (
    <>
      <div class="row">
        <div class="col-lg-3">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                class="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 class="my-3">John Smith</h5>
              <p class="text-muted mb-1">Full Stack Developer</p>
              <p class="text-muted mb-3">Bay Area, San Francisco, CA</p>
              <div class="d-flex justify-content-center mb-2">
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="action_btn"
                >
                  Block
                </button>
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="action_btn_outline ms-1"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
          <div class="card mb-4 mb-lg-0">
            <div class="card-body py-2 px-1">
              <div class="accordion" id="userInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div> Assets</div>{" "}
                      <div class="custom_badge me-5">200.22</div>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#userInfoAccordion"
                  >
                    <div class="accordion-body p-4">
                      <div>
                        <div className="d-flex justify-content-between mb-3">
                          <div>INR</div>
                          <div>
                            85.223 <BiRupee />{" "}
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between mb-2">
                            <div>INRx</div>
                            <div>
                              85.223{" "}
                              <img
                                src="/images/inrx2.png"
                                width={"20px"}
                                alt=""
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <div> Staking</div>{" "}
                      <div class=" custom_badge me-5">1,000</div>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#userInfoAccordion"
                  >
                    <div class="accordion-body p-4">
                      <div>
                        <div className="d-flex justify-content-between mb-3">
                          <div>Staked Amount</div>
                          <div>
                            85.223 <BiRupee />{" "}
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between mb-2">
                            <div>Claimed Amount</div>
                            <div>
                              85.223{" "}
                              <img
                                src="/images/inrx2.png"
                                width={"20px"}
                                alt=""
                              />{" "}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between mb-2">
                            <div> Staking Bonus</div>
                            <div>
                              85.223{" "}
                              <img
                                src="/images/inrx2.png"
                                width={"20px"}
                                alt=""
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <div>Referral</div>{" "}
                      <div class="custom_badge me-5">79.23</div>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#userInfoAccordion"
                  >
                    <div class="accordion-body p-4">
                      <div>
                        <div className="d-flex justify-content-between mb-3">
                          <div>Reference APR</div>
                          <div>48%</div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between mb-2">
                            <div>Monthly Est.Reward</div>
                            <div>
                              85.223{" "}
                              <img
                                src="/images/inrx2.png"
                                width={"20px"}
                                alt=""
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#deposited"
                      aria-expanded="false"
                      aria-controls="deposited"
                    >
                      <div>Deposited </div>
                      <div>
                        <span class=" custom_badge me-5">90.25</span>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="deposited"
                    class="accordion-collapse collapse"
                    aria-labelledby="deposited"
                    data-bs-parent="#userInfoAccordion"
                  >
                    <div class="accordion-body p-4">
                      <div>
                        <div className="d-flex justify-content-between mb-3">
                          <div>INR</div>
                          <div>
                            85.223 <BiRupee />{" "}
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between mb-2">
                            <div>INRx</div>
                            <div>
                              85.223{" "}
                              <img
                                src="/images/inrx2.png"
                                width={"20px"}
                                alt=""
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#withdrawal"
                      aria-expanded="false"
                      aria-controls="withdrawal"
                    >
                      <div>Withdrawal </div>
                      <div>
                        <span class=" custom_badge me-5">100.25</span>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="withdrawal"
                    class="accordion-collapse collapse"
                    aria-labelledby="withdrawal"
                    data-bs-parent="#userInfoAccordion"
                  >
                    <div class="accordion-body p-4">
                      <div>
                        <div className="d-flex justify-content-between mb-3">
                          <div>INR</div>
                          <div>
                            85.223 <BiRupee />{" "}
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between mb-2">
                            <div>INRx</div>
                            <div>
                              85.223{" "}
                              <img
                                src="/images/inrx2.png"
                                width={"20px"}
                                alt=""
                              />{" "}
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
        <div class="col-lg-9">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Johnatan Smith</p>
                </div>
              </div>
              <hr className="hr_line" />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">example@example.com</p>
                </div>
              </div>
              <hr className="hr_line" />

              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Mobile</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">(098) 765-4321</p>
                </div>
              </div>
              <hr className="hr_line" />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Address</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                </div>
              </div>
              <hr className="hr_line" />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Wallet</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">
                    379.23 <LuIndianRupee />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="card">
                <div class="card-body" style={{maxHeight:"370px", overflow:"auto"}}>
                  <p class="mb-4">
                    <span class="text-teal me-1">Login</span> Activity
                  </p>
                  <div class=" card shadow-sm mb-3">
                    <div className="card-body py-2 ">
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">Browser Name </p>

                        <p class="text-muted mb-0">Chrome</p>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">IP</p>
                        <p class="text-muted mb-0">127.0.0.1</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">OS</p>
                        <p class="text-muted mb-0">Android</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">Last Login</p>
                        <p class="text-muted mb-0">12-02-2024 09:00 AM</p>
                      </div>
                    </div>
                  </div>

                  <div class=" card shadow-sm mb-3">
                    <div className="card-body py-2 ">
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">Browser Name </p>

                        <p class="text-muted mb-0">Safari</p>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">IP</p>
                        <p class="text-muted mb-0">127.0.0.1</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">OS</p>
                        <p class="text-muted mb-0">Mac</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">Last Login</p>
                        <p class="text-muted mb-0">12-02-2024 09:00 AM</p>
                      </div>
                    </div>
                  </div>
                  <div class=" card shadow-sm mb-3">
                    <div className="card-body py-2 ">
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">Browser Name </p>

                        <p class="text-muted mb-0">Chrome</p>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">IP</p>
                        <p class="text-muted mb-0">148.23.23.1</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">OS</p>
                        <p class="text-muted mb-0">MAC</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">Last Login</p>
                        <p class="text-muted mb-0">12-02-2024 09:00 AM</p>
                      </div>
                    </div>
                  </div>
                  

                  <div class=" card shadow-sm mb-3">
                    <div className="card-body py-2 ">
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">Browser Name </p>

                        <p class="text-muted mb-0">Chrome</p>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">IP</p>
                        <p class="text-muted mb-0">148.23.23.1</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">OS</p>
                        <p class="text-muted mb-0">MAC</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p class="mb-0">Last Login</p>
                        <p class="text-muted mb-0">12-02-2024 09:00 AM</p>
                      </div>
                    </div>
                  </div>
                 

                
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card mb-4 mb-md-0">
                <div class="card-body pb-3">
                  <p class="mb-2">
                    <span class="text-teal me-1"> Deposit </span> & Withdrawal
                  </p>

                  <ApexChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
