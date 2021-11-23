import React from 'react';

const OpenOneAnalyze = ( { history } ) => {
    return (
        <div>
            <h3> OpenOneAnalyze </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>

            <container>
            판매 분석 <br/><hr/>
            MenuName
            <input id="analyzer" plackholder= '10,000' name="analyzer" />
            <select>
			<option key="date" value="date">2021년 11월</option>
			<option key="date" value="date">2021년 10월</option>
			<option key="date" value="date">2021년 9월</option>
            <option key="date_all" value="date_all">전체</option>
		    </select><br/><br/><br/>
            주문량
            <input id="int" plackholder= '30' name="int" /><br/><br/>
            매출
            <input id="int" plackholder= '10,000' name="int" /><br/><br/>
            매출 비율
            <input id="int" plackholder= '10%' name="int" /><br/>
            </container>
        </div>
    );
}
export default OpenOneAnalyze;