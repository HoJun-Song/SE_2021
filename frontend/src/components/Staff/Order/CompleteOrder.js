import React from 'react';
//주문 버튼 누르면 자동으로 amount 업데이트
const CompleteOrder = ( { history } ) => {
    return (
        <div>
            <h3> CompleteOrder </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            주문표<br/><hr/>
            메뉴명 테이블<br/>
            <input id="m_name" name="m_name" />
            <input id="tableno." name="tableno." />
            <button onClick={()=> {history.push("")}}> 준비완료 </button><br/>
            </container>
        </div>
    );
}
export default CompleteOrder;