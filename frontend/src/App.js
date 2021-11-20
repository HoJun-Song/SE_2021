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
          <Route path="/RewriteProfile" component={RewriteProfile} />
          <Route path="/RewriteMenu" component={RewriteMenu} />
          <Route path="/OpenOne" component={OpenOne} />
          <Route path="/OpenOneMenu" component={OpenOneMenu} />
        </BrowserRouter>
      </div>
    )
  }
}
export default App;