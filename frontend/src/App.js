import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; //React-Router import
import Login_Admin from './components/Login_Admin';
import Login_Staff from './components/Login_Staff';
import Home from './components/Home';
import FindPW from './components/FindPW';

class App extends Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/Login_Admin" component={Login_Admin} />
          <Route path="/Login_Staff" component={Login_Staff} />
          <Route path="/FindPW" component={FindPW} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;