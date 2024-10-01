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
} from "firebase/firestore";
import Question from "../jsx/components/Users/Question";
export const url = "https://backoffice.inrx.io/api";
export const url2 = "https://backoffice.inrx.io/api";
export const localApi = "http://localhost:5009/api/";
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
    const contestRef = doc(db, "liveQuestion", formData.contestId);
    const contestSnap = await getDoc(contestRef);
    if (contestSnap.exists()) {
      toast.error("Contest Id Already Exist");
      return;
    }
    await setDoc(contestRef, {
      buy: parseInt(formData.buyAmount),
      description: formData.description,
      endTime: formData.endTime,
      overall_time: parseInt(formData.duration),
      prize: formData.firstPrize,
      reschedule: formData.reschedule == true ? true : false,
      title: formData.quizTitle,
      totalPrize: parseInt(formData.totalPrizeMoney),
      totalSpots: parseInt(formData.totalSpot),
      winnings: formData.winnings,
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
    const contestRef = doc(db, "liveQuestion", formData.contestId);
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
  const constest = collection(db, "liveQuestion");
  const contestSnap = await getDocs(constest);
  const contestIds = contestSnap.docs.map((doc) => doc.id);
  console.log(contestIds);
  return contestIds;
}

export async function fetchQuestion(contestId) {
  try {
    const contestRef = doc(db, "liveQuestion", contestId);
    console.log(contestRef, contestId);
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
    const usersSnapshot = await getDocs(collection(db, "users"));
    const totalUsers = usersSnapshot.size; // Total users (document count)
    const contestsSnapshot = await getDocs(collection(db, "liveQuestion"));
    const totalContests = contestsSnapshot.size; // Total contests (document count)
    let totalQuestions = 0;
    contestsSnapshot.forEach((contestDoc) => {
      const contestData = contestDoc.data();
      if (contestData && contestData.questions) {
        totalQuestions += contestData.questions.length;
      }
    });

    return {
      totalUsers,
      totalContests,
      totalQuestions,
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
