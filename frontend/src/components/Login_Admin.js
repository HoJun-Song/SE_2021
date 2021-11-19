import React from 'react';

const Login_Admin = ( { history } ) => {

    return (
        <div>
            <h3> Login_Admin </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <container>
        <input id="id" name="id" placeholder="아이디를 입력해주세요" />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      /><br/>
      <button>로그인</button>
      <button onClick={()=> {history.push("./FindPW")}}> 비밀번호 찾기 </button>
    </container>
        </div>
    );
}

export default Login_Admin;