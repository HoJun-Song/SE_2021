import React from 'react';

const TableManage = ( { history } ) => {
    return (
        <div>
            <h3> TableManage </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Staff")}}> 홈버튼 </button>
            <container><br/>
            <button onClick={()=>{history.push("./TableInfo")}}>1</button>
            <button onClick={()=>{history.push("./TableInfo")}}>2</button>
            <button onClick={()=>{history.push("./TableInfo")}}>3</button><br/>
            <button onClick={()=>{history.push("./TableInfo")}}>4</button>
            </container>
        </div>
    );
}
export default TableManage;