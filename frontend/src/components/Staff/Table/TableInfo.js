import React from 'react';
//결제 누르면 팝업으로 뜨도록 만들기
const TableInfo = ( { history } ) => {
    return (
        <div>
            <h3> TableInfo </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            #번 테이블<br/><hr/>
            메뉴
            <input id="price" name="price" />
            수량
            <input id="price" name="price" /><br/>
            소요 시간
            <input id="time" name="time" /><br/><br/>
            <hr/>
            <button onClick={()=> {history.push("./MoveTable")}}> 테이블이동 </button><br/>
            </container>
        </div>
    );
}
export default TableInfo;