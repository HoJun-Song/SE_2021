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
        window.location.replace(`./AnalyzeStock/?${res.data.name}`)
        alert('재고가 선택되었습니다.')
        })
        .catch(err =>{
        console.clear()
        alert('잘못된 접근입니다.')
        })
    };

    return (
        <div>
            <h3> TrackStock </h3>
            <button onClick={ () => {history.goBack()} }> 뒤로 버튼 </button>
            <button onClick={()=> {history.push("./")}}> 로그아웃 </button>
            <button onClick={()=> {history.push("./Main_Admin")}}> 홈버튼 </button><br/>
            
            재고 ID 재고 이름 현재 재고량<br/><hr/>
            {
                stock.map((stocks) => (
                    <div>
                        {stocks.id}
                        {stocks.name}
                        {stocks.amount}
                        <form onSubmit={onSubmit}>
                        <input type='submit' size="large" value='선택' onClick={e => setName(stocks.name)}/>
                        </form>
                    </div>
                )
                )
            }
            <button onClick={()=> {history.push("./RegisterStock")}}> 재고등록 </button>
            <button onClick={()=> {history.push("./OrderStock")}}> 재고주문 </button>
        </div>
    );
}
export default TrackStock;