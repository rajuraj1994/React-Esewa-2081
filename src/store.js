import { combineReducers,legacy_createStore,applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import cartReducer from "./redux/reducers/cartReducer";


const reducer=combineReducers({
    cart:cartReducer
})

let initialState={
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
    }
}

const middleware=[thunk]


const store=legacy_createStore(reducer,initialState,applyMiddleware(...middleware))

export default store 