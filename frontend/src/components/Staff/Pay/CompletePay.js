import React from 'react';
//결제 누르면 팝업으로 뜨도록 만들기
const CompletePay = ( { history } ) => {
    return (
        <div>
            <h3> CompletePay </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            메뉴 주문<br/><hr/>
            메뉴명 수량 금액<br/>
            <input id="m_name" name="m_name" />
            <input id="amount" name="amount" />
            <input id="price" name="price" /><br/>
            포장여부
            <input id="m_name" name="m_name" />
            테이블 번호
            <input id="amount" name="amount" />
            <br/>
            <button onClick={()=> {history.push("./Main_Staff")}}> 영수증 출력 </button><br/>
            <button onClick={()=> {history.push("./Main_Staff")}}> 돌아가기 </button><br/>
            </container>
        </div>
    );
}
export default CompletePay;