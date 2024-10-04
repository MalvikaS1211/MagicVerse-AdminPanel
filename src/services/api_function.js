import axios from "axios";
import toast from "react-hot-toast";
import { db } from "../jsx/components/Users/Firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import Question from "../jsx/components/Users/Question";
export const url = "https://backoffice.inrx.io/api";
export const url2 = "https://backoffice.inrx.io/api";
export const localApi = "http://localhost:5009/api/";

const formatDateTime = (dateString) => {
  const date = new Date(dateString); // Create a Date object from the dateString
  const timestampInMilliseconds = date.getTime();
  return timestampInMilliseconds; // Return the timestamp
};

export async function SignIn(email, password) {
  try {
    const querySnapshot = await getDocs(collection(db, "adminLogin"));
    const data = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    if (data[0].username == email && data[0].password == password) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error fetching adminLogin data:", error);
    return false;
  }
}

export async function createContest(formData) {
  try {
    const contestRef = doc(db, "live_quizzes", formData.contestId);
    const contestSnap = await getDoc(contestRef);
    if (contestSnap.exists()) {
      toast.error("Contest Id Already Exist");
      return;
    }
    const date = new Date(formData.endTime);

    await setDoc(contestRef, {
      buy: parseInt(formData.buyAmount),
      description: formData.description,
      endTime: date.getTime(),
      overall_time: parseInt(formData.duration),
      prize: parseInt(formData.firstPrize),
      reschedule: formData.reschedule == "true" ? true : false,
      title: formData.quizTitle,
      totalPrize: parseInt(formData.totalPrizeMoney),
      totalSpots: parseInt(formData.totalSpot),
      winnings: formData.winnings,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error adding document: ", error.message);
    return false; // Return error message to indicate what went wrong
  }
}

export const createQuestionInContest = async (formData, constest) => {
  try {
    console.log(formData, "::::");
    const contestRef = doc(db, "live_quizzes", formData.contestId);
    await updateDoc(contestRef, {
      questions: arrayUnion(formData),
    });
    return true;
  } catch (error) {
    console.error("Error adding question to contest: ", error);
    return false;
  }
};

export async function getContestId() {
  const constest = collection(db, "live_quizzes");
  const contestSnap = await getDocs(constest);
  const contestIds = contestSnap.docs.map((doc) => doc.id);
  // console.log(contestIds);
  return contestIds;
}

export async function fetchQuestion(contestId) {
  try {
    const contestRef = doc(db, "live_quizzes", contestId);
    // console.log(contestRef, contestId);
    const contestSnap = await getDoc(contestRef);
    if (contestSnap.exists()) {
      return contestSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log("Error fetching document:", error);
    return false;
  }
}

export async function getDashboardData() {
  try {
    // Fetch users
    const usersSnapshot = await getDocs(collection(db, "users"));
    const totalUsers = usersSnapshot.size; // Total users (document count)
    const contestsSnapshot = await getDocs(collection(db, "live_quizzes"));
    const totalContests = contestsSnapshot.size; // Total contests (document count)

    let totalQuestions = 0;
    let totalPaid = 0; // Initialize totalPaid
    let totalDeposit = 0; // Initialize totalDeposit
    for (const contestDoc of contestsSnapshot.docs) {
      const contestData = contestDoc.data();
      const contestId = contestDoc.id; // Get the contest ID
      if (contestData.paidUsersList && contestData.buy) {
        const depositForContest =
          contestData.paidUsersList.length * parseFloat(contestData.buy);
        totalDeposit += depositForContest; // Sum the deposits
      }
      const userResultsSnapshot = await getDocs(
        collection(doc(db, "live_quizzes", contestId), "userResult")
      );
      // console.log(userResultsSnapshot, ":::", contestId, ":::");
      userResultsSnapshot.forEach((userResultDoc) => {
        const payment = userResultDoc.data().payment || 0; // Default to 0 if payment doesn't exist
        totalPaid += parseFloat(payment); // Sum the payment
        // console.log(payment, "::::"); // Log each payment
      });
      if (contestData && contestData.questions) {
        totalQuestions += contestData.questions.length;
      }
    }

    return {
      totalUsers,
      totalContests,
      totalQuestions,
      totalPaid, // Return the total paid amount
      totalDeposit, // Return the total deposit amount
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return false;
  }
}

export async function getUserList() {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const userList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userList;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return false;
  }
}

export async function getAllContest() {
  try {
    const querySnapshot = await getDocs(collection(db, "live_quizzes"));
    const contestList = [];
    querySnapshot.forEach((doc) => {
      contestList.push({ id: doc.id, ...doc.data() });
    });
    // console.log(contestList, "::::");
    return contestList;
  } catch (error) {
    console.log("Error fetching contests:", error);
    toast.error("Failed to fetch contest list.");
  }
}

export async function deleteContestById(documentId) {
  try {
    const contestRef = doc(db, "live_quizzes", documentId);
    await deleteDoc(contestRef);
    // console.log("Contest successfully deleted!");
    toast.success("Contest Deleted Successfully");
    return true;
  } catch (error) {
    // console.log("Error deleting contest: ", error);
    toast.error("Failed to delete contest.");
    return false;
  }
}

export async function updateContestDetailsById(formData) {
  try {
    const contestRef = doc(db, "live_quizzes", formData.contestId);
    const date = new Date(formData.endTime);

    await updateDoc(contestRef, {
      buy: parseInt(formData.buyAmount),
      endTime: date.getTime(),
      overall_time: parseInt(formData.duration),
      prize: parseInt(formData.firstPrize),
      reschedule: formData.reschedule === "true",
      title: formData.quizTitle,
      totalPrize: parseInt(formData.totalPrizeMoney),
      totalSpots: parseInt(formData.totalSpot),
      createdAt: serverTimestamp(), // Set an 'updatedAt' field
    });

    toast.success("Contest updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating contest details: ", error);
    toast.error("Failed to update contest.");
    return false;
  }
}
