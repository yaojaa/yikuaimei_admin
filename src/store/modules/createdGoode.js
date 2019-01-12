export default {
    namespaced: true,
    state: {
        // 列表数据
        formInfo: {
            good_type: 2, //商品类型：1服务 2实物 3采购品项 4虚拟商品
            good_name: "商品名字4", //商品名字
            good_explain: "商品说明1", //商品卖点
            category_id: 2, //行业id
            tag_id_arr: [8, 18, 32], //标签id数组
            good_video: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100", //商品视频
            good_video_pic: "", //商品视频封面图
            good_img_arr: [{
                    name: "good_img_arr0",
                    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                },
                {
                    name: "good_img_arr1",
                    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                }
            ], //商品图片数组
            good_ico: "", //商品展示图
            unit: "20盒2000克箱装", //单位 例如盒，箱
            show_img_arr: [{
                    name: "show_img_arr0",
                    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                },
                {
                    name: "show_img_arr1",
                    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                }
            ], //商品详情页介绍展示图片数组
            explain_img_arr: [{
                    name: "explain_img_arr0",
                    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                },
                {
                    name: "explain_img_arr1",
                    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                }
            ], //卖点图数组
            good_notes: "补充说明", //补充说明
            sku_type_arr: ["颜色", "尺寸", "材质"], //规格数组，单规格商品不要提交该字段
            good_sku: [ //规格sku数组，单规格商品也要按该数组格式提交
                {
                    sku_type_arr: ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
                    sku_code: "23344545654654621", //商品编码 不提交该字段，则认定本条规格信息不存在
                    price_cost: 2321, //成本
                    price: 2888, //原价(只用于展示商品原价信息)
                    price_sale: 2666, //售价(商品实际需要支付价值，线下补交时要用到)
                    price_plate: 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
                    ico_small: "/small.jpg" //规格图标，单规格商品不要提交该字段
                },
                {
                    sku_type_arr: ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
                    sku_code: "23344545654654621", //商品编码
                    price_cost: 2321, //成本
                    price: 2888, //原价(只用于展示商品原价信息)
                    price_sale: 2666, //售价(商品实际需要支付价值，线下补交时要用到)
                    price_plate: 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
                    ico_small: "/small.jpg" //规格图标，单规格商品不要提交该字段
                },
                {
                    sku_type_arr: ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
                    sku_code: "23344545654654621", //商品编码
                    price_cost: 2321, //成本
                    price: 2888, //原价(只用于展示商品原价信息)
                    price_sale: 2666, //售价(商品实际需要支付价值，线下补交时要用到)
                    price_plate: 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
                    ico_small: "/small.jpg" //规格图标，单规格商品不要提交该字段
                },
                {
                    sku_type_arr: ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
                    sku_code: "23344545654654621", //商品编码
                    price_cost: 2321, //成本
                    price: 2888, //原价(只用于展示商品原价信息)
                    price_sale: 2666, //售价(商品实际需要支付价值，线下补交时要用到)
                    price_plate: 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
                    ico_small: "/small.jpg" //规格图标，单规格商品不要提交该字段
                }
            ]
        },

        /**
         * 标签数据 商品 / 服务 / 采购品项 列表
         * GET http: //dev.countinsight.com/api/admin/shopgoods/index
         * is_page 1 是否分页 1 分页 2 获取全部 
         * page string 1 页码
         * page_size 20 每页数据条数
         * good_type 1 商品类型： 1 服务 2 商品 3 采购品项 4 虚拟商品
         * id 38 商品的good_id字段
         * good_name 面膜   商品 / 服务 / 采购 名字
         * is_use 2 是否上架 1 下架 2 上架
         * category_id 2 行业id
         * tag_id 2 标签id
         * return 200:
         */
        shopgoods: {
            "code": 0,
            "msg": "OK",
            "data": [{
                    "good_category_id": 7,
                    "good_category_name": "美甲",
                    "good_category_ico": "\/o.jpg",
                    "good_category_pid": 0,
                    "good_category_deep": 1,
                    "good_category_path": "",
                    "good_category_status": 1,
                    "good_category_ctime": "2018-11-27 14:49:03",
                    "good_category_utime": null,
                    "good_category_sons": //一级分类名下的所有二级分类列表
                        [{
                            "good_category_id": 11,
                            "good_category_name": "美小指甲",
                            "good_category_ico": "\/1.jpg",
                            "good_category_pid": 7,
                            "good_category_deep": 2,
                            "good_category_path": "7",
                            "good_category_status": 1,
                            "good_category_ctime": "2018-11-27 14:51:48",
                            "good_category_utime": null
                        },
                        {
                            "good_category_id": 12,
                            "good_category_name": "美中指甲",
                            "good_category_ico": "\/2.jpg",
                            "good_category_pid": 7,
                            "good_category_deep": 2,
                            "good_category_path": "7",
                            "good_category_status": 1,
                            "good_category_ctime": "2018-11-27 14:51:58",
                            "good_category_utime": null
                        },
                        {
                            "good_category_id": 13,
                            "good_category_name": "美大拇指甲",
                            "good_category_ico": "\/3.jpg",
                            "good_category_pid": 7,
                            "good_category_deep": 2,
                            "good_category_path": "7",
                            "good_category_status": 1,
                            "good_category_ctime": "2018-11-27 14:52:13",
                            "good_category_utime": null
                        }
                    ]
                },
                {
                    "good_category_id": 9,
                    "good_category_name": "美肤",
                    "good_category_ico": "\/b.jpg",
                    "good_category_pid": 0,
                    "good_category_deep": 1,
                    "good_category_path": "",
                    "good_category_status": 1,
                    "good_category_ctime": "2018-11-27 14:50:48",
                    "good_category_utime": null,
                    "good_category_sons": //一级分类名下的可选择二级分类列表
                        [{
                        "good_category_id": 20,
                        "good_category_name": "美脸部皮肤",
                        "good_category_ico": "\/10.jpg",
                        "good_category_pid": 9,
                        "good_category_deep": 2,
                        "good_category_path": "9",
                        "good_category_status": 1,
                        "good_category_ctime": "2018-11-27 14:54:29",
                        "good_category_utime": "2018-11-27 14:58:54"
                    }]
                }
            ]
        }

    },
    actions: {
        // ['USER_REG']({ commit }, user, token) {
        //   fetch({
        //     url:'http://dev.countinsight.com/api/admin/shopgoods/create',
        //     data:{}
        //   })
        //   commit('USER_SIGNIN', user, token)
        // },
        // ['USER_SIGNIN']({ commit }, data) {
        //   // console.log('actions USER_SIGNIN')
        //   commit('USER_SIGNIN', data)
        // },
        // ['USER_SIGNOUT']({ commit }) {
        //   commit('USER_SIGNOUT')
        // }
    },

    mutations: {
        // ['USER_REG'](state, data) {
        //   Object.assign(state, data)
        //   localStorage.setItem('user', JSON.stringify(state))
        // }
    },

    getters: {}
}