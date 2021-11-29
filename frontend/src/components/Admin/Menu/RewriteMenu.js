import React, {useState, useEffect } from 'react';
import Axios from 'axios';

const RewriteMenu = ( { history } ) => {
        const [id] = useState('')
        const [name,setName] = useState('');
        const [category,setCate] = useState('');
        const [price,setPrice] = useState('');
        const [stock_name,setStockName] = useState('');
        const [amount,setStockAmount] = useState('');
       
           
        const [menu_name, setMenuName] = useState([])
        const [menu_price, setMenuPrice] = useState([])
        const [amount_per_menu, setAmount] = useState([])
        const [stock_per_menu, setStock] = useState([])

        const current = decodeURI(window.location.href);
        const search = current.split("?")[1];
        console.log(search)
        const onSubmit3 = (e) => {
        const user = {
            name: search,
        };
        Axios.post('http://127.0.0.1:8000/post/getSelectedMenu/',user)
        .then(res =>{
        console.log(res.data);
        setMenuName(res.data.menu_name)
        setMenuPrice(res.data.menu_price)
        setAmount(res.data.amount_per_menu)
        setStock(res.data.stock_per_menu)
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    }
    useEffect(() => {
        onSubmit3();
    }, [])


        const onSubmit = (e) => {//수정
        e.preventDefault();
        const user = {
            name: name,
            category: category,
            price: price,
            stock_name: stock_name,
            amount: amount
        };
           
        Axios.post('http://127.0.0.1:8000/post/modifyMenu/',user)
            .then(res =>{
            localStorage.clear()
            localStorage.setItem('token', res.data.key)
            alert('메뉴가 수정되었습니다.')
            })
            .catch(err =>{
            console.clear()
            alert('입력이 잘못되었습니다.')
            })
        };
        
    const onSubmit2 = (e) => {//삭제
        e.preventDefault();
        const user = {
            name: search,
        };

    Axios.post('http://127.0.0.1:8000/post/deleteMenu',user)
    .then(res =>{
        localStorage.clear()
        localStorage.setItem('token', res.data.key)
        alert('메뉴가 삭제되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('입력이 잘못.')
        }) 
    };
    const chkName = (e) =>{
        setName(e.target.value);
    }
    const chkPrice = (e) =>{
        setPrice(e.target.value);
    }
    const chkStockName = (e) =>{
        setStockName(e.target.value);
    }
    const chkStockAmount = (e) =>{
        setStockAmount(e.target.value);
    }
    const resetVal = () =>{
        setMenuName('');
        setMenuPrice('');
        setStock('');
        setAmount('');
    }
    //기능 변경 필요 => 재료 입력 칸 증감
    return (
        <div>
            <h3> RewriteMenu</h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button><br/>
            메뉴 수정<br/>
            <hr/>
            메뉴 이름<br/>
            <input id="name" name="m_name" 
            onChange={e => setName(e.target.value)} onChange={chkName} value={name} />
            <select>
			<option id="category" key="pasta" value="pasta"
            onChange={e => setCate(e.target.value)}>파스타</option>
			<option id="category" key="pizza" value="pizza"
            onChange={e => setCate(e.target.value)}>피자</option>
			<option id="category" key="steak" value="steak"
            onChange={e => setCate(e.target.value)}>스테이크</option>
            <option id="category" key="all" value="all"
            onChange={e => setCate(e.target.value)}>전체</option>
		    </select>
            <br/>가격<br/>
            <input id="price" name="price" 
            onChange={e => setPrice(e.target.value)} onChange={chkPrice} value={price} /><br/>
            <br/>
            재료<br/>
            <hr/>
                <container>
                <input id="stock_name" name="name"
                onChange={e => setStockName(e.target.value)} onChange={chkStockName} value={stock_name} />
                <input id="amount" name="amount" text="int"
                onChange={e => setStockAmount(e.target.value)} onChange={chkStockAmount} value={amount} />
                <button>
                +
                </button>
                <button>
                -
                </button>
                </container>
                <br/>
            
            <form onSubmit={onSubmit}>
            <input type='submit' size="large" value='수정'/>
            </form>
            <form onSubmit2={onSubmit2}>
            <input type='submit' size="large" value='삭제'/>
            </form>
            <button onClick={resetVal}>초기화</button>
        </div>
    );
}
export default RewriteMenu;