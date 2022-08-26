'use strict';

/***********************************************************************************************************************
 * 이 module은 FIREBASE에 data를 등록하는 기능을 담당합니다.
/*************************************** * FIREBASE * ******************************************************************/
import firebaseConfig 
  from './firebaseConfig.js';
import ref from "../collection/ref.js"
import {initializeApp} 
  from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getStorage, ref as sRef, getDownloadURL, uploadBytesResumable} 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import {getFirestore, addDoc, serverTimestamp, startAt, collection, increment} 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
// /*************************************** * FIREBASE * ******************************************************************/
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var files = [];

const reader = new FileReader();
// const boardSnapshot = await getDocs(ref.boardRef);

const myimg = document.getElementById('myimg')
const selbtn = document.getElementById('selbtn');
var proglab = document.getElementById('upprogress');
var upbtn = document.getElementById('btn-register');
var input = document.createElement('input');
input.type = "file";


// 파일이 클릭될 때마다 뭔가를 수행해야 한다. 
input.onchange = e => {
  files = e.target.files;

  var extention = getFileExtention(files[0]);
  var name = GetFileName(files[0]);

  namebox.value = name;
  extlab.innerHTML = extention;
  reader.readAsDataURL(files[0]);
}

reader.onload = function(){
  myimg.src= reader.result;
}

/**************************Selection****************************** */
selbtn.onclick = function(){
  input.click();
}

function getFileExtention(file){
  var temp = file.name.split('.');
  var ext = temp.slice((temp.length-1),(temp.length));
  return '.' + ext[0];
}

function GetFileName(file){
  var temp = file.name.split('.');
  var fname = temp.slice(0, -1).join('.');
  return fname;
}



//----------------------------UPLOAD Process 시작!-------------------------------//
// 비동기 함수를 만들어야 한다. 
// 반환값 => 업로드한 이미지의 url : uploadURL
async function uploadProcess(){
  console.log("uploadProcess 함수 호출 성공");
  var imgToUpload = files[0];
  var imgName = namebox.value + extlab.innerHTML;

  if(!validateName()){
    alert('name cannot contain ".", "#", "$", "[", or "]"')
    return;
  }

  const metadata= {
      contentType : imgToUpload.type
  }

  const storage = getStorage();

  const stroageRef = sRef(storage, "board_pic/"+imgName);

  const UploadTask = uploadBytesResumable(stroageRef, imgToUpload, metadata);

  UploadTask.on('state-changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) + 99;
    proglab.innerHTML = "upload " + progress + "%";
  },  
  (error) => {
    alert("error : image not uploaded!");
  },
  ()=>{
    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
        
        console.log("db에 저장할 사진 주소 ==> " + downloadURL);
        const today = new Date();
        const boardref = addDoc(ref.boardRef, {
          제목: $('.input-title').val(),
          내용: $('#textarea-content').val(),
          작성자: "관리자",
          작성일: today.toLocaleDateString(),
          조회수: "0",
          사진 : downloadURL
        })
    })
  }
  );
  alert("등록이 완료되었습니다.");
  
  setTimeout(()=>{
    //location.host => 호스트:port 번호 반환..
      const hostPort = location.host;
      location.href = `http://${hostPort}/jogym/public/src/admin/ad-board/setting-board.html`;
  }, 4000)
}

// 이름을 검증하는 함수
function validateName(){
  var regex = /[\.#$\[\]]/
  return !(regex.test(namebox.value));
}



upbtn.onclick = uploadProcess;






