import Axios from 'axios';
import React, { useState } from 'react';

//12월 2일 : 재고 등록, 초기화 버튼 구현
//추가 구현 필요 : 백엔드에서 price 부분을 int로 바꿔야함.

const RegisterStock = ( { history } ) => {
    const [name,setName] = useState('');
    const [unit,setUnit] = useState('');
    const [price,setPrice] = useState('');

    const onSubmit = (e) => {
    e.preventDefault();
    const stock = {
        name: name,
        unit: unit,
        price: price,
    };
       
    Axios.post('http://127.0.0.1:8000/post/createStock/',stock)
        .then(res =>{
        localStorage.clear()
        localStorage.setItem('token', res.data.key)
        alert('재고가 등록되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('입력이 잘못되었습니다.')
        })
    };
    const chkName = (e) =>{
        setName(e.target.value);
    }
    const chkPrice = (e) =>{
        setPrice(e.target.value);
    }
    const resetVal = () =>{
        setName('');
        setPrice('');
    }
    //기능 변경 필요 => 메뉴 입력 칸 증감
    return (
        <div>
            <h3> RegisterStock </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            
            재고 등록<br/>
            <hr/>
            <form onSubmit={onSubmit}>
            재고 이름 재고 단위<br/>
            <input id="name" name="name" onChange={e => setName(e.target.value)} 
            onChange={chkName} value={name}/>
            <select>
            <option id="category" key="ml" value="ml"
            onChange={e => setUnit(e.target.value)}>10ml</option>
            <option id="category" key="gram" value="gram"
            onChange={e => setUnit(e.target.value)}>10g</option>
            <option id="category" key="ea" value="ea"
            onChange={e => setUnit(e.target.value)}>10개</option>
            </select><br/>
            단위 당 가격<br/>
            <input id="price" name="price"onChange={e => setPrice(e.target.value)}
            onChange={chkPrice} value={price}/>
            <br/>
            <button onClick={resetVal}>초기화</button>
            <input type='submit' size="large" value='등록'/>
            </form>
        </div>
    );
}
export default RegisterStock;