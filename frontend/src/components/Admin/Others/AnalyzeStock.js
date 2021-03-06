import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Axios from 'axios';

//Stock

const AnalyzeStock = ( { history } ) => {

  const [name, setName] = useState([])
  const [unit, setUnit] = useState([])
  const [price, setPrice] = useState([])
  const [menu, setMenu] = useState([])

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
      setName(res.data[0].name)
      setUnit(res.data[0].unit)
      setPrice(res.data[0].price)
      setMenu(res.data)
      })
      .catch(err =>{

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
      Axios.post('http://127.0.0.1:8000/post/detailStock/',user)
      .then(res =>{
      console.log(res.data); //얘를 가공해서 저장한다음에 원메뉴로 넘긴다
      window.location.replace(`../RewriteStock/?${res.data[0].name}`)
      alert('재고 수정 창으로 이동합니다..')
      })
      .catch(err =>{
      alert('잘못된 접근입니다.')
      })
  };
    return (
        <div>
            <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <container>
            <h2>재고 정보</h2>
            <h3>재고 이름
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            재고 단위<br/>
            <textbox class="input">{name}</textbox>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
            {unit}<p/>
            단위 당 가격<br/>
            <textbox class="input">{price}</textbox><p/>
            <div class="innerbox">
            {
                menu.map((menus)=>(
                    <div>
                    <textbox class="input">{menus.menu_name}</textbox>&emsp;&emsp;&emsp;
                    <textbox class="input">{menus.amount_per_menu}</textbox><p/>
                    </div>    
                ))
            }
            </div><br/>
            <div class="btn_loc">
            <form onSubmit={onSubmit2}>
                <input className="btn" type='submit' size="large" value='수정' onClick={d => setName(name)}/>
            </form>
            </div></h3></container></div>
        </div>
        </div>
    );
}
export default AnalyzeStock;
