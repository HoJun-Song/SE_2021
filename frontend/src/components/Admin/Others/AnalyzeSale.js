import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Axios from 'axios';

const AnalyzeSale = ( { history } ) => {
    const [analyze, setAnalyze] = useState([])
    const [total, setTotal] = useState([])
    const [name, setName] = useState([])
    const getAnalyze = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/browseAnalyze/')
        setAnalyze(response.data)
        setTotal(response.data[0].total_sales)
    }
    useEffect(() => {
        getAnalyze();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            name: name,
        };
        Axios.post('http://127.0.0.1:8000/post/detailAnalyze/',user)
        .then(res =>{
        window.location.replace(`./OpenOneAnalyze/?${name}`)
        alert('메뉴가 선택되었습니다.')
        })
        .catch(err =>{
        alert('잘못된 접근입니다.')
        })
    };
    return (
        <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <container>
            <h2>판매 분석</h2>
            <h3>총 매출</h3>
            <textbox class="txtbox">{total}</textbox><p/><br/>
            {
                analyze.map((analyzes)=>(
                    <div>
                        <textbox class="txtbox">{analyzes.menu_name}</textbox>&emsp;&emsp;&emsp;
                        <form style={{display:'inline'}}onSubmit={onSubmit}>
                        <input class="btn" type='submit' size="large" value='선택' onClick={e => setName(analyzes.menu_name)}/>
                        </form><br/>
                    </div>
                ))
            }
            <br/>
            </container>

            </div>
        </div>
    );
}
export default AnalyzeSale;