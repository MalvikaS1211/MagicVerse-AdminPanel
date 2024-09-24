
import React, { Fragment, useEffect, useState,useMemo } from "react";
import { Button } from "react-bootstrap";
const Announcement=()=>{



    return (
     <Fragment>
        <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Textarea</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3 ">
                  <textarea
                    className="form-txtarea form-control"
                    rows="4"
                    id="comment"
                  ></textarea>
                </div>
                <Button className="me-2 d-flex justify-content-center" variant="success">
                 Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </Fragment>
    )
}
export default Announcement