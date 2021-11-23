import React from 'react';

const OpenTime = ( { history } ) => {
    return (
        <div>
            <h3> OpenTime </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            
            <container>
            고객 평균 체류 시간 <br/><hr/>
            <input id="time_customer" plackholder= '12:00' name="time_customer" /><br/><br/>
            메뉴 별 소요시간
            <hr/>
            <input id="time_customer" plackholder= '12:00' name="time_customer" />
            </container>
            <br/><hr/>
        </div>
    );
}
export default OpenTime;