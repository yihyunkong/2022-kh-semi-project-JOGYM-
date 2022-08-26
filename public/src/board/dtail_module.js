'use strict';
import dtail from "../js/dtailDAO.js"

// < 절차를 생각해! >
// 1. 일단 화면이 랜더링 된다. url
//    2. 클릭한 글의 id를 받아온다. 
let params = new URLSearchParams(document.location.search)
let id = params.get("id")
let hit;
console.log("사용자가 선택한 id "+ id);

// FIREBASE 저장소에서 url의 id에 해당하는 컬렉션을 상세 조회 해주는 함수를 호출합니다. 
dtail.dtailRetreive("board", id);

