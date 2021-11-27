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
    <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
    {errors === true && <h3>Cannot log in with provided credentials</h3>}
    <form onSubmit={onSubmit}>
        PW찾기<br/>
        이름<br/>
        <input id="name" name="name" onChange={e => setName(e.target.value)} /><br/>
        ID<br/>
        <input id="staff_id" name="staff_id" onChange={e => setStaff_ID(e.target.value)} /><br/>
        전화번호<br/>
        <input id="phone_num" name="phone_num" onChange={e => setPhone_Num(e.target.value)} /><br/>
        <input className="btn" type='submit' size="large" value='PW 찾기'/>
    </form>
    </div>
        );
    }

export default FindPW;