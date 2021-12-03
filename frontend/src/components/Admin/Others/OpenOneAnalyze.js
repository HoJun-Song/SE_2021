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
            <h3> OpenOneAnalyze </h3>
            <button onClick={() => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>

            <container>
            판매 분석 <br/><hr/>
            메뉴이름
            {menu_name}<br/>
            주문량
            {menu_sales}<br/>
            매출
            {menu_price}<br/>
            매출 비율
            {menu_rate}<br/>
            </container>
        </div>
    );
}
export default OpenOneAnalyze;