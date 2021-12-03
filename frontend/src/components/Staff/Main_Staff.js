import React from 'react';
import RASZAS from '../img/RASZAS.jpg';

const Main_Staff = ( { history } ) => {
    return (
        <div>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1><br/><br/><br/>
            <button className="btn_right" onClick={()=> {history.push("./")}}> 로그아웃 </button><br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button className="btn" onClick={()=> {history.push("./OrderMenu")}}> 메뉴 주문 </button><br/><br/><br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<img style={{display:'inline'}}
            src={ RASZAS }
            width='300'
            height='150'
            textAlign="center"
            alt='RASZAS' /><br/><br/><br/><br/>
            &emsp;<button className="btn" onClick={()=> {history.push("./TableManage")}}> 테이블 관리 / 수정 </button>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <button className="btn" onClick={()=> {history.push("./CompleteOrder")}}> 메뉴 준비시간 체크 </button>
        </div>
    );
}
export default Main_Staff;