import axios from "axios";
import jwt from "jsonwebtoken";
import moment from 'moment';

const fetchDataSuccess = rentals => {
  return {
    type: "FETCH_DATA",
    rentals
  };
};
const unsetLocalState=()=>{
  localStorage.setItem("auth_token", null);
}

export function fetchData() {
  // console.log('fetch data')
  return dispatch => {
    axios.get("/api/v1/rentals/rentals").then(response => {
      console.log('response=>',response);
      return dispatch(fetchDataSuccess(response.data));
    }).catch(error=>console.log(error.response));
  };
}

export const fetchRentalDetailsByIdSuccess = rental => {
  return {
    type: "FETCH_RENTAL_DETAILS_BY_ID",
    rental
  };
};
export const fetchRentalDetailsById = id => {
  return dispatch => {
    axios
      .get("/api/v1/rentals/rentals/" + id)
      .then(response => {
        return dispatch(fetchRentalDetailsByIdSuccess(response.data));
      })
      .catch(err => {
        console.log("one rental error", err);
      });
  };
};

export const registerUser = userData => {
  return axios.post("/api/v1/user/register", userData).then(
    user => {
      return user;
    },
    error => {
      const errorValue = error.response.data.errors;
      return Promise.reject(errorValue);
    }
  );
};

export const createBooking = (booking)=>{
  return axios.post("/api/v1/booking/rental", booking).then(response=>{
    return response;
  },
  error=>{
    // console.log(error.response.data.message);
    return Promise.reject(error.response.data.message);
  });

}

const loginSuccess = () => {
  return {
    type: "LOGIN_SUCCESS"
  };
};
const loginFailure = (errors) => {

  return {
    type: "LOGIN_FAILURE",
    errors
  };
};


export const LoginUser = loginData => {
  return dispatch => {
    axios
      .post("/api/v1/user/login", loginData)
      .then(response => {
        localStorage.setItem("auth_token", `Bearer ${response.data}`);
        return dispatch(loginSuccess());
      })
      .catch(
        error => {
          // console.log('error=>',error.response);
          unsetLocalState()

          return dispatch(loginFailure(error.response.data.message));
        });
  };
};

export const checkLoginStatus = () => {

  try{
    let localToken = localStorage.getItem("auth_token");
  if(localToken){
    const auth_token = localToken.split(' ')[1];
    console.log('Login Status:',auth_token);
    if(auth_token){
      return dispatch =>{
          const time = jwt.decode(auth_token).exp > moment().unix() ;
          // const now = moment().unix();
          // const check = time > now;
          // const now = moment(time).isBefore(moment().unix());
          console.log("token time", time);
          if(time){
             console.log("token time", time);
            return dispatch(loginSuccess());
          }else{
            unsetLocalState();
            return dispatch(loginFailure());
          }
          
      }
  
    }
    else{
      return dispatch=>dispatch(loginFailure());
    }
  }
  else{
    return dispatch=>dispatch(loginFailure());
  }
 
  }catch(error){
    console.log(error);
    return dispatch=>dispatch(loginFailure());
  }
};
