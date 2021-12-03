import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';

//12월 2일 : 직원 프로필 받아오는 기능 구현
//추가 구현 필요 : 직원 선택해서 세부 직원 편집하는 기능

const OpenSprofile = ( { history } ) => {

    const [staff_id, setID] = useState('')
    const [staff, setStaff] = useState([])
    
    const getStaff = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/browseStaffProfile/')
        setStaff(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        getStaff();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            staff_id: staff_id,
        };
        Axios.post('http://127.0.0.1:8000/post/detailStaffProfile/',user)
        .then(res =>{
        console.log(staff_id); //얘를 가공해서 저장한다음에 원메뉴로 넘긴다
        window.location.replace(`./OpenOne/?${staff_id}`)
        alert('직원이 선택되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    };

    return (
        <div>
            <h3> OpenSprofile </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            직원 프로필 <br/>
            {
                staff.map((staffs) => (
                    <div>
                        이름<br/>
                        {staffs.id}<br/>
                        {staffs.name}<br/>
                        <form onSubmit={onSubmit}>
                        <input type='submit' size="large" value='선택' onClick={e => setID(staffs.staff_id)}/>
                        </form>
                    </div>
                )
                )
            }
        </div>
    );
}
export default OpenSprofile;