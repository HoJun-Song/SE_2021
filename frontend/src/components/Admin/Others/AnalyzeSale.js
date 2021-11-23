import React from 'react';

const AnalyzeSale = ( { history } ) => {
    return (
        <div>
            <h3> AnalyzeSale </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>

            <container>
            판매 분석 <br/><hr/>
            총 매출
            <input id="analyzer" plackholder= '10,000' name="analyzer" />
            <select>
			<option key="date" value="date">2021년 11월</option>
			<option key="date" value="date">2021년 10월</option>
			<option key="date" value="date">2021년 9월</option>
            <option key="date_all" value="date_all">전체</option>
		    </select><br/>
            1st
            <input id="m_name" plackholder= '12:00' name="m_name" />
            <button onClick={()=> {history.push("./OpenOneAnalyze")}}> 선택 </button>
            </container>


        </div>
    );
}
export default AnalyzeSale;