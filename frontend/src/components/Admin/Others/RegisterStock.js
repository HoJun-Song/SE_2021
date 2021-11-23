import React, {useState } from 'react';
let init = 0;
const RegisterStock = ( { history }, props ) => {
    
    //증감
    console.log('rebuild');
    const [num, setNum] = useState(0);
    const Increase = () => {
        setNum(num + 10);
    }
    const Decrease = () => {
        setNum(num - 10);
    }
    //기능 변경 필요 => 메뉴 입력 칸 증감
    return (
        <div>
            <h3> RegisterStock </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            <container>
            재고 등록<br/>
            <hr/>
            재고 이름 재고 단위<br/>
            <input id="m_name" name="m_name" />
            <select>
			<option key="int" value="pasta">10g</option>
			<option key="int" value="pizza">10ml</option>
			<option key="int" value="steak">10개</option>
		    </select><br/>
            단위 당 가격<br/>
            <input id="price" name="price"/>
            <br/>
            <button>초기화</button>
            <button>등록</button>
            </container>
        </div>
    );
}
export default RegisterStock;