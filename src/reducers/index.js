import RentalReducer from './roomReducers';
import Login from './login';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux'


export default combineReducers(
    {
        rental: RentalReducer, 
        form: formReducer,
        login: Login
    }
)