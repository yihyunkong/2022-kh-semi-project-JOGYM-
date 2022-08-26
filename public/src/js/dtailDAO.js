'use strict';

/***********************************************************************************************************************
 * 이 module은 FIREBASE에 FIRESTORE저장소에 보유 중인 collection data를 조회하는 기능을 담당합니다.
/*************************************** * FIREBASE * ******************************************************************/
import firebaseConfig from './firebaseConfig.js';
// import ref from "../collection/ref.js"
import {initializeApp} 
  from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore, getDoc, doc, updateDoc} 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
/*************************************** * FIREBASE * ******************************************************************/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/*************************************** fetch() ******************************************** 
 * 파라미터로 받은 컬렉션과 uid에 해당하는 스냅을 반환해 주는 함수
 * @param : collectionName, uid
 * @return : refSnap.data()
****************************************************************************************************/
async function fetch(collectionName, uid){
    const ref = doc(db, collectionName, uid);
    const refSnap = await getDoc(ref);
    if(refSnap.exists()){
      return refSnap.data();
    }
    return null;
}

/*************************************** dtailRetreive() ******************************************** 
 * 관리자 페이지의 공지사항 리스트를 상세조회하여 view에 띄워주는 함수입니다. 
 * 파라미터로 상세조회할 refSnap을 받는다. > fetch()함수의 리턴값을 받아서 사용 
 * 사용자 인터페이스에 append한다. 
 * @param : refSnap, uid
****************************************************************************************************/
async function dtailRetreive(collectionName, uid){
  console.log("사용자가 선택한 id "+ uid);
  let hit = 0;

  const dtailList = fetch(collectionName, uid);
  // dtailList 는 Object Promise 형식으로 출력이 됩니다. 
  console.log(dtailList);
  // Object Promise를 읽을 수 있는 data로 뽑아줍니다. 
    dtailList.then((value)=>{
        const row = value;
        hit = row["조회수"]
        console.log("db에서 받아온 조회수 ===> " + hit);
  
        const title = row["제목"] 
        const content = row["내용"]
        const writer = row["작성자"]
        const regdate = row["작성일"]
        const img = row["사진"]

        const template = `                            
                        <div style="text-align:center;">
                        <img id="myImg" src=${img} width="100%" height="1000px" alt="null" align="center">
                        </div>
                        `
        $("#title").text(title)
        $(".writer").text(writer)
        $(".regdate").text(regdate)
        $(".content").text(content)
        $(".imgContent").append(template);
        // 클릭이 되었으므로 db에서 받아온 조회수 ++를 시켜준다. 
        hit ++;
        console.log("클릭 이후에 화면에 보여질 조회수 ===> " + hit);
        $(".hit").text(" 조회수  "+hit)
        //  조회수 업데이트 
        const hitRef = updateDoc(doc(db, "board", uid), {
          조회수: hit
      })
      }
    )}


export default {
  dtailRetreive,
  fetch
}
