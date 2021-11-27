import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Axios from 'axios';


const OrderMenu = ( { history } ) => {
    console.log('rebuild');
   
    const [menus, setMenus] = useState([])
    const [count, setCount] = useState('')
    const [price, setPrice] = useState('')

    const getMenus = async () => {
        const response = await axios.get('http://127.0.0.1:8000/post/browseMenu/')
        setMenus(response.data)
    }
    /*const Increase = async ()=> {
        const res = await axios.post('http://127.0.0.1:8000/post/orderMenu/')
        setCount(res.data)
        count + 1 ;
    }*/
    Axios.post('http://127.0.0.1:8000/post/orderMenu/',user)
    .then(res =>{
      localStorage.clear()
      localStorage.Increase(res.data)
    })
    const Decrease = async ()=> {
        const res = await axios.post('http://127.0.0.1:8000/post/orderMenu/')
        setCount(res.data)
    }
    /*const getPrice = async () => {
        const response = await axios.get(('http://127.0.0.1:8000/post/finishMenu/')
        setPrice(response.data)
    }*/

    useEffect(() => {
        getMenus();
    }, [])

    /*const Increase = () => {
        setCount(count + 1);
    }
    const Decrease = () => {
        setCount(count - 1);
    }*/
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
                    </div>
                ))}
                <button name="inc" onClick={Increase} value='+'>
                </button>
                <button name="dec" onClick={Decrease} value='-'>
                </button>
                <br/>
            <hr/>
            
            총금액 <input id="price" name="price"/>
            <button>초기화</button>
            <button onClick={()=> {history.push("./ConfirmOrderMenu")}}> 선택완료 </button><br/>
            </container>
        </div>
    );
}
export default OrderMenu;