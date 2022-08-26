'use strict';
import firebaseConfig 
  from '../../js/firebaseConfig.js';
import {initializeApp} 
  from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getStorage, ref as sRef, getDownloadURL, uploadBytesResumable} 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import {getFirestore, doc, updateDoc, deleteDoc, getDoc, collection } 
  from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import dtail from "../../js/dtailDAO.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var imgURL; 

// uid는 전역적으로 유효하다. 
let params = new URLSearchParams(document.location.search)
let id = params.get("id")
console.log("아이디는?" + id);

dtail.dtailRetreive("board",id);
const dtailList = dtail.fetch("board", id);
dtailList.then((value)=>{
  const row = value;
  imgURL = row["사진"];
})

// 수정모드로 변경하는 함수 => #updateBtn
    $('#updateBtn').click(()=>{
      // 수정, 삭제 버튼 삭제한다.
      $('#updateBtn').remove();
      $('#deleteBtn').remove();

      const title = $('#title').html();
      const textarea = $('.content').html();
      const template = ` 
                    <hr>
                    <button id="selbtn">
                      <i class="fa-solid fa-image fa-2x"></i>
                    </button>
                    <input type="text" id="namebox" style="height:40px; padding-top:10px;"> 
                    <label id="extlab"></label>
                    </hr>
                    
      `
      console.log(title + ' : '+ textarea);
      $('#title').replaceWith(`<input class="input-title type="text" value="${title}">`)
      $('.content').replaceWith(`<textarea name="content" id="textarea-content" cols="180" rows="10">${textarea}</textarea>`)
      
      $('.imgContent').replaceWith(`
      <img id="myimg" src="${imgURL}" style="margin:10px 10px 20px 30px; width: 350px; height: 250px"> 
      <label id="upprogress"></label> <br><br> 
      `);
      $('.main').append(`
                          <div style="text-align:center;">
                          <button class="success">완료</button>
                          </div>`);
      $('summary').append(template);
      

      
            var files = [];
        
            const reader = new FileReader();
            // const boardSnapshot = await getDocs(ref.boardRef);
            
            const myimg = document.getElementById('myimg')
            const selbtn = document.getElementById('selbtn');
            var proglab = document.getElementById('upprogress');
            var upbtn = document.getElementsByClassName('success');
            // var upbtn = document.getElementById('btn-register');
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
        
        //----------------------------UPLOAD UPDATE Process 시작!-------------------------------//
        // 비동기 함수를 만들어야 한다. 
        // 반환값 => 업로드한 이미지의 url : uploadURL
        async function uploadUpdateProcess(){
          console.log("uploadUpdateProcess 함수 호출 성공");
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
            try {
              getDownloadURL(UploadTask.snapshot.ref)
                .then((downloadURL)=>{
                  console.log("db에 저장할 사진 주소 ==> " + downloadURL);
                  updateDoc(doc(db, "board", id),{
                    // console.log(`수정할 레코드 => $`);
                    제목:$(".input-title").val(),
                    내용:$("#textarea-content").val(),
                    사진:downloadURL
                  })
              })
            } catch (error) {
              console.log("error ==> "+error);
            }
          }
          );
          
          setTimeout(()=>{
            alert("수정이 완료되었습니다.");
            //location.host => 호스트:port 번호 반환..
              const hostPort = location.host;
              location.href = `http://${hostPort}/jogym/public/src/admin/ad-board/setting-board.html`;
          }, 5000)
        }
        
        // 이름을 검증하는 함수
        function validateName(){
          var regex = /[\.#$\[\]]/
          return !(regex.test(namebox.value));
        }
        
        // 확인버튼 누르면 수정해서 업로드하기 시작 
        // upbtn.onclick = uploadUpdateProcess;
        $(".success").click(()=>{
          uploadUpdateProcess();
        })

      })
    

// 삭제하기를 눌렀을 때 삭제
$('#deleteBtn').click(()=>{
  if(confirm("정말 삭제하시겠습니까?")){
    try {
      deleteDoc(doc(db, "board", id));
    } catch (error) {
      console.log("error ==> " + error);
    }
  }
  // 삭제되면 목록으로 돌아간다.
  setTimeout(()=>{
    alert("게시글이 삭제되었습니다.");
    //location.host => 호스트:port 번호 반환..
      const hostPort = location.host;
      location.href = `http://${hostPort}/jogym/public/src/admin/ad-board/setting-board.html`;
  }, 500)
})

