import React, { useState } from 'react';
import Axios from 'axios';

//12월 2일 : 직원 등록 기능 구현, 새로 등록한 직원으로 로그인 성공까지 확인
//추가 구현 필요 : 백엔드에서 비밀번호 확인 기능이 필요. 받아온 두 비밀번호가 다르면 오류 출력

const MakeSprofile = ( { history } ) => {
    const [name,setName] = useState('');
    const [staff_id,setID] = useState('');
    const [staff_pw,setPW] = useState('');
    const [phone_num,setPnum] = useState('');

    const onSubmit = (e) => {
    e.preventDefault();
    const staff = {
        name: name,
        staff_id: staff_id,
        staff_pw: staff_pw,
        phone_num: phone_num
    };
       
    Axios.post('http://127.0.0.1:8000/post/createStaffProfile/',staff)
        .then(res =>{
        localStorage.clear()
        localStorage.setItem('token', res.data.key)
        alert('새 직원이 등록되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('입력이 잘못되었습니다.')
        })
    };
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
            <h3> MakeSprofile </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            <container>
            <br/>직원 프로필 생성<br/>
            <hr/>
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
            <input type='submit' size="large" value='생성'/>
            </form>
            </container>
        </div>
    );
}
export default MakeSprofile;