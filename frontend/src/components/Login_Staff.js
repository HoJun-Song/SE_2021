import React, {useState} from 'react';
import Axios from 'axios';
import FindPW from './FindPW';

const Login_Admin = ( { history } ) => {
 const [staff_id,setID] = useState('');
 const [staff_pw,setPassword] = useState('');
 const [errors, setErrors] = useState(false)

 const onSubmit = (e) => {
  e.preventDefault();
  const user = {
    id: staff_id,
    password: staff_pw
  };

  Axios.post('http://127.0.0.1:8000/post/staff/login/',user)
  .then(res =>{
     
    localStorage.clear()
    localStorage.setItem('token', res.data.key)
    window.location.replace('./Main_Staff')
    //history.push("./Main_Admin")
    
  })
  .catch(err =>{
    console.clear()
    alert('아이디 또는 비밀번호가 일치하지 않습니다.')
    setID('')
    setPassword('')
  })
};

  return (
    <div>
      <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
      <h3> Login_Staff </h3>
      {errors === true && <h3>Cannot log in with provided credentials</h3>}
      <form onSubmit={onSubmit}>
        <input 
          id="staff_id" 
          name="staff_id" 
          placeholder="아이디를 입력해주세요"
          onChange={e => setID(e.target.value)}
        />
        <input
          id="staff_pw"
          name="staff_pw"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={e => setPassword(e.target.value)}
        /><br/>
        <input type='submit' size="large" value='로그인'/>
        <button onClick={ () => {history.push("./FindPW")} }>PW 찾기</button>
       </form>
    </div>
  );
}

export default Login_Admin;