import React, { useState,useEffect } from 'react';
import Axios from 'axios';
//결제 누르면 팝업으로 뜨도록 만들기
const CompletePay = ( { history } ) => {
    const [complete, setComp] = useState([])
    const [total, setTotal] = useState()
    const [table, setTable] = useState()
    const onSubmit = (e) => {
        const user = {    
        };
        Axios.post('http://127.0.0.1:8000/post/payment/',user)
        .then(res =>{
        setComp(res.data)
        setTotal(res.data[0].total_price)
        setTable(res.data[0].table)
        alert('결제가 완료 되었습니다.')
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
            <h3> CompletePay </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            결제 완료<br/><hr/>
            메뉴명 수량 금액<br/>
            {
                complete.map((comp)=>(
                    <div>
                    {comp.menu_name}
                    {comp.amount_per_menu}
                    {comp.price_per_menu}<br/>
                    
                    </div>
                ))
            }
            포장여부<br/>
            테이블 번호{table}
            <br/>
            총 금액{total}<br/>
            결제 금액{total}<br/>
            <br/>
            <button onClick={()=> {history.push("../Main_Staff")}}> 영수증 출력 </button><br/>
            <button onClick={()=> {history.push("../Main_Staff")}}> 돌아가기 </button><br/>
            </container>
        </div>
    );
}
export default CompletePay;