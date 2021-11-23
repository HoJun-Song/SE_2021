import React, {useState} from 'react';
let init = 0;

const OrderMenu = ( { history } ) => {
    console.log('rebuild');
    const [num, setNum] = useState(0);
    
    const Increase = () => {
        setNum(num + 10);
    }
    const Decrease = () => {
        setNum(num - 10);
    }
    return (
        <div>
            <h3> OrderMenu </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Staff")}}> 홈버튼 </button>
            <container><br/>
            파스타<br/>
            <hr/>
                <container>
                <input id="pasta_name" name="pasta_name" />
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
            피자<br/>
            <hr/>
                <container>
                <input id="pizza_name" name="pizza_name"/>
                <input text="int"/>
                <button name="inc" onClick={Increase}>
                +
                </button>
                <button name="dec" onClick={Decrease}>
                -
                </button>
                </container>
                <br/>
            총금액 <input id="price" name="price"/>
            <button>초기화</button>
            <button onClick={()=> {history.push("./ConfirmOrderMenu")}}> 선택완료 </button><br/>
            </container>
        </div>
    );
}
export default OrderMenu;