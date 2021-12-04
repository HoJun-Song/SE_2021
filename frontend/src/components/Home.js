import React from 'react';
import './Home.css';
import './btn.css';
import RASZAS from './img/RASZAS.jpg';

const Home = ( { history } ) => {

    return (
        <div class="" >
            <h1 style={{color:"white", textAlign:"center"}}> RASZAS </h1>
            <img
            src={ RASZAS }
            width='500'
            height='300'
            textAlign="center"
            alt='RASZAS' /><br/><br/>
            <div className="btn_loc">
            <button class="btn" onClick={ () => {history.push("/Login_Admin")}}> 관리자로 로그인</button><br/><br/>
            </div>
            <div className="btn_loc">
            <button class="btn" onClick={ () => {history.push("/Login_Staff")}}> 직원으로 로그인</button>
            </div>    
        </div>
    );
}

export default Home;