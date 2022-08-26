import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore(app);

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// 회원가입 버튼을 누르면
document.getElementById("adminJoinBtn").addEventListener("click", (event) => {
    event.preventDefault(); // 회원가입 버튼을 누르더라도 페이지 새로고침이 되지 않음
    
    // 회원가입 시 필요한 관리자 이메일/비밀번호 (회원가입 폼의 input태그 id값 가져오기)
    const adminEmail = $("#adminJoinEmail").val();
    const adminPwd = $("#adminJoinPwd").val();
    
    // 회원가입 시 추가 정보 입력 사항
    const adminName = $("#adminJoinName").val();
    
    
    // 회원가입 처리
    createUserWithEmailAndPassword(auth, adminEmail, adminPwd)
    .then(userCredentials => {
        const user = userCredentials.user;
        const uid = user.uid;
        
        // 회원가입이 진행될 때 추가 정보가 firestore에 저장되어야함
        // insert here
        setDoc(doc(db, "admin", uid), { // user.uid를 사용하여 회원가입 시 생성된 회원의 uid에 추가 정보가 저장됨 
            // 관리자가 입력하는 정보
            이름: adminName,
            이메일: adminEmail,
            uid: uid,
            grade: 2, // 회원은 grade가 1, 관리자는 2 (관리자 권한 부여하기)
        });
        
        // console.log("uid ===> " + uid) 
        console.log("회원가입 성공");
        alert("회원가입 성공");

        // 회원가입 성공 시 setDoc 함수가 실행되어 추가 정보가 저장되는 시간 보다 로그아웃/페이지 이동 시간이 빠르면
        // firestore에 정보 전달이 실패한다.
        // setTimeout 함수를 사용하여 로그아웃 및 페이지 이동 처리하기
        setTimeout(() => {
            // 회원가입 성공 시 페이지 이동
            signOut(auth).then(() => {
                console.log("회원가입 후 로그아웃 성공");
                location.href = "../admin-login/admin-login.html";
            })
            .catch((error) => {
                const errorMessage = error.message;
                const errorCode = error.code;
                console.log(errorCode + ", " + errorMessage);
            })
        }, 3000);
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        // 이메일 중복검사를 위한 에러 메세지 확인 (이메일 중복검사를 할 수 있는 다른 방법이 있을 것 같다.)
        if (errorCode == 'auth/email-already-in-use') {
            alert('동일한 이메일이 존재합니다.');
        } else if (errorCode == 'auth/invalid-email') {
            alert('이메일 형식을 확인해주세요.');
        } else {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
            console.log("errorMessage ==> " + errorMessage);
        }
    })
})

// 회원가입 취소 버튼을 누르면
$("#cancelButton").click(function(event) {
    if(confirm('회원가입 진행중입니다. 취소하시겠습니까? \n확인 버튼을 누르시면 로그인 페이지로 이동합니다.')){
        location.href = "../index.html";
    } else {
        event.preventDefault();
    }
})