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
            <h3> CompleteOrder </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button><br/>
            <hr/>
            <container>
            주문표<br/><hr/>
            메뉴명 주문번호<br/>
            {
                menus.map((menu)=>(
                    <div>
                        {menu.menu_name}
                        {menu.order_id}
                        <form class="btn_loc" style={{display:'inline'}} onSubmit={onSubmit}>
                        <input class="btn" type='submit' size="large" value='준비 완료' onClick={e => setMenu(menu)}/>
                        </form>

                    </div>
                ))
            }
            
            </container>
        </div>
    );
}
export default CompleteOrder;