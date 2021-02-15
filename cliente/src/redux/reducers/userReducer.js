import {userTypes} from '../../types'

const initialState = {
    usersList:[],
    users:[],
    loading:false,
    user:null,
    totalPages:0,
    page:0,
    maxResults:10,
    sort:null,
    typeSort:null
}

const userReducer= (state = initialState, { type, payload }) => {
    switch (type) {

    case userTypes.GET_USERS:
        return { 
            ...state, 
            users:payload.users,
            usersList:payload.users,
            totalPages:state.totalPages===0?state.totalPages+1:payload.totalPages,
            page:state.page+1,
            
         }
    case userTypes.CHANGE_LOADING:
        return{
            ...state,
            loading:payload
        }
    case userTypes.SELECT_USER:
        return{
            ...state,
            user:state.users.find(user=>user._id===payload)
            
        }
    case userTypes.UPDATE_USER:
        return{
            ...state,
            users:state.users.map(user=>user._id===payload._id?payload:user),
            usersList:state.usersList.map(user=>user._id===payload._id?payload:user),
            user:null
        }
    case userTypes.DELETE_USER:
        return{
            ...state,
            users:state.users.filter(user=>user._id!==payload),
            usersList:state.usersList.filter(user=>user._id!==payload),
            totalPages:Math.ceil((state.users.length-1)/state.maxResults),
            page:state.page>state.totalPages?(state.page-1):(state.page),
            user:null
        }
    case userTypes.ADD_USER:
        return{
            ...state,
            users:[payload,...state.users],
            usersList:[payload,...state.usersList],
            totalPages:Math.ceil((state.users.length+1)/state.maxResults),
        }
    case userTypes.CHANGE_PAGE:
        return{
            ...state,
            page:payload
        }
    case userTypes.SORT_USERS:
        return{
            ...state,
            sort:state.sort!==payload?payload:state.sort,
            typeSort:state.sort!==payload?"asc":state.typeSort==="asc"?"desc":"asc"
        }
    case userTypes.SORT:
            return{
                ...state,
                users:state.typeSort==="asc"?
                [...state.users.sort((a,b)=>{
                    if(a[state.sort]>b[state.sort]){
                        return 1    
                    }
                    if(a[state.sort]<b[state.sort]){
                        return -1
                    }
                    return 0
                })]
                :
                [
                ...state.users.sort((a,b)=>{
                    if(a[state.sort]<b[state.sort]){
                        return 1    
                    }
                    if(a[state.sort]>b[state.sort]){
                        return -1
                    }
                    return 0
                })
            ]
            }
        case userTypes.FILTER_USERS:
            return{
                ...state,
                users:state.usersList.filter(user=>user[payload.field].toLowerCase().indexOf(payload.value)>=0)
            }
    default:
        return state
    }
}

export default userReducer
