'use strict';

/***********************************************************************************************************************
 * 이 module은 FIREBASE에 트레이너 data를 조회하는 기능을 담당합니다.
/*************************************** * FIREBASE * ******************************************************************/
import {initializeApp} 
  from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore, getDoc, doc} 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
/*************************************** * FIREBASE * ******************************************************************/

const firebaseConfig = {
    apiKey: "AIzaSyCr8bNq6iVioWl4LUwgDMyoaNieYdFyVLc",
    authDomain: "boardtest-174d5.firebaseapp.com",
    databaseURL: "https://boardtest-174d5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "boardtest-174d5",
    storageBucket: "boardtest-174d5.appspot.com",
    messagingSenderId: "921590231442",
    appId: "1:921590231442:web:b8f515057daf4ed545114b",
    measurementId: "G-MWTSS92ZQR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

  $(document).ready(function() {
    console.log("dtailTrainer함수 호출 성공!");
    // 로드가 되면 URL을 얻는다. 
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    console.log("사용자가 선택한 id : " + id);

    // 모달 띄우기
    $("#staticBackdrop").modal("show")
    const readModal = document.getElementById("staticBackdrop")
    

    const fetchTrainer = async(uid) => {
      const trainerRef = doc(db, "trainer", uid);
      // 데이터 스냅 (하나)를 받아오기 >> 비동기처리로 이루어짐
      const trainerSnap = await getDoc(trainerRef);  
      console.log(trainerSnap);
      return trainerSnap.data();
    }

    // 사용자가 선택한 id로 fetch된 trainer 레코드를 불러온다. 
    // 이때 리턴되는 값은 Object Promise 타입이므로 읽을 수 있는 형태로 변환해 줘야 한다. 
    const trainerList =  fetchTrainer(id);
    console.log("fetch된 trainer 레코드 ==> " + trainerList); // Object Promise

    trainerList.then((value) => {
      const row = value;
      console.log(row);

      // db에서 받아옴 
      const name = row["이름"];
      const career = row["경력사항"];

      $('.mName').text(name);
      $('.mCareer').text(career);  
    })

    // 닫기 버튼을 클릭하면 트레이너 리스트 페이지로 돌아간다. 
    $('.btn-close').click(()=>{
      const port = location.port;
      window.location.href = `http://127.0.0.1:${port}/jogym/public/src/trainer/trainer-list.html`
    })
    }
)
