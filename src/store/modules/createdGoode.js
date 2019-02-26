import axios from 'axios';
export default {
    namespaced: true,
    state: {
        /** 
         * 列表数据
         */
        formInfo: {},

        /**
         * 标签list
         */
        lableList: {},

        /** 
         * 耗材列表
         */
        goodFriends: []
    },

    actions: {
        /** 
         * 获取商品 / 服务 / 采购详情
         * url http://dev.countinsight.com/api/admin/docs.php?path=/shopgoods/getOneById&action=GET
         * params id
         * status ok
         */

        fetchFormInfo({
            commit
        }, params) {
            return axios
                .get('/api/admin/shopgoods/getOneById', {
                    params
                })
                .then((res) => {
                    let result = res.data.data;
                    commit('setFormInfo', result);
                    return result;
                });
        },

        /** 
         * 获取标签列表
         * url http://dev.countinsight.com/api/admin/docs.php?path=/select/tagGroupList&action=GET
         * 
         */
        fetchLableList({
            commit
        }, params) {
            axios
                .get('/api/admin/select/tagGroupList', {
                    params
                })
                .then((res) => {
                    console.log(res.data);
                    commit('setLableList', res.data.data);
                });
        },

        /** 
         * 获取关联标签列表
         * url http://dev.countinsight.com/api/admin/docs.php?path=/select/getFriendTagList&action=GET
         * params tag_id
         */
        fetchFriendLableList({
            commit
        }, params) {
            axios
                .get('/api/admin/select/getFriendTagList', {
                    params
                })
                .then((res) => {
                    return res.data;
                });
        },

        /** 
         * 添加 单规格 / 多规格 商品 / 服务 / 采购品项
         * url http://dev.countinsight.com/api/admin/docs.php?path=/shopgoods/create&action=POST
         */
        fetchFormInfoCreate({
            commit,
            state
        }, params) {
            return axios
                .post('/api/admin/shopgoods/create', {
                    ...params
                })
                .then((res) => {
                    return res.data;
                });
        },

        /** 
         * 修改 单规格 / 多规格 商品 / 服务 / 采购品项
         * url http://dev.countinsight.com/api/admin/docs.php?path=/shopgoods/modify&action=POST
         */
        fetchFormInfoModify({
            commit,
            state
        }, params) {
            return axios
                .post('/api/admin/shopgoods/modify', {
                    ...params
                })
                .then((res) => {
                    return res.data;
                })
                .catch((res) => {
                    return res;
                });
        },

        /** 
         * 获取服务耗材列表
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/select/goodsList&action=GET
         */
        fetchGoodFriends({
            commit,
            state
        }, {
            good_type,
            category_id
        }) {
            return axios
                .get(`/api/admin/select/goodsList?good_type=${good_type}&category_id=${category_id}`)
                .then((res) => {
                    commit('setGoodFriends', {
                        data: res.data.data,
                        category_id
                    });
                    return res.data.data;
                });
        }
    },

    mutations: {
        setFormInfo(state, data) {
            state.formInfo = {
                ...state.formInfo,
                ...data
            };
        },

        setLableList(state, data) {
            state.lableList = data;
        },

        setGoodFriends(state, {
            data,
            category_id
        }) {
            state.goodFriends[category_id] = data;
        },

    },

    getters: {}
};