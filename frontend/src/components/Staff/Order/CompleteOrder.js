import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Axios from 'axios';
//주문 버튼 누르면 자동으로 amount 업데이트
const CompleteOrder = ( { history } ) => {
    const [menus, setMenus] = useState([])
    const [menu, setMenu] = useState()

    const getTimes = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/showOrderMenu/')
        setMenus(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        getTimes();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            name: menu.menu_name,
            order_id: menu.order_id
        };
        Axios.post('http://127.0.0.1:8000/post/checkMenuTime/',user)
        .then(res =>{
        alert('준비완료 되었습니다.')
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
            <div class="outbox">
            <h2>주문표</h2><br/>
            <div class="innerbox">
                <h3>메뉴명
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 
                    주문번호</h3><br/>
            {
                menus.map((menu)=>(
                    <div>
                        <textbox class="txtbox">{menu.menu_name}</textbox>
                        <textbox class="txtbox">{menu.order_id}</textbox>
                        <form style={{display:'inline'}} onSubmit={onSubmit}>
                        <input class="btn" type='submit' size="large" value='준비 완료' onClick={e => setMenu(menu)}/>
                        </form>

                    </div>
                ))
            }</div>
            </div>
            </container>
        </div>
    );
}
export default CompleteOrder;