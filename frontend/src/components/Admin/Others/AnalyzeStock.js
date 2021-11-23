import React from 'react';
//DB에서 요청 후 받아오는 작업 필요
const AnalyzeStock = ( { history } ) => {
    return (
        <div>
            <h3> AnlayzeStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            <container>
            재고 정보<br/>
            <hr/>
            재고 이름 재고 단위<br/>
            <input id="s_name" name="s_name" />
            <select>
			<option key="int" value="date">10g</option>
			<option key="int" value="date">10ml</option>
			<option key="int" value="date">10개</option>
		    </select><br/>
            단위 당 가격<br/>
            <input id="price" name="price"/><br/>
            <br/>
            재고 사용량<br/>
            <hr/>
                <container>
                <input id="s_name" name="s_name"/>
                <input text="int"/>
                </container>
                <br/>
            <button onClick={()=> {history.push("./RewriteStock")}}> 수정 </button>
            </container>
        </div>
    );
}
export default AnalyzeStock;