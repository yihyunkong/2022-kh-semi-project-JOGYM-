// ======================================== firebase 초기화 코드 ======================================== //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

// 연동할 firebase console configration
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

// 로그인한 사용자 확인하기
onAuthStateChanged(auth, async (user) => {
    if(user) { // 로그인한 사용자가 있을 경우
        const uid = user.uid;
        // 회원 로그인 되었을 때 로그인한 회원의 이름을 띄우기
        const userNameQuerySnapshot = await getDocs(query(collection(db, "user"), where("uid", "==", uid)));
        userNameQuerySnapshot.forEach((doc) => {
            const displayName = doc.data().이름;
            // console.log(doc.id, " => ", doc.data());

            const displayNameTemplate = `
            <span id="userDisplayName" style="color: white; padding-right: 5px;">${displayName}님</span>
            `
            $("#userDisplayNameAppend").append(displayNameTemplate);
        })

        // 로그인 버튼 및 회원가입 버튼의 text 값 변경하기
        document.getElementById('loginBtn').textContent = "LOGOUT";
        document.getElementById('joinBtn').textContent = "MY PAGE";
        
        // 로그인 버튼 및 회원가입 버튼에 대한 아이디 값 바꿔주기
        const loginToLogout = document.getElementById('loginBtn');
        const joinToMypage = document.getElementById('joinBtn');

        loginToLogout.setAttribute('id', 'logoutBtn');
        joinToMypage.setAttribute('id', 'mypageBtn');

        // 로그아웃 버튼 눌렀을 때
        document.getElementById('logoutBtn').addEventListener('click', (event) => {
            signOut(auth)
            .then(function() {
                alert("로그아웃 되었습니다.");
                location.href = 'index.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                alert('로그아웃 실패');
            })
        });

        // 로그인한 상태에서 마이페이지 버튼을 눌렀을 때
        document.getElementById("mypageBtn").addEventListener("click", (event) => {
            if (!window.location.href) {
                location.href = `./src/mypage/mypage.html?${uid}`;
            } else {
                location.href = `./src/mypage/mypage.html?${uid}`;
            }
        });

        console.log("현재 로그인한 사용자 user ==> " + uid); 

    // 여기 수정해야함ㅠ
    } else { // 로그인한 사용자가 없을 경우
        console.log('로그인한 사용자가 없습니다.');

        // 로그아웃 상태에서 예약하기 링크를 눌렀을 때
        document.getElementById("reservationLink").addEventListener("click", (event) => {
            alert("로그인이 필요한 페이지입니다. 확인을 누르면 로그인 페이지로 이동합니다.");
            location.href = "../login/login.html";
        })


        // 예약하기/마이페이지에서만 필요한 코드입니다.
        // alert("로그인이 필요한 페이지입니다. 확인을 누르면 로그인 페이지로 이동합니다.");
        // location.href = "../login/login.html";
    } 
});
