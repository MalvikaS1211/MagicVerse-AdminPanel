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
import { Row, Col, Card, Table, Modal } from "react-bootstrap";
import {
  dataList,
  updateContractAddress,
  updateHotWallet,
  updateMatix,
} from "../../../services/api_function";
import { Link } from "react-router-dom";
import { COLUMNS } from "../table/FilteringTable/Columns";
import MOCK_DATA from "../table/FilteringTable/MOCK_DATA_2.json";
import { FaExchangeAlt, FaRegCopy } from "react-icons/fa";
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
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

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

const ContractAddress = () => {
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
  const [editModal, setEditModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    _id: "",
    symbol: "",
    blockchain: "",
    contract_address: "",
    contract_type: "",
    precision: "",
    is_withdrawal: false,
    is_deposit: false,
    mainnet_rpc: "",
    testnet_rpc: "",
  });
  const [updateStatus, setUpdateStatus] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem("userDetails");
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token;
        const table = "get-contract-address";
        const result = await dataList(table, currentPage, search, token, "");
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
  }, [currentPage, search, updateStatus]);

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

  const handleUpdate = async () => {
    console.log(updateData,"updateData")
    const res = await updateContractAddress(updateData);
    if (res.status == 200) {
      toast.success("Wallet Updated Successfully");
      setUpdateStatus(!updateStatus);
      setEditModal(false);
    } else {
      toast.error("Wallet Updation Failed");
      setUpdateStatus(!updateStatus);
      setEditModal(false);
    }
  };

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
              <Card.Title>Contract Address</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Blockchain</th>
                    <th>Contract Address</th>
                    <th>Contract Type</th>
                    <th>Precision</th>
                    <th>Withdrawal Status</th>
                    <th>Deposit Status</th>
                    <th>Mainnet Rpc</th>
                    <th>Testnet Rpc</th>
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
                      const position = (currentPage - 1) * 10 + (index + 1);

                      return (
                        <tr>
                          {/* <td>{position}</td> */}
                          <td>{data?.symbol}</td>
                          <td>{data.blockchain}</td>
                          <td>{data.contract_address}</td>
                          <td>{data.contract_type}</td>
                          <td>{data.precision}</td>
                          <td>
                            {data.is_withdrawal ? (
                              <FaCheck color="green" />
                            ) : (
                              <IoClose color="red" />
                            )}
                          </td>
                          <td>
                            {data.is_deposit ? (
                              <FaCheck color="green" />
                            ) : (
                              <GiCancel color="red" />
                            )}
                          </td>
                          <td>{data.mainnet_rpc}</td>
                          <td>{data.testnet_rpc}</td>
                          {/* <td>{data?.symbol}</td> */}
                          <td>
                            <button
                              className="custom_btn"
                              onClick={() => {
                                setUpdateData(data);
                                setEditModal(true);
                              }}
                            >
                              Edit
                            </button>
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
        show={editModal}
        onHide={setEditModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Contract Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setEditModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <label className="form-label d-block">Enter Symbol</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Type"
              value={updateData.symbol}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  symbol: e.target.value,
                }))
              }
            />
            <label className="form-label d-block mt-3">Enter Blockchain</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Level"
              value={updateData.blockchain}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  blockchain: e.target.value,
                }))
              }
            />
            <label className="form-label d-block mt-3">
              Enter contract_address
            </label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Amount"
              value={updateData.contract_address}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  contract_address: e.target.value,
                }))
              }
            />
            <label className="form-label d-block mt-3">
              Enter contract_type
            </label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Contract Type"
              value={updateData.contract_type}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  contract_type: e.target.value,
                }))
              }
            />
            <label className="form-label d-block mt-3">Enter precision</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Precision"
              value={updateData.precision}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  precision: e.target.value,
                }))
              }
            />
            <label className="form-label d-block mt-3">Enter Mainnet RPC</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Symbol"
              value={updateData.mainnet_rpc}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  mainnet_rpc: e.target.value,
                }))
              }
            />
            <label className="form-label d-block mt-3">Enter Testnet RPC</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Symbol"
              value={updateData.testnet_rpc}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  testnet_rpc: e.target.value,
                }))
              }
            />
            <label className="form-label d-block mt-3">Can Withdrawal</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={updateData.is_withdrawal || false}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  is_withdrawal: e.target.checked,
                }))
              }
            />
            <label className="form-label d-block mt-3">Can Deposit</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={updateData.is_deposit || false}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  is_deposit: e.target.checked,
                }))
              }
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleUpdate();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ContractAddress;
