import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';
const SelectTable = ( { history } ) => {

    const [fulled_table, setTable] = useState([])
    const [index, setIndex] = useState()
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

    
    /*
    const table_full = fulled_table.map((index)=>
    <button className="btn_table_full">{index.table_id}</button>
    )*/

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            table_id: table_num[index],
        };
        Axios.post('http://127.0.0.1:8000/post/orderTable/',user)
        .then(res =>{
        alert('테이블이 선택되었습니다.')
        })
        .catch(err =>{
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
            <h2>테이블 선택</h2>
            <div style={{margin:'40px'}}>
           
            {tables}
            </div>
            </container><br/> 
            &emsp;&emsp;<h3 style={{display:'inline'}}>테이블 번호</h3>
            &emsp;&emsp;
            <textbox class="txtbox">{index}</textbox>
            &emsp;&emsp;<h3 style={{display:'inline'}}>사용중인 테이블</h3>&emsp;&emsp;
           {
               fulled_table.map((full)=>(
                <div style={{display:'inline'}}>
                    <textbox class="txtbox">{full.table_id}</textbox>
                </div>   
               ))
           }<br/><br/>
            <div class="btn_loc">
            
            <button class="btn" onClick={onSubmit}> 선택완료 </button>
            </div>
            </div>
        </div>
    );
}
export default SelectTable;