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
                    "tag_group_name": "服务标签组其他", //标签组名字
                    "tag_group_deep": 1,
                    "tag_group_id": "29", //标签组id
                    "tag_list": //标签列表
                        [{
                            "tag_name": "服务标签91", //标签名字
                            "tag_id": "91" //标签id
                        },
                        {
                            "tag_name": "服务标签90", //标签名字
                            "tag_id": "90" //标签id
                        },
                        {
                            "tag_name": "服务标签89", //标签名字
                            "tag_id": "89" //标签id
                        }
                    ]
                },
                {
                    "tag_group_name": "服务标签组总", //标签组名字
                    "tag_group_deep": 1,
                    "tag_group_id": "26", //标签组id
                    "tag_group_sons": //名下二级标签组列表
                        [{
                            "tag_group_name": "服务标签组2", //标签组名字
                            "tag_group_deep": 2,
                            "tag_group_id": "28", //标签组id
                            "tag_list": //标签列表
                                [{
                                    "tag_name": "服务标签88", //标签名字
                                    "tag_id": "88" //标签id
                                },
                                {
                                    "tag_name": "服务标签87",
                                    "tag_id": "87"
                                },
                                {
                                    "tag_name": "服务标签86",
                                    "tag_id": "86"
                                },
                                {
                                    "tag_name": "服务标签85",
                                    "tag_id": "85"
                                },
                                {
                                    "tag_name": "服务标签84",
                                    "tag_id": "84"
                                },
                                {
                                    "tag_name": "服务标签83",
                                    "tag_id": "83"
                                },
                                {
                                    "tag_name": "服务标签82",
                                    "tag_id": "82"
                                },
                                {
                                    "tag_name": "服务标签81",
                                    "tag_id": "81"
                                }
                            ]
                        },
                        {
                            "tag_group_name": "服务标签组1",
                            "tag_group_deep": 2,
                            "tag_group_id": "27",
                            "tag_list": //标签组列表
                                [{
                                    "tag_name": "服务标签80",
                                    "tag_id": "80"
                                },
                                {
                                    "tag_name": "服务标签79",
                                    "tag_id": "79"
                                },
                                {
                                    "tag_name": "服务标签78",
                                    "tag_id": "78"
                                },
                                {
                                    "tag_name": "服务标签77",
                                    "tag_id": "77"
                                }
                            ]
                        }
                    ]
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