import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Ensure this import is correct


const firebaseConfig = {
  apiKey: "AIzaSyBdRzB0khfBaZ5UBAPNigqdvgUpmedJEOI",
  projectId: "target100-e0f14",
  storageBucket: "target100-e0f14.appspot.com"
};
const fireBase = initializeApp(firebaseConfig);
const storage = getStorage(fireBase);
const db = getFirestore(fireBase);

export { fireBase, db,storage };
