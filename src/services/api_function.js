import axios from "axios";
import toast from "react-hot-toast";
export const url = "https://backoffice.inrx.io/api";
export const url2 = "https://backoffice.inrx.io/api";

// export const URLApi = "http://localhost:8000/dsc_admin";
export const URLApi = "https://dappcircle.io/dsc_admin";

const dscPriceUrl = "https://dscscan.io/node-api/get-dsc-live-price";

export const getDscprice = async () => {
  try {
    const response = await axios.get(dscPriceUrl);
    console.log(response.data.data[0].token0Price * 30, "dsc priceresponse",response);
    const dscpriceIndollar = response.data.data[0].token0Price * 30;
    return dscpriceIndollar;
  } catch (err) {
    console.log(err,"error")
  }
};
export function cutAfterDecimal(number, pos, dl, ac) {
  if (Number(number)) {
    if (dl) {
      const limit = dl?.decimalLimit[ac] > 0 ? dl?.decimalLimit[ac] : 5;
      const res =
        number?.toString()?.indexOf(".") > -1
          ? number
              .toString()
              .slice(0, number.toString().indexOf(".") + limit + 1)
          : number;
      return res;
    } else {
      const res =
        number?.toString()?.indexOf(".") > -1
          ? number.toString().slice(0, number.toString().indexOf(".") + pos + 1)
          : number;
      return res;
    }
  } else {
    return 0;
  }
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString); // Create a Date object from the dateString
  const timestampInMilliseconds = date.getTime();
  return timestampInMilliseconds; // Return the timestamp
};


export async function adminLogin(email, password) {
  try {
    const requestBody = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${URLApi}/adminlogin`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data,"response.data")
    const token = response.data.token;

    if (token) {
      localStorage.setItem('adminToken', token); // Store token with the key 'adminToken'
      console.log("Token stored successfully in localStorage");
    }
    return response.data;
  } catch (error) {
    console.log("Error login Admin:", error);
  }
}

export async function daoUsersAdd(address, token) {
  try {
    const requestBody = {
      address: address,
    };

    const response = await axios.post(`${URLApi}/addDAOUser`, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error login Admin:", error);
  }
}

export async function getDAOUserList(token) {
  try {

    const response = await axios.get(`${URLApi}/getDAOUserList`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getUserRewardData(walletAddress) {
  try {
    const response = await axios.get(`${url}/getUserRewardData`, {
      params: {
        userAddress: walletAddress,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching stake data:", error);
    // Handle the error appropriately here
  }
}

export async function getAllUnstakes(page,limit, filter, token) {
  try {

    const response = await axios.get(`${URLApi}/getAllUnstakes`, {
      params: {
        page: page,
        limit: limit,
        address: filter
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getAllStakeUsers(page,limit, filter, token) {
  try {

    const response = await axios.get(`${URLApi}/getAllStakeUsers`, {
      params: {
        page: page,
        limit: limit,
        address: filter
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getAllRewardList(type,page,limit, filter, token) {
  try {

    const response = await axios.get(`${URLApi}/getAllRewardList`, {
      params: {
        type:type,
        page: page,
        limit: limit,
        address: filter
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getStakeSummary(token) {
  try {

    const response = await axios.get(`${URLApi}/getStakeSummary`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getAllStakeUserList(page,limit, filter,type, token) {
  try {

    const response = await axios.get(`${URLApi}/getAllStakeUserList`, {
      params: {
        page: page,
        limit: limit,
        userAddress: filter,
        type: type
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function updateStakeSetting(newSettings, token) {
  try {
    const response = await axios.post(`${URLApi}/updateStakeSetting`, newSettings, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error login Admin:", error);
  }
}

export async function getStakeSetting(token) {
  try {
    const response = await axios.get(`${URLApi}/getStakeSetting`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getTop3IdData(token) {
  try {
    const response = await axios.get(`${URLApi}/getTop3IdData`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getUserUnstakeWithdrawal(page,limit, filter,type, token) {
  try {

    const response = await axios.get(`${URLApi}/getUserUnstakeWithdrawal`, {
      params: {
        page: page,
        limit: limit,
        address: filter,
        type: type
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function updateMultisend(id, userAddresses, withdrawDscAmounts, multisendResponse, type, islivePriceStatus, token ) {
  try {
    const requestBody = {
      id:id, 
      userAddresses:userAddresses, 
      withdrawDscAmounts:withdrawDscAmounts, 
      multisendResponse:multisendResponse, 
      islivePriceStatus:islivePriceStatus,
      type:type,
    };
    const response = await axios.post(`${URLApi}/updateMultisend`, JSON.stringify(requestBody), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,

      },
    });
    console.log(response.data,"response.data")
    return response.data;
  } catch (error) {
    console.log("Error updateMultisend:", error);
  }
}