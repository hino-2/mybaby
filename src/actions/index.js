export const layoutMobile = () => {
    return {
        type: "MOBILE"
    }
}

export const userLogin = (user) => {
    return {
        type: 'USER_LOGIN',
        payload: user
    }
}
