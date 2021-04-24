import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer, productDetailReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, ordersListReducer, orderDeliverReducer} from './reducers/orderReducers'
import {myProfileReducer,individualValReducer,myProfileFetchDetailsReducer} from './reducers/myProfileReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate:userUpdateReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    ordersList:ordersListReducer,
    orderDeliver:orderDeliverReducer,
    myProfile:myProfileReducer,
    individualVal:individualValReducer,
    myProfileFetchDetails:myProfileFetchDetailsReducer

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