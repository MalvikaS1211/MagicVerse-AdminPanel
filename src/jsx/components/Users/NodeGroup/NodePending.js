import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Toast } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Papa from "papaparse";
import {
  cutAfterDecimal,
  getUserNodeGroupData,
  nodeGroupApproveAction,
} from "../../../../services/api_function";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";



const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#dadde9",
    fontSize: "12px",
    fontWeight: 400,
    border: "1px solid #25262B",
  },
}));

export const NodePending = () => {
  const { wallet } = useSelector((state) => state.login);
  const { walletAddress, chainId } = wallet;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [priceDsc, setPriceDsc] = useState(0);
  const token = localStorage.getItem("adminToken");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      // Select all items
      const allIds = apiData?.map((item) => item._id) || [];
      setSelectedItems(allIds);
    } else {
      // Deselect all
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, isChecked) => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserNodeGroupData(
          currentPage,
          10,
          search,
          "pending",
          token
        );
        // console.log(result,"RELLLLLLL");
        setApiData(result?.data);
        if (!result?.data?.[0]) {
          setRecordStatus("No Record");
        }
        setTotalPages(result.totalPages);
        // if (result.status == 404) {
        //   navigate("/login");
        //   localStorage.removeItem("userDetails");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, isFetch]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  async function handleNodeGroupApprove() {
    try {
      if (selectedItems.length === 0) {
        toast.error("Select Node Groups!");
        return;
      }
  
      console.log(selectedItems, "selectedItems");
  
      // Filter selected rows from apiData
      const selectedData = apiData.filter((data) =>
        selectedItems.includes(data._id)
      );
  
      console.log(selectedData, "selectedData");
  
      // Extract _id array from selectedData
      const selectedIds = selectedData.map((data) => data._id);
      console.log(selectedIds, "selectedIds");
  
      // Pass selectedIds to the approval API
      const response = await nodeGroupApproveAction(selectedIds, token);
      console.log(response, "API Response");
  
      if (response?.status === 200) {
        toast.success(response?.message || "Node Groups approved successfully!");
      } else {
        toast.error(response?.message || "Failed to approve Node Groups.");
      }
    } catch (error) {
      toast.error("Error occurred while approving Node Groups.");
      console.error(error, "error:");
    }
  }
  

  return (
    <Fragment>
      <Row className="pt-4">
        <div className=" d-flex align-items-center justify-content-between ">
          <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
            <div className="btn btn-dark">
              Selected Id: {selectedItems.length}
            </div>
            <div>
              {" "}
              <button
                type="button"
                className=" btn btn-success btn-border"
                onClick={() => handleNodeGroupApprove()}
              >
                Approve Node Groups
              </button>
            </div>
          </div>
          <div
            className="" //display_end
          >
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Search here..."
                //   onChange={handleSearch}
              />
            </div>
            <label className="form-label" for="form1"></label>
          </div>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>NODE GROUP PENDING</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        checked={
                          selectedItems.length === apiData?.length &&
                          apiData?.length > 0
                        }
                      />
                    </th>
                    <th>S.No.</th>
                    <th>User</th>
                    <th>Rank</th>
                    <th>Group Name</th>
                    <th>Status</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {!apiData?.[0] ? (
                    <tr>
                      <td className="text-light text-center" colSpan="16">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    apiData?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleSelectItem(data._id, e.target.checked)
                            }
                            checked={selectedItems.includes(data._id)}
                          />
                        </td>
                        <td>{index + 1}</td>
                        <td>
                          {data?.userAddress?.slice(0, 6)}...
                          {data?.userAddress?.slice(-6)}
                        </td>
                        <td>{data?.stakeId?.stakeRank}</td>
                        <td>{data?.groupName}</td>
                        <td
                          className={`fw-bold ${
                            data?.Status === "Pending"
                              ? "text-warning"
                              : data?.Status === "Approve"
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {data?.Status}
                        </td>

                        <td>{new Date(data?.timestamp).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between">
                <span>
                  {/* Page{" "} */}
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
                </span>
              </div>
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className=" filter-pagination mt-3 ">
                  <button
                    className="previous-button btn border m-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    className="next-button btn btn-success pointer border m-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>

                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NodePending;
