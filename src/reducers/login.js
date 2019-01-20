const INITIAL_STATE = {
  isLogged: false,
  errors: []
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log('login Success')
      return { ...state, isLogged: true,errors:[] };
    case "LOGIN_FAILURE":
      console.log("Login Failure");
      return { ...state, isLogged: false,errors:action.errors };
    default:
      return state;
  }
};

// const loginFailure = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case "LOGIN_FAILURE":
//       console.log("Login Failure");
//       return { ...state, isLogged: false };
//     default:
//       return state;
//   }
// };

export default login;
