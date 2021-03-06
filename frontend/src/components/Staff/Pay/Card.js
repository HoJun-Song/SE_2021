import React,{useState,useEffect} from 'react';
import Axios from 'axios';
//결제 누르면 팝업으로 뜨도록 만들기
const Card = ( { history } ) => {
    const [total_pay, setTotal] = useState()
    
    const onSubmit = (e) => {
        const user = {    
        };
        Axios.post('http://127.0.0.1:8000/post/totalPay/',user)
        .then(res =>{
        setTotal(res.data.total)
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
            <h2>카드 결제</h2><br/>
            <h3>총 금액&emsp;&emsp;&emsp;
            <textbox class="txtbox"> {total_pay}</textbox><p/>
            승인 금액&emsp;&emsp;&emsp;
            <textbox class="txtbox">{total_pay}</textbox>
            <br/></h3>
            <div class="btn_loc">
            <button className="btn" onClick={()=> {history.push("./CompletePay")}}> 결제 완료 </button><br/>
            </div>
            </container>
        </div>
        </div>
    );
}
export default Card;