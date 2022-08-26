'use strict';

/***********************************************************************************************************************
 * 이 module은 FIREBASE에 트레이너 data를 삭제하는 기능을 담당하는 스크립트 입니다. 
/*************************************** * FIREBASE * ******************************************************************/
import {initializeApp} 
  from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore} 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
//// 조회 ////
import retreive from "./retreiveDAO.js"
import firebaseConfig from './firebaseConfig.js';

/*************************************** * FIREBASE * ******************************************************************/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/******* import한 함수를 호출합니다. ********/
// retreive.retreiveProgram();
retreive.retreiveHomeTrainer();

retreive.doChangeHomePro();
retreive.doChangeHomeTra();

// 다시 전체 프로그램 select box를 눌렀을 때 페이지가 다시 로드 되도록 합니다. 
$("#t-select-program").change(function(){
  var state = $('#t-select-program option:selected').val();
  console.log(state);
  if(state == 'all'){
    window.location.reload();
  }
})