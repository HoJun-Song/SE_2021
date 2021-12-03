import React, {useState} from 'react';
import Axios from 'axios';
import RASZAS from '../img/RASZAS.jpg';

const Login_Admin = ( { history } ) => {
 const [id,setID] = useState('');
 const [password,setPassword] = useState('');
 const [errors, setErrors] = useState(false)

 const onSubmit = (e) => {
  e.preventDefault();
  const user = {
    id: id,
    password: password
  };

  Axios.post('http://127.0.0.1:8000/post/manager/login/',user)
  .then(res =>{
     
    localStorage.clear()
    localStorage.setItem('token', res.data.key)
    window.location.replace('./Main_Admin')
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
      <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
      <h1 style={{color:"white", textAlign:"center"}}> RASZAS </h1>
      <img
            src={ RASZAS }
            width='500'
            height='300'
            textAlign="center"
            alt='RASZAS' /><p/><br/>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button className="btn" style={{display:'inline'}}>ID</button>
        <input class="input"
          id="id" 
          name="id" 
          placeholder="아이디를 입력해주세요"
          onChange={e => setID(e.target.value)}
        /><br/><br/>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button className="btn" style={{display:'inline'}}>PW</button>
        <input class="input"
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={e => setPassword(e.target.value)}
        /><br/><br/>
        <form className="btn_loc" onSubmit={onSubmit}>
        <input className="btn" type='submit' size="large" value='로그인'/>
       </form>
    </div>
  );
}

export default Login_Admin;