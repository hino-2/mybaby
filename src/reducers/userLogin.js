const userLogin = (state = null, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return action.payload
        default:
            return state
    }
}

export default userLogin