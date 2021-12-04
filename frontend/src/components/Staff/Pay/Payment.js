import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Axios from 'axios';
//결제 누르면 팝업으로 뜨도록 만들기
const Payment = ( { history } ) => {
    const [pay, setPay] = useState([])
    const [total, setTotal] = useState()
    
    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    const onSubmit = (e) => {
        const user = {
            table_id: search,
        };
        Axios.post('http://127.0.0.1:8000/post/checkPay/',user)
        .then(res =>{
        setPay(res.data)
        setTotal(res.data[0].total_price)
        alert('결제 정보를 받았습니다.')
        })
        .catch(err =>{
        alert('잘못된 접근입니다.')
        })
    };
    useEffect(() => {
        onSubmit();
    }, [])
    return (
        <div>
            <h3> Payment </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            메뉴 주문<br/><hr/>
            메뉴명 수량 금액<br/>
            {
                pay.map((pays)=>(
                    <div>
                    {pays.menu_name}
                    {pays.amount_per_menu}
                    {pays.price_per_menu}
                    </div>
                ))
            }
            총 금액<br/>
            {total}
            <br/>
            <button onClick={()=> {history.push("../Cash")}}> 현금결제 </button><br/>
            <button onClick={()=> {history.push("../Card")}}> 카드결제 </button><br/>
            </container>
        </div>
    );
}
export default Payment;