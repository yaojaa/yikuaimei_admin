import axios from 'axios';
export default {
    namespaced: true,
    state: {
        roleList: [],
        userInfo: {}
    },

    actions: {
        /** 
         * 获取角色选择列表
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/adminUser/roleList&action=GET
         */

        fetchGetRoleList({
            commit
        }, params) {
            return axios
                .get('/api/admin/adminUser/roleList', {
                    ...params
                })
                .then((res) => {
                    if (res.data.code) {
                        alert(res.data.msg)
                        return
                    }
                    commit('setRoleList', res.data.data)
                    
                    return res.data.data;

                });
        },

        /** 
         * 获取用户信息
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/adminUser/info&action=GET
         */

        fetchGetUserInfo({
            commit
        }, params) {
            return axios
                .get('/api/admin/adminUser/info?user_id='+params.user_id)
                .then((res) => {
                    if (res.data.code) {
                        alert(res.data.msg)
                        return
                    }
                    commit('setUserInfo', res.data.data)
                    //console.log(res.data,'data')
                    return res.data.data;
                });
        },


        /** 
         * 创建角色
         * url http://dev.countinsight.com/api/admin/docs.php?path=/adminUser/add&action=POST
         */

        fetchCreate({
            commit
        }, params) {
            // console.log('addParams', params)
            this.$axios({
                method: "post",
                url: '/api/admin/adminUser/add',
                params: { ...params }
            }).then((res) => {
                if (res.data.code) {
                    alert(res.data.msg)
                    return
                }
                return res.data.data;
            });
            // return axios
            //     .post('/api/admin/adminUser/add', {
            //         ...params
            //     })
            //     .then((res) => {
            //         if (res.data.code) {
            //             alert(res.data.msg)
            //             return
            //         }
            //         return res.data.data;
            //     });
        },

        /** 
         * 修改角色
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/adminUser/edit&action=POST
         */

        fetchModifiy({
            commit
        }, params) {
            return this.$axios({
                method: "post",
                url: '/api/admin/adminUser/edit',
                params: { ...params }
            }).then((res) => {
                if (res.data.code) {
                    alert(res.data.msg)
                    return
                }
                return res.data.data;
            });     
        }
    },

    mutations: {
        setRoleList(state, data) {
            state.roleList = data
        },
        setUserInfo(state, data) {
            state.userInfo = data
        }
    },

    getters: {}
};