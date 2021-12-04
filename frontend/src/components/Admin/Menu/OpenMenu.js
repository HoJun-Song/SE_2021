import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';

const OpenMenu = ( { history } ) => {

    const [name, setName] = useState();
    const [menus, setMenus] = useState([])

    const getMenus = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/browseMenu/')
        setMenus(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        getMenus();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            name: name,
        };
        Axios.post('http://127.0.0.1:8000/post/getSelectedMenu/',user)
        .then(res =>{
        console.log(res.data.menu_name); //얘를 가공해서 저장한다음에 원메뉴로 넘긴다
        window.location.replace(`./OpenOneMenu/?${res.data[0].menu_name}`)
        alert('메뉴가 선택되었습니다.')
        })
        .catch(err =>{
        alert('잘못된 접근입니다.')
        })
    };

    return (
        <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <h2>메뉴</h2>
            <h3>&emsp;메뉴 ID</h3>
            <div>
            {
                menus.map((menu) => (
                    <div>
                        &emsp;&emsp;<div style={{display:'inline'}}>{menu.id}</div>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <div style={{display:'inline'}}>{menu.name}</div>&emsp;&emsp;&emsp;
                        <form class="btn_loc" style={{display:'inline'}} onSubmit={onSubmit}>
                        <input class="btn_cate" class="btn" type='submit' size="large" value='선택' onClick={e => setName(menu.name)}/><br/>
                        </form>
                    </div>
                )
                )
            }
            </div>
            </div>
        </div>
    );
}
export default OpenMenu;
