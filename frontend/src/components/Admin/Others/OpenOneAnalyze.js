import Axios from 'axios';
import React,{useState, useEffect} from 'react';


const OpenOneAnalyze = ( { history } ) => {
    const [menu_name, setMenuName] = useState([])
    const [menu_sales, setMenuSales] = useState([])
    const [menu_price, setMenuPrice] = useState([])
    const [menu_rate, setMenuRate] = useState([])

    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    console.log(search)
    const onSubmit = (e) => {
        const user = {
            name: search,
        };
        Axios.post('http://127.0.0.1:8000/post/detailAnalyze/',user)
        .then(res =>{
        console.log(res.data);
        setMenuName(res.data.menu_name)
        setMenuSales(res.data.menu_sales)
        setMenuPrice(res.data.menu_price)
        setMenuRate(res.data.menu_rate)
        
        })
        .catch(err =>{
        alert('잘못된 접근입니다.')
        console.log(search)
        })
        
    };
    useEffect(() => {
        onSubmit();
    }, [])
    return (
        <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div className="outbox">
            <container>
            <h2>판매 분석</h2><br/>
            <h3>메뉴이름&emsp;
            <textbox class="txtbox">{menu_name}</textbox><p/>
            주문량&emsp;&emsp;
            <textbox class="txtbox">{menu_sales}</textbox><p/>
            매출&emsp;&emsp;
            <textbox class="txtbox">{menu_price}</textbox><p/>
            매출 비율&emsp;&emsp;
            <textbox class="txtbox">{menu_rate}</textbox><p/>
            </h3></container>
        </div>
        </div>
    );
}
export default OpenOneAnalyze;