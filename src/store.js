import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {
            username: 'name',
            userMail: 'mail',
            userIcon: 0,
            identity: 1,
        }
    },
    mutations: {
        updateUserInfo(state, userInfo) {
                state.userInfo = userInfo
        }
    }
})

export default store