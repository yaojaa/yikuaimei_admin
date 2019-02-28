import axios from 'axios';
export default {
    namespaced: true,
    state: {
        /** 
         * 角色列表
         */
        power_list: '',

        /**
         * 角色信息
         */
        roleInfo: '',

        /** 
         * 角色名称
         */
        roleList: [],

        /** 
         * 已选选项
         */
        info: {}
    },

    actions: {
        /** 
         * 获取角色信息
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/adminRole/info&action=GET
         */

        fetchGetRoleInfo({
            commit
        }, params) {
            return axios
                .post('/api/admin/adminRole/info', {
                    ...params
                })
                .then((res) => {
                    if (res.data.code) {
                        alert(res.data.msg)
                        return
                    }
                    commit('setRoleInfo', res.data.data);
                    return res.data.data.power_list;
                });
        },

        /** 
         * 获取角色名称
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/adminRole/list&action=GET
         */

        fetchAdminRoleList({
            commit
        }, params) {
            return axios
                .get('/api/admin/adminRole/list')
                .then((res) => {
                    if (res.data.code) {
                        alert(res.data.msg)
                        return
                    }
                    commit('setRoleList', res.data.data);
                    return res.data.data;
                });
        },

        /** 
         * 获取角色列表
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/adminRole/powerList&action=GET
         */

        fetchGetPowerList({
            commit
        }) {
            return axios
                .get('/api/admin/adminRole/powerList')
                .then((res) => {
                    if (res.data.code) {
                        alert(res.data.msg)
                        return
                    }
                    commit('setPowerList', res.data.data);
                    return res.data.data;
                });
        },

        /** 
         * 创建
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/adminRole/add&action=POST
         */

        fetchCreate({
            commit
        }, params) {
            return axios
                .post('/api/admin/adminRole/add', {
                    ...params
                })
                .then((res) => {
                    if (res.data.code) {
                        alert(res.data.msg)
                        return
                    }
                    return res.data.data
                });
        },

        /** 
         * 修改
         * url http: //dev.countinsight.com/api/admin/docs.php?path=/adminRole/edit&action=POST
         */

        fetchEdit({
            commit
        }, params) {
            return axios
                .post('/api/admin/adminRole/edit ', {
                    ...params
                })
                .then((res) => {
                    if (res.data.code) {
                        alert(res.data.msg)
                        return
                    }
                    return res.data.data
                });
        }
    },

    mutations: {
        setPowerList(state, data) {
            state.power_list = data;
        },

        setRoleInfo(state, data) {
            state.roleInfo = data.power_list;
            state.info.role_power_ids = data.role_power_ids;
            state.info.role_name = data.role_name;
            state.info.role_id = data.role_id;
            state.info.is_manager = data.is_manager;
        },

        setRoleList(state, data) {
            state.roleList = data;
        }

    },

    getters: {}
};