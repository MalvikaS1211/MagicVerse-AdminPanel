import axios from "axios";
import toast from "react-hot-toast";
export const url = "https://backoffice.inrx.io/api";
export const url2 = "https://backoffice.inrx.io/api";

// export const url = "http://localhost:2222/api";

export const teamlist = "https://farming.wyscale.com/api";

export function allUser(table, page, filteredData, token) {
  const { searchQuery } = filteredData;
  let apiUrl = "";
  if (table === "user") {
    apiUrl = `${url}/admin/user-data?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "stake") {
    apiUrl = `${url}/admin/stake?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "claimhistory") {
    apiUrl = `${url}/admin/claim?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "deposit") {
    apiUrl = `${url}/admin/deposit?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "pendingdeposit") {
    apiUrl = `${url}/admin/pending-deposit?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "withdraw-history") {
    apiUrl = `${url}/admin/withdraw?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "asset") {
    apiUrl = `${url}/admin/asset?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "swap") {
    apiUrl = `${url}/admin/swap?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "currency") {
    apiUrl = `${url}/admin/currency?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  }

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function TeamData(user, limit, currentPage, sortField1, sortField2) {
  const apiUrl = `${url}/team-list?user=${user}&limit=${limit}&page=${currentPage}&sortField1=${sortField1}&sortField2=${sortField2}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));
}

export const SingleUserDetail = async (table, id, page) => {
  try {
    let apiUrl = "";
    if (table === "deposite") {
      apiUrl = `${url}/admin/deposite-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`;
    } 
    else if (table === "withdraw") {
      apiUrl = `${url}/admin/withdraw-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`;
    } else if (table === "stake") {
      apiUrl = `${url}/admin/stake-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`
    } else if (table === "asset") {
      apiUrl = `${url}/admin/asset-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`
    } else if (table === "exchange") {
      apiUrl = `${url}/admin/exchange-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`
    }
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    console.log("Error in UserDepositeDetails()", error.message);
  }
};

export const SingleUserActivity= async (id,collection,page)=>{
  try {
    let table = collection.toLowerCase()
    const apiUrl= `${url}/admin/activity-detail?page=${page}&collection=${table}&id=${encodeURIComponent(
        id
      )}`;
      const {data} = await axios.get(apiUrl)
      return data;
  } catch (error) {
    console.log("error in SingleUserActivity()",error.message);
    
  }
}

export const getAllLoginUser = async(page,search,token)=>{
  const {searchQuery}=search
  try {
    const res = await axios.get(`${url}/admin/login-activity?page=${page}&search=${searchQuery}`,{
      headers:{
         Authorization: `Bearer ${token}`
      }
    })
    return res;
  } catch (error) {
    console.log("Error in getAllLoginUser()",error.message)
  }
}

export const LogoutuserByAdmin=async(userId,sessionId,login,token)=>{
  try {
    const res = await axios.get(`${url}/admin/logout-user/${userId}/${sessionId}/${login}`,{
      headers:{
         Authorization: `Bearer ${token}`
      }
    })
    return res;
  } catch (error) {
    console.log("Error in getAllLoginUser()",error.message)
  }
}

export const getMintRecord = async(page,token)=>{
  try {
    const res = await axios.get(`${url}/admin/mint-records?page=${page}`,{
      headers:{
         Authorization: `Bearer ${token}`
      }
    })
    return res;
  } catch (error) {
    console.log("Error in getAllLoginUser()",error.message)
  }
}

export const AdminSettings = async(formData,apiSubUrl,token)=>{
  try {
      const res= await axios.post(`${url}/admin/${apiSubUrl}`,formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        } 
      )
      return res;
  } catch (error) {
    console.log("Erro in AdminSettings",error.message)
  }
}


export const getReferralAmount = async(sec,id,page)=>{
    try {
      const {data} = await axios.get(`${url}/admin/${sec}?id=${id}&page=${page}`)
      return data;
    } catch (error) {
      console.log("Error in getReferralAmount()",error.message)
      toast.error(error.message)
    }
}

// chats funtion

export function raisedTicketList(mobile, tokenId) {
  return fetch(url + "/auth/tickets-list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "allow-access-control-origin": "*",
    },
    body: JSON.stringify({
      mobile: mobile,
      tokenId: tokenId,
      page: 1,
      limit: 10,
    }),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e, "Error in raisedTicketList()::apis.tsx");
    });
}

export function replyTicket(
  ticketId,
  replymessage,
  replyfile,
  closed,
  jwt,
  subject
) {
  const formData = new FormData();
  if(replyfile){
  formData.append("reply", replyfile, replyfile.name);
  }
  // formData.append("mobile", mobile);
  // formData.append("tokenId", sessionId);
  formData.append("closed", closed);
  formData.append("message", replymessage);
  formData.append("subject", subject);
  formData.append("ticketId", ticketId);

  return axios
    .post(url + "/auth/reply-tickets", formData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    } )
    .then((res) => res)
    .catch((e) => {
      console.log(e);
    });
}

