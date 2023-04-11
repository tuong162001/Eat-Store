import { combineReducers } from 'redux';
import userReducer from './userReducer'
import shoppingCart from './shoppingCart'

const mainReducer = combineReducers({
    userReducer,
    shoppingCart,
})
export default mainReducer;