import React from 'react';

const TrackStock = ( { history } ) => {
    return (
        <div>
            <h3> TrackStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
        </div>
    );
}
export default TrackStock;