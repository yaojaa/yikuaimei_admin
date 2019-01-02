import Vue from 'vue'

function setHeaders(state) {
  console.log('设置请求header信息')
  Vue.prototype.$axios.defaults.headers = Object.assign(Vue.prototype.$axios.defaults.headers, state);
}
export default {
  state: {
    
  },
  actions: {
    ['USER_REG']({ commit }, user, token) {
      fetch({
        url:'http://dev.countinsight.com/api/admin/shopgoods/create',
        data:{}
      })
      commit('USER_SIGNIN', user, token)
    },
    ['USER_SIGNIN']({ commit }, data) {
      // console.log('actions USER_SIGNIN')
      commit('USER_SIGNIN', data)
    },
    ['USER_SIGNOUT']({ commit }) {
      commit('USER_SIGNOUT')
    }
  },

  mutations: {
    ['USER_REG'](state, data) {
      Object.assign(state, data)
      localStorage.setItem('user', JSON.stringify(state))
    }
  },

  getters: {}
}
