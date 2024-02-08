const url = "http://localhost:8080/api"

export function allUser(page) {
  const apiUrl = `${url}/alluser?page=${page}`;
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

export function TeamData(user) {  
  console.log("123654",user)
  return fetch(`${url}/team-list?user=${user}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.json())
    .catch((e) => console.log("adjcbv",e));
}