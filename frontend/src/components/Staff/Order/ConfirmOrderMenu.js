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
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <container>
            <div className="outbox">
            <h2>메뉴 주문</h2>
            <div className="innerbox">
            <h3>메뉴 이름 
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            수량 
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            금액</h3>
            <br/>
            {
                menus.map((menu)=>(
                    <div>
                    <textbox class="txtbox">{menu.menu_name}</textbox>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <textbox class="txtbox">{menu.amount_per_menu}</textbox>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <textbox class="txtbox">{menu.price_per_menu}</textbox><p/>
                    </div>
                ))
            }
            </div><br/>
            <h3>총금액</h3>
            <textbox className="txtbox"> {total_price}</textbox>
            <div class="btn_loc">
            <button className="btn" onClick={()=> {history.push("./SelectTable")}}> 테이블 주문 </button> &emsp;&emsp;
            <button className="btn" onClick={onSubmit2}> 포장 주문 </button><br/>
            </div>
            </div></container>
        </div>
    );
}
export default ConfirmOrderMenu;