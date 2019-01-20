import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';

import LoginForm from './loginForm';
import * as actions from '../../actions/actions';

class Login extends Component{
    state = {
        errors:[]
    }

   
 
    render(){
        if(this.props.state.isLogged){
            return <Redirect to='/rentals' />
        }

        return(
            <LoginForm serverError = {this.props.state.errors?this.props.state.errors:[]}
            errors={this.state.errors} 
            loginUser={(values)=>this.props.loginUser(values)}/>
        )
    }
 
}

const mapStateToProps = (state)=>{

    return{
        state : state.login
    }
}
const mapActionToProps = (dispatch)=>{

    return{
        loginUser:(loginData)=>dispatch(actions.LoginUser(loginData))
    }
}

export default connect(mapStateToProps,mapActionToProps) (Login);