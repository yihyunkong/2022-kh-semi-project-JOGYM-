"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getFirestore, deleteDoc, doc, collection } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import { onAuthStateChanged, getAuth, deleteUser } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
// import { getAuth, deleteUser } from "firebase/auth";

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
const user = auth.currentUser;
console.log("콘솔창 테스트요");
//const credential = promptForCredentials();

/* 데이터 가져오기  */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("사용자데이터 가져왔나요?");
    const uid = user.uid;
    console.log(user);
    console.log("탈퇴할 사용자 id => " + uid);
    try {
      const delBtn = document.querySelector("#deleteButton");

      delBtn.addEventListener("click", async () => {
        const ok = confirm("탈퇴하시겠습니까?");

        console.log("클릭이벤트 성공");
        if (ok) {
          console.log("if문까지 성공했습니다.");
          await deleteDoc(doc(db, "user", uid));
          console.log("탈퇴할 사용자 if문에서의 id => " + uid);
          deleteUser(user).then(() => {
            console.log("사용자 탈퇴되었습니다.");
            alert("회원 탈퇴되었습니다.");
          });
        }
      });
    } catch (error) {
      const errorMessage = error.message;
      console.log("데이터 불러오기 실패 : " + errorMessage);
    }
  } else {
    // User is signed out
    // ...
  }
});
