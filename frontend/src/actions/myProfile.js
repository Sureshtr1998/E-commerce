import axios from 'axios'
import { MYPROFILE_FAIL, MYPROFILE_GET_FAIL, MYPROFILE_GET_REQUEST, MYPROFILE_GET_SUCCESS, MYPROFILE_REQUEST, MYPROFILE_SUCCESS } from '../constants/myProfileConstants'


export const sureshDetails = (age=22, yrsofexp=2, min=12, max=15, pdf) => async(dispatch) => {

    try {
        dispatch({
            type: MYPROFILE_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
             await axios.post('/api/myprofile', {age, yrsofexp, min, max, pdf}, config)

        dispatch({
            type:MYPROFILE_SUCCESS,
        })
}
catch (error) {
    console.log(error.response.data)
    dispatch({
        type: MYPROFILE_FAIL,
        payload: error.response.data && error.response.data 
    })
}
}

export const fetchProfileDetails = () => async(dispatch) => {

    try {
        dispatch({
            type: MYPROFILE_GET_REQUEST
        })

        const {data} = await axios.get('/api/myprofile')

        dispatch({
            type:MYPROFILE_GET_SUCCESS,
            payload: data
        })
}
catch (error) {
    console.log(error.response.data)
    dispatch({
        type: MYPROFILE_GET_FAIL,
        payload: error.response.data && error.response.data 
    })
}
}