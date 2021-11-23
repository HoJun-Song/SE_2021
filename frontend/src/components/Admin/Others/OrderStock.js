import React, {useState } from 'react';
let init = 0;

const OrderStock = ( { history } ) => {
    console.log('rebuild');
    const [num, setNum] = useState(0);

    
    const Increase = () => {
        setNum(num + 10);
    }
    const Decrease = () => {
        setNum(num - 10);
    }
    //기능 변경 필요 => 재료 입력 칸 증감
    return (
        <div>
            <h3> OrderStock </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            재고 주문<br/>
            <hr/>
            <container>
            <input id="s_name" name="name"/>
            <input text="int"/>
            <button name="inc" onClick={Increase}>
            +
            </button>
            <button name="dec" onClick={Decrease}>
            -
            </button>
            </container>
            <br/>
            <hr/>
            <button>초기화</button>
            <button onClick={()=> {history.push("./ConfirmOrderStock")}}> 선택 완료 </button><br/>
        </div>
    );
}
export default OrderStock;