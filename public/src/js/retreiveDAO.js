'use strict';

/***********************************************************************************************************************
 * 이 module은 FIREBASE에 FIRESTORE저장소에 보유 중인 collection data를 조회하는 기능을 담당합니다.
/*************************************** * FIREBASE * ******************************************************************/
import firebaseConfig from './firebaseConfig.js';
import ref from "../collection/ref.js"
import {initializeApp} 
from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore, getDocs, orderBy, query, where, collection, limit} 
from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
// import del from "./setting_trainer.js"
/*************************************** * FIREBASE * ******************************************************************/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const trainerSnapshot = await getDocs(query(ref.trainerRef));
const boardSnapshot = await getDocs(query(ref.boardRef, orderBy("작성일","desc")))

const hostPort = location.host;

/*************************************** retreiveAdBoard() ******************************************** 
 * 공지사항 리스트 전체를 view에 띄워주는 함수입니다. 
******************************************************************************************************/
async function retreiveAdBoard(){
  let num = 0;
  console.log(`retreiveBoard()함수가 호출되었습니다.`);
  boardSnapshot.forEach((doc)=>{
  console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  const template = `
                  <tr>
                      <th scope="row">
                      <input class="th-checkbox" type="checkbox" name = "id"  value="${doc.id}"/>
                      </th>
                      <th scope="row">${++num}</th>
                      <td>
                          <a class="title-URL" href="./admin-dtail-page.html?id=${doc.id}">
                          ${(doc.data().제목)}
                          </a>
                      </td>
                      <td>${(doc.data().작성자)}</td>
                      <td>${(doc.data().작성일)}</td>
                      <td>${(doc.data().조회수)}</td>
                  </tr>
                  `
  $(".board-content").append(template);
  })
}

/*************************************** retreiveHomeBoard() ******************************************** 
 * 공지사항 리스트 전체를 view에 띄워주는 함수입니다. 
******************************************************************************************************/
async function retreiveHomeBoard(){
  let num = 0;
  console.log(`retreiveHomeBoard()함수가 호출되었습니다.`);
  boardSnapshot.forEach((doc)=>{
  // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  const template = `
                  <tr>
                      <th scope="row">
                      </th>
                      <th scope="row">${++num}</th>
                      <td>
                          <a class="title-URL" href="./dtail-page.html?id=${doc.id}">
                          ${(doc.data().제목)}
                          </a>
                      </td>
                      <td>${(doc.data().작성자)}</td>
                      <td>${(doc.data().작성일)}</td>
                      <td>${(doc.data().조회수)}</td>
                  </tr>
                  `
  $(".board-content").append(template);
  })
}

/*************************************** retreiveTrainer() ******************************************** 
 * 트레이너 리스트 전체를 관리자 페이지의 view에 띄워주는 함수입니다. 
******************************************************************************************************/
async function retreiveTrainer(){
  console.log("retreiveTrainer()함수 호출 성공!");
  ///// 트레이너 전체 스냅 보여주는 함수 시작 ==> 
  trainerSnapshot.forEach((doc)=>{
    // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    // console.log(`${doc.id} => ${JSON.stringify(doc.data().프로그램)}`);
    const template=` 
                        <div class="card-body" id ="${doc.id}">
                            <input class="th-checkbox" type="checkbox" name="id" value="${doc.id}" style="float:right;"/>
                            <div style="text-align:center;">
                              
                              <img src=${(doc.data().사진)} width="200" align="center">
                              </a>
                            </div>
                            <input type="button" value="수정" onClick="location.href='http://${hostPort}/jogym/public/src/admin/ad-trainer/update-trainer.html?id=${doc.id}'"> 
                            <br>
                            <br>
                            <hr>
                            <br>
                            <h2 class="card-title" id="tName">${(doc.data().이름)}</h2>
                            <p class="card-text" id="tProgram">"${(doc.data().프로그램)}"</p>
                            <p class="card-text" id="tCareer">"${(doc.data().경력사항)}"</p>
                            <p class="card-text" id="tMotto">"${(doc.data().좌우명)}"</p>
                            <br>
                            <br>
                            <hr>
                        </div>
                        <br>
                    `
      $(".list").append(template);  
  })
}

/*************************************** retreiveHomeTrainer() ******************************************** 
 * 트레이너 리스트 전체를 관리자 페이지의 view에 띄워주는 함수입니다. 
******************************************************************************************************/
async function retreiveHomeTrainer(){
  console.log("retreiveTrainer()함수 호출 성공!");
  ///// 트레이너 전체 스냅 보여주는 함수 시작 ==> 
  trainerSnapshot.forEach((doc)=>{
    // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    // console.log(`${doc.id} => ${JSON.stringify(doc.data().프로그램)}`);
    const template=` 
                        <div class="card-body">
                            <div style="text-align:center;">
                              <a href="/jogym/public/src/trainer/trainer-dtail.html?id=${doc.id}" class ="trainerImg">
                              <img src=${(doc.data().사진)} width="200" align="center">
                              </a>
                            </div>
                            <br>
                            <br>
                            <hr>
                            <br>
                            <h2 class="card-title" id="tName">${(doc.data().이름)}</h2>
                            <p class="card-text" id="tProgram">"${(doc.data().프로그램)}"</p>
                            <p class="card-text" id="tCareer">"${(doc.data().경력사항)}"</p>
                            <p class="card-text" id="tMotto">"${(doc.data().좌우명)}"</p>
                            <br>
                            <br>
                            <hr>
                        </div>
                        <br>
                    `
      $(".list").append(template);  
  })
}


/*************************************** retreiveProgram() ******************************************** 
 * 전체 프로그램을 view에 띄워주는 함수입니다. 
******************************************************************************************************/
// async function retreiveProgram(){
//   console.log("retreiveProgram() 호출 성공!!");
//   programSnapshot.forEach((doc)=>{
//     const proOption = `
//                         <option class="fbProgram">${(doc.id)}</option>
//                       `
//       $('#t-select-program').append(proOption);
//   })
// }

/************************************ 트레이너 분류 검색 서비스 ******************************************* 
 * 선택된 option 값을 조건으로 삼기 위해 선택 값이 변경될 때 참조할 값을 받아온다
 * ==> 변경된 선택 값 : 참조할 프로그램  trainer collection 을 query해서 불러온다. 
 * 1) 조회버튼을 누른다.
 * 2) USER가 선택한 값을 받아서 변수에 저장한다. 
 *    ex) 담당프로그램은? =====> const proSelected
 *        이름은? =====> const nameSelected
 * 3-1) 변수에 따르는 조건 검색 후 기존에 있던 트레이너 리스트를 삭제한 후 
 * 3-2) 아래 공간에 조건과 일치하는 트레이너를 띄운다. 
***************************************************************************************************
/*************************************** doChangePro() ******************************************** 
 * 사용자가 프로그램 option을 달리함에 따라 ==>  전체 화면에 뜨는 트레이너 정보가 달라지도록 처리하는 함수입니다. 
***************************************************************************************************/
async function doChangePro(){
  $("#t-select-program").change(async function(){
    // 프로그램 선택 박스에 변화가 감지되었을 때마다 이름이 누적되어 추가되는 것을 방지 
    // => 하위 요소 비우기
    $("#t-select-name").empty();
    $(".list").empty();
    console.log("doChangePro()함수 호출 성공!!");
    const proSelected = $('.fbProgram:selected').text();
    console.log("사용자가 선택한 프로그램 const proSelected ==> "+ proSelected);
  
    // 프로그램이 proSelected와 같은 강사 이름을 collection(db, "trainer");에서 스냅을 찍어 오기
    const trainerQuerySnapshot = await getDocs(query(ref.trainerRef,where("프로그램", "==", proSelected)));
    // 받아온 강사 이름 스냅을 뽑아서 셀렉트 박스에 넣어준다.
    trainerQuerySnapshot.forEach((doc)=>{
      console.log(`${doc.id} => ${JSON.stringify(doc.data().이름)}`);
      const nameOption = `
                            <option class="fbName">${(doc.data().이름)}</option>
                          `
          $('#t-select-name').append(nameOption);
  
      const nameView = `
                        <div class="card-body" id ="${doc.id}">
                        <input class="th-checkbox" type="checkbox" name="id" value="${doc.id}"/>
                            <div style="text-align:center;">
                            <img src=${(doc.data().사진)} width="200" align="center">
                            </a>
                            </div>
                          <input type="button" value="수정" onClick="location.href='http://${hostPort}/jogym/public/src/admin/ad-trainer/update-trainer.html?id=${doc.id}'"></input>
                          <br>
                          <br>    
                          <hr>
                          <br>
                          <h2 class="card-title" id="tName">${(doc.data().이름)}</h2>
                          <p class="card-text" id="tProgram">"${(doc.data().프로그램)}"</p>
                          <p class="card-text" id="tCareer">"${(doc.data().경력사항)}"</p>
                          <p class="card-text" id="tMotto">"${(doc.data().좌우명)}"</p>
                          <br>
                          <br>
                          <hr>
                        </div>
                        <br>
                      `
            $(".list").append(nameView);   
    })
  })
}

/*************************************** doChangeTra() ******************************************** 
 * 사용자가 트레이너 option을 달리함에 따라 ==>  전체 화면에 뜨는 트레이너 정보가 달라지도록 처리하는 함수입니다. 
***************************************************************************************************/
  async function doChangeTra(){
    $("#t-select-name").change(async function(){
      // 2) USER가 선택한 담당프로그램 값을 받아서 변수에 저장한다. 
      // ===> const proSelectedForRetv
      // ===> const nameSelectedForRetv
        const proSelectedForRetv = $('.fbProgram:selected').text();
        const nameSelectedForRetv = $('.fbName:selected').text();
        console.log("사용자가 선택한 프로그램 ==> "+ proSelectedForRetv);
        console.log("사용자가 선택한 트레이너 이름 ==> "+ nameSelectedForRetv);
      
      // 3-1) 변수에 따르는 조건 검색 후 기존에 있던 트레이너 리스트를 삭제
      $(".list").empty();
      
      // 3-2) 아래 공간에 조건과 일치하는 트레이너를 띄운다. 
        const trainerResultSnap = await getDocs(query(ref.trainerRef,where("이름", "==", nameSelectedForRetv)));
        trainerResultSnap
        .forEach((doc)=>{
          const trainerView = `
                                <div class="card-body" id ="${doc.id}>
                                    <input class="th-checkbox" type="checkbox" name="id" value="${doc.id}"/>
                                    <div style="text-align:center;">
                                        <img src=${(doc.data().사진)} width="200" align="center">
                                        </a>
                                    </div>
                                    <input type="button" value="수정" onClick="location.href='http://${hostPort}/jogym/public/src/admin/ad-trainer/update-trainer.html?id=${doc.id}'"></input>  
                                    <br>
                                    <br>
                                    <hr>
                                    <br>
                                    <h2 class="card-title" id="tName">${(doc.data().이름)}</h2>
                                    <p class="card-text" id="tProgram">"${(doc.data().프로그램)}"</p>
                                    <p class="card-text" id="tCareer">"${(doc.data().경력사항)}"</p>
                                    <p class="card-text" id="tMotto">"${(doc.data().좌우명)}"</p>
                                    <br>
                                    <br>
                                    <hr>
                                </div>
                                <br>
                              `
              $(".list").append(trainerView); 
            })
        })  
    }  



/*************************************** doChangeHomeTra() ******************************************** 
 * 사용자가 트레이너 option을 달리함에 따라 ==>  전체 화면에 뜨는 트레이너 정보가 달라지도록 처리하는 함수입니다. 
***************************************************************************************************/
async function doChangeHomePro(){
  $("#t-select-program").change(async function(){
    // 프로그램 선택 박스에 변화가 감지되었을 때마다 이름이 누적되어 추가되는 것을 방지 
    // => 하위 요소 비우기
    $("#t-select-name").empty();
    $(".list").empty();
    console.log("doChangeHomePro()함수 호출 성공!!");
    const proSelected = $('.fbProgram:selected').text();
    console.log("사용자가 선택한 프로그램 const proSelected ==> "+ proSelected);
  
    // 프로그램이 proSelected와 같은 강사 이름을 collection(db, "trainer");에서 스냅을 찍어 오기
    const trainerQuerySnapshot = await getDocs(query(ref.trainerRef,where("프로그램", "==", proSelected)));
    // 받아온 강사 이름 스냅을 뽑아서 셀렉트 박스에 넣어준다.
    trainerQuerySnapshot.forEach((doc)=>{
      console.log(`${doc.id} => ${JSON.stringify(doc.data().이름)}`);
      const nameOption = `
                            <option class="fbName">${(doc.data().이름)}</option>
                          `
          $('#t-select-name').append(nameOption);
  
      const nameView = `
                        <div class="card-body" id ="${doc.id}">
                            <div style="text-align:center;">
                            <img src=${(doc.data().사진)} width="200" align="center">
                            </a>
                            </div>
                          <br>
                          <br>    
                          <hr>
                          <br>
                          <h2 class="card-title" id="tName">${(doc.data().이름)}</h2>
                          <p class="card-text" id="tProgram">"${(doc.data().프로그램)}"</p>
                          <p class="card-text" id="tCareer">"${(doc.data().경력사항)}"</p>
                          <p class="card-text" id="tMotto">"${(doc.data().좌우명)}"</p>
                          <br>
                          <br>
                          <hr>
                        </div>
                        <br>
                      `
            $(".list").append(nameView);   
    })
  })
}

/*************************************** doChangeHomeTra() ******************************************** 
 * 사용자가 트레이너 option을 달리함에 따라 ==>  전체 화면에 뜨는 트레이너 정보가 달라지도록 처리하는 함수입니다. 
******************************************************************************************************/
async function doChangeHomeTra(){
  $("#t-select-name").change(async function(){
    // 2) USER가 선택한 담당프로그램 값을 받아서 변수에 저장한다. 
    // ===> const proSelectedForRetv
    // ===> const nameSelectedForRetv
      const proSelectedForRetv = $('.fbProgram:selected').text();
      const nameSelectedForRetv = $('.fbName:selected').text();
      console.log("사용자가 선택한 프로그램 ==> "+ proSelectedForRetv);
      console.log("사용자가 선택한 트레이너 이름 ==> "+ nameSelectedForRetv);
    
    // 3-1) 변수에 따르는 조건 검색 후 기존에 있던 트레이너 리스트를 삭제
    $(".list").empty();
    
    // 3-2) 아래 공간에 조건과 일치하는 트레이너를 띄운다. 
      const trainerResultSnap = await getDocs(query(ref.trainerRef, where("이름", "==", nameSelectedForRetv)));
      trainerResultSnap
      .forEach((doc)=>{
        const trainerView = `
                              <div class="card-body" id ="${doc.id}>
                                  <div style="text-align:center;">
                                      <img src=${(doc.data().사진)} width="200" align="center">
                                      </a>
                                  </div>
                                  <br>
                                  <br>
                                  <hr>
                                  <br>
                                  <h2 class="card-title" id="tName">${(doc.data().이름)}</h2>
                                  <p class="card-text" id="tProgram">"${(doc.data().프로그램)}"</p>
                                  <p class="card-text" id="tCareer">"${(doc.data().경력사항)}"</p>
                                  <p class="card-text" id="tMotto">"${(doc.data().좌우명)}"</p>
                                  <br>
                                  <br>
                                  <hr>
                              </div>
                              <br>
                            `
            $(".list").append(trainerView); 
          })
        })  
}  

// 홈페이지에서 공지사항을 미리 볼 수 있는 데이터 
async function priewviewMainDataService(){
  const index_preview = query(ref.boardRef, orderBy("작성일", "desc"), limit(5))
  const previewSnap = await getDocs(index_preview);
  console.log(`priewviewMainDataService()함수가 호출되었습니다.`);
  previewSnap.forEach((doc)=>{
  // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  const template = `
                  <li>
                      <a class="preview-a" href=http://${hostPort}/jogym/public/src/board/dtail-page.html?id=${doc.id}>
                      📍 ${(doc.data().제목)}
                      </a>
                  </li>
                  `
  $("ul.list-data").append(template);
  })
}

export default {
                  retreiveTrainer
                , doChangePro
                , doChangeTra

                , retreiveHomeTrainer
                , doChangeHomePro
                , doChangeHomeTra

                , retreiveHomeBoard
                , retreiveAdBoard
                , priewviewMainDataService
                }

