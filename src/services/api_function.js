import axios from "axios";
import toast from "react-hot-toast";
import { db } from "../jsx/components/Users/Firebase";
import { collection, getDocs } from "firebase/firestore";
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
