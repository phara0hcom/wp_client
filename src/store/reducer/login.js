import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loadingToken: true,
  userType: null,
  displayName: null,
  isAuthorized: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SET_TOKEN:
      return state;

    default:
      return state;
  }
};

export default reducer;
