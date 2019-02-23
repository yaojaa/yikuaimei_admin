import axios from 'axios';
export default {
    namespaced: true,
    state: {
        /** 
         * 海报模板列表
         */
        shareList: {},

        /**
         * 分享卡片地址
         */
        card: ''
    },

    actions: {
        /** 
         * 获取分享海报模板列表
         * url http: //dev.countinsight.com/api/admin/shopgoods/getShareList
         */

        fetchGetShareList({
            commit
        }, params) {
            return axios
                .post('/api/admin/shopgoods/getShareList', {
                    ...params
                })
                .then((res) => {
                    commit('setShareList', res.data.data);
                    return res.data.data;
                });
        },

        /** 
         * 获取商品分享卡片
         * url http: //dev.countinsight.com/api/admin/shopgoods/getCard
         */

        fetchGetCard({
            commit
        }, params) {
            return axios
                .post('/api/admin/shopgoods/getCard', {
                    ...params
                })
                .then((res) => {
                    commit('setCard', res.data.data);
                    return res.data.data;
                });
        },

        /** 
         * 创建 / 修改商品分享海报模板
         * url http://dev.countinsight.com/api/admin/shopgoods/createShare
         */

        fetchCreateShareList({
            commit
        }, params) {
            return axios
                .post('/api/admin/shopgoods/createShare', {
                    ...params
                })
                .then((res) => {
                    return res.data.code === 0;
                });
        },

        /** 
         * 创建 / 修改分享卡片
         * url http: //dev.countinsight.com/api/admin/shopgoods/createCard
         */

        fetchCreateCard({
            commit
        }, params) {
            return axios
                .post('/api/admin/shopgoods/createCard', {
                    ...params
                })
                .then((res) => {
                    return res.data.data === 0;
                });
        }
    },

    mutations: {
        setShareList(state, data) {
            state.shareList = data;
        },

        setCard(state, data) {
            state.card = data;
        }

    },

    getters: {}
};