import axios from 'axios';
export default {
    namespaced: true,
    state: {
        /** 
         * 列表数据
         */
        formInfo: {
            tag_id_arr: [] // 已选标签
        },

        /**
         * 标签list
         */
        lableList: {}

    },

    actions: {
        /** 
         * 获取商品 / 服务 / 采购详情
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/shopgoods/getOneById&action=GET
         * params id
         * status ok
         */

        fetchFormInfo({
            commit
        }, params) {
            // console.log(1111, Vue)
            axios.get("/api/admin/shopgoods/getOneById", {
                params
            }).then(res => {
                commit('setFormInfo', res.data.data)
            })
        },

        /** 
         * 获取标签列表
         * url http://dev.countinsight.com/api/admin/docs.php?path=/select/tagGroupList&action=GET
         * 
         */
        fetchLableList({
            commit
        }, params) {
            axios.get("/api/admin/select/tagGroupList", {
                params
            }).then(res => {
                console.log(res.data)
                commit('setLableList', res.data.data)
            })
        },

        /** 
         * 获取关联标签列表
         * url http://dev.countinsight.com/api/admin/docs.php?path=/select/getFriendTagList&action=GET
         * params tag_id
         */
        fetchFriendLableList({
            commit
        }, params) {
            axios.get("/api/admin/select/getFriendTagList", {
                params
            }).then(res => {
                return res.data
            })
        },

        /** 
         * 添加 单规格 / 多规格 商品 / 服务 / 采购品项
         * url http://dev.countinsight.com/api/admin/docs.php?path=/shopgoods/create&action=POST
         */
        fetchFormInfoCreate({
            commit,
            state
        }) {
            Vue.$axios.get("/api/admin/shopgoods/create", {
                params
            }).then(res => {
                console.log(res, '创建成功')
            })
        },

        /** 
         * 修改 单规格 / 多规格 商品 / 服务 / 采购品项
         * url http://dev.countinsight.com/api/admin/docs.php?path=/shopgoods/modify&action=POST
         */
        fetchFormInfoModify({
            commit,
            state
        }, user, token) {
            Vue.$axios.get("/api/admin/shopgoods/modify", {
                params
            }).then(res => {
                commit('setLableList', res)
                console.log(res, '修改成功')
            })
        },
    },

    mutations: {
        setFormInfo(state, data) {
            state.formInfo = data;
        },

        setLableList(state, data) {
            state.lableList = data;
        }
    },

    getters: {}
};