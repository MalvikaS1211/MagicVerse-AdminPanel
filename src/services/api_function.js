

import axios from "axios";
export const url = "http://localhost:8080/api"
// const url="http://167.71.199.150/api"
//export const url = "https://farming.wyscale.com/api";

export function allUser(page, filteredData,token) {
  console.log("dfshvb",token)
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
      "Authorization": `Bearer ${token}` 
    },
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function TeamData(user, limit) {
  ////console.log("123654", user);
  const apiUrl = `${url}/team-list?user=${user}&limit=${limit}`;
  // console.log(apiUrl)
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

export function dashboardData() {
  // console.log("bvdshbhv")
  const apiUrl = `${url}/dashboard-new`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function withdrawRoi(page) {
  const apiUrl = `${url}/withdrawl-roi?page=${page}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function withdrawClaim(page) {
  const apiUrl = `${url}/withdrawl-claim?page=${page}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Commissiondata(user) {
  const apiUrl = `${url}/commission?user=${user}`;
  //console.log(apiUrl)
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
export function Depositedata(user, page) {
  const apiUrl = `${url}/deposite-history?user=${user}&page=${page}`;
  //console.log(apiUrl)
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

export function Withdrawdata(user, page) {
  const apiUrl = `${url}/withdraw-history?user=${user}&page=${page}`;
  //console.log(apiUrl)
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
export function DepositeHistory(page,filteredData) {
  // console.log("fadshv",filteredData)
   const { searchQuery } = filteredData;

  const apiUrl = `${url}/deposite?page=${page}&search=${encodeURIComponent(
    searchQuery
  )}`;
  // //console.log(apiUrl)
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function Graph() {
  const apiUrl = `${url}/graph-data`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function WithdrawBlock(user, action) {
  // console.log("afjsdhvh")
  const apiUrl = `${url}/withdraw-block`;
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user, action }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function LavelBlock(user) {
  //  console.log("afjsdhvh",user)
  const apiUrl = `${url}/levlunblock`;
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function FiftyList(page) {
  // console.log("Fetching page", page)
  const apiUrl = `${url}/fifty-list?page=${page}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function BlockList() {
  // console.log("Fetching page")
  const apiUrl = `${url}/block-list`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function FiftyActivate(user, wysAmount, duration, plan) {
  //  console.log("afjsdhvh",user,wysAmount,duration)
  const apiUrl = `${url}/admin-stake`;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user, wysAmount, duration, plan }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function FreeID(user, wysAmount, duration, freeId = false, plan) {
  console.log("afjsdhvh", user, wysAmount, duration, freeId);
  const apiUrl = `${url}/admin-stake`;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user, wysAmount, duration, freeid: freeId, plan }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function FreeIdlist(page,filteredData) {
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


export function Topteams() {
  const apiUrl = `${url}/top-team`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((e) => e);
}