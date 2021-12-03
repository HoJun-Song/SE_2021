import React from 'react';
import RASZAS from '../img/RASZAS.jpg';

const Main_Admin = ( { history } ) => {
    return (
        <div>
            <button className="btn_right" onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1><br/><br/><br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<div className="btn_loc" style={{display:'inline'}}>
            <button className="btn" onClick={()=> {history.push("./MakeSprofile")}}> 직원 프로필 생성 </button>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            </div>
            <button style={{display:'inline'}} className="btn" onClick={()=> {history.push("./OpenSprofile")}}> 직원 프로필 열람 / 수정 </button><br/><br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;<button style={{display:'inline'}} className="btn" onClick={()=> {history.push("./RegisterMenu")}}> 메뉴 등록 </button>
            &emsp;&emsp;&emsp;&emsp;&emsp;
            <img style={{display:'inline'}}
            src={ RASZAS }
            width='300'
            height='150'
            textAlign="center"
            alt='RASZAS' />
            &emsp;&emsp;&emsp;<button style={{display:'inline'}} className="btn" onClick={()=> {history.push("./OpenMenu")}}> 메뉴 열람 / 수정 </button><br/><br/><br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button style={{display:'inline'}} className="btn" onClick={()=> {history.push("./OpenTime")}}> 시간 정보 열람 </button>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <button style={{display:'inline'}} className="btn" onClick={()=> {history.push("./AnalyzeSale")}}> 판매 분석 </button><br/><br/><br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <button className="btn" onClick={()=> {history.push("./TrackStock")}}> 재고 추적 </button>
        </div>
    );
}
export default Main_Admin;