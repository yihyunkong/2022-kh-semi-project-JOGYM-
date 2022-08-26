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

// console.log("여기는 됨? ==> " + uid)
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log("현재 로그인한 사용자 ==> " + uid);
    // console.log(`${doc.id}`);
    try {
      // console.log("현재 로그인한 사용자 ==> " + user);
      const querySnapshot = await getDocs(query(collection(db, "user"), where("uid", "==", uid)));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        // const no = `${doc.data().회원번호}`;
        const name = `${doc.data().이름}`;
        const birthday = `${doc.data().생년월일}`;
        const tell = `${doc.data().전화번호}`;
        const email = `${doc.data().이메일}`;
        const address1 = `${doc.data().주소}`;
        const address2 = `${doc.data().상세주소}`;
        const sportswear = `${doc.data().운동복}`;
        const locker = `${doc.data().락커}`;

        // $(".mypage-no").append(no);
        $(".mypage-name").append(name);
        $(".mypage-birthday").append(birthday);
        $(".mypage-tell").append(tell);
        $(".mypage-email").append(email);
        $(".mypage-address1").append(address1);
        $(".mypage-address2").append(address2);
        $(".sportswear-use").append(sportswear);
        $(".locker-use").append(locker);
      });
    } catch (error) {
      const errorMessage = error.message;
      console.log("데이터 불러오기 실패");
      console.log(errorMessage);
    }
  } else {
    alert("로그인이 필요한 서비스입니다.");
    location.href = "../login/login.html";
  }
});
