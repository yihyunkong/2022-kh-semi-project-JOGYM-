'use strict';
import firebaseConfig from "../js/firebaseConfig.js";
import {initializeApp} 
    from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore, query, getDocs} 
    from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import ref from "../collection/ref.js"
import retreive from '../js/retreiveDAO.js'
import pagination from "../admin/ad-board/admin_paginate.js"


const app = initializeApp(firebaseConfig);

const totalSnapshot = await getDocs(query(ref.boardRef));

// 전체 게시글의 갯수를 출력
const boardTotalDocs = totalSnapshot.docs.length;
console.log(`전체 게시글의 갯수 boardTotalDocs ===> ${boardTotalDocs}`);

////// h3태그 붙이기 START > 게시물 갯수 표시 (complete!!)
const totalH3 = ` ✉️ 총 ${boardTotalDocs}개의 게시물이 있습니다.`
$("h3").append(totalH3);
///// h3태그 붙이기 END


if(typeof(window.paginate) === 'undefined'){
  const result = retreive.retreiveHomeBoard();
  window.paginate = pagination.lignePaginate();
  console.log("paginate.init");

  let options = {
      numberPerPage:10, //Cantidad de datos por pagina
      goBar:true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
      pageCounter:true, //Contador de paginas, en cual estas, de cuantas paginas

  };

  let filterOptions = {
      el:'#searchBox' //Caja de texto para filtrar, puede ser una clase o un ID
  };

  paginate.init('.myTable',options,filterOptions);
}