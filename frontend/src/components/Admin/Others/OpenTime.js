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
            <h3> OpenTime </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            
            <container>
            고객 평균 체류 시간 <br/>
            {average}
            <hr/><br/>
            메뉴 별 소요시간
            {
                times.map((time)=>(
                    <div>
                    {time.menu_name}
                    {time.menu_time}
                    </div>
                ))
            }<br/>
            </container>
            <br/><hr/>
        </div>
    );
}
export default OpenTime;