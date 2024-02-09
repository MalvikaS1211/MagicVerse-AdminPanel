
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

// export function TeamData(user) {  
//   console.log("123654",user)
//   const apiUrl = `${url}/alluser?page=${user}`;
//   const requestData = {
//     user: user
//   }
//   return fetch(apiUrl, {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//       "cache-control": "no-cache",
//       "Access-Control-Allow-Origin": "*",
//     },
//   //  body: JSON.stringify(requestData),
//   })
//     .then((res) => res.json())
//     .catch((e) => console.log("1234",e));
// }

export function TeamData(user) {  
  console.log("123654", user);
  const apiUrl = `${url}/team-list?user=${user}`;
  console.log(apiUrl)
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