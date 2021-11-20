import React from 'react';

const Main_Staff = ( { history } ) => {
    return (
        <div>
            <h3> Main_Staff </h3>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button><br/>
            <button onClick={()=> {history.push("./OrderMenu")}}> 메뉴 주문 </button>
            <button onClick={()=> {history.push("./TableManage")}}> 테이블 관리 / 수정 </button><br/><br/>
            <button onClick={()=> {history.push("./ReadyTimeCheck")}}> 메뉴 준비시간 체크 </button>
        </div>
    );
}
export default Main_Staff;