import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Axios from 'axios';


const OrderMenu = ( { history } ) => { 
    const [menus, setMenus] = useState([])
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState('')

    const getMenus = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/browseMenu/')
        setMenus(response.data)
        setName(response.data.menu_name)
    }
    
    const Increase = (e) => {
        e.preventDefault();
        const order = {
            name: name,
            amount: 1,
        };
        console.log(order)
        Axios.post('http://127.0.0.1:8000/post/orderMenu/',order)
            .then(res =>{
            localStorage.setItem('token', res.data.key)
            alert('메뉴가 증가되었습니다.')
            setPrice(res.data.total_price)
            })
            .catch(err =>{
            alert('입력이 잘못되었습니다.')
            })
        };
    const Decrease = (e) => {
        e.preventDefault();
        const order = {
            name: name,
            amount: -1,
        };
        console.log(order)
        Axios.post('http://127.0.0.1:8000/post/orderMenu/',order)
            .then(res =>{
            localStorage.setItem('token', res.data.key)
            alert('메뉴가 감소되었습니다.')
            setPrice(res.data.total_price)
            })
            .catch(err =>{
            alert('입력이 잘못되었습니다.')
            })
        };
    useEffect(() => {
        getMenus();
    }, [])
    const chkAmount=(e)=>{
        setAmount(e.target.value);
    }
    const chkPrice=(e) => {
        setPrice(e.target.value);
    }
    const resetVal = () =>{
        setAmount('');
        setPrice('');
    }
    return (
        <div>
            <div className="btn_left">
            <button onClick={() => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            </div>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right" onClick={()=> {history.push("./Main_Staff")}}> 홈버튼 </button>
            <container>
            <div className="outbox">
            <h2>메뉴 주문</h2><br/>
            <div className="innerbox">
                {
                menus.map((menu) => (
                    <div>
                        {menu.name}<br/>
                        <form onSubmit={Increase} >
                        <input type='submit' size="large" value='+' onClick={e => setName(menu.name)}/>
                        </form>
                        <form onSubmit={Decrease}>
                        <input type='submit' size="large" value='-' onClick={e => setName(menu.name)}/>
                        </form>      
                    </div>
                ))}
            </div><br/>
            <h3>&emsp;총금액</h3>&emsp;<input class="input" id="price" name="price" onChange={chkPrice} val={price}/>
            <div style={{display:'inline'}} class="btn_loc">
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;    
            <button className="btn" onClick={resetVal}>초기화</button>&emsp;&emsp;
            <button className="btn" onClick={()=> {history.push("./ConfirmOrderMenu")}}> 선택완료 </button><br/>
            </div></div>
            </container>
        </div>
    );
}
export default OrderMenu;
