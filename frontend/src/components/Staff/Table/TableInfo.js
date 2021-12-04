import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';

const TableInfo = ( { history } ) => {
    const [delay_time, setTime] = useState()
    const [tableinfo, setTable] = useState([])

    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    console.log(search)
    const onSubmit = (e) => {
        const user = {
            table_id: search,
        };
        Axios.post('http://127.0.0.1:8000/post/detailTable/',user)
        .then(res =>{
        console.log(res.data);
        setTable(res.data)
        setTime(res.data[0].delay_time)
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
        
    };
    useEffect(() => {
        onSubmit();
    }, [])
    const onSubmit2 = (d) => {
        d.preventDefault();
        const user = {
            table_id: search,
        };
        Axios.post('http://127.0.0.1:8000/post/showTable/',user)
        .then(res =>{
        window.location.replace(`../MoveTable/?${search}`)
        alert('테이블 이동 창으로 이동합니다.')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    };
    const onSubmit3 = (f) => {
        f.preventDefault();
        const user = {
            table_id: search,
        };
        Axios.post('http://127.0.0.1:8000/post/showTable/',user)
        .then(res =>{
        window.location.replace(`../Payment/?${search}`)
        alert('결제 창으로 이동합니다.')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    };
    return (
        <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <container>
            <h2>{search}번 테이블</h2><br/>
            <h3>메뉴 
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                수량
            {
                tableinfo.map((table)=>(
                    <div>
                    <textbox class="txtbox">{table.name}</textbox>
                    <textbox class="txtbox">{table.amount}</textbox>
                    </div>
                ))
            }<br/>
            소요 시간
            {delay_time}<br/>
            </h3>
            <div class="btn_loc">
            <button class="btn" onClick={onSubmit2}> 테이블이동 </button>&emsp;&emsp;
            <button class="btn" onClick={onSubmit3}> 결제 </button>
            </div>
            </container>
            </div>
        </div>
    );
}
export default TableInfo;