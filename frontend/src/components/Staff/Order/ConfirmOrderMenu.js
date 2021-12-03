import React,{useState, useEffect} from 'react';
import axios from 'axios';
//주문 버튼 누르면 자동으로 amount 업데이트
const ConfirmOrderMenu = ( { history } ) => {
    const [menu_name, setMenus] = useState([])
    const [amount_per_menu, setAmount] = useState([])
    const [price_per_menu, setPrice] = useState([])
    const [total_price, setTPrice] = useState([])
    const getStocks = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/finishMenu/')
        setMenus(response.data.menu_name)
        setAmount(response.data.amount_per_menu)
        setPrice(response.data.price_per_menu)
        setTPrice(response.data.total_price)
    }
    useEffect(() => {
        getStocks();
    }, [])
    
    return (
        <div>
            <h3> ConfirmOrderMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            메뉴 주문<br/><hr/>
            <br/>
            메뉴:{menu_name}<br/>
            수량:{amount_per_menu}<br/>
            금액:{price_per_menu}<br/>
            총 금액:{total_price}<br/>
            <button onClick={()=> {history.push("./SelectTable")}}> 테이블 주문 </button><br/>
            <button onClick={()=> {history.push("./Payment")}}> 포장 주문 </button><br/>
            </container>
        </div>
    );
}
export default ConfirmOrderMenu;