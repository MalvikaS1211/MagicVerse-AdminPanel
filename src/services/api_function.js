import axios from "axios";
// export const url = "http://64.227.149.24:2222";
export const url = "http://localhost:2222";

export const teamlist = "https://farming.wyscale.com/api";

export function allUser(table, page, filteredData, token) {
  const { searchQuery } = filteredData;
  let apiUrl = "";
  if (table === "user") {
    apiUrl = `${url}/admin/api/user-data?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "stake") {
    apiUrl = `${url}/admin/api/stake?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "claimhistory") {
    apiUrl = `${url}/admin/api/claim?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "deposit") {
    apiUrl = `${url}/admin/api/deposit?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "withdraw-history") {
    apiUrl = `${url}/admin/api/withdraw?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "asset") {
    apiUrl = `${url}/admin/api/asset?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "swap") {
    apiUrl = `${url}/admin/api/swap?page=${page}&search=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (table === "currency") {
    apiUrl = `${url}/admin/api/currency?page=${page}&search=${encodeURIComponent(
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
      apiUrl = `${url}/admin/api/deposite-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`;
    } 
    else if (table === "withdraw") {
      apiUrl = `${url}/admin/api/withdraw-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`;
    } else if (table === "stake") {
      apiUrl = `${url}/admin/api/stake-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`
    } else if (table === "asset") {
      apiUrl = `${url}/admin/api/asset-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`
    } else if (table === "exchange") {
      apiUrl = `${url}/admin/api/exchange-detail?page=${page}&id=${encodeURIComponent(
        id
      )}`
    }
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    console.log("Error in UserDepositeDetails()", error.message);
  }
};

export function dashboardData(token, date) {
  const apiUrl = `${url}/admin/api/dashboard?date=${date}`;
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
  const apiUrl = `${url}/admin/api/login`;
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
