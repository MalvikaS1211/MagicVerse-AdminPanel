import axios from "axios";
import toast from "react-hot-toast";


export const URLApi = "http://192.168.1.117:8081/api";
// export const URLApi = "http://localhost:8081/api";
// export const URLApi = "https://iftglobal.org/api";

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

    const response = await axios.post(`${URLApi}/adminLogin`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    console.log(response.data, "response.data");

    return response.data;
  } catch (error) {
    console.log("Error login Admin:", error);
  }
}

export function replyTicket(
  ticketId,
  replymessage,
  replyfile,
  closed,
  subject,
  token
) {
  const formData = new FormData();
  if (replyfile) {
    formData.append("reply", replyfile, replyfile.name);
  }
  // formData.append("mobile", mobile);
  // formData.append("tokenId", sessionId);
  formData.append("closed", closed);
  formData.append("message", replymessage);
  formData.append("subject", subject);
  formData.append("ticketId", ticketId);

  return axios
    .post(URL + "/reply-tickets", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((e) => {
      console.log(e);
    });
}

export const getAllChatsList = async (token) => {
  try {
    const res = await axios.get(`${URLApi}/support-chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export function raisedTicketList(address, token) {
  return fetch(URL + "/tickets-list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "allow-access-control-origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address: address,
      page: 1,
      limit: 10,
    }),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e, "Error in raisedTicketList()::apis.tsx");
    });
}

export async function daoUsersAdd(address, token) {
  try {
    const requestBody = {
      address: address,
    };

    const response = await axios.post(`${URLApi}/addDAOUser`, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error login Admin:", error);
  }
}

export async function getDAOUserList(walletAddress, token) {
  try {
    const response = await axios.get(`${URLApi}/getDAOUserList`, {
      params: {
        address: walletAddress,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getAllStakeUsers(page, limit, filter, token) {
  try {
    const response = await axios.get(`${URLApi}/getAllStakeUsers`, {
      params: {
        page: page,
        limit: limit,
        address: filter,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function updateStakeSetting(newSettings, token) {
  try {
    const response = await axios.post(
      `${URLApi}/updateStakeSetting`,
      newSettings,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function getUserNodeGroupData(page, limit, filter, type, token) {
  try {
    const response = await axios.get(`${URLApi}/getUserNodeGroupData`, {
      params: {
        page: page,
        limit: limit,
        address: filter,
        type: type,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getDAOUserList Admin:", error);
  }
}

export async function nodeGroupApproveAction(selectedIds, token) {
  try {
    const requestBody = {
      selectedIds: selectedIds,
    };
    const response = await axios.post(
      `${URLApi}/nodeGroupApproveAction`,
      JSON.stringify(requestBody),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "response.data");
    return response.data;
  } catch (error) {
    console.log("Error nodeGroupApproveAction:", error);
  }
}

export async function getAdminDashboard(page, limit, search) {
  try {
    const response = await axios.get(`${URLApi}/admin-dashboard`, {
      params: {
        page,
        limit,
        search,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getLevelIncome Admin:", error);
  }
}

export async function getUserPackages(page, limit) {
  try {
    const response = await axios.get(`${URLApi}/users-with-pkgs`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getLevelIncome Admin:", error);
  }
}

export async function getCreatedNFtList(page, limit) {
  try {
    const response = await axios.get(`${URLApi}/get-created-nft-list`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getCreatedNFtList Admin:", error);
  }
}

export async function getMaturedNFTs(page, limit) {
  try {
    const response = await axios.get(`${URLApi}/all-matured-nfts`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getMaturedNFTs Admin:", error);
  }
}

export async function getAllBulkPackages() {
  try {
    const response = await axios.get(`${URLApi}/get-all-bulk-packages`);

    return response.data;
  } catch (error) {
    console.log("Error getAllBulkPackages Admin:", error);
  }
}

export async function getLoginCredential(email, password) {
  try {
    const response = await axios.post(`${URLApi}/admin-login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("Error getLoginCredential Admin:", error);
  }
}

export async function getDepostList(page, limit) {
  try {
    const response = await axios.get(`${URLApi}/total-deposits`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getDepostList Admin:", error);
  }
}



export async function getNftStartStop(user, status) {
  try {
    const response = await axios.post(`${URLApi}/changedStatus`, {
      user,
      status,
    });

    return response.data;
  } catch (error) {
    console.log("Error getLoginCredential Admin:", error);
  }
}

export async function createMessageFn(Sender, Receiver, Message, TicketId) {
  try {
    const response = await axios.post(`${URLApi}/createMessage`, {
      Sender,
      Receiver,
      Message,
      TicketId,
    });

    return response.data;
  } catch (error) {
    console.log("Error createMessageFn Admin:", error);
  }
}

export async function getAllTicket() {
  try {
    const response = await axios.post(`${URLApi}/getAllTicketsByAdmin`, {});

    return response.data;
  } catch (error) {
    console.log("Error getAllTicket Admin:", error);
  }
}

export async function getTicketByUserAddressFn(UserAddress) {
  try {
    const response = await axios.post(`${URLApi}/getTicketByUserAddress`, {
      UserAddress,
    });

    return response.data;
  } catch (error) {
    console.log("Error getTicketByUserAddressFn Admin:", error);
  }
}

export async function GetMsgByTicket(TicketId, UserAddress) {
  try {
    const response = await axios.post(`${URLApi}/getAllTickets`, {
      id: TicketId,
      userAddress: UserAddress,
    });

    return response.data;
  } catch (error) {
    console.log("Error getAllTicket Admin:", error);
  }
}

export async function ChangeStatusFn(ticketId, status) {
  console.log(ticketId, status, "ticketId, status");
  try {
    const response = await axios.post(`${URLApi}/updateStatus`, {
      ticketId,
      status,
    });
    console.log(response.data, "ChangeStatusFn");
    return response.data;
  } catch (error) {
    console.log("Error ChangeStatusFn Admin:", error);
  }
}

export async function getUserHolders(user, page, limit) {
  try {
    const response = await axios.post(`${URLApi}/userHolding`, {
      user,
      page,
      limit,
    });

    return response.data;
  } catch (error) {
    console.log("Error getUserHolders Admin:", error);
  }
}

export async function getAllNFTs(page, limit) {
  try {
    const response = await axios.post(`${URLApi}/getAllNFTs`, {
      page,
      limit,
    });

    return response.data;
  } catch (error) {
    console.log("Error getAllNFTs :", error);
  }
}

export async function getAllSoldNFTs(page, limit) {
  try {
    const response = await axios.post(`${URLApi}/getAllSoldNFTs`, {
      page,
      limit,
    });

    return response.data;
  } catch (error) {
    console.log("Error getAllSoldNFTs :", error);
  }
}

export async function nftValueTracking(page, limit) {
  try {
    const response = await axios.post(`${URLApi}/nftValueTracking`, {
      page,
      limit,
    });

    return response.data;
  } catch (error) {
    console.log("Error nftValueTracking :", error);
  }
}

export async function AllowToCreateBulk(user, status) {
  try {
    const response = await axios.post(`${URLApi}/userAllowForBulk`, {
      user,
      status,
    });

    return response.data;
  } catch (error) {
    console.log("Error AllowToCreateBulk Admin:", error);
  }
}

export async function AddNFTInQueue(tokenId) {
  try {
    const response = await axios.post(`${URLApi}/add-nft-to-queue`, {
      tokenId,
    });

    return response.data;
  } catch (error) {
    console.log("Error AddNFTInQueue :", error);
  }
}

export async function getAllNFTInQueue(page, limit) {
  try {
    const response = await axios.get(`${URLApi}/getAllNftFromQueue`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.log("Error AddNFTInQueue :", error);
  }
}

export async function DeleteNFt(tokenId) {
  try {
    console.log(tokenId, "token id :::");
    const response = await axios.post(`${URLApi}/delete-nft-from-queue`, {
      tokenId,
    });

    return response.data;
  } catch (error) {
    console.log("Error AddNFTInQueue :", error);
  }
}

export async function addMessage(Message) {
  try {
    console.log(Message, "token id :::");
    const response = await axios.post(`${URLApi}/addMessage`, {
      Message,
    });

    return response.data;
  } catch (error) {
    console.log("Error AddNFTInQueue :", error);
  }
}

export async function getMessage() {
  try {
    const response = await axios.get(`${URLApi}/get-messages`);

    return response.data;
  } catch (error) {
    console.log("Error getMessage Admin:", error);
  }
}

export async function getActiveUserslast24Hours(page, limit) {
  try {
    const response = await axios.get(`${URLApi}/active-users-last-24hours`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error active-users-last-24hours :", error);
  }
}

export async function dueNft(tokenId) {
  try {
    const response = await axios.get(`${URLApi}/due-nft`, {
      params: {
        tokenId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error due-nft:", error);
    return null;
  }
}

export async function oldNftList(page, limit, buyer) {
  try {
    const response = await axios.get(`${URLApi}/getOldNftValueAndList`, {
      params: {
        page,
        limit,
        buyer,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getOldNftValueAndList :", error);
  }
}

export async function burnNft(tokenId) {
  try {
    const response = await axios.post(`${URLApi}/burn-nft`, {
      tokenId,
    });

    return response.data;
  } catch (error) {
    console.log("Error getOldNftValueAndList :", error);
  }
}

export async function RemoveNFt(tokenId) {
  try {
    const response = await axios.post(`${URLApi}/removeNftFromQueue`, {
      tokenId,
    });

    return response.data;
  } catch (error) {
    console.log("Error RemoveNFt :", error);
  }
}

export async function getStakingList(page = 1, limit = 10, filter, user) {
  try {
    const response = await axios.post(`${URLApi}/get-staking-list`, {
      page,
      limit,
      filter,
      user,
    });

    return response.data;
  } catch (error) {
    console.log("Error getStakingList :", error);
    throw error; // so ApproveStakingList catch can handle it
  }
}

export async function approveRejectStaking(user, id, status) {
  try {
    const response = await axios.post(`${URLApi}/approve-or-reject`, {
      user,
      id,
      status,
    });

    return response.data;
  } catch (error) {
    console.log("Error ApproveStaking :", error);
  }
}

export async function getROIList(page, limit, filter, user) {
  try {
    const response = await axios.post(`${URLApi}/get-roi-list`, {
      page,
      limit,
      filter,
    });

    return response.data;
  } catch (error) {
    console.log("Error getROIList :", error);
    throw error;
  }
}

export async function roiApproveOrReject(user = [], id = [], status, txHash) {
  try {
    const response = await axios.post(`${URLApi}/RoiApproveOrReject`, {
      user,
      id,
      status,
      txHash,
    });

    return response.data;
  } catch (error) {
    console.log("Error roiApproveOrReject :", error);
  }
}

export async function getReadyForBuyFn(
  userAddress,
  initialPrice,
  title,
  description,
  metadataURI,
  tokenId,
  totalAmount
) {
  try {
    if (!title) {
      return;
    }
    const response = await axios.post(`${URLApi}/buy-nft-vrs`, {
      userAddress,
      initialPrice,
      title,
      description,
      metadataURI,
      tokenId,
      totalAmount,
    });
    console.log(response?.data, "getReadyForBuyFn");
    return response?.data;
  } catch (error) {
    console.log("Error getReadyForBuyFn :", error);
    throw error;
    return false;
  }
}

export async function getLastNFTs(page, limit, search) {
  try {
    const response = await axios.post(`${URLApi}/getLastNft`, {
      page,
      limit,
      search,
    });

    return response.data;
  } catch (error) {
    console.log("Error getLastNFTs :", error);
  }
}

export async function get15Nft(page, limit) {
  try {
    const response = await axios.get(`${URLApi}/get15Nft`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error get15Nft Admin:", error);
  }
}