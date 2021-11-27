import React, {useState, useEffect} from 'react';
import axios from 'axios';
//DB에서 요청 후 받아오는 작업 필요

const OpenOneMenu = ( { history } ) => {
    //const [id] = useState('')
    const [menu,setMenu] = useState("")
       
    //const onSubmit = (e) => {
    e.preventDefault();
    /*const user = {
        id: id,
        name: name,
        category: category,
        price: price,
        stock_name: stock_name,
        amount: amount
    };*/
       
    const getOneMenu = async () => {
        const {data} = await axios.get('http://127.0.0.1:8000/post/createMenu/')
        console.log(data)
        setMenu(data)
    }
    useEffect(()=>{
        getOneMenu();
    },[])
    
    /*Axios.get('http://127.0.0.1:8000/post/createMenu/',user)
        .then(res =>{
        localStorage.clear()
        localStorage.setItem('token', res.data.key)
        alert('메뉴가 등록되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('입력이 잘못되었습니다.')
        setName('')
        setCate('')
        setPrice('')
        setStockName('')
        setStockAmount('')
        })
        
    }; */



    return (
        <div>
            <h3> OpenOneMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
           <div>
               {menu.name}<br/>
               {menu.category}<br/>
               {menu.price}<br/>
               {menu.stock_name}<br/>
               {menu.amount}<br/>
               <button>초기화</button>
            <button onClick={()=> {history.push("./RewriteMenu")}}> 수정 </button>
           </div>
        </div>
    );
}
export default OpenOneMenu;