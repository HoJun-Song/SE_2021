import React, {useState} from 'react';
import Axios from 'axios';
//DB에서 요청 후 받아오는 작업 필요

const OpenOneMenu = ( { history } ) => {
    const [id] = useState('')
    const [name,setName] = useState('');
    const [category,setCate] = useState('');
    const [price,setPrice] = useState('');
    const [stock_name,setStockName] = useState('');
    const [amount,setStockAmount] = useState('');
    const [errors, setErrors] = useState(false)
       
    const onSubmit = (e) => {
    e.preventDefault();
    const user = {
        id: id,
        name: name,
        category: category,
        price: price,
        stock_name: stock_name,
        amount: amount
    };
       
    Axios.get('http://127.0.0.1:8000/post/createMenu/',user)
        .then(res =>{
        localStorage.clear()
        localStorage.setItem('token', res.data.key)
        alert('메뉴가 등록되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('입력이 잘못되었습니다.')
        setName('')
        setCate('')
        setPrice('')
        setStockName('')
        setStockAmount('')
        })
        
    };



    return (
        <div>
            <h3> OpenOneMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <container>
            메뉴<br/>
            <hr/>
            메뉴 이름<br/>
            <input id="m_name" name="m_name" /><br/>
            가격<br/>
            <input id="price" name="price"/><br/>
            <br/>
            재료<br/>
            <hr/>
                <container>
                <input id="s_name" name="name"/>
                <input text="int"/>
                </container>
                <br/>
            <button>초기화</button>
            <button onClick={()=> {history.push("./RewriteMenu")}}> 수정 </button>
            </container>
        </div>
    );
}
export default OpenOneMenu;