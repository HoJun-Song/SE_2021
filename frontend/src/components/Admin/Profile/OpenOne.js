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
            <div className="btn_left">
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            </div>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <div className="btn_right">
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            </div>
            <container>
            <div className="outbox">
            <h2>직원 프로필</h2><br/>
            <h3>이름<br/>
            <input style={{width:'700px'}} className="input" id="name" name="name" value={name}/><br/><br/>
            ID<br/><input style={{width:'700px'}} className="input" id="staff_id" name="staff_id" value={staff_id}/><br/><br/>
            전화번호<br/><input style={{width:'700px'}} className="input" id="phone_num" name="phone_num" value={phone_num}/><br/><br/><br/><br/>
            <form className="btn_loc" onSubmit={onSubmit2}>
            <input className="btn" type='submit' size="large" value='수정' onClick={d => setID(staff_id)}/>
            </form></h3>
            </div>
            </container>
        </div>
    );
}
export default OpenOne;