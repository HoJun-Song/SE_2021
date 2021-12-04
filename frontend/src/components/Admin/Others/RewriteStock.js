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
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <form onSubmit={onSubmit}>
            <h2>재고 정보 수정</h2>
            <h3>재고 이름 
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            재고 단위<br/>
            <input class="input" id="name" name="name" onChange={e => setName(e.target.value)} 
            onChange={chkName} value={name}/>
            <select className="select_cate">
            <option id="category" key="ml" value="ml"
            onChange={e => setUnit(e.target.value)}>10ml</option>
            <option id="category" key="gram" value="gram"
            onChange={e => setUnit(e.target.value)}>10g</option>
            <option id="category" key="ea" value="ea"
            onChange={e => setUnit(e.target.value)}>10개</option>
            </select><br/>
            단위 당 가격<br/>
            <input class="input" id="price" name="price"onChange={e => setPrice(e.target.value)}
            onChange={chkPrice} value={price}/>
            <br/>
            <div class="btn_loc">
            <button class="btn" onClick={resetVal}>초기화</button>&emsp;&emsp;
            <input class="btn" type='submit' size="large" value='수정'/>
            </div></h3></form></div>
        </div>
    );
}
export default RewriteStock;