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
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <container>
            <h2>결제</h2>
            <div class="innerbox">
            <h3>메뉴명
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  
            수량 
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            금액<br/></h3>
            {
                pay.map((pays)=>(
                    <div>
                    <textbox class="txtbox">{pays.menu_name}</textbox>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <textbox class="txtbox">{pays.amount_per_menu}</textbox>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&emsp;
                    <textbox class="txtbox">{pays.price_per_menu}</textbox><p/>
                    </div>
                ))
            }</div>
            <h3>총 금액</h3><br/>
            <textbox class="txtbox">{total}</textbox>
            <br/>
            <div className="btn_loc">
            <button class="btn" onClick={()=> {history.push("../Cash")}}> 현금결제 </button><br/>&emsp;&emsp;
            <button class="btn" onClick={()=> {history.push("../Card")}}> 카드결제 </button><br/>
            </div>
            </container>
        </div>
        </div>
    );
}
export default Payment;