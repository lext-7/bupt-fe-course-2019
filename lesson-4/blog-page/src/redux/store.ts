import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { homeReducer, articleReducer } from './reducer';

let store = createStore(
  combineReducers({
    home: homeReducer,
    article: articleReducer,
  }),
  applyMiddleware(thunk),
);

export default store;
