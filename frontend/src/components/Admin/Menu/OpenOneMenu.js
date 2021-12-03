import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';

const OpenOneMenu = ( { history } ) => {
    const [menu_name, setMenuName] = useState([])
    const [menu_category, setMenuCategory] = useState([])
    const [menu_price, setMenuPrice] = useState([])
    const [amount_per_menu, setAmount] = useState([])
    const [stock_per_menu, setStock] = useState([])
    
    const [menu, setMenu] = useState('')

    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    console.log(search)
    const onSubmit = (e) => {
        const user = {
            name: search,
        };
        Axios.post('http://127.0.0.1:8000/post/getSelectedMenu/',user)
        .then(res =>{
        console.log(res.data);
        setMenuName(res.data.menu_name)
        setMenuCategory(res.data.menu_category)
        setMenuPrice(res.data.menu_price)
        setAmount(res.data.amount_per_menu)
        setStock(res.data.stock_per_menu)
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
        
    };
    useEffect(() => {
        onSubmit();
    }, [])
    const onSubmit2 = (d) => {
        d.preventDefault();
        const user = {
            name: search,
        };
        Axios.post('http://127.0.0.1:8000/post/getSelectedMenu/',user)
        .then(res =>{
        console.log(res.data); //얘를 가공해서 저장한다음에 원메뉴로 넘긴다
        window.location.replace(`../RewriteMenu/?${res.data.menu_name}`)
        alert('메뉴 수정 창으로 이동합니다..')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    };

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
            <div className="outbox">
            <h2>메뉴</h2>
                {menu_name}<br/>
                {menu_category}<br/>
                {menu_price}<br/>
                {stock_per_menu}<br/>
                {amount_per_menu}<br/> 
                <form className="btn_loc" onSubmit={onSubmit2}>
                    <input class="btn" type='submit' size="large" value='수정' onClick={d => setMenu(menu_name)}/>
                </form>
            </div>
        </div>
    );
}
export default OpenOneMenu;
