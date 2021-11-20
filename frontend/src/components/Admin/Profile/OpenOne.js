import React from 'react';
//DB에서 요청 후 받아오는 작업 필요
const OpenOne = ( { history } ) => {
    return (
        <div>
            <h3> OpenOne </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <container>
            직원 프로필<br/>
            이름<br/>
            <input id="name" name="name" /><br/>
            ID<br/>
            <input id="id" name="id"/><br/>
            PW<br/>
            <input id="pw" name="pw"/><br/>
            전화번호<br/>
            <input id="pnum" name="pnum"/><br/>
            <button>초기화</button>
            <button onClick={()=> {history.push("./RewriteProfile")}}> 수정 </button>
            </container>
        </div>
    );
}
export default OpenOne;