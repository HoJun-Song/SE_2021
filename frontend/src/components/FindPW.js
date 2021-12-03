import React, {useState} from 'react';
import Axios from 'axios';

const FindPW = ({history}) =>{

    const [name,setName] = useState('');
    const [staff_id,setStaff_ID] = useState('');
    const [phone_num,setPhone_Num] = useState('');
    const [staff_pw] = useState('');
    const [errors, setErrors] = useState(false)
   
    const onSubmit = (e) => {
     e.preventDefault();
     const user = {
       name: name,
       id: staff_id,
       phone_num: phone_num
     };
   
     Axios.post('http://127.0.0.1:8000/post/staff/login/',user)
     .then(res =>{
        
       localStorage.clear()
       localStorage.setItem('token', res.data.key)
       localStorage.getItem('token')
       alert('당신의 비밀번호는', staff_pw ,'입니다')
       
     })
     .catch(err =>{
       console.clear()
       alert('회원 정보가 없습니다.')
       setName('')
       setStaff_ID('')
       setPhone_Num('')
     })
   };


    return(
    <div>
    <div className="btn_left">
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button> &ensp;&ensp;
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            </div>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <div className="btn_right">
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button>
            </div>
            <container>
            <div class="outbox">
        <form onSubmit={onSubmit}>
          <h2>PW찾기</h2><br/>
          <h3>이름<br/>
          <input style={{width:'700px', marginBottom:'10px'}} class="input" id="name" name="name" onChange={e => setName(e.target.value)} /><br/>
          ID<br/>
          <input style={{width:'700px', marginBottom:'10px'}} class="input" id="staff_id" name="staff_id" onChange={e => setStaff_ID(e.target.value)} /><br/>
          전화번호<br/>
        <input style={{width:'700px', marginBottom:'10px'}} class="input" id="phone_num" name="phone_num" onChange={e => setPhone_Num(e.target.value)} /><br/><br/><br/>
          <div className="btn_loc">
          <input className="btn" type='submit' size="large" value='PW 찾기'/>
          </div>
        </h3></form>
        </div></container>
      </div>
        );
    }

export default FindPW;