import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loadingToken: true,
  userType: null,
  displayName: null,
  isAuthorized: false,
  logInProcessing: false,
  error: null
};

const setNoToken = state => ({
  ...state,
  loadingToken: false
});

const startLogInCall = state => ({
  ...state,
  logInProcessing: true,
  error: null
});

const setLoginError = (state, error) => ({
  ...state,
  error,
  logInProcessing: false
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_NO_TOKEN:
      return setNoToken(state);

    case actionTypes.LOGIN_PROCESSING:
      return startLogInCall(state);

    case actionTypes.LOGIN_ERROR:
      return setLoginError(state, action.error);

    default:
      return state;
  }
};

export default reducer;
