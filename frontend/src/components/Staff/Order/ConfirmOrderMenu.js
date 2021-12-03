import React,{useState, useEffect} from 'react';
import axios from 'axios';
//주문 버튼 누르면 자동으로 amount 업데이트
const ConfirmOrderMenu = ( { history } ) => {
    const [total_price, setTPrice] = useState([])
    const [menus, setMenus] = useState([])
    const getStocks = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/finishMenu/')
        setMenus(response.data)
        setTPrice(response.data[0].total_price)
        console.log(response.data[0].total_price)
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
            메뉴 이름 수량 금액
            <br/>
            {
                menus.map((menu)=>(
                    <div>
                    {menu.menu_name}
                    {menu.amount_per_menu}
                    {menu.price_per_menu}
                    </div>
                ))
            }<br/>
            총금액{total_price}<br/>
            <button onClick={()=> {history.push("./SelectTable")}}> 테이블 주문 </button><br/>
            <button onClick={()=> {history.push("./Payment")}}> 포장 주문 </button><br/>
            </container>
        </div>
    );
}
export default ConfirmOrderMenu;