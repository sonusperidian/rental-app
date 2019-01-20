import React, { Component } from 'react';
import  {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';


import Header from './shared/header';
import CardList from './component/cards/cardList';
import CardDetails from './component/cards/rentalDetails';
import Register from './component/register/register';
import Login from './component/login/login';
import {checkLoginStatus} from './actions/actions';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import './App.css';

axios.interceptors.request.use(config=> {
  const auth_token = localStorage.getItem("auth_token");
  config.headers.Authorization=auth_token;
  console.log('config=>', config)
  return config;
}, function (error) {
   return Promise.reject(error);
});


class App extends Component {
  render() {

    this.props.checkLoginStatus(); 
  


    return (

      
        <BrowserRouter>
          <div className="App">
            <Header />

            <Route exact path = '/rentals/:id' component = {CardDetails} />
            <Route exact path = '/rentals' component = {CardList} />
            <Route exact path = '/register' component = {Register}/>
            <Route exact path ='/login' component={Login} />
          
          </div>


        </BrowserRouter>

     
   
    );
  }
}

const mapActionToProps = (dispatch)=>{
  return{
    checkLoginStatus: ()=>{dispatch(checkLoginStatus())}
  }
  
}


export default connect(null, mapActionToProps) (App);
