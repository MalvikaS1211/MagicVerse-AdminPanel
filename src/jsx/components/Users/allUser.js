import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DownloadExcel } from "react-excel-export";
import { useNavigate } from "react-router-dom";
import { RiLuggageDepositFill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RxActivityLog } from "react-icons/rx";
import { GrStakeholder } from "react-icons/gr";
import { MdWebAsset } from "react-icons/md";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import * as XLSX from "xlsx";

import { FaMessage } from "react-icons/fa6";
import { Row, Col, Card, Table } from "react-bootstrap";
import { allUser } from "../../../services/api_function";
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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    // maxWidth: 220,
    // fontSize: theme.typography.pxToRem(12),
    // border: "1px solid #dadde9",
  },
}));


export const AllUser = () => {
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
        const table = "user";
        const result = await allUser(
          table,
          currentPage,
          { searchQuery: search },
          token
        );
        setApiData(result?.data);
        setcofig(result?.config);
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "20px",
          }}
        >
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
            <Card.Header
              style={{ background: "black", border: "1px solid white" }}
            >
              <Card.Title style={{ color: "white", margin: "auto" }}>
                All Users
              </Card.Title>
            </Card.Header>
            <Card.Body
              style={{
                background: "black",
                border: "1px solid white",
                borderRadius: "3px",
              }}
            >
              <Table
                responsive
                style={{
                  background: "black",
                  color: "white",
                  borderBottom: "0.5px solid white",
                }}
              >
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>
                      <strong>NO.</strong>
                    </th>
                    <th>
                      <strong>Name</strong>
                    </th>
                    <th>
                      <strong>UserName</strong>
                    </th>
                    <th>
                      <strong>Phone</strong>
                    </th>
                    <th>
                      <strong> DOB</strong>
                    </th>
                    <th>
                      <strong> Wallet Balance</strong>
                    </th>
                    <th>
                      <strong> Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!apiData[0] ? (
                    <tr>
                      <td className="text-light text-center" colSpan="7">
                        {recordStatus}
                      </td>
                    </tr>
                  ) : (
                    apiData.map((data, index) => {
                      const total = data?.currency?.reduce((pre, it) => {
                        const price = config.find(
                          (itm) => itm.symbol.toLowerCase() == it.symbol.toLowerCase()
                        );
                        const fp = price ? price.price : 1;
                        const tt = pre + it.available * fp;
                        return tt;
                      }, 0);

                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.name}</td>
                          <td>{data.username}</td>
                          <td>{data.mobile}</td>
                          <td>{new Date(data.dob).toLocaleDateString()}</td>
                          <td>{total?.toFixed(3)}(INR)</td>
                          <td>
                            <Link
                              
                              to={`deposit-detail?id=${data._id}`}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                      Deposite
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><RiLuggageDepositFill /></Button>
                              </HtmlTooltip>
                            </Link>
                            <Link
                              
                              to={`withdraw-detail?id=${data._id}`}
                            >
                             <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography color="inherit">
                                      Withdraw
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><RiMoneyDollarCircleFill /></Button>
                              </HtmlTooltip>
                            </Link>
                            <Link
                              className=" me-1"
                              to={`staking-detail?id=${data._id}`}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                      Stake
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><GrStakeholder /></Button>
                              </HtmlTooltip>
                            </Link>
                            <Link
                              
                              to={`assets-detail?id=${data._id}`}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                      Asset
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><MdWebAsset /></Button>
                              </HtmlTooltip>
                            </Link>
                            <Link
                              className="text-white me-3 fs-3"
                              to={`exchange-detail?id=${data._id}`}
                            >
                              {/* <Tooltip title="Add" placement="top">
                              <FaExchangeAlt>Exchange</FaExchangeAlt>
                              </Tooltip> */}
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                      Exchange
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><FaExchangeAlt/></Button>
                              </HtmlTooltip>
                            </Link>
                            <Link
                              
                              to={`activity-detail?id=${data._id}`}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                      Activity
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><RxActivityLog /></Button>
                              </HtmlTooltip>
                            </Link>
                            <Link
                              to={`user-referal?id=${data._id}`}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                      User Referal
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><PiUsersThreeFill />
                                </Button>
                              </HtmlTooltip>
                            </Link>
                            <Link
                              
                              to={`referral-income?id=${data._id}`}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                     Referal Income
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><GiReceiveMoney />
                                </Button>
                              </HtmlTooltip>
                            </Link>
                            <Link
                              
                              to={`signup-bonus?id=${data._id}`}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                     Signup Bonus 
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Button className="text-white fs-2" arrow><SiApostrophe />
                                </Button>
                              </HtmlTooltip>
                            </Link>
                            <span
                              // to={"task-reward"}
                              onClick={()=>{
                                console.log(data,' user data');
                                dispatch(setUserTaskAction(data?.rewards))
                                setTimeout(() => {
                                  navigate("task-reward")                                  
                                }, 200);
                              }}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                     Task Reward
                                    </Typography>
                                  </React.Fragment>
                                }                                
                              >
                                <Button className="text-white fs-2" arrow><IoMdTrophy />
                                </Button>
                              </HtmlTooltip>
                            </span>
                            <span
                              // to={"task-reward"}
                              onClick={()=>{
                                console.log(data,' user data');
                                dispatch(setUserTaskAction(data))
                                setTimeout(() => {
                                  navigate("support")                                  
                                }, 200);
                              }}
                            >
                              <HtmlTooltip
                                title={
                                  <React.Fragment placement="top">
                                    <Typography color="inherit">
                                     Support Chat
                                    </Typography>
                                  </React.Fragment>
                                }                                
                              >
                                <Button className="text-white fs-2" arrow><FaMessage />
                                </Button>
                              </HtmlTooltip>
                            </span>
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
                <div className="filter-pagination  mt-3 bg-black">
                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{
                      background:
                        " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                      color: "black",
                    }}
                  >
                    Previous
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{
                      background:
                        " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                      color: "black",
                    }}
                  >
                    Next
                  </button>

                  {/* <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{
                      background:
                        " linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",
                      color: "black",
                    }}
                  >
                    {">>"}
                  </button> */}

                  <span className="bg-black text-white">
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

export default AllUser;
