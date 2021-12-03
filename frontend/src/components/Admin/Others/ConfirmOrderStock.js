import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';
//주문 버튼 누르면 자동으로 amount 업데이트
const ConfirmOrderStock = ( { history } ) => {

    const [name, setName] = useState([])
    const [amount, setAmount] = useState([])
    const [price, setPrice] = useState([])
    const [total_price, setTPrice] = useState([])
    const getStocks = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/finishStock/')
        setName(response.data.name)
        setAmount(response.data.amount)
        setPrice(response.data.price)
        setTPrice(response.data.total_price)
    }
    useEffect(() => {
        getStocks();
    }, [])
    return (
        <div>
            <h3> ConfirmOrderStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            재고 주문<br/><hr/>
            재고 이름:{name}<br/>
            단위:{amount}<br/>
            단위당 가격:{price}<br/>
            총 금액:{total_price}<br/>
            <button>주문 </button>
        </div>
    );
}
export default ConfirmOrderStock;