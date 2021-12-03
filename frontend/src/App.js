//Modules
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; //React-Router import

//Home 
import Login_Admin from './components/Admin/Login_Admin';
import Login_Staff from './components/Login_Staff';
import Home from './components/Home';
import FindPW from './components/FindPW';

//Admin func.
import Main_Admin from './components/Admin/Main_Admin';

//Staff Profile
import MakeSprofile from './components/Admin/Profile/MakeSprofile'
import OpenSprofile from './components/Admin/Profile/OpenSprofile';
import RewriteProfile from './components/Admin/Profile/RewriteProfile';
import OpenOne from './components/Admin/Profile/OpenOne';

//Menu
import RegisterMenu from './components/Admin/Menu/RegisterMenu';
import OpenMenu from './components/Admin/Menu/OpenMenu';
import RewriteMenu from './components/Admin/Menu/RewriteMenu';
import OpenOneMenu from './components/Admin/Menu/OpenOneMenu';

//Others
import OpenTime from './components/Admin/Others/OpenTime';
import TrackStock from './components/Admin/Others/TrackStock';
import AnalyzeSale from './components/Admin/Others/AnalyzeSale';
import OrderStock from './components/Admin/Others/OrderStock';
import OpenOneAnalyze from './components/Admin/Others/OpenOneAnalyze';
import RegisterStock from './components/Admin/Others/RegisterStock';
import AnalyzeStock from './components/Admin/Others/AnalyzeStock';
import RewriteStock from './components/Admin/Others/RewriteStock';
import ConfirmOrderStock from './components/Admin/Others/ConfirmOrderStock';


//Staff func.
import Main_Staff from './components/Staff/Main_Staff';

//Order
import OrderMenu from './components/Staff/Order/OrderMenu';
import ConfirmOrderMenu from './components/Staff/Order/ConfirmOrderMenu';
import CompleteOrder from './components/Staff/Order/CompleteOrder';

//Table
import TableManage from './components/Staff/Table/TableManage';
import SelectTable from './components/Staff/Table/SelectTable';
import TableInfo from './components/Staff/Table/TableInfo';
import MoveTable from './components/Staff/Table/MoveTable';

//Payment
import Payment from './components/Staff/Pay/Payment';
import Card from './components/Staff/Pay/Card';
import Cash from './components/Staff/Pay/Cash';
import CompletePay from './components/Staff/Pay/CompletePay';

class App extends Component {
  render() {
    return(
      <div>  
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/Login_Admin" component={Login_Admin} />
          <Route path="/Login_Staff" component={Login_Staff} />
          <Route path="/FindPW" component={FindPW} />
          <Route path="/Main_Admin" component={Main_Admin} />
          <Route path="/MakeSprofile" component={MakeSprofile} />
          <Route path="/OpenMenu" component={OpenMenu} />
          <Route path="/OpenSprofile" component={OpenSprofile} />
          <Route path="/OpenTime" component={OpenTime} />
          <Route path="/RegisterMenu" component={RegisterMenu} />
          <Route path="/TrackStock" component={TrackStock} />
          <Route path="/AnalyzeSale" component={AnalyzeSale} />
          <Route path="/RewriteProfile/:staff_id?" component={RewriteProfile} />
          <Route path="/RewriteMenu/:menu_name?" component={RewriteMenu} />
          <Route path="/OpenOne/:staff_id?" component={OpenOne} />
          <Route path="/OpenOneMenu/:menu_name?" component={OpenOneMenu} />
          <Route path="/Main_Staff" component={Main_Staff} />
          <Route path="/OrderMenu" component={OrderMenu} />
          <Route path="/TableManage" component={TableManage} />
          <Route path="/OrderStock" component={OrderStock} />
          <Route path="/OpenOneAnalyze" component={OpenOneAnalyze} />
          <Route path="/RegisterStock" component={RegisterStock} />
          <Route path="/AnalyzeStock/:name?" component={AnalyzeStock} />
          <Route path="/RewriteStock/:name?" component={RewriteStock} />
          <Route path="/ConfirmOrderStock" component={ConfirmOrderStock} />
          <Route path="/ConfirmOrderMenu" component={ConfirmOrderMenu} />
          <Route path="/SelectTable" component={SelectTable} />
          <Route path="/Payment" component={Payment} />
          <Route path="/Cash" component={Cash} />
          <Route path="/Card" component={Card} />
          <Route path="/CompletePay" component={CompletePay} />
          <Route path="/CompleteOrder" component={CompleteOrder} />
          <Route path="/TableInfo" component={TableInfo} />
          <Route path="/MoveTable" component={MoveTable} />
        </BrowserRouter>
      </div>
    )
  }
}
export default App;