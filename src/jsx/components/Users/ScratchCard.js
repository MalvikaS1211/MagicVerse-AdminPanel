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
import { Row, Col, Card, Table } from "react-bootstrap";
import { dataList } from "../../../services/api_function";
import { Link } from "react-router-dom";
import { COLUMNS } from "../../components/table/FilteringTable/Columns";
import MOCK_DATA from "../../components/table/FilteringTable/MOCK_DATA_2.json";
import { FaExchangeAlt } from "react-icons/fa";
import { SiApostrophe } from "react-icons/si";
// import Tooltip from "@mui/material/Tooltip";
import { PiUsersThreeFill } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoMdTrophy } from "react-icons/io";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setUserTaskAction } from "../../../store/actions/AuthActions";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
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

 const ScratchCard = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [config, setcofig] = useState([]);
  const pageSize = 100;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const table = "get-scratchcard";
        const result = await dataList(
          table,
          currentPage,
          search,
          token
        );
        setApiData(result?.data || []);


      console.log("API Data:", result?.data);

       
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
  }, [currentPage, search]);

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

  return (
    <Fragment>
      <Row>
        <div className="display_end">
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
              <Card.Title>All Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                  <th>S.No</th>
                    <th>User Id</th>
                    <th>Amount</th>
                    <th>Scratched Status</th>
                    <th>Created At</th>
                   

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
                    apiData?.map((data, index) => {
                
                      const position = (currentPage - 1) * 10 + (index + 1);

                      return (
                        <tr>
                          <td>{position}</td>
                          <td>{data?.user_id} </td>
                          <td>{data.amount}</td>
                         
                          <td>{data.scratched?<FaCheck  color="green"/>: <IoClose color="red"/>}</td>
                       <td>{formatDateToIST(data.createdAt)}</td>
                          {/* <td>
                            <div>
                              <div class="btn-group">
                                
                                <button
                                  type="button"
                                  class="custom_btn dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                 View

                                </button>
                                <ul class="dropdown-menu">
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`deposit-detail?id=${data._id}`}
                                    >
                                      <div>
                                        <RiLuggageDepositFill  className="me-2"/> Deposit
                                      </div>
                                    </Link>
                                  </li>
                                 

                                  <li>
                                    {" "}
                                    <Link
                                      className="dropdown-item"
                                      to={`withdraw-detail?id=${data._id}`}
                                    >
                                      <div>
                                        <RiMoneyDollarCircleFill  className="me-2"/> Withdraw
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`staking-detail?id=${data._id}`}
                                    >
                                      <div>
                                        <GrStakeholder  className="me-2"/> Stake
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`assets-detail?id=${data._id}`}
                                    >
                                      <div>
                                        <MdWebAsset  className="me-2"/>Assets
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`exchange-detail?id=${data._id}`}
                                    >
                                      <div>
                                        <FaExchangeAlt  className="me-2"/>Exchange 
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`activity-detail?id=${data._id}`}
                                    >
                                      <div>
                                        <RxActivityLog  className="me-2"/>Activity 
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`user-referal?id=${data._id}`}
                                    >
                                      <div>
                                        <PiUsersThreeFill  className="me-2"/>User Referal 
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`referral-income?id=${data._id}`}
                                    >
                                      <div>
                                        <GiReceiveMoney  className="me-2"/>Referal Income 
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`signup-bonus?id=${data._id}`}
                                    >
                                      <div>
                                        <SiApostrophe  className="me-2"/>Signup Bonus
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      // to={"task-reward"}
                                      onClick={() => {
                                        console.log(data, " user data");
                                        dispatch(
                                          setUserTaskAction(data?.rewards)
                                        );
                                        setTimeout(() => {
                                          navigate("task-reward");
                                        }, 200);
                                      }}
                                    >
                                      <div>
                                        <IoMdTrophy  className="me-2"/>Task Reward
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      // to={"task-reward"}
                                      onClick={() => {
                                        console.log(data, " user data");
                                        dispatch(setUserTaskAction(data));
                                        setTimeout(() => {
                                          navigate("support");
                                        }, 200);
                                      }}
                                    >
                                      <div>
                                        <FaMessage  className="me-2"/>Support Chat
                                      </div>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td> */}
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
    </Fragment>
  );
};

export default ScratchCard;
