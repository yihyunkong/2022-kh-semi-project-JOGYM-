import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getFirestore, doc, deleteDoc, addDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// 관리자 권한을 받는 숫자 전역변수 설정
let adminGrade;

// 로그인 버튼을 누르면
document.getElementById('adminLoginBtn').addEventListener('click', adminLoginBtn)
// 실행되는 관리자 로그인 함수
async function adminLoginBtn(event) {

    event.preventDefault();

    // firestore의 admin 컬렉션에 저장된 관리자의 grade = 2 받아오기
    const adminQuery = query(collection(db, "admin"), where("grade", "==", 2));
    const adminQuerySnapshot = await getDocs(adminQuery);
    adminQuerySnapshot.forEach((doc) => {
        console.log(`${doc.id} ==> ${JSON.stringify(doc.data().grade)}`);
        adminGrade = doc.data().grade;
        // console.log(adminGrade);
    })

    if(adminGrade = "2") {
        // 관리자의 grade가 2일 때 로그인 함수 실행

        // 관리자가 로그인 폼에 입력한 내용
        const adminEmail = $("#adminLoginEmail").val();
        const adminPwd = $("#adminLoginPwd").val();

        signInWithEmailAndPassword(auth, adminEmail, adminPwd)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            
            // 로그인 한 관리자 정보 확인하기
            console.log("관리자 uid 확인 ==> " + uid);
            
            console.log('로그인 성공');
            // alert('로그인 성공');
            
            // 로그인 성공하면 index.html로 이동하기
            location.href = '../index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            // 로그인 실패 시, 관련된 에러 메세지 확인하기
            if(errorCode == 'auth/user-not-found') {
                alert('존재하지 않는 관리자 입니다.');
            } else if(errorCode == 'auth/wrong-password') {
                alert('비밀번호가 일치하지 않습니다.');
            } else if(errorCode == 'auth/invalid-email') {
                alert('이메일과 비밀번호를 입력해주세요.');
            } else {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.log("errorMessage ==> " + errorMessage);
            }
        });
    } else if (adminGrade = "") {
        alert("로그인 실패. 관리자 권한이 없습니다.")
    }
}