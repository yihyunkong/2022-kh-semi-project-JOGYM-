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
        // 관리자가 로그인 되었을 때 로그인한 회원의 이름을 띄우기
        const adminQuery = query(collection(db, "admin"), where("uid", "==", uid))
        const adminNameQuerySnapshot = await getDocs(adminQuery);

        adminNameQuerySnapshot.forEach((doc) => {
            const displayName = doc.data().이름;
            // console.log(doc.id, " => ", doc.data());

            const displayNameTemplate = `
            <span id="adminDisplayName" style="color: white; padding-right: 5px;">관리자 ${displayName}님</span>
            `
            $("#adminDisplayNameAppend").append(displayNameTemplate);
        })

        // 로그인 버튼 및 회원가입 버튼의 text 값 변경하기
        document.getElementById('loginBtn').textContent = "LOGOUT";
                
        // 로그인 버튼 및 회원가입 버튼에 대한 아이디 값 바꿔주기
        const loginToLogout = document.getElementById('loginBtn');

        loginToLogout.setAttribute('id', 'logoutBtn');


        // 로그아웃 버튼 눌렀을 때
        document.getElementById('logoutBtn').addEventListener('click', (event) => {
            signOut(auth)
            .then(function() {
                const hostPort = location.host;
                location.href = `http://${hostPort}/jogym/public/src/admin/index.html`;
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                alert('로그아웃 실패');
            })
        });
        
        console.log("현재 로그인한 사용자 user ==> " + uid);   
    } else { // 로그인한 사용자가 없을 경우
        console.log('로그인한 사용자가 없습니다.');
        alert("로그인이 필요한 페이지입니다. 확인을 누르면 로그인 페이지로 이동합니다.");
        //location.host => 호스트:port 번호 반환..
        const hostPort = location.host;
        location.href = `http://${hostPort}/jogym/public/src/admin/admin-login/admin-login.html`;
        
    }
});
