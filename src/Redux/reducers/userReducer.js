export const userReducer =(state={}, action)=>{
    if(action.type==='userLogIn'){
        return action.payload
    }else{
        return state
    }
}