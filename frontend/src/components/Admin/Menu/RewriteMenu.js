import React, {useState } from 'react';
let init = 0;

const RewriteMenu = ( { history } ) => {
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
            <h3> RewriteMenu </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <container>
            메뉴 수정<br/>
            <hr/>
            메뉴 이름<br/>
            <input id="m_name" name="m_name" />
            <select>
			<option key="pasta" value="pasta">파스타</option>
			<option key="pizza" value="pizza">피자</option>
			<option key="steak" value="steak">스테이크</option>
            <option key="all" value="all">전체</option>
		    </select>
            가격<br/>
            <input id="price" name="price"/><br/>
            <br/>
            재료<br/>
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
            <button>초기화</button>
            <button>수정</button>
            </container>
        </div>
    );
}
export default RewriteMenu;