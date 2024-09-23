import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
import { useNavigate } from "react-router-dom";
import { RiLuggageDepositFill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RxActivityLog } from "react-icons/rx";
import { GrStakeholder } from "react-icons/gr";
import { MdWebAsset } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";

import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import * as XLSX from "xlsx";

import { FaMessage } from "react-icons/fa6";
import { Row, Col, Card, Table, Modal, Dropdown } from "react-bootstrap";
import { dataList } from "../../../services/api_function";
import { Link } from "react-router-dom";
import { COLUMNS } from "../../components/table/FilteringTable/Columns";

import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { useDispatch } from "react-redux";
import { formatDateToIST } from "../../../services/helperFunction";

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

export const Triangle = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [showModal, setShowModal] = useState(false);
  const [config, setConfig] = useState([]);
  const packageList = ["All",2500,5000,10000,15000,20000,25000,100000];

  const [selectedPackage, setSelectedPackage] = useState(packageList[0]);

  const pageSize = 100;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const table = "get-metrix";
        const result = await dataList(table, currentPage, search, token ,selectedPackage);
        setApiData(result?.data);

        console.log("API Data:", result.data);

        // setcofig(result?.config);
        setFilteredData(result?.data);
        setTotalPages(result.totalPages);
        if (!result?.data[0]) {
          setRecordStatus("No Record");
        }
        if (result.status == 404) {
          navigate("/login");
          localStorage.removeItem("userDetails");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, search,selectedPackage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => apiData, [apiData]);

  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };
  const exportToExcel = (data, fileName) => {
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Data");

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };
  const tableRef = useRef(null);
  const DataList = ({ data }) => {
    return (
      <div>
        {/* <h3>Children</h3> */}
        <ul>
          {data.length == 0 ? (
            <div className="card d-flex align-items-center justify-content-center ">
              <p className="text-center">No Chidren Found.</p>
            </div>
          ) : (
            data.map((item, index) => (
              <li key={index} className="card p-2">
                <p className="m-0">
                  <strong>Child ID:</strong> {item.child_id}
                </p>
                {/* <p className="m-0"><strong>Object ID:</strong> {item.ObjectId}</p> */}
                <p className="m-0">
                  <strong>Position:</strong> {item.position}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };

  return (
    <Fragment>
      <Row>
        <div className="display_end">
        <Dropdown className="btn-group mb-1">
            <Dropdown.Toggle
              className="btn dropdown-toggle px-3 ms-1 dropdown-mini"
              data-toggle="dropdown"
              style={{ color: "#000" }}
            >
            
           {selectedPackage=="All"?"All":`Package ${selectedPackage}`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {packageList.map((data, i) => (
                <Dropdown.Item onClick={()=>{setSelectedPackage(data)}}>{data === "All" ? "All" : `Package (${ data })`}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              onChange={handleSearch}
            />
          </div>
          <label class="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Matrix Summary</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    {/* <th>S.No</th> */}
                    <th>Id</th>
                    <th>Date</th>
                    <th>User Id</th>
                    {/* <th>Direct</th> */}
                    <th>Sponser Id</th>
                    <th>Upline Id</th>
                    <th>Amount</th>
                    {/* <th>Type</th> */}
                    <th>Team Member</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {!apiData[0] ? (
                    <tr>
                      <td className="text-center" colSpan="7">
                        {recordStatus}
                      </td>
                    </tr>
                  ) : (
                    apiData.map((data, index) => {
                      // const total = data?.currency?.reduce((pre, it) => {
                      //   const price = config.find(
                      //     (itm) =>
                      //       itm.symbol.toLowerCase() == it.symbol.toLowerCase()
                      //   );
                      //   const fp = price ? price.price : 1;
                      //   {/* const tt = pre + it.available * fp; */}
                      //   const tt = pre + it.available;

                      //   return tt;
                      // }, 0);
                      const position = (currentPage - 1) * 10 + (index + 1);

                      return (
                        <tr>
                          {/* <td>{position}</td> */}
                          <td>{data?.id}</td>
                          <td>{formatDateToIST(data?.createdAt)}</td>
                          <td>{data?.user_id} </td>
                          {/* <td>{data.direct}</td> */}
                          <td>{data?.sponser_id?data?.sponser_id:"-"}</td>
                          <td>{data?.upline?data?.upline:"-"}</td>
                          <td>{data?.amount}</td> 
                          {/* <td>{data?.type}</td> */}
                         
                          <td>
                            {data?.children.length} &nbsp;{" "}
                            {/* <button
                              className="custom_btn"
                              onClick={() => {
                                setConfig(data?.children);
                                setShowModal(true);
                              }}
                            >
                              View
                            </button> */}
                          </td>
                         
                        </tr>
                      );
                    })
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
                <div className="filter-pagination mt-3">
                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>

                  <span className=" ">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal
        className="modal fade"
        id="exampleModal"
        centered
        show={showModal}
        onHide={setShowModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Children List
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <DataList data={config} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={() => {handleUpdate()}}
            >
              Save
            </button> */}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Triangle;
