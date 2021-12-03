import React, {useState, useEffect } from 'react';
import Axios from 'axios';

const RewriteMenu = ( { history } ) => {
        const [id] = useState('')
        const [name,setName] = useState('');
        const [category,setCate] = useState('');
        const [price,setPrice] = useState('');
        //const [stock_name,setStockName] = useState('');
        //const [amount,setStockAmount] = useState('');
        const [inputList,setStockList] = useState([{
            stock_name:"", amount:""
        }]);
       
           
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

    const handleChange = (e, index) => {
        const {name, value} = e.target;   
        const list = [...inputList];
        list[index][name] = value;
        setStockList(list);
    }

        const onSubmit = (e) => {//수정
        e.preventDefault();
        const user = {
            name: name,
            category: category,
            price: price,
            stock_name: inputList.stock_name,
            amount: inputList.amount
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
    const chkStockList = (e) =>{
        setStockList(e.target.value);
    }
    const resetVal = () =>{
        setName('');
        setPrice('');
        //setStockList(['','']);
    }
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setStockList(list);
      };
    const handleAddClick = () => {
        setStockList([...inputList, { stock_name: "", amount: "" }]);
        };
    //기능 변경 필요 => 재료 입력 칸 증감
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
            <h2>메뉴 수정</h2>
            <h3>메뉴 이름
            <div class="select_text">카테고리</div><br/>
            <input class="input" id="name" name="m_name"
            onChange={e => setName(e.target.value)} onChange={chkName} value={name} />
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
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
            <br/>가격<br/>
            <input class="input" id="price" name="price" 
            onChange={e => setPrice(e.target.value)} onChange={chkPrice} value={price} /><br/>
            <br/>
            <div className="innerbox">
            {inputList.map((x,i)=>{
                return(
                    <div>
                    <output class="input"
                    id="stock_name" name="stock_name" 
                    onChange={e => setStockList(e.target.value)} 
                    onChange={e => handleChange(e, i)}
                    value={inputList.stock_name}/>&ensp;&ensp;
                    <output class="input"
                    id="amount" name="amount" 
                    onChange={e => setStockList(e.target.value)}
                    onChange={e => handleChange(e, i)}
                    value={inputList.amount}/>&ensp;&ensp;
                    {inputList.length !== 1 &&
                    <button style={{marginRight:'5px'}} class="btn" onClick={() => handleRemoveClick(i)}>-</button>}
                    {inputList.length - 1 === i &&
                    <button class="btn" onClick={handleAddClick}>+</button>}<p/>
                    </div>
                )}
            )}</div></h3>
            <div class="btn_loc">
            <button class="btn" onClick={resetVal}>초기화</button>&emsp;&emsp;
            <form onSubmit={onSubmit}>
            <input class="btn" type='submit' size="large" value='수정'/>&emsp;&emsp;
            </form>
            <form onSubmit2={onSubmit2}>
            <input class="btn" type='submit' size="large" value='삭제'/>
            </form>
            </div>
            </div>
        </div>
    );
}
export default RewriteMenu;