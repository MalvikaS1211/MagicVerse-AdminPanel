import axios from "axios";
export const url = "http://localhost:8080/api";
//export const url = "https://farming.wyscale.com/api";

export function allUser(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/alluser?page=${page}&search=${encodeURIComponent(
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
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function TeamData(user, limit, currentPage,sortField1,sortField2) {
console.log(user, limit, currentPage,sortField1,sortField2,":::::::::::")
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

export function dashboardData(token) {
  const apiUrl = `${url}/dashboard-new`;
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
  const apiUrl = `${url}/withdrawl-roi?page=${page}&search=${encodeURIComponent(
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

export function withdrawClaim(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/withdrawl-claim?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", //withdrawl-claim
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
  const apiUrl = `${url}/commission?user=${user}`;

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
  const apiUrl = `${url}/deposite-history?user=${user}&page=${page}`;
  //console.log(apiUrl)
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
  const apiUrl = `${url}/withdraw-history?user=${user}&page=${page}`;

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

export function WithdrawBlock(user, action, token) {
  const apiUrl = `${url}/withdraw-block`;
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user, action }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function LavelBlock(user, token) {
  console.log("dbvxch", token);
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
  const apiUrl = `${url}/fifty-list?page=${page}&search=${encodeURIComponent(
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
  //  console.log("afjsdhvh",user,wysAmount,duration)
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

export async function FreeID(
  user,
  wysAmount,
  duration,
  freeId = false,
  plan,
  token
) {
  const apiUrl = `${url}/admin-stake`;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user, wysAmount, duration, freeid: freeId, plan }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function FreeIdlist(page, filteredData, token) {
  const { searchQuery } = filteredData;
  const apiUrl = `${url}/freeId?page=${page}&search=${encodeURIComponent(
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
  const apiUrl = `${url}/admin-login`;
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
  const res = await axios.post(url + "/signup", {
    name: formData.name,
    address: formData.address,
    referrerId: formData.referrerId,
    phone: formData.phone,
  });
  console.log(res, "res form signup");
  return res;
}

export async function idToaddress(formData) {
  const res = await axios.get(url + "/idToAddress", {
    params: {
      userId: formData.referrerId,
    },
  });
  return res;
  console.log(res, "res form signup");
}

export function Topteams(token) {
  const apiUrl = `${url}/top-team`;
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


export function team_Busness(user) {
 // console.log("dbvxch", user);
  const apiUrl = `${url}/offer-data`;
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
   //   Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}