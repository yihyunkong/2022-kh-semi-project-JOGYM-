'use strict';

// import firebaseConfig from "./firebaseConfig.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
// import {getFirestore, addDoc, serverTimestamp, collection, increment} 
//         from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import registerDAO from "../js/module_input.js"
// 빈 객체를 하나 선언한다. 

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const boardObj = {
  제목:null,
  내용:null,
  작성자:null,
  작성일:null,
  조회수:null
}

$('#btn-register').click(async()=>{
  // const boardRef = collection(db, "board");
  // 유효성 검사 : 제목과 내용이 둘 다 입력이 되어야만 저장소에 등록을 할 수 있습니다. 
  if(!$('#textarea-content').val() && !$('.input-title').val()){
    alert("제목과 내용을 모두 입력해 주세요.")
  }
  else {
    console.log("관리자가 작성한 제목은 ==>"+ $('.input-title').val());
    console.log("관리자가 작성한 내용은 ==>"+ $('#textarea-content').val());
    const today = new Date();
    console.log(today);
    
    // 사용자가 입력한 값에 따라 객체의 값을 변경합니다.
    boardObj.제목 = $('.input-title').val();
    boardObj.내용 = $('#textarea-content').val();
    boardObj.작성자 = "관리자";
    boardObj.작성일 = today.toLocaleDateString();
    boardObj.조회수 = "0";
  }
  // 사용자가 입력한 값에 따라 객체의 value가 잘 변경되었는지 확인하기 위해 콘솔에 출력을 해봅니다. 
  console.log(boardObj);
  // 사용자 Interface를 통해 추가된 객체를 firebase 참조에 업로드 하는 함수를 호출한 후 매개변수로 객체와, 참조할 저장소의 이름를 넘겨줍니다. 
  registerDAO(boardObj, "board");
})

