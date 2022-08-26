"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getFirestore, doc, query, where, getDocs, collection, getDocFromCache } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCr8bNq6iVioWl4LUwgDMyoaNieYdFyVLc",
  authDomain: "boardtest-174d5.firebaseapp.com",
  databaseURL: "https://boardtest-174d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "boardtest-174d5",
  storageBucket: "boardtest-174d5.appspot.com",
  messagingSenderId: "921590231442",
  appId: "1:921590231442:web:b8f515057daf4ed545114b",
  measurementId: "G-MWTSS92ZQR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

let num = 0;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log("현재 로그인한 사용자 ==> " + uid);

    try {
      const querySnapshot = await getDocs(query(collection(db, "user"), where("uid", "==", uid)));
      querySnapshot.forEach((doc) => {
        const template = `
                    <tr>
                      <th scope="row">${++num}</th>
                      <td>${doc.data().강사명}</td>
                      <td>${doc.data().프로그램}</td>
                      <td>${doc.data().수강기간}</td>
                      <td>${doc.data().시간}</td>
                      <td>${doc.data().요일}</td>
                    </tr>
                  `;
        $(".board-content").append(template);
      });
    } catch (error) {
      const errorMessage = error.message;
      console.log("데이터 불러오기 실패");
      console.log(errorMessage);
    }
  } else {
    alert("로그인이 필요한 서비스입니다.");
    location.href = "../index.html";
  }
});
