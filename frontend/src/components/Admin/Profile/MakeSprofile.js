import React, { useState } from 'react';

const MakeSprofile = ( { history } ) => {
    
    return (
        <div>
            <h3> MakeSprofile </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <container>
            <br/>직원 프로필 생성<br/>
            <hr/>
            이름<br/>
            <input id="name" placeholder="박직원" name="name" /><br/>
            ID<br/>
            <input id="id" placeholder="choi" name="id"/><br/>
            PW<br/>
            <input id="pw" placeholder="123456789" name="pw"/><br/>
            PW 확인<br/>
            <input id="pw" placeholder="123456789" name="pw"/><br/>
            전화번호<br/>
            <input id="pnum" placeholder="01012345678" name="pnum"/><br/>
            <hr/>
            <button>초기화</button>
            <button>생성</button>
            </container>
        </div>
    );
}
export default MakeSprofile;