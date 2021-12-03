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
            <h3> AnalyzeSale </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>

            <container>
            판매 분석 <br/><hr/>
            총 매출
            {total}<br/>
            {
                analyze.map((analyzes)=>(
                    <div>
                        {analyzes.menu_name}
                        <form onSubmit={onSubmit}>
                        <input type='submit' size="large" value='선택' onClick={e => setName(analyzes.menu_name)}/>
                        </form>
                    </div>
                ))
            }
            <br/>
            </container>


        </div>
    );
}
export default AnalyzeSale;