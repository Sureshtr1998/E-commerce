import { MYPROFILE_FAIL, MYPROFILE_GET_FAIL, MYPROFILE_GET_REQUEST, MYPROFILE_GET_SUCCESS, MYPROFILE_REQUEST, MYPROFILE_SUCCESS } from "../constants/myProfileConstants"

export const individualValReducer = (state= {}, action) =>
{
    switch(action.type){
        case 'SET_PDF_PATH':
            return{
                pdfPath: action.val
            }
        default:
            return state
    }
}

export const myProfileReducer = (state ={ }, action) => {
    switch(action.type){
        case MYPROFILE_REQUEST:
            return {
                loading: true
            }
        case MYPROFILE_SUCCESS:
            return{
                loading: false
            }
        case MYPROFILE_FAIL:
            return{
                loading:false,
                error: action.payload
            }
            default:
                return state

    }
}

export const myProfileFetchDetailsReducer = (state ={ profile:[]}, action) => {
    switch(action.type){
        case MYPROFILE_GET_REQUEST:
            return {
                loading: true
            }
        case MYPROFILE_GET_SUCCESS:
            return{
                loading: false,
                profile: action.payload
            }
        case MYPROFILE_GET_FAIL:
            return{
                loading:false,
                error: action.payload
            }
            default:
                return state

    }
}