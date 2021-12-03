import React, {useState, useEffect } from 'react';
import Axios from 'axios';

//12월 2일 : 초기화 버튼 구현

const RegisterMenu = ( { history } ) => {
    const [name,setName] = useState('');
    const [category,setCate] = useState('');
    const [price,setPrice] = useState('');
    const [inputList,setStockList] = useState([{
        stock_name:"", amount:""
    }]);

    const handleChange = (e, index) => {
        const {name, value} = e.target;   
        const list = [...inputList];
        list[index][name] = value;
        setStockList(list);
    }

    const onSubmit = (e) => {
    e.preventDefault();
    const user = {
        name: name,
        category: category,
        price: price,
        stock_name: inputList.stock_name,
        amount: inputList.amount
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
    const chkName = (e) =>{
        setName(e.target.value);
    }
    const chkPrice = (e) =>{
        setPrice(e.target.value);
    }
    /*const chkStockName = (e) =>{
        setStockName(e.target.value);
    }
    const chkStockAmount = (e) =>{
        setStockAmount(e.target.value);
    }*/
    const resetVal = () =>{
        setName('');
        setPrice('');
    }

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setStockList(list);
      };
    const handleAddClick = () => {
        setStockList([...inputList, { stock_name: "", amount: "" }]);
        };

    return (
        <div>
            <div className="btn_left">
            <button onClick={ () => {history.goBack()} }>뒤로가기</button>&ensp;&ensp;
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            </div>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <div className="btn_right">
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button><br/>
            </div>
            <div class="outbox">
            <h2>메뉴 등록</h2><p/>
            <form onSubmit={onSubmit}>
            <h3>메뉴 이름
            <div class="select_text">카테고리</div><br/>
            <input id="name" name="name" 
            onChange={e => setName(e.target.value)} onChange={chkName} value={name} />
            <select class="select_cate">
            <option id="category" key="all" value="all"
            onChange={e => setCate(e.target.value)}>전체</option>
            <option id="category" key="pasta" value="pasta" 
            onChange={e => setCate(e.target.value)}>파스타</option>
            <option id="category" key="pizza" value="pizza"
            onChange={e => setCate(e.target.value)}>피자</option>
            <option id="category" key="steak" value="steak"
            onChange={e => setCate(e.target.value)}>스테이크</option>
            </select><p/>
            가격<br/>
            <input id="price" name="price"
            onChange={e => setPrice(e.target.value)} onChange={chkPrice} value={price}/><p/>
            재료<br/>
            <div className="innerbox">
            {inputList.map((x,i)=>{
                return(
                    <div>
                    <input 
                    id="stock_name" name="stock_name" 
                    onChange={e => setStockList(e.target.value)} 
                    onChange={e => handleChange(e, i)} 
                    value={inputList.stock_name}/>&ensp;&ensp;
                    <input 
                    id="amount" name="amount" 
                    onChange={e => setStockList(e.target.value)}
                    onChange={e => handleChange(e, i)}
                    value={inputList.amount}/>&ensp;&ensp;
                    {inputList.length !== 1 &&
                    <button onClick={() => handleRemoveClick(i)}>-</button>}
                    {inputList.length - 1 === i &&
                    <button onClick={handleAddClick}>+</button>}
                    </div>
                )}
            )}</div></h3>
            <div className="btn_loc">
                    <button className="btn" onClick={resetVal}>초기화</button> &emsp;
                    <input className="btn" type='submit' size="large" value='등록'/>
            </div>
                </form>
            </div>
        </div>
    );
}
export default RegisterMenu;