import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import counterReducer from "./reducers/counter"
import todoDucks from "./todoDucks"
import menuReducer from './reducers/menues'

const reducer = combineReducers({
  counter: counterReducer,
  item: todoDucks,
  menues: menuReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store
