import React from 'react';
//주문 버튼 누르면 자동으로 amount 업데이트
const ConfirmOrderMenu = ( { history } ) => {
    return (
        <div>
            <h3> ConfirmOrderMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            메뉴 주문<br/><hr/>
            메뉴명 수량 금액<br/>
            <input id="m_name" name="m_name" />
            <input id="amount" name="amount" />
            <input id="price" name="price" />
            <br/>
            <button onClick={()=> {history.push("./SelectTable")}}> 테이블 주문 </button><br/>
            <button onClick={()=> {history.push("./Payment")}}> 포장 주문 </button><br/>
            </container>
        </div>
    );
}
export default ConfirmOrderMenu;