import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Axios from 'axios';
//주문 버튼 누르면 자동으로 amount 업데이트
const ConfirmOrderMenu = ( { history } ) => {
    const [total_price, setTPrice] = useState()
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
    const onSubmit2 = (e) => {
        e.preventDefault();
        const user = {
            table_id: 0,
        };
        Axios.post('http://127.0.0.1:8000/post/checkPay/',user)
        .then(res =>{
        window.location.replace(`../Payment/?${0}`)
        alert('포장 주문으로 이동합니다.')
        })
        .catch(err =>{
        alert('잘못된 접근입니다.')
        })
    };
    return (
        <div>
            <h3> ConfirmOrderMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button><br/>
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
            <button onClick={onSubmit2}> 포장 주문 </button><br/>
            </container>
        </div>
    );
}
export default ConfirmOrderMenu;