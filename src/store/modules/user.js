import Vue from 'vue'

function setHeaders(state) {
  Vue.prototype.$axios.defaults.headers = Object.assign(Vue.prototype.$axios.defaults.headers, state);

  console.log('设置请求header信息',Vue.prototype.$axios.defaults.headers)

}
export default {
  state: {
    sid: JSON.parse(localStorage.getItem('user') || '{}')['sid'] || '',
    history: location.pathname,
    data: JSON.parse(localStorage.getItem('user') || '{}')['data'] || ''
  },
  getters: {
    userStatus: (state) => {
      if (state.sid) {
        setHeaders(state)
      }
      return state
    },
    isLogin: (state) => {
      return state.sid !== ''
    },
    user: state => {
      return state.data;
    }
  },
  mutations: {
    ['USER_REG'](state, data) {
      Object.assign(state, data)
      localStorage.setItem('user', JSON.stringify(state))
    },
    ['USER_SIGNIN'](state, data) {
      // console.log('mutations USER_SIGNIN',data)
      // console.log('data.id_token',data.id_token)
      Object.assign(state, data)
      localStorage.setItem('user', JSON.stringify(state))
      let { sid } = state;
      setHeaders({sid})
    },
    ['USER_SIGNOUT'](state) {
      localStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k));
      window.location.reload();
    }
  },
  actions: {
    ['USER_REG']({ commit }, user, token) {
      commit('USER_SIGNIN', user, token)
    },
    ['USER_SIGNIN']({ commit }, data) {
      // console.log('actions USER_SIGNIN')
      commit('USER_SIGNIN', data)
    },
    ['USER_SIGNOUT']({ commit }) {
      commit('USER_SIGNOUT')
    }
  }
}
