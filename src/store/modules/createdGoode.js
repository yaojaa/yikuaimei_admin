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
                    result.id = result.good_id;

                    // 单规格的时候 编码，售价，原价，成本
                    result.productCode = result.productCode ? result.productCode : result._id;
                    result.sellPrice = (+result.price_high) / 100;
                    result.price = (+result.price_low) / 100;

                    result.good_img_arr = result.good_img_arr.map((item, idx) => {
                        let obj = {};
                        obj.name = 'goodImgArr' + idx;
                        obj.url = item;
                        return obj;
                    });

                    result.show_img_arr = result.show_img_arr.map((item, idx) => {
                        let obj = {};
                        obj.name = 'goodImgArr' + idx;
                        obj.url = item;
                        return obj;
                    });

                    result.explain_img_arr = result.explain_img_arr.map((item, idx) => {
                        let obj = {};
                        obj.name = 'goodImgArr' + idx;
                        obj.url = item;
                        return obj;
                    });
                    let good_sku_list = result.sku_list || []
                    if (typeof result.sku_list == 'undefined') {
                        alert('数据接口缺少 sku_list字段')
                    }
                    console.log('result.sku_list', result.sku_list) //undefined
                    result.good_sku = result.sku_list.map(item => {
                        item.ico_small__url = item.ico_small
                        item.price_cost = (+item.price_cost) / 100
                        item.price = (+item.price) / 100
                        item.price_sale = (+item.price_sale) / 100
                        item.price_total = (+item.price_total) / 100
                        return item
                    });
                    result.good_video_pic__url = result.good_video_pic
                    result.good_ico__url = result.good_ico
                    result.good_video__url = result.good_video

                    result.goodSkuInfo = [];
                    let sku_list = _.cloneDeep(result.sku_list) || [];
                    if (sku_list.length) {
                        let arr = [];
                        arr[0] = Array.from(new Set(sku_list.map((item) => item.sku_type_arr[0])));
                        arr[1] = Array.from(new Set(sku_list.map((item) => item.sku_type_arr[1])));
                        arr[2] = Array.from(new Set(sku_list.map((item) => item.sku_type_arr[2])));
                        for (var i = 0; i < result.sku_type_arr.length; i++) {
                            let goodSkuInfoitem = {
                                inputValue: '',
                                list: arr[i],
                                name: result.sku_type_arr[i]
                            };
                            result.goodSkuInfo.push(goodSkuInfoitem);
                        }
                    }

                    // 单规格
                    if (!result.sku_type_arr || !result.sku_type_arr.length) {
                        result.singleButton = "无规格"
                        let {
                            sku_code,
                            sellPrice,
                            price_sale,
                            price,
                            price_total,
                            price_cost
                        } = sku_list[0]
                        result.sku_code = sku_code
                        result.sellPrice = sellPrice
                        result.price_sale = price_sale
                        result.price = price
                        result.price_cost = price_cost
                        result.price_total = price_total
                    } else {
                        result.singleButton = "添加规格"
                    }
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
                    if (res.data.data.length) {
                        commit('setLableList', res.data.data);
                    }
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

        initFormInfo(state, data) {
            state.formInfo = {
                good_name: '', // 商品名字
                good_explain: '', // 商品卖点
                category_id: '', // 行业id
                tag_id_arr: [], // 标签id数组
                tag_list: [], // 已选标签展示数据
                good_video: '', // 商品视频
                good_video_pic: '', // 商品视频封面图
                good_img_arr: [], // 商品图片数组
                explain_img_arr: [],
                good_ico: '', // 商品展示图
                unit: '', // 单位 例如盒，箱
                show_img_arr: [], // 详情页商品展示图数组
                explain_img_arr: [], // 卖点图数组
                sku_type_arr: [], // 规格数组，单规格商品不要提交该字段
                good_sku: [], // 规格sku数组，单规格商品也要按该数组格式提交
                good_friends: [], // 服务添加耗材列表 不是服务不需要提交
                goodSkuInfo: [{
                        name: '',
                        list: [],
                        inputValue: ''
                    },
                    {
                        name: '',
                        list: [],
                        inputValue: ''
                    }
                ]
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