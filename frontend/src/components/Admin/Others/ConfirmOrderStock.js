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
            <h3> ConfirmOrderStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            재고 주문<br/>
            재고이름 수량 단위 당 가격
            {
                stocks.map((stock)=>(
                    <div>
                    {stock.name}
                    {stock.amount}
                    {stock.price}
                    </div>
                ))
            }<br/>
            총금액:{price}
            <button onClick={()=>{alert("재고 주문이 완료되었습니다.")}}> 주문 </button>
        </div>
    );
}
export default ConfirmOrderStock;