import firebaseConfig from "./firebaseConfig.js";
import retreive from "./retreiveDAO.js"
import ref from "../collection/ref.js"
import { initializeApp } 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import {getStorage, ref as sRef, getDownloadURL, uploadBytesResumable} 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import {getFirestore, addDoc, getDocs, collection} 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";



const app = initializeApp(firebaseConfig);
var files = [];

// 파일 판독기 클래스의 객체를 가질 판독기를 생성 
var reader = new FileReader();
const db = getFirestore(app);

var namebox = document.getElementById('namebox');
var extlab = document.getElementById('extlab');
var myimg = document.getElementById('myimg');
var proglab = document.getElementById('upprogress');
var selbtn = document.getElementById('selbtn');
var upbtn = document.getElementById('upbtn');
var cancel = document.getElementById('cancel-trainer-btn');
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

  const stroageRef = sRef(storage, "trainer_pic/"+imgName);

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
        const trainerRef = addDoc(ref.trainerRef, {
          이름: $('#t-name').val(),
          프로그램: $('.form-select option:selected').val(),
          경력사항: $('#t-career').val(),
          좌우명: $('#t-motto').val(),
          사진 : downloadURL
        })
    })
  }
  );
  alert("등록이 완료되었습니다.");
  
  setTimeout(()=>{
    //location.host => 호스트:port 번호 반환..
      const hostPort = location.host;
      location.href = `http://${hostPort}/jogym/public/src/admin/ad-trainer/settings-trainer.html`;
  }, 3000)
}

// 이름을 검증하는 함수
function validateName(){
  var regex = /[\.#$\[\]]/
  return !(regex.test(namebox.value));
}

async function backToProcess(){
  console.log("backToProcess()함수 호출 성공!");
  const message = "등록을 취소하시겠습니까?";
  if(confirm(message)){
      //location.host => 호스트:port 번호 반환..
      const hostPort = location.host;
      location.href = `http://${hostPort}/jogym/public/src/admin/ad-trainer/settings-trainer.html`;
    }else{

  }
}

upbtn.onclick = uploadProcess;
cancel.onclick = backToProcess;




