import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Card from './card';
import {fetchData} from '../../actions/actions'


class CardList extends Component {

    componentWillMount(){
        
      this.props.fetchData();
    }

    renderCardList = ()=>{
        const loginStatus = this.props.login.isLogged;
        // console.log('componnent dill mount',loginStatus)
        if(loginStatus){
            return this.props.rentals.map((card)=> <Card key={card._id} card={card}/>)
        }else{
            // console.log('you are not autherized')
            return <Redirect to='/login' />
        }
        

       
    }

    render(){
        return(
            <div className='container'>
                <section id='rentalListing'>
                    <h1 className='page-title'>Your Home All Around the World</h1>
                    <div className='row'>
                        {this.renderCardList()}
                    </div>
                </section>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        rentals:state.rental.rentals.data,
        login:state.login
    }
}
const mapActionToProps = (dispatch)=>{
    return{
        fetchData : () =>{dispatch(fetchData())}
    }
}

export default connect(mapStateToProps,mapActionToProps)(CardList);