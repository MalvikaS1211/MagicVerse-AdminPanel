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
      buy: formData.buyAmount,
      description: formData.description,
      endTime: formData.endTime,
      isPaid: formData.isPaid,
      overall_time: formData.duration,
      prize: formData.firstPrize,
      reschedule: formData.reschedule,
      title: formData.quizTitle,
      totalPrize: formData.totalPrizeMoney,
      totalSpots: formData.totalSpot,
    });
    return true;
  } catch (error) {
    console.error("Error adding document: ", error.message);
    return false; // Return error message to indicate what went wrong
  }
}

export const createQuestionInContest = async (formData) => {
  try {
    console.log(formData, "::::");
    const contestRef = doc(db, "liveQuestion", formData.contestId);
    await updateDoc(contestRef, {
      questions: arrayUnion({
        correct_answer: formData.correct,
        id: formData.questionId,
        image_url: formData.img,
        marks: formData.marksPerQuestion,
        negative: formData.negativeMarks,
        options: [
          formData.optionA,
          formData.optionB,
          formData.optionC,
          formData.optionD,
        ],
        question: formData.question,
        contestId: formData.contestId,
      }),
    });
    toast.success("Question Inserted Successfully");
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