export const getAllChatsList = async(jwtToken)=>{
  try {
    const res = await axios.get(`${url}/admin/support-chats`,{
      headers:{
        Authorization:`Bearer ${jwtToken}`
      }
    })
    return res;
  } catch (error) {
    console.log(error)
  }
}

// End chats functions

//kyc functions

  export const getAllUserKyc = async(token,kycStatusParam,search)=>{
    try {
      const res = await axios.get(`${url}/admin/kyc-status?status=${kycStatusParam}&search=${search}`,{
        headers:{
           Authorization: `Bearer ${token}`
        }
      })
      return res;
    } catch (error) {
      console.log(error)
    }
  }

  export const updateKycStatus = async(id,status,token)=>{
    try{
      const res = await axios.get(`${url}/admin/update-kyc?id=${id}&status=${status}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return res;
    }catch(error){
      console.log(error)
    }
  }

  export const updatedepositStatus = async(id,status,token)=>{
    try{
      const res = await axios.get(`${url}/admin/update-Deposit?id=${id}&status=${status}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return res;
    }catch(error){
      console.log(error)
    }
  }

// End kyc functions 

// all reports api function

export const uploadPdf=async(formData)=>{
  try {
    const res = await axios.post(`${url}/admin/report`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },})
    return res;
  } catch (error) {
    console.log(error)
  }
}

export const getReports = async(page)=>{
  try {
    const res = await axios.get(`${url}/admin/all-reports?page=${page}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const deleteReport = async(id)=>{
  try {
    const res = await axios.delete(`${url}/admin/report-delete/${id}`)
    return res;
  } catch (error) {
    console.log(error)
  }
}
// End reports api function












export function dashboardData(token, date) {
  const apiUrl = `${url}/admin/dashboard?date=${date}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function withdrawRoi(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/withdraw-roi?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function Approve_Withdraw(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/approved-withdraw?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Withdraw_Reject(page, filteredData, token) {
  console.log(token, "token");
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/reject-withdraw?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function withdrawClaim(page, filteredData, pageSize, token) {
  console.log(pageSize, "vjhfsgbfh");
  const { searchQuery, paymentMethod } = filteredData;
  const apiUrl = `${url}/withdraw-referal?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
    searchQuery
  )}&paymentMethod=${encodeURIComponent(paymentMethod)}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Commissiondata(user, token) {
  const apiUrl = `${url}/commission-user?user=${user}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));
}
export function Depositedata(user, page, token) {
  const apiUrl = `${url}/depoesite-user?user=${user}&page=${page}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));
}

export function Withdrawdata(user, page, token) {
  const apiUrl = `${url}/withdraw-user?user=${user}&page=${page}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));
}
export function DepositeHistory(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/deposite?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Graph(token) {
  const apiUrl = `${url}/graph-data`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function WithdrawBlock(user, status, token) {
  const apiUrl = `${url}/withdraw-block`;
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user, status }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function LavelBlock(user, token) {
  const apiUrl = `${url}/levlunblock`;
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function FiftyList(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/fifty-fifty?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", //fifty-list
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function BlockList(token, page) {
  // console.log("Fetching page")
  const apiUrl = `${url}/block-list?page=${page}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function FiftyActivate(user, wysAmount, duration, plan, token) {
  const apiUrl = `${url}/admin-stake`;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user, wysAmount, duration, plan }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export async function FreeID(user, wysAmount, plan, token) {
  const apiUrl = `${url}/manualregister`;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      walletAddress: user,
      amount: wysAmount,
      plan: plan,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Topup_data(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/topup-data?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function SignIn(email, password) {
  // console.log("afjsdhvh", email, password);
  const apiUrl = `${url}/admin/login`;
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export async function UserRegesation(formData) {
  const res = await axios.post(teamlist + "/signup", {
    name: formData.name,
    address: formData.address,
    referrerId: formData.referrerId,
    phone: formData.phone,
  });
  console.log(res, "res form signup");
  return res;
}

export async function idToaddress(formData) {
  const res = await axios.get(teamlist + "/idToAddress", {
    params: {
      userId: formData.referrerId,
    },
  });
  console.log(teamlist, "res form signup");
  return res;
  console.log(res, "res form signup");
}

export function Topteams(token) {
  const apiUrl = `${url}/top-twenty`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Protocal(token) {
  const apiUrl = `${url}/protocol-details`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Exel_Data(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/exel-data?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      //  Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Protocal_data(page, ratio, token) {
  console.log(page, ratio, token);
  // const { searchQuery } = filteredData;
  const apiUrl = `${url}/protocol-data?page=${page}&ratio=${ratio}&token=${token}`;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      //  Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function team_Busness(user) {
  console.log("dbvxch", user);
  const apiUrl = `${url}/team-data?user=${user}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      //   Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
