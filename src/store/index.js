import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createdGoode from './modules/createdGoode'
import share from './modules/share'
// import createLogger from '../../../src/plugins/logger'


Vue.use(Vuex)


export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    modules: {
        user,
        createdGoode,
        share
    },
    // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})