import React from 'react';

const OpenSprofile = ( { history } ) => {
    return (
        <div>
            <h3> OpenSprofile </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <container>
            직원 프로필 <br/>
            이름<br/>
            <input id="name" name="name" />
            <button onClick={()=> {history.push("./OpenOne")}}> 선택 </button>
            </container>
        </div>
    );
}
export default OpenSprofile;