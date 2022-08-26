import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

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
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// 로그인 버튼을 누르면
document.getElementById('signInButton').addEventListener('click', signInButton)
function signInButton(event) {
    event.preventDefault(); // 로그인 버튼을 누르더라도 페이지 새로고침이 되지 않음

    // 로그인 시 필요한 사용자 이메일/비밀번호 (회원가입 시 폼에 작성한 id값을 사용하기)
    const userEmail = $("#userEmail").val();
    const userPassword = $("#userPassword").val();

    // 로그인 처리
    signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;

            // 로그인 한 유저정보 확인하기
            console.log("유저 정보 확인 ==> " + uid);

            console.log('로그인 성공');
            alert('로그인 성공');

            // 로그인 성공하면 index.html로 이동하기
            location.href = '../../index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            // 로그인 실패 시, 관련된 에러 메세지 확인하기
            if(errorCode == 'auth/user-not-found') {
                alert('존재하지 않는 회원입니다.');
            } else if(errorCode == 'auth/wrong-password') {
                alert('비밀번호가 일치하지 않습니다.');
            } else if(errorCode == 'auth/invalid-email') {
                alert('이메일과 비밀번호를 입력해주세요.');
            } else {
                alert('오류가 발생했습니다. 다시 시도해주세요.서버 오류');
                console.log("errorMessage ==> " + errorMessage);
            }
        });
};

// 구글 로그인
$("#googleBtn").click(function() {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(token + ", " + user);
        console.log('로그인 성공');
        alert('로그인 성공');

        // 로그인 성공하면 index.html로 이동하기
        location.href = '../index.html';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
})

// 깃헙 로그인
$("#githubBtn").click(function() {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(token + ", " + user);
        console.log('로그인 성공');
        alert('로그인 성공');

        // 로그인 성공하면 index.html로 이동하기
        location.href = '../index.html';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        
        console.log(errorCode);
        console.log(errorMessage);
    });
})