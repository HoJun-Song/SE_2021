import React, {useState, useEffect } from 'react';
import Axios from 'axios';

const RegisterMenu = ( { history } ) => {
    const [name,setName] = useState('');
    const [category,setCate] = useState('');
    const [price,setPrice] = useState('');
    const [stock_name,setStockName] = useState('');
    const [amount,setStockAmount] = useState('');

    const onSubmit = (e) => {
    e.preventDefault();
    const user = {
        name: name,
        category: category,
        price: price,
        stock_name: stock_name,
        amount: amount
    };
       
    Axios.post('http://127.0.0.1:8000/post/createMenu/',user)
        .then(res =>{
        localStorage.clear()
        localStorage.setItem('token', res.data.key)
        alert('메뉴가 등록되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('입력이 잘못되었습니다.')
        })
    };
    /*
    let init = 0;
    //증감
    console.log('rebuild');
    const [num, setNum] = useState(0);
    
    const Increase = () => {
        setNum(num + 10);
    }
    const Decrease = () => {
        setNum(num - 10);
    }
    //기능 변경 필요 => 재료 입력 칸 증감*/
    return (
        <div>
            <h3> RegisterMenu </h3><br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            메뉴 등록<br/>
            <form onSubmit={onSubmit}>
            <hr/>
            메뉴 이름<br/>
            <input id="name" name="name" 
            onChange={e => setName(e.target.value)} />
            <select>
         <option id="category" key="pasta" value="pasta"
            onChange={e => setCate(e.target.value)}>파스타</option>
         <option id="category" key="pizza" value="pizza"
            onChange={e => setCate(e.target.value)}>피자</option>
         <option id="category" key="steak" value="steak"
            onChange={e => setCate(e.target.value)}>스테이크</option>
            <option id="category" key="all" value="all"
            onChange={e => setCate(e.target.value)}>전체</option>
          </select><br/>
            가격<br/>
            <input id="price" name="price"
            onChange={e => setPrice(e.target.value)}/>
            <br/>
            재료<br/>
            <hr/>
                <container>
                <input id="stock_name" name="stock_name"
                onChange={e => setStockName(e.target.value)}/>
                <input id="amount" name="stock_amount" text="int"/>
                <button>
                +
                </button>
                <button>
                -
                </button>
                </container>
                <br/>
            <button>초기화</button>
            <input type='submit' size="large" value='등록'/>
            </form>
        </div>
    );
}
export default RegisterMenu;