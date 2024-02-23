
const url = "http://localhost:8080/api"

export function allUser(page, filteredData) {
  const { searchQuery } = filteredData; 
  const apiUrl = `${url}/alluser?page=${page}&search=${encodeURIComponent(searchQuery)}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function TeamData(user) {  
  ////console.log("123654", user);
  const apiUrl = `${url}/team-list?user=${user}`;
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

export function dashboardData() {
  const apiUrl = `${url}/dashborad-data`;
  return fetch(apiUrl, {
    method: "POST",
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
export function Depositedata(user,page) {  
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


export function Withdrawdata(user,page) {  
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
export function DepositeHistory(page) {
  const apiUrl = `${url}/deposite?page=${page}`;
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

export function Graph(){
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

export function WithdrawBlock(user,action){
  console.log("afjsdhvh")
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

export function LavelBlock(user){
  console.log("afjsdhvh",user)
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

