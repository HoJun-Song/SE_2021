import React from 'react';

const FindPW = ({history} ) =>{
        return(
            <div>
                <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
    <container>
        PW찾기<br/>
        이름<br/>
        <input id="name" name="name" /><br/>
        ID<br/>
        <input id="id" name="id"/><br/>
        전화번호<br/>
        <input id="pnum" name="pnum"/><br/>
        <button>PW 찾기</button>
    </container>
    </div>
        );
    }

export default FindPW;