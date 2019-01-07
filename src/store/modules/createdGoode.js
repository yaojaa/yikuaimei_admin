import Vue from 'vue'

function setHeaders(state) {
  console.log('设置请求header信息')
  Vue.prototype.$axios.defaults.headers = Object.assign(Vue.prototype.$axios.defaults.headers, state);
}
export default {
  state: {
    fornInfo: {
      good_type: 2, //商品类型：1服务 2实物 3采购品项 4虚拟商品
      good_name: "商品名字1", //商品名字
      good_explain: "商品说明1", //商品卖点
      category_id: 1, //行业id
      tag_id_arr: [8, 18, 32], //标签id数组
      good_video: "/vide.mv", //商品视频
      good_video_pic: "/v/pic.mv", //商品视频封面图
      good_img_arr: ["/a1.jpg", "/a2.jpg", "/a3.jpg"], //商品图片数组
      good_ico: "ico.jpg", //商品展示图
      unit: "20盒2000克箱装", //单位 例如盒，箱
      show_img_arr: ["/b1.jpg", "/b2.jpg", "/b3.jpg"], //商品详情页介绍展示图片数组
      explain_img_arr: ["/b1.jpg", "/b2.jpg", "/b3.jpg"], //卖点图数组
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