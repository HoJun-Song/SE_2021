import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Axios from 'axios';

//Stock

const AnalyzeStock = ( { history } ) => {

  const [name, setName] = useState([])
  const [unit, setUnit] = useState([])
  const [price, setPrice] = useState([])
  const [menu_name, setMenuName] = useState([])
  const [amount_per_menu, setAmount] = useState([])

  const current = decodeURI(window.location.href);
  const search = current.split("?")[1];
  console.log(search)
  const onSubmit = (e) => {
      const user = {
          name: search,
      };
      Axios.post('http://127.0.0.1:8000/post/detailStock/',user)
      .then(res =>{
      console.log(res.data);
      setName(res.data.name)
      setUnit(res.data.unit)
      setPrice(res.data.price)
      setMenuName(res.data.menu_name)
      setAmount(res.data.amount_per_menu)
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
      Axios.post('http://127.0.0.1:8000/post/modifyStock/',user)
      .then(res =>{
      console.log(res.data); //얘를 가공해서 저장한다음에 원메뉴로 넘긴다
      window.location.replace(`../RewriteStock/?${res.data.name}`)
      alert('메뉴 수정 창으로 이동합니다..')
      })
      .catch(err =>{
      console.clear()
      alert('잘못된 접근입니다.')
      })
  };
    return (
        <div>
            <h3> AnlayzeStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            {name}<br/>
            {unit}<br/>
            {price}<br/>
            {menu_name}<br/>
            {amount_per_menu}<br/>
            <form onSubmit={onSubmit2}>
                <input type='submit' size="large" value='수정' onClick={d => setName(name)}/>
            </form>
        </div>
    );
}
export default AnalyzeStock;
