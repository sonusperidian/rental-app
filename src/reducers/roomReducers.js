const INITIAL_DATA = {
    rentals:{
        data: []
    },
    rental:{
        data:{}
    }
   
}


const roomReducers = (state = INITIAL_DATA, action)=>{

    switch(action.type){
    
        case 'FETCH_DATA':
            const rentals = {...state.rentals};
            rentals.data = action.rentals;
            state = {...state, rentals: rentals};
            return state;
        case 'FETCH_RENTAL_DETAILS_BY_ID':
             return {...state, rental: action.rental}       
        default:
            return state;
    }

   
}

export default roomReducers;