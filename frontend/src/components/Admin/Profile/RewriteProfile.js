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
            <h2>직원 프로필 수정</h2><br/>
            <form onSubmit={onSubmit}>
            <h3>이름<br/>
            <input class="input" style={{width:"700px"}} id="name" name="name" onChange={e => setName(e.target.value)} 
            onChange={chkName} value={name}/><br/>
            ID<br/>
            <input class="input" style={{width:"700px"}} id="ID" name="ID" onChange={e => setID(e.target.value)} 
            onChange={chkID} value={staff_id}/><br/>
            PW<br/>
            <input class="input" style={{width:"700px"}} id="PW" type="password" name="PW" onChange={e => setPW(e.target.value)} 
            onChange={chkPW} value={staff_pw}/><br/>
            PW 확인<br/>
            <input class="input" style={{width:"700px"}} id="pw" type="password" name="pw"/><br/>
            전화번호<br/>
            <input class="input" id="pnum" name="pnum" onChange={e => setPnum(e.target.value)} 
            onChange={chkPnum} style={{width:"700px"}} value={phone_num}/><br/>
            <div className="btn_loc">
            <button className="btn" onClick={resetVal}>초기화</button>&emsp;&emsp;
            <input className="btn" type='submit' size="large" value='수정'/>
            </div></h3></form>
            </div></container>
        </div>
    );
}
export default RewriteProfile;