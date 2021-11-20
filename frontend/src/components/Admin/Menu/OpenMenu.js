import React from 'react';

const OpenMenu = ( { history } ) => {
    return (
        <div>
            <h3> OpenMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <hr/>
            <container>
            메뉴 ID <br/>
            <input id="name" name="name" />
            <button onClick={()=> {history.push("./OpenOneMenu")}}> 선택 </button>
            </container>
        </div>
    );
}
export default OpenMenu;