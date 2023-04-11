import cookie from "react-cookies";

const userInfo = cookie.load('user')

const initState = userInfo ? { isLogin: true, user: userInfo } : {}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            // localStorage.setItem('user', JSON.stringify(action.userInfo))
            return {
                user: action.payload,
                isLogin: true
            }
        case "USER_LOGOUT":
            cookie.remove('user')
            return {
                user: null,
                isLogin: false
            }
        default:
            return state
    }
}

export default userReducer;