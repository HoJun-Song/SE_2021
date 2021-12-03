import React,{useState, useEffect} from 'react';
import Axios from 'axios';

//DB에서 요청 후 받아오는 작업 필요
const OpenOne = ( { history } ) => {
    const [name, setName] = useState('')
    const [staff_id, setID] = useState('')
    const [phone_num, setPnum] = useState('')


    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    console.log(search)
    const onSubmit = (e) => {
        const user = {
            staff_id: search,
        };
        Axios.post('http://127.0.0.1:8000/post/detailStaffProfile/',user)
        .then(res =>{
        console.log(res.data);
        setName(res.data.name)
        setID(res.data.staff_id)
        setPnum(res.data.phone_num)
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    console.log(staff_id)
    };
    useEffect(() => {
        onSubmit();
    }, [])
    const onSubmit2 = (d) => {
        d.preventDefault();
        const user = {
            staff_id: search,
        };
        Axios.post('http://127.0.0.1:8000/post/detailStaffProfile/',user)
        .then(res =>{
        console.log(res.data.staff_id); //얘를 가공해서 저장한다음에 원메뉴로 넘긴다
        window.location.replace(`../RewriteProfile/?${res.data.staff_id}`)
        alert('프로필 수정 창으로 이동합니다..')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    };
    
    return (
        <div>
            <h3> OpenOne </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            직원 프로필<br/>
            
            이름<br/>
            {name}<br/>
            {staff_id}<br/>
            {phone_num}
            <form onSubmit={onSubmit2}>
            <input type='submit' size="large" value='수정' onClick={d => setID(staff_id)}/>
            </form>
            
        </div>
    );
}
export default OpenOne;