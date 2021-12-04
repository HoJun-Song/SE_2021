import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';

//12월 2일 : DB에서 재고 받아오는 기능 구현
//12월 3일 : 재고 선택 기능 구현
//추가 구현 필요 : 재고 구매

const TrackStock = ( { history } ) => {
    const [name, setName] = useState('')
    const [stock, setStock] = useState([])
    
    const getStock = async () => {
        const response = await axios.post('http://127.0.0.1:8000/post/browseStock/')
        setStock(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        getStock();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            name: name,
        };
        Axios.post('http://127.0.0.1:8000/post/detailStock/',user)
        .then(res =>{
        console.log(res.data); //얘를 가공해서 저장한다음에 원메뉴로 넘긴다
        window.location.replace(`./AnalyzeStock/?${res.data[0].name}`)
        alert('재고가 선택되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    };

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
            <div class="outbox">
            <h2>재고 현황</h2>
            <container>
            <h3>&emsp;재고 ID 
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                재고 이름 
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                현재 재고량<p/>
            {
                stock.map((stocks) => (
                    <div>
                        &emsp;&emsp;{stocks.id}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        &emsp;&emsp;&emsp;&emsp;{stocks.name}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        &emsp;&emsp;{stocks.amount}&emsp;&emsp;&emsp;
                        <form style={{display:'inline'}} onSubmit={onSubmit}>
                        <input class="btn" type='submit' size="large" value='선택' onClick={e => setName(stocks.name)}/>
                        </form>
                    </div>
                ))
            }
            </h3></container>
            <div class="btn_loc">
            <button class="btn" onClick={()=> {history.push("./RegisterStock")}}> 재고등록 </button>&emsp;&emsp;
            <button class="btn" onClick={()=> {history.push("./OrderStock")}}> 재고주문 </button>
            </div>
            </div>
        </div>
    );
}
export default TrackStock;