'use strict';

/** data firestore 에서 가져온 데이터 모달창으로 상세조회 하기 */ 
import firebaseConfig from './firebaseConfig.js';
import {initializeApp} 
from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore, doc, query, getDocs, getDoc, updateDoc, deleteDoc, collection, where } 
from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
console.log(app);

// 화면이 렌더링되는 것과 스크립트 처리사이에 시간차
// == onload 와 같은 말 
const db = getFirestore(app);

/************************* 조건에 맞는 snap을 fetch해주는 함수 ^fetch^ ****************************
 * @param id
 * @return snap 
 * ******************************************************************************************/ 
const fetch = async(uid, collectionName) => {
  // 이곳에 원하는 조건을 쓰기 : query로 where startAt 등등을 조건을 주어 스냅을 찍어올 수 있음
  const tRef = doc(db, collectionName, uid);
  //
  const tSnap = await getDoc(tRef);  // 데이터 스냅 (하나)를 받아오기 >> 비동기처리로 이루어짐
  if (tSnap.exists()){
    return tSnap.data();
  }
    return null;
}

$(document).ready(function(){
  /** 랜더링 > 클릭한 id 받아온다 */
  let params = new URLSearchParams(document.location.search)
  let id = params.get("id")

  // 확인버튼을 지우고 수정버튼을 생성한다. 
  $("#upbtn").remove();
  const updatebtn=`<button id="updatebtn">수정완료</button>`
  $('picture').append(updatebtn)


  
      const trainerList = fetch(id, "trainer");
      // snap Object Promise 형식으로 출력
      console.log(trainerList);
      
      // Object Promise를 읽을 수 있는 data로 변환해 주는 과정이 필요하다! 
        trainerList
        .then((value)=>{
            const row = value;
            const tname = row["이름"]
            const tface = row["사진"]
            const tprogram = row["프로그램"]
            const tcareer = row["경력사항"]
            const tmotto = row["좌우명"]
            console.log("아이디가 " + id + " 인 트레이너의 이름은 ===> " + tname);
            console.log("아이디가 " + id + " 인 트레이너의 사진은 ===> " + tface);
            console.log("아이디가 " + id + " 인 트레이너의 프로그램은 ===> " + tprogram);
            console.log("아이디가 " + id + " 인 트레이너의 경력사항은 ===> " + tcareer);
            console.log("아이디가 " + id + " 인 트레이너의 좌우명은 ===> " + tmotto);
            console.log(id);
            
            // 이름은 수정 불가한 값이므로 'readonly' 속성을 추가한다.  
            $('#t-name').attr('value',tname).attr('readonly', true);
            $('#myimg').attr('src',tface);
            $('#t-career').text(tcareer);
            $('#t-motto').text(tmotto);
  
          })
        .then(()=>{
          $("#updatebtn").click(async()=>{
            console.log(id+"를 수정 예정");
              await updateDoc(doc(db,"trainer",id), {
                사진: $("#myimg").attr('src'),  
                프로그램: $('.form-select option:selected').val(),
                경력사항: $('#t-career').val(),
                좌우명: $('#t-motto').val()
              })
            alert("수정이 완료되었습니다.")
          })
        })
})

$("#cancel-trainer-btn").click(()=>{
  if(confirm("수정을 취소하시겠습니까?")){
    const hostPort = location.host;
    // settings-trainer.html로 이동이 안됨.
    location.href = `http://${hostPort}/jogym/public/src/admin/ad-trainer/settings-trainer.html`;
  }
})

