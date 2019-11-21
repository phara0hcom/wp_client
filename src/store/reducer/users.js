import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loadingUsers: true,
  usersList: [],
  userToEdit: {
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
    type: "user"
  },
  error: null
};

const setLoadingUsers = state => ({
  ...state,
  loadingUsers: true
});

const setUsers = (state, usersList) => ({
  ...state,
  loadingUsers: false,
  usersList
});

const setUserToEdit = (state, user) => ({
  ...state,
  userToEdit: { ...user }
});

const setUserToEditError = state => ({
  ...state,
  error: "Failed to find User"
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_FETCHING:
      return setLoadingUsers(state);

    case actionTypes.USERS_FETCH_SUCCESS:
      return setUsers(state, action.users);

    case actionTypes.USERS_USER_TO_EDIT_SET:
      return setUserToEdit(state, action.user);

    case actionTypes.USERS_USER_TO_EDIT_FAILED:
      return setUserToEditError(state);

    case actionTypes.USERS_EDIT_USER_TO_EDIT:
      return setUserToEdit(state, action.user);

    default:
      return state;
  }
};

export default reducer;
