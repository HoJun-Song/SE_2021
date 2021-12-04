import React,{useState, useEffect} from 'react';
import axios from 'axios';

const OpenTime = ( { history } ) => {
    const [average, setAverage] = useState([])
    const [times, setTimes] = useState([])
    const getTime = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/browseTimeInfo/')
        setAverage(response.data[0].average_order_time)
        setTimes(response.data)
        console.log(response.data[0].total_price)
    }
    useEffect(() => {
        getTime();
    }, [])
    
    return (
        <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <container>
            <h2>고객 평균 체류 시간</h2> <br/>
            <textbox class="txtbox">{average}</textbox><p/>
            <h2>메뉴 별 소요시간</h2>
            <h3>&emsp;&emsp;메뉴 이름
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                평균 소요 시간
                &emsp;&emsp;&emsp;&emsp;&emsp;
            </h3>
            {
                times.map((time)=>(
                    <div>
                    <textbox class="txtbox">{time.menu_name}</textbox>
                    <textbox class="txtbox">{time.menu_time}</textbox>
                    </div>
                ))
            }<br/>
            </container>
            <br/>
        </div>
        </div>
    );
}
export default OpenTime;