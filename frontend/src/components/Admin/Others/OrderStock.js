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
    const chkName=(e)=>{
        setName(e.target.value);
    }
    const chkAmount=(e) => {
        setAmount(e.target.value);
    }
    const chkPrice=(e)=>{
        setPrice(e.target.value);
    }
    const resetVal = () =>{
        setName('');
        setAmount('');
    }
    return (
        <div>
            <div className="btn_left">
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            </div>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <div className="btn_right">
            <button onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            </div>
            <div class="outbox">
            <h2>재고 주문</h2>
            <container><h3>
            <div class="innerbox">
            &ensp;재고 이름
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            재고 단위<br/>
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
            </div><br/><br/>
            총금액<br/><br/>{price}
            <div style={{display:'inline'}} class="btn_loc">
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;    
            <button className="btn" onClick={resetVal}>초기화</button>&emsp;&emsp;
            <button class="btn" onClick={()=> {history.push("./ConfirmOrderStock")}}> 선택 완료 </button><br/>
            </div></h3></container>
        </div>
        </div>
    );
}
export default OrderStock;