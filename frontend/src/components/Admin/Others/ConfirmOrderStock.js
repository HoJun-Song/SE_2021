import React from 'react';
//주문 버튼 누르면 자동으로 amount 업데이트
const ConfirmOrderStock = ( { history } ) => {
    return (
        <div>
            <h3> ConfirmOrderStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <hr/>
            <container>
            재고 주문<br/><hr/>
            재고명 수량 금액<br/>
            <input id="m_name" name="m_name" />
            <input id="amount" name="amount" />
            <input id="price" name="price" />
            <br/>
            <button>주문 시 자동으로 amount update </button>
            </container>
        </div>
    );
}
export default ConfirmOrderStock;