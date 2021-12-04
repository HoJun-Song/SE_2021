import React, {useState, useEffect} from 'react';
import Axios from 'axios';
//DB에서 요청 후 받아오는 작업 필요
const RewriteStock = ( { history } ) => {
            //초기화 버튼 구현 
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
        Axios.post('http://127.0.0.1:8000/post/modifyStock/',stock)
            .then(res =>{
            alert('재고가 수정되었습니다.')
            })
            .catch(err =>{
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
    
    return (
        <div>
            <h3> RewriteStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button><br/>
            재고 정보 수정<br/>
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
            <input type='submit' size="large" value='수정'/>
            </form>
        </div>
    );
}
export default RewriteStock;