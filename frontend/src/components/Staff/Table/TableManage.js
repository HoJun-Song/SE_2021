import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from 'axios';

const TableManage = ( { history } ) => {
    const [fulled_table, setTable] = useState()
    const [index, setIndex] = useState()

    const onSubmit2 = (e) => {
        e.preventDefault();
        const user = {
            table_id: index
        };
        Axios.post('http://127.0.0.1:8000/post/detailTable/',user)
        .then(res =>{
        window.location.replace(`./TableInfo/?${index}`)
        alert('테이블이 선택되었습니다.')
        })
        .catch(err =>{
        alert('잘못된 접근입니다.')
        })
    };
    
    const table_num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    const tables = table_num.map((index)=>
    (<button className="btn_table" onClick={()=>setIndex(index)}>{index}</button>));
    
    const getTables = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/showTable/')
        setTable(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        getTables();
    }, [])

    return (
        <div>
            <button className="btn_left" onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button className="btn_left2" onClick={()=> {history.push("../Main_Staff")}}> 홈버튼 </button>
            <h1 style={{color:"white", textAlign:"center", textSizeAdjust:"20"}}> RASZAS </h1>
            <button className="btn_right"onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <div class="outbox">
            <container>
            <h2>테이블 관리</h2>
            <div style={{margin:'40px'}}>
            {tables}
            </div>
            </container>
            &emsp;&emsp;<h3 style={{display:'inline'}}>테이블 번호</h3>
            &emsp;&emsp;
            <textbox class="txtbox">{index}</textbox>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <button class="btn" onClick={onSubmit2}> 선택완료 </button>
            </div>        
        </div>
    );
}
export default TableManage;