import React,{ useState, useEffect } from 'react';
import Axios from 'axios';

const RewriteProfile = ( { history } ) => {
    const [name,setName] = useState('');
    const [staff_id,setID] = useState('');
    const [staff_pw,setPW] = useState('');
    const [phone_num,setPnum] = useState('');


    const current = decodeURI(window.location.href);
        const search = current.split("?")[1];
        console.log(search)
        const onSubmit3 = (e) => {
        const user = {
            staff_id: search,
        };
    Axios.post('http://127.0.0.1:8000/post/detailStaffProfile/',user)
        .then(res =>{
        console.log(res.data);
        setName(res.data.name)
        setID(res.data.staff_id)
        setPW(res.data.staff_PW)
        setPnum(res.data.phone_num)
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    }
    useEffect(() => {
        onSubmit3();
    }, [])

    const onSubmit = (e) => {//수정
        e.preventDefault();
        const staff = {
            name: name,
            staff_id: staff_id,
            staff_pw: staff_pw,
            phone_num: phone_num
        };
           
        Axios.post('http://127.0.0.1:8000/post/modifyStaffProfile/',staff)
            .then(res =>{
            localStorage.clear()
            localStorage.setItem('token', res.data.key)
            alert('직원 프로필이 수정되었습니다.')
            })
            .catch(err =>{
            console.clear()
            alert('입력이 잘못되었습니다.')
            })
        };
    //초기화 버튼 구현 
    
    const chkName = (e) =>{
        setName(e.target.value);
    }
    const chkID = (e) =>{
        setID(e.target.value);
    }
    const chkPW = (e) =>{
        setPW(e.target.value);
    }
    const chkPnum = (e) =>{
        setPnum(e.target.value);
    }
    const resetVal = () =>{
        setName('');
        setID('');
        setPW('');
        setPnum('');
    }
    
    return (
        <div>
            <h3> Rewriteprofile </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("../Main_Admin")}}> 홈버튼 </button>
            직원 프로필 수정<br/>
            <form onSubmit={onSubmit}>
            이름<br/>
            <input id="name" name="name" onChange={e => setName(e.target.value)} 
            onChange={chkName} value={name}/><br/>
            ID<br/>
            <input id="ID" name="ID" onChange={e => setID(e.target.value)} 
            onChange={chkID} value={staff_id}/><br/>
            PW<br/>
            <input id="PW" name="PW" onChange={e => setPW(e.target.value)} 
            onChange={chkPW} value={staff_pw}/><br/>
            PW 확인<br/>
            <input id="pw" placeholder="123456789" name="pw"/><br/>
            전화번호<br/>
            <input id="pnum" name="pnum" onChange={e => setPnum(e.target.value)} 
            onChange={chkPnum} value={phone_num}/><br/>
            <hr/>
            <button onClick={resetVal}>초기화</button>
            <input type='submit' size="large" value='수정'/>
            </form>
        </div>
    );
}
export default RewriteProfile;