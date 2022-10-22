import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import './App.css';
import { Provider } from 'react-redux';
import store  from './store';

import MainPage from './components/LandingPage/mainpage';
import Homepage from './components/basic/homepage/homepage';
import Dashboard from './components/dashboard/backbone';
import './fonts/Montserrat-VariableFont_wght.ttf'

function App() {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <nav>
          <Route exact path="/" component={MainPage} />
          <Route path={"/login"+ '/' +store.getState().main.language[0]}  component={Homepage} />
          <Route path={"/login"+ '/' +store.getState().main.language[1]}  component={Homepage} />
          <Route exact path="/user" component={Dashboard}/>
          <Route path="/user/:options" component={Dashboard}></Route>
        </nav>
      </BrowserRouter>
    </Provider> 

  );
}
export default App;