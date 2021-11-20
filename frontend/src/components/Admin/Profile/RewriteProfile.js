import React from 'react';

const RewriteProfile = ( { history } ) => {
    return (
        <div>
            <h3> Rewriteprofile </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <container>
            직원 프로필 수정<br/>
            이름<br/>
            <input id="name" name="name" /><br/>
            ID<br/>
            <input id="id" name="id"/><br/>
            PW<br/>
            <input id="pw" name="pw"/><br/>
            PW 확인<br/>
            <input id="pw" name="pw"/><br/>
            전화번호<br/>
            <input id="pnum" name="pnum"/><br/>
            <button>초기화</button>
            <button>수정</button>
            </container>
        </div>
    );
}
export default RewriteProfile;