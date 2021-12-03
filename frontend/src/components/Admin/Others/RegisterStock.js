import Axios from 'axios';
import React, { useState } from 'react';

//12월 2일 : 재고 등록, 초기화 버튼 구현
//추가 구현 필요 : 백엔드에서 price 부분을 int로 바꿔야함.

const RegisterStock = ( { history } ) => {
    const [name,setName] = useState('');
    const [unit,setUnit] = useState('');
    const [price,setPrice] = useState('');
    const [inputStockList,setStockList] = useState([{
        stock_name:"", stock_amount:""
    }]);

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
    const handleChange = (e, index) => {
        const {name, value} = e.target;   
        const list = [...inputStockList];
        list[index][name] = value;
        setStockList(list);
    }
    const handleRemoveClick = index => {
        const list = [...inputStockList];
        list.splice(index, 1);
        setStockList(list);
      };
    const handleAddClick = () => {
        setStockList([...inputStockList, { stock_name: "", amount: "" }]);
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
            <div className="btn_left">
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            </div>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <div className="btn_right">
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            </div>
            <div class="outbox">
            <h2>재고 등록</h2><br/>
            <form onSubmit={onSubmit}>
            <h3>재고 이름 
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;    
                재고 단위<br/>
            <input class="input" id="name" name="name" onChange={e => setName(e.target.value)} 
            onChange={chkName} value={name}/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <select>
            <option id="category" key="ml" value="ml"
            onChange={e => setUnit(e.target.value)}>10ml</option>
            <option id="category" key="gram" value="gram"
            onChange={e => setUnit(e.target.value)}>10g</option>
            <option id="category" key="ea" value="ea"
            onChange={e => setUnit(e.target.value)}>10개</option>
            </select><p/>
            단위 당 가격<br/>
            <input className="input" id="price" name="price"onChange={e => setPrice(e.target.value)}
            onChange={chkPrice} value={price}/>
            <p/>
            재고 사용량
            <div className="innerbox">
            {inputStockList.map((x,i)=>{
                return(
                    <div>
                    <input class="input"
                    id="stock_name" name="stock_name" 
                    onChange={e => setStockList(e.target.value)} 
                    onChange={e => handleChange(e, i)} 
                    value={inputStockList.stock_name}/>&ensp;&ensp;
                    <input class="input"
                    id="amount" name="amount" 
                    onChange={e => setStockList(e.target.value)}
                    onChange={e => handleChange(e, i)} 
                    value={inputStockList.amount}/>&ensp;&ensp;
                    {inputStockList.length !== 1 &&
                    <button class="btn" onClick={() => handleRemoveClick(i)}>-</button>}
                    {inputStockList.length - 1 === i &&
                    <button class="btn" onClick={handleAddClick}>+</button>}<p/>
                    </div>
                )}
            )}</div></h3>
            <div className="btn_loc">
            <button className="btn" onClick={resetVal}>초기화</button>&emsp;&emsp;
            <input className="btn" type='submit' size="large" value='등록'/>
            </div></form>
            </div>
        </div>
    );
}
export default RegisterStock;