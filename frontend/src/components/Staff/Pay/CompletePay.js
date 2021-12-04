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
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <container>
            <h2>결제 완료</h2><br/>
            <h3>메뉴명
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            &emsp;&emsp;&emsp;&emsp;
                 수량
                 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;      
                 금액   
                 <p/>
            {
                complete.map((comp)=>(
                    <div>
                    <textbox class="txtbox">{comp.menu_name}</textbox>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                    <textbox class="txtbox">{comp.amount_per_menu}</textbox>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <textbox class="txtbox">{comp.price_per_menu}</textbox><p/>
                    </div>
                ))
            }
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            포장여부
            &emsp;&emsp;&emsp;
            테이블 번호&emsp;&emsp;
            <textbox class="txtbox">{table}</textbox>
            <br/><br/><br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;총 금액&emsp;&emsp;&emsp;
            <textbox class="txtbox">{total}</textbox><p/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;결제 금액&emsp;&emsp;&emsp;
            <textbox class="txtbox">{total}</textbox><br/>
            </h3><br/>
            <div class="btn_loc">
            <button  class="btn" onClick={()=> {history.push("../Main_Staff")}}> 영수증 출력 </button>&emsp;&emsp;<br/>
            <button class="btn" onClick={()=> {history.push("../Main_Staff")}}> 돌아가기 </button>
            </div></container>
            </div>
        </div>
    );
}
export default CompletePay;