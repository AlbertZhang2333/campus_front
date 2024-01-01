import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {
            username: 'name',
            userMail: 'mail',
            userIcon: 0,
            identity: 0,
        }
    },
    mutations: {
        updateUserInfo(userInfo) {
            this.userInfo = userInfo
        }
    }
})

export default store