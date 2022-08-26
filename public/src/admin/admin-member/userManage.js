// ======================================== firebase 초기화 코드 시작 ======================================== //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore, query, where, doc, updateDoc, getDoc, deleteDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { getAuth, deleteUser } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
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
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;
// ========================================= firebase 초기화 코드 끝 ========================================= //

// 회원 조회 함수
    async function userInfoSpread() {
        console.log("회원 조회 함수 호출 성공");
        
        // 회원 목록 불러오기
        const userSnapshot = await getDocs(collection(db, "user"));
        userSnapshot.forEach((doc) => {
            const uid = doc.id;
            // 회원 목록 조회
            console.log("회원 목록 ===> " + uid, " => ", doc.data());
            
            const name = doc.data().이름;
            const birth = doc.data().생년월일;
            const phone = doc.data().전화번호;
            const email = doc.data().이메일;
            // console.log(name, birth, phone, email);
            
            const userListTemplate = `
                <tr>
                    <td id="userName">${name}</td>
                    <td id="userBirth">${birth}</td>
                    <td id="userPhone">${phone}</td>
                    <td id="userEmail">${email}</td>
                    <td id="userLockerAndCloth"><button type="button" id="userLockCloth-btn" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#lockerClothModal">락커/운동복</button></td>
                </tr>
            `
            $("#userListAppend").append(userListTemplate);
        })
        
        // // 탈퇴 함수
        // $(".deleteButton").click(() => {
        //     const uid = $(".deleteButton").val();
        //     console.log("uid ==> " + uid)

        //     if(confirm("회원 삭제하시겠습니까?")) {
        //         deleteDoc(doc(db, "user", uid));
        //         // const user = $(".deleteButton").val();
        //         deleteUser(user).then(() => {
        //             console.log("삭제된 회원 ==> " + user);
        //             alert("회원 삭제 성공");
        //         }).catch((error) => {
        //             const errorMessage = error.message;
        //             const errorCode = error.code;
        //             alert("회원 삭제 실패");
        //             console.log("errorMessage ==> " + errorMessage);
        //             console.log("errorMessage ==> " + errorCode);
        //         });
        //     } else {
        //         console.log("회원 삭제 취소");
        //     }
        // })

        // // 모달 클릭 시 해당하는 회원의 이름을 출력
        // const userNameQuerySnapshot = await getDocs(collection(db, "user"));
        // userNameQuerySnapshot.forEach((doc) => {
        //     const userName = doc.data().이름;
    
        //     const userNameTemplate = `
        //         <h4 class="modal-title">${userName}님의 락커/운동복</h4>
        //     `
        //     $("#userModal").append(userNameTemplate);
        // })
}
userInfoSpread();


{/* <td><button type="button" id="userUdt-btn" class="btn btn-primary" value="${userUid}" data-bs-toggle="modal" data-bs-target="#updateModal">수정</button></td>
<td><button type="button" className="userDel-btn" class="deleteButton" value="${userUid}">탈퇴</button></td> */}
