import React from 'react';
//결제 누르면 팝업으로 뜨도록 만들기
const Card = ( { history } ) => {
    return (
        <div>
            <h3> Card카드 </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            카드 결제<br/><hr/>
            총 금액
            <input id="price" name="price" /><br/>
            결제 금액
            <input id="price" name="price" /><br/><br/>
            <button onClick={()=> {history.push("./CompletePay")}}> 결제 완료 </button><br/>
            </container>
        </div>
    );
}
export default Card;