import React from 'react';
//DB에서 요청 후 받아오는 작업 필요
const OpenOneMenu = ( { history } ) => {
    return (
        <div>
            <h3> OpenOneMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <container>
            메뉴<br/>
            <hr/>
            메뉴 이름<br/>
            <input id="m_name" name="m_name" /><br/>
            가격<br/>
            <input id="price" name="price"/><br/>
            <br/>
            재료<br/>
            <hr/>
                <container>
                <input id="s_name" name="name"/>
                <input text="int"/>
                </container>
                <br/>
            <button>초기화</button>
            <button onClick={()=> {history.push("./RewriteMenu")}}> 수정 </button>
            </container>
        </div>
    );
}
export default OpenOneMenu;