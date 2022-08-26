import firebaseConfig from "../js/firebaseConfig.js";
import {initializeApp} 
  from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import * as fs
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = fs.getFirestore(app);

// collection 참조를 내보낼 수 있다. 
const boardRef = fs.collection(db, "board");
const trainerRef = fs.collection(db, "trainer");

export default {boardRef, trainerRef}