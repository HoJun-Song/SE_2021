import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';
//주문 버튼 누르면 자동으로 amount 업데이트
const ConfirmOrderStock = ( { history } ) => {

    const [stocks, setStock] = useState([])
    const [price, setPrice] = useState([])

    const getStocks = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/finishStock/')
        setStock(response.data)
        setPrice(response.data[0].total_price)
    }
    useEffect(() => {
        getStocks();
    }, [])

    const alarm = () =>{
        alert("재고가 등록되었습니다.")
        //history.push("./Main_Admin")
    }

    return (
        <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div className="outbox">
            <h2>재고 주문</h2><br/>
            <div className="innerbox">
            <h3>재고이름
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                수량
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                단위 당 가격<p/>
            {
                stocks.map((stock)=>(
                    <div>
                    <textbox class="txtbox">{stock.name}</textbox>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <textbox class="txtbox">{stock.amount}</textbox>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <textbox class="txtbox">{stock.price}</textbox><p/>
                    </div>
                ))
            }<br/></h3>
            </div><br/><br/><br/><br/>
            <h3>총금액:<textbox style={{display:'inline'}}class="txtbox">{price}</textbox></h3>
            <div className="btn_loc">
            <button style={{display:'inline'}} className="btn" onClick={()=>{alert("재고 주문이 완료되었습니다.")}}> 주문 </button>   
            </div>
        </div>
        </div>
    );
}
export default ConfirmOrderStock;