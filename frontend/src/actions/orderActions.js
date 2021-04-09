import {ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST} from '../constants/orderConstants'
import axios from 'axios'


export const createOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const { userLogin :{ userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log(config)

        const {data} = await axios.post(`api/orders`, order, config)

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response.data && error.response.data 
        })
    }
}