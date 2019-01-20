import React from 'react';
import {Link} from 'react-router-dom';

const card = (props)=>{
    return(
       
        <div className='col-md-3 col-xs-6'>
            <Link to={`rentals/${props.card._id}`}> 
                <div className='card bwm-card'>
                    <img className='card-img-top' src={props.card.image} alt='This is the hotel'></img>
                        <div className='card-block'>
                            <h6 className='card-subtitle'>{props.card.shared? 'Shared':'Whole'} Apartment &#183; {props.card.city}</h6>
                            <h4 className='card-title'>{props.card.description}</h4>
                            <p className='card-text'>${props.card.dailyRate} per Night &#183; Free Cancelation</p>
                            {/* <a href='/' className='card-link'>More Info</a> */}
                    </div>
                </div>
            </Link>
           
      </div>



    )
}

export default card;