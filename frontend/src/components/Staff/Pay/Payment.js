import React from 'react';
//결제 누르면 팝업으로 뜨도록 만들기
const Payment = ( { history } ) => {
    return (
        <div>
            <h3> Payment </h3>
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
            <button onClick={()=> {history.push("./Cash")}}> 현금결제 </button><br/>
            <button onClick={()=> {history.push("./Card")}}> 카드결제 </button><br/>
            </container>
        </div>
    );
}
export default Payment;