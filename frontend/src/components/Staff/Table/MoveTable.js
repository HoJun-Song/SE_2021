import React from 'react';

const MoveTable = ( { history } ) => {
    return (
        <div>
            <h3> MoveTable </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Staff")}}> 홈버튼 </button>
            <container><br/>
            <button onClick={()=>{history.push("./TableInfo")}}>1</button>
            <button onClick={()=>{history.push("./TableInfo")}}>2</button>
            <button onClick={()=>{history.push("./TableInfo")}}>3</button><br/>
            <button onClick={()=>{history.push("./TableInfo")}}>4</button><br/>
            이동시킬 테이블 번호
            <input id="tableno." name="tableno." /><br/>
            이동될 테이블 번호
            <input id="tableno." name="tableno." />
            <button onClick={()=> {history.push("./Main_Staff")}}> 선택완료 </button>
            </container>
        </div>
    );
}
export default MoveTable;