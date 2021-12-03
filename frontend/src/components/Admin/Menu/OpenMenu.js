import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';

const OpenMenu = ( { history } ) => {

    const [name, setName] = useState('');
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
        console.log(res.data); //얘를 가공해서 저장한다음에 원메뉴로 넘긴다
        window.location.replace(`./OpenOneMenu/?${res.data.menu_name}`)
        alert('메뉴가 선택되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    };
    

    return (
        <div>
            <h3> OpenMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <hr/>
            메뉴 ID <br/>
           
            <div>
            {
                menus.map((menu) => (
                    <div>
                        {menu.id}<br/>
                        {menu.name}<br/>
                        <form onSubmit={onSubmit}>
                        <input type='submit' size="large" value='선택' onClick={e => setName(menu.name)}/>
                        </form>
                    </div>
                )
                )
            }
                </div>
            </div>
    );
}
export default OpenMenu;
