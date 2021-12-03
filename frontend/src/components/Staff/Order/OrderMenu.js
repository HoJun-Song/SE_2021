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
    return (
        <div>
            <h3> OrderMenu </h3>
            <br/>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Staff")}}> 홈버튼 </button>
            <container><br/>
            <hr/>
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
                <br/>
            <hr/>
            총금액 {price}<br/>
            <button>초기화</button>
            <button onClick={()=> {history.push("./ConfirmOrderMenu")}}> 선택완료 </button><br/>
            </container>
        </div>
    );
}
export default OrderMenu;
