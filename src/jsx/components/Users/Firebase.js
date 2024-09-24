import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdRzB0khfBaZ5UBAPNigqdvgUpmedJEOI",
  projectId: "target100-e0f14",
};
const fireBase = initializeApp(firebaseConfig);
const db = getFirestore(fireBase);

export { fireBase, db };
