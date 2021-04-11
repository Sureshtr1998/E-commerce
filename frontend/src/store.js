import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer, productDetailReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
})
let item = localStorage.getItem('cartItems')
let user = localStorage.getItem('userInfo')
let shippingAddress = localStorage.getItem('shippingAddress')

const cartItemsFromStorage =  item ? JSON.parse(item): []
const userInfoFromStorage =  user ? JSON.parse(user): null
const shippingAddressFromStorage =  shippingAddress ? JSON.parse(shippingAddress): {}


const initialState = {
    cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress:shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store