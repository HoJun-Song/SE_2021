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
            <h3> Cash현금 </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            현금 결제<br/><hr/>
            총 금액
            {total_pay}<br/>
            받은 금액
            <input class="input" id="price" name="price"
            onChange={e => setPay(e.target.value)}/><br/>
            거스름돈
            {pay-total_pay}<br/>
            <br/>
            <button onClick={()=> {history.push("./CompletePay")}}> 결제 완료 </button><br/>
            </container>
        </div>
    );
}
export default Cash;