import React,{useState,useEffect} from 'react';
import Axios from 'axios';
//결제 누르면 팝업으로 뜨도록 만들기
const Cash = ( { history } ) => {
    const [total_pay, setTotal] = useState()
    const [pay, setPay] = useState()
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
            <h2>현금 결제</h2><br/>
            <h3>총 금액&emsp;&emsp;
            <textbox class="txtbox"> {total_pay}</textbox><p/>
            받은 금액&emsp;&emsp;
            <input class="input" id="price" name="price"
            onChange={e => setPay(e.target.value)}/><p/>
            거스름돈&emsp;&emsp;
            <textbox class="txtbox"> {pay-total_pay}</textbox><p/>
            <br/></h3>
            <button class="btn" onClick={()=> {history.push("./CompletePay")}}> 결제 완료 </button><br/>
            </container>
            </div>
        </div>
    );
}
export default Cash;