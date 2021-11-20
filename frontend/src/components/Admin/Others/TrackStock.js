import React from 'react';

const TrackStock = ( { history } ) => {
    return (
        <div>
            <h3> TrackStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            
            <container>
            재고 ID <br/><hr/>
            <input id="name" plackholder= 'Stock' name="name" />
            <input id="name" plackholder= 'Stock' name="name" />
            <button onClick={()=> {history.push("./")}}> 선택 </button>
            </container>
            <br/><hr/>
            <button onClick={()=> {history.push("./OrderStock")}}> 재고주문 </button>
        </div>
    );
}
export default TrackStock;