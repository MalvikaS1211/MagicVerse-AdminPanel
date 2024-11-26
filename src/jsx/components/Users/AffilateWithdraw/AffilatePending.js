import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Toast } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Papa from "papaparse";
import { cutAfterDecimal, daoUsersAdd, getAfter14DaysAllUserReward, getAllUnstakes, getDAOUserList, getDscprice, getStakeSetting, getUserAffilateWithdrawal, getUserUnstakeWithdrawal, updateAffilateMultisend, updateMultisend, updateStakeSetting } from "../../../../services/api_function";
import toast from "react-hot-toast";
import { approveContract, getTokenAllowance, multisendCoin, multisendToken } from "../web3/transfert";
import { useSelector } from "react-redux";
import { TOKEN_ADDRESS_USDT } from "../../../../config/config";
import { useSwitchNetwork } from "wagmi";

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

export const AffilatePending = () => {
    const {
        chains,
        switchNetworkAsync,
      } = useSwitchNetwork();
    const {wallet} = useSelector((state) => state.login);
    const { walletAddress,chainId } = wallet ;
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [recordStatus, setRecordStatus] = useState("Loading...");
  const [isFetch, setIsFetch] = useState(false);
  const [priceDsc, setPriceDsc] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const token = localStorage.getItem("adminToken");
  const [livePriceEnable, setLivePriceEnable] = useState({livePriceDsc:false});

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
        // const data2312=  await getAfter14DaysAllUserReward(currentPage,20,token);
        // console.log(data2312,"data2312")
        const result = await getUserAffilateWithdrawal(currentPage,10, search,"pending",token);
        // console.log(result,"RELLLLLLL");
        setApiData(result?.data);
        if (!result?.data?.[0]) {
          setRecordStatus("No Record");
        }
        // setTotalPages(result.totalPages);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log(result.data); // Logs the CSV data to console
        },
        header: true, // if you want the first row as headers
      });
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click(); // Programmatically click the hidden input
  };

  const updateSettings = async (newSettings) => {
    try {
      const data = await updateStakeSetting(newSettings, token);
      if(data?.status ===200){
        toast.success(data.message)
        console.log("Settings updated successfully:", data);
      }else{
        console.log("Settings error:", data);
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error("Error updating settings:", error);
    }
  };
  const handleToggleChange = async (e) => {
    const { name, checked } = e.target;

    // Update the local state immediately
    const newSettings = {
      ...livePriceEnable,
      [name]: checked,
    };
    setLivePriceEnable(newSettings);

    // Update settings on the server
    await updateSettings(newSettings);
  };

  useEffect(()=>{
    getDscprice().then((res)=>{
        console.log(res,"resprice")
        setPriceDsc(res)
    })
  },[currentPage,isFetch])


  async function handleDscApprove(){
    try {
        if (chainId != 1555) {
            await switchNetworkAsync?.(1555);
          }
            if(selectedItems.length === 0){
                toast.error("select unstake Withdraw!")
                return
            }
          // Filter selected rows from apiData
            const selectedData = apiData.filter((data) => selectedItems.includes(data._id));
            console.log(selectedData,"selectedData")
            // Extract user addresses and withdraw DSC amounts
            const userAddresses = selectedData.map((data) => data?.stakeId?.userAddress);
            const withdrawDscAmounts = selectedData.map((data) =>  livePriceEnable?.livePriceDsc ? (data?.isTransfer?.usdt && data?.isTransfer?.dsc ? ((((data?.withdrawAmount/2) / priceDsc)*1e18)?.toLocaleString("fullwide", { useGrouping: false })):((((data?.withdrawAmount) / priceDsc)*1e18)?.toLocaleString("fullwide", { useGrouping: false }))) :((data?.iswithdrawDSC *1e18)?.toLocaleString("fullwide", { useGrouping: false })));
            console.log(withdrawDscAmounts,"withdrawDscAmounts")
            // Calculate total withdraw DSC amount
            const totalWithdrawDsc = withdrawDscAmounts.reduce((sum, amount) => Number(sum) + Number(amount), 0).toString();
            console.log(userAddresses,withdrawDscAmounts,totalWithdrawDsc)
            const multisend = await multisendCoin(userAddresses,withdrawDscAmounts,totalWithdrawDsc);
            console.log(multisend,"multisend")
            const data = await updateAffilateMultisend(selectedItems, userAddresses, withdrawDscAmounts, multisend.transactionHash, "DSC",livePriceEnable?.livePriceDsc, token )
            console.log(data,"data")
    //    const multisend = await multisendCoin(["0x3F2042eb84f3b6182c42d63D726cF046B7ea1B9b"],["10000000000000000"],"10000000000000000");
    } catch (error) {
        toast.error("error")
        console.log(error,"error:")
    }
  }

  async function handleUsdtApprove(){
    try {
        if (chainId != 56) {
            await switchNetworkAsync?.(56);
          }
        if(selectedItems.length === 0){
            toast.error("select Affilate Withdraw!")
            return
        }
          // Filter selected rows from apiData
            const selectedData = apiData.filter((data) => selectedItems.includes(data._id));
            console.log(selectedData,"selectedData")
            // Extract user addresses and withdraw DSC amounts
            const userAddresses = selectedData.map((data) => data?.userAddress);
            const withdrawUsdtAmounts = selectedData.map((data) =>  ((data?.iswithdrawUSDT *1e18)?.toLocaleString("fullwide", { useGrouping: false })))
            console.log(withdrawUsdtAmounts,"withdrawUsdtAmounts")
            // Calculate total withdraw DSC amount
            const totalWithdrawUsdt = withdrawUsdtAmounts.reduce((sum, amount) => Number(sum) + Number(amount), 0).toString();
            console.log(userAddresses,withdrawUsdtAmounts,totalWithdrawUsdt)
            const tokenAllowance = await getTokenAllowance(
                walletAddress
              );

              if (tokenAllowance < Number(totalWithdrawUsdt)){
                const tokenApprove = await approveContract(TOKEN_ADDRESS_USDT);
                const multisend = await multisendToken(userAddresses,withdrawUsdtAmounts,totalWithdrawUsdt);
                console.log(multisend,"multisend")
                const data = await updateAffilateMultisend(selectedItems, userAddresses, withdrawUsdtAmounts, multisend.transactionHash, "USDT",livePriceEnable?.livePriceDsc, token )
                console.log(data,"data")
              }else{
                const multisend = await multisendToken(userAddresses,withdrawUsdtAmounts,totalWithdrawUsdt);
                console.log(multisend,"multisend")
                const data = await updateAffilateMultisend(selectedItems, userAddresses, withdrawUsdtAmounts, multisend.transactionHash, "USDT", livePriceEnable?.livePriceDsc, token )
                console.log(data,"data")
              }  
          
    //    const multisend = await multisendToken(["0x3F2042eb84f3b6182c42d63D726cF046B7ea1B9b"],["10000000000000000"],"10000000000000000");
    } catch (error) {
        toast.error("error")
        console.log(error,"error:")
    }
  }


  useEffect(()=>{
    getStakeSetting(token).then((res)=>{
      console.log(res,"data")
      if(res?.status === 200){
        const data ={
            livePriceDsc: res?.data?.livePriceDsc,
        }
        setLivePriceEnable(data);
      } else {
        setLivePriceEnable({  
            livePriceDsc: false
        })
      }
    })
  },[token])


  return (
    <Fragment>
      <Row className="pt-4">
      <div className=" d-flex align-items-center justify-content-between ">
      <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
      <div className="btn btn-dark">Selected Id: {selectedItems.length}</div>
     <div> <button type="button" className=" btn btn-success btn-border " onClick={()=>handleDscApprove()}>
        Approve Multisend DSC
        </button></div>
        <div>
        <button type="button" className=" btn btn-success btn-border " onClick={()=>handleUsdtApprove()}>
        Approve Multisend USDT
        </button>
        </div>
      </div>
        <div className=""        //display_end
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
              <Card.Title>AFFILATE PENDING WITHDRAW</Card.Title>
              <div className="d-flex align-items-center">          
              <div class="form-check form-switch mt-2 mb-2">
                <input
                class="form-check-input"
                name="livePriceDsc"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={livePriceEnable.livePriceDsc}
                onChange={handleToggleChange}
                />
               
            </div>
            <div class="form-check-label" for="flexSwitchCheckDefault">
                Live Price Withdraw
                </div>
            </div>
            </Card.Header>
            <Card.Body>

              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                    <tr>
                        <th>
                        <input
                            type="checkbox"
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            checked={selectedItems.length === apiData?.length && apiData?.length > 0}
                        />
                        </th>
                        <th>S.No.</th>
                        <th>User</th>
                        <th>Withdraw Amount($)</th>
                        <th>Only DSC($)</th>
                        <th>Only USDT($)</th>
                        <th>Withdraw DSC</th>
                        <th>DSC Live Price($)</th>
                        <th>Live Price Qty DSC</th>
                        <th>Withdraw USDT</th>
                        <th>WithDraw</th>
                        <th>WithDraw DSC Status</th>
                        <th>WithDraw USDT Status</th>
                        <th>Date & Time</th>
                        {/* <th>Action Approve</th> */}
                        {/* <th>Action Reject</th> */}
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
                                onChange={(e) => handleSelectItem(data._id, e.target.checked)}
                                checked={selectedItems.includes(data._id)}
                            />
                            </td>
                            <td>{index + 1}</td>
                            <td>
                            {data?.userAddress?.slice(0, 6)}...
                            {data?.userAddress?.slice(-6)}
                            </td>
                            <td>${cutAfterDecimal(data?.withdrawAmount,4)}</td>
                            <td>
                            $
                            {(data.isTransfer.usdt && data.isTransfer.dsc
                                ? data?.withdrawAmount / 2
                                : !data.isTransfer.usdt && data.isTransfer.dsc ? data?.withdrawAmount :0
                            ).toFixed(2)}
                            </td>
                            <td>
                            $
                            {(data.isTransfer.usdt && data.isTransfer.dsc
                                ? data?.withdrawAmount / 2
                                : data.isTransfer.usdt && !data.isTransfer.dsc ? data?.withdrawAmount :0
                            ).toFixed(2)}
                            </td>

                            <td>{cutAfterDecimal(data?.iswithdrawUserDSC,4) || 0} DSC</td>
                            <td>${(data?.iswithdrawUserDSC * priceDsc)?.toFixed(2)}</td>
                            <td>
                            {data.isTransfer.usdt && data.isTransfer.dsc
                                ? ((data?.withdrawAmount / 2) / priceDsc)?.toFixed(2)
                                : !data.isTransfer.usdt && data.isTransfer.dsc ? (data?.withdrawAmount / priceDsc)?.toFixed(2):0}{' '}
                            DSC
                            </td>
                            <td>{cutAfterDecimal(data?.iswithdrawUserUSDT,4) || 0} USDT</td>

                            <td
                            className={`fw-bold ${
                                data?.status === 'Pending'
                                ? 'text-warning'
                                : data?.status === 'Approve'
                                ? 'text-success'
                                : 'text-danger'
                            }`}
                            >
                            {data?.status}
                            </td>
                            <td>
                            <div
                                className={`${
                                data?.isWithdrawCompleted.dsc ? 'text-success' : 'text-warning'
                                } fw-bold`}
                            >
                                {data.isTransfer.dsc
                                ? data?.isWithdrawCompleted.dsc
                                    ? 'Success'
                                    : 'Pending'
                                : '--'}
                            </div>
                            </td>
                            <td>
                            <div
                                className={`${
                                data?.isWithdrawCompleted.usdt ? 'text-success' : 'text-warning'
                                } fw-bold`}
                            >
                                {data.isTransfer.usdt
                                ? data?.isWithdrawCompleted.usdt
                                    ? 'Success'
                                    : 'Pending'
                                : '--'}
                            </div>
                            </td>
                            <td>{new Date(data?.withdrawTimestamp).toLocaleString()}</td>

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

export default AffilatePending;
