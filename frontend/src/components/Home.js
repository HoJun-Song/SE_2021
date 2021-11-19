import React from 'react';

const Home = ( { history } ) => {

    return (
        <div>
            <h3> RASZAS </h3>
            <button onClick={ () => {history.push("/Login_Admin")}}> 관리자로 로그인</button><br></br>
            <button onClick={ () => {history.push("/Login_Staff")}}> 직원으로 로그인</button>
        </div>
    );
}

export default Home;