import React from 'react';
import './Home.css';
import './btn.css';
import RASZAS from './img/RASZAS.jpg';

const Home = ( { history } ) => {

    return (
        <div >
            <h3 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h3>
            <img
            src={ RASZAS }
            width='400'
            height='200'
            textAlign="center"
            alt='RASZAS' /><br/>
            <button className="btn" onClick={ () => {history.push("/Login_Admin")}}> 관리자로 로그인</button><br></br>
            <button className="btn" onClick={ () => {history.push("/Login_Staff")}}> 직원으로 로그인</button>
        </div>
    );
}

export default Home;