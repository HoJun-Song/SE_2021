import Axios from 'axios';
import React, { useState } from 'react';

//12월 2일 : 재고 등록, 초기화 버튼 구현
//추가 구현 필요 : 백엔드에서 price 부분을 int로 바꿔야함.

const RegisterStock = ( { history } ) => {
    const [name,setName] = useState('');
    const [unit,setUnit] = useState('');
    const [price,setPrice] = useState('');

const selectList = ["10ml", "10g", "10ea"];
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
    const handleSelect = (e) => {
        setUnit(e.target.value);
        };
    //기능 변경 필요 => 메뉴 입력 칸 증감
    return (
        <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <h2>재고 등록</h2><br/>
            <form onSubmit={onSubmit}>
            <h3>재고 이름 
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;    
                재고 단위<br/>

            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <div class="select_text"></div><br/>
            <input class="input" id="name" name="name" 
            onChange={e => setName(e.target.value)} onChange={chkName} value={name} />
            <select class="select_cate" onChange={handleSelect}>
            <option value="10ml" >10ml</option>
            <option value="10g">10g</option>
            <option value="10ea">10개</option>
            </select><p/>
            단위 당 가격<p/>
            <input className="input" id="price" name="price"onChange={e => setPrice(e.target.value)}
            onChange={chkPrice} value={price}/>
            <p/>
            </h3>
            <div className="btn_loc">
            <button className="btn" onClick={resetVal}>초기화</button>&emsp;&emsp;
            <input className="btn" type='submit' size="large" value='등록'/>
            </div></form>
            </div>
        </div>
    );
}
export default RegisterStock;