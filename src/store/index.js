import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import login from "./reducer/login";
import users from "./reducer/users";

const rootReducer = combineReducers({
  login,
  users
});

const composeEnhancers =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25
      })
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
