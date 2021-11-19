import React from 'react';

const Memo = ( {history} ) => {

    return (
        <div>
            <h3> Memo Page </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
        </div>
    );
}

export default Memo;