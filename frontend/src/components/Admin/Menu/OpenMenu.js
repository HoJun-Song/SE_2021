import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';

const OpenMenu = ( { history } ) => {
    /*const [id,setId] = useState('')
    const [name,setName] = useState('');
    const [errors, setErrors] = useState(false)*/
    
    const [menus, setMenus] = useState([])
    const [errors, setErrors] = useState(false)

    const getMenus = async () => {
        const response = await axios.get('http://127.0.0.1:8000/post/createMenu/')
        setMenus(response.data)
    }

    useEffect(() => {
        getMenus();
    }, [])

    /*const onSubmit = (e) => {
    e.preventDefault();
    const user = {
        id: id,
        name: name,
    };
    const OpenMenu = async () => {
        const {data} = await axios.get('http://127.0.0.1:8000/post/browseMenu/');
        console.log(data)
    }*/
       
    /*Axios.get('http://127.0.0.1:8000/post/browseMenu/',user)
        .then(res =>{
        console.log(res.data);
        //localStorage.setItem('token', res.data.key)
        //localStorage.getItem('token')
        //window.location.replace('./OpenOneMenu')
        //alert('메뉴가 선택되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        setId('')
        setName('')
        })
        //.then(()=>{
        //console.log(user)
        //})
    };*/

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
                    </div>
                )
                )
            }
            <input type='submit' size="large" value='선택'/>
            </div>
        </div>
    );
}
export default OpenMenu;