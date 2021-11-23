import React, {useState} from 'react';
import Axios from 'axios';

const OpenMenu = ( { history } ) => {
    const [id,setId] = useState('')
    const [name,setName] = useState('');
    const [errors, setErrors] = useState(false)
       
    const onSubmit = (e) => {
    e.preventDefault();
    const user = {
        id: id,
        name: name,
    };
       
    Axios.get('http://127.0.0.1:8000/post/browseMenu/',user)
        .then(res =>{
        localStorage.setItem('token', res.data.key)
        localStorage.getItem('token')
        window.location.replace('./OpenOneMenu')
        //alert('메뉴가 선택되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        setId('')
        setName('')
        })
        .then(()=>{
        console.log(user)
        })
    };

    return (
        <div>
            <h3> OpenMenu </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <hr/>
            <form onSubmit={onSubmit}>
            메뉴 ID <br/>
            <input id="id" name="id" onChange={e => setId(e.target.value)} />
            <input id="name" name="name" onChange={e => setName(e.target.value)} />
            <input type='submit' size="large" value='선택'/>
            </form>
        </div>
    );
}
export default OpenMenu;