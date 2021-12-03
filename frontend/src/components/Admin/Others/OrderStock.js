import React, {useState, useEffect } from 'react';
import Axios from 'axios';
import axios from 'axios';

const OrderStock = ( { history } ) => {
    const [stock, setStocks] = useState([])
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState('')

    const getStocks = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/browseStock/')
        setStocks(response.data)
        setName(response.data.menu_name)
    }
    
    const Increase = (e) => {
        e.preventDefault();
        const orderStock = {
            name: name,
            amount: 10,
        };
        console.log(orderStock)
        Axios.post('http://127.0.0.1:8000/post/orderStock/',orderStock)
            .then(res =>{
            localStorage.setItem('token', res.data.key)
            alert('재고가 증가되었습니다.')
            setPrice(res.data.total_stock_price)
            })
            .catch(err =>{
            alert('입력이 잘못되었습니다.')
            })
        };
    const Decrease = (e) => {
        e.preventDefault();
        const orderStock = {
            name: name,
            amount: -10,
        };
        console.log(orderStock)
        Axios.post('http://127.0.0.1:8000/post/orderStock/',orderStock)
            .then(res =>{
            localStorage.setItem('token', res.data.key)
            alert('재고가 감소되었습니다.')
            setPrice(res.data.total_stock_price)
            })
            .catch(err =>{
            alert('입력이 잘못되었습니다.')
            })
        };
    useEffect(() => {
        getStocks();
    }, [])

    return (
        <div>
            <h3> OrderStock </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            재고 주문<br/>
            <hr/>
            {
                stock.map((stocks) => (
                    <div>
                        {stocks.name}<br/>
                        <form onSubmit={Increase} >
                        <input type='submit' size="large" value='+' onClick={e => setName(stocks.name)}/>
                        </form>
                        <form onSubmit={Decrease}>
                        <input type='submit' size="large" value='-' onClick={e => setName(stocks.name)}/>
                        </form>
                        
                    </div>
                ))}
            <br/>
            <hr/>
            총금액 {price}<br/>
            <button onClick={()=> {history.push("./ConfirmOrderStock")}}> 선택 완료 </button><br/>
        </div>
    );
}
export default OrderStock;