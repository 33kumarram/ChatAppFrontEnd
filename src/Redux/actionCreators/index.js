const userLogIn = (userDetails) => {
    return (dispatch) => {
        dispatch({
            type: 'userLogIn',
            payload: userDetails
        })
    }
}


export const actionCreators={
    userLogIn
}