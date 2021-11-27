import React from 'react';
import RASZAS from '../img/RASZAS.jpg';

const Main_Admin = ( { history } ) => {
    return (
        <div>
            <h3> Main_Admin </h3>
            <button className="btn" onClick={()=> {history.push("./")}}> 로그아웃 </button><br/>
            <button className="btn" onClick={()=> {history.push("./MakeSprofile")}}> 직원 프로필 생성 </button>
            <button className="btn" onClick={()=> {history.push("./OpenSprofile")}}> 직원 프로필 열람 / 수정 </button><br/><br/>
            <img
            src={ RASZAS }
            width='400'
            height='200'
            textAlign="center"
            alt='RASZAS' /><br/>
            <button className="btn" onClick={()=> {history.push("./RegisterMenu")}}> 메뉴 등록 </button>
            <button className="btn" onClick={()=> {history.push("./OpenMenu")}}> 메뉴 열람 / 수정 </button><br/><br/>
            <button className="btn" onClick={()=> {history.push("./OpenTime")}}> 시간 정보 열람 </button>
            <button className="btn" onClick={()=> {history.push("./AnalyzeSale")}}> 판매 분석 </button>
            <button className="btn" onClick={()=> {history.push("./TrackStock")}}> 재고 추적 </button>
        </div>
    );
}
export default Main_Admin;