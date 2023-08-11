export default {
    state: {
        token: '',
        userInfo: null
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            window.sessionStorage.setItem('token', val)
        },
        clearToken(state) {
            state.token = ''
            window.sessionStorage.removeItem('token')
        },
        getToken(state) {
            if (!state.token) {
                state.token = window.sessionStorage.getItem('token')
            }
        },
        setUserInfo(state, userName) {
            state.userInfo = {}
            state.userInfo.name = userName
            if (userName === 'admin') {
                state.userInfo.role = 'Administrator'
            } else {
                state.userInfo.role = 'User'
            }
            window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        getUserInfo(state) {
            if (!state.userInfo) {
                console.log('getUserInfo我是空的')
                state.userInfo = {}
                if(window.sessionStorage.getItem('userInfo')) {
                    state.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
                }
            }
        },
        clearUserInfo(state) {
            state.userInfo = null;
            window.sessionStorage.removeItem('userInfo')
        }
    }
}