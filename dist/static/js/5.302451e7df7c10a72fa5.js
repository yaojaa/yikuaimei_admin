webpackJsonp([5],{"7xKk":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("7agB");var a=s("tVcc"),i=s("mvHQ"),r=s.n(i),o={name:"Dirlst",components:{},data:function(){return{}},props:{disInfo:{type:Array,default:function(){return[]}}},computed:{disInfo_id:function(){return disInfo.order_dis_package_id}},beforeRouteUpdate:function(t,e,s){},created:function(){console.log(this.disInfo)},mounted:function(){},methods:{}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("el-steps",{attrs:{space:100,direction:"vertical",active:0}},this._l(this.disInfo,function(t,s){return e("el-step",{key:s,attrs:{title:t.order_dis_ctime+" "+t.order_dis_content}})}))],1)},staticRenderFns:[]};var _={data:function(){return{tabName:"package1",orderCode:this.$route.params.order_code,orderExpress:{},disList:{}}},components:{DirList:s("VU/8")(o,n,!1,function(t){s("JevA")},"data-v-9585f840",null).exports},beforeRouteUpdate:function(t,e,s){},created:function(){},computed:{},mounted:function(){this.getData(this.$route.params)},methods:{getData:function(t){var e=this;this.$axios({method:"get",url:"/api/admin/order/disList",params:t}).then(function(t){var s=JSON.parse(r()(t.data.data)),a=[];s.package_list.map(function(t){var e=0,s=0;t.goods_list.map(function(t){e+=t.goods_price,s+=t.goods_num}),t.total_price=e,t.total_num=s,a.push(t)}),s.package_list=a,e.orderExpress=s,e.disList=s.dis_list}).catch(function(t){})},formatPrice:function(t){return(t/100).toFixed(2)}}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("p",{staticClass:"express_title"},[t._v("物流信息")]),t._v(" "),s("div",{staticClass:"express_list"},[t._m(0),t._v(" "),t._l(t.orderExpress.package_list,function(e,a){return s("div",{key:a,staticClass:"package_item"},[s("div",{staticClass:"package_info flex_box"},[s("div",{staticClass:"package_info_col"},[s("p",[t._v(t._s("快递 自取".split(" ")[e.order_dis_package_type]))])]),t._v(" "),s("div",{staticClass:"package_info_col"},[s("p",[t._v(t._s(e.dis_name))])]),t._v(" "),s("div",{staticClass:"package_info_col"},[s("p",[t._v(t._s("等待发货 配送中 配送完成 配送取消 异常".split(" ")[e.order_dis_package_status]))])]),t._v(" "),s("div",{staticClass:"package_info_col"},[s("p",[t._v(t._s(e.dis_code))])]),t._v(" "),s("div",{staticClass:"package_info_col"},[s("p",[t._v(t._s(e.order_dis_package_ctime))])]),t._v(" "),s("span",{staticClass:"option"},[t._v("收起")])]),t._v(" "),s("div",{staticClass:"packge_list flex_box"},[s("div",{staticClass:"packge_list_item good_list"},t._l(e.goods_list,function(e,a){return s("div",{key:a,staticClass:"flex_box good_item"},[s("img",{staticClass:"good_item_col",attrs:{src:e.goods_img,alt:""}}),t._v(" "),s("p",{staticClass:"good_item_col good_name"},[t._v(t._s(e.goods_name))]),t._v(" "),s("p",{staticClass:"good_item_col good_number"},[t._v("✖"+t._s(e.goods_num))])])})),t._v(" "),s("div",{staticClass:"packge_list_item"},[s("p",{staticClass:"goods_total_price"},[t._v("总额： ¥"+t._s(t.formatPrice(e.total_price)))]),t._v(" "),s("p",{staticClass:"goods_total_num"},[t._v(t._s(e.total_num)+"瓶")]),t._v(" "),s("p",{staticClass:"order_dis_type"},[t._v(t._s("快递 自取".split(" ")[e.order_dis_package_type])+"(¥"+t._s(t.formatPrice(t.orderExpress.order_dis_price))+")")])]),t._v(" "),s("div",{staticClass:"packge_list_item"},[s("p",{staticClass:"send_num"},[t._v(t._s(e.dis_send_name))]),t._v(" "),s("p",{staticClass:"send_phone"},[t._v(t._s(e.dis_send_phone))])]),t._v(" "),s("div",{staticClass:"packge_list_item"},[s("p",{staticClass:"package_num"},[t._v("包裹"+t._s(a+1))])])])])})],2),t._v(" "),s("div",{staticClass:"dis_list"},[s("el-tabs",{model:{value:t.tabName,callback:function(e){t.tabName=e},expression:"tabName"}},t._l(t.orderExpress.package_list,function(e,a){return s("el-tab-pane",{key:a,attrs:{label:"物流包裹"+(a+1),name:"package"+(a+1)}},[s("DirList",{attrs:{packageId:e.order_dis_package_id,disInfo:t.disList?t.disList[e.order_dis_package_id]:[]}})],1)}))],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex_box"},[s("div",{staticClass:"express_list_title"},[t._v("配送方式")]),t._v(" "),s("div",{staticClass:"express_list_title"},[t._v("物流公司名称")]),t._v(" "),s("div",{staticClass:"express_list_title"},[t._v("物流状态")]),t._v(" "),s("div",{staticClass:"express_list_title"},[t._v("运单号")]),t._v(" "),s("div",{staticClass:"express_list_title"},[t._v("发货时间")])])}]};var c=s("VU/8")(_,d,!1,function(t){s("icFL")},"data-v-86f15eb8",null).exports,l=s("CM8H"),v={name:"OrderRefundInfo",components:{},data:function(){return{refundType:{1:"退款",2:"退货",3:"换货"}}},props:{refundInfo:{type:Object,default:function(){}}},computed:{},created:function(){console.log(this.refundInfo)},mounted:function(){},methods:{formatPrice:function(t){return(t/100).toFixed(2)}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"panel"},[s("div",{staticClass:"panel-heading"},[s("h3",{staticClass:"panel-title",staticStyle:{"line-height":"28px",background:"#FBFBFF 100%"}},[t._v("\n                状态："+t._s(t.refundInfo.refund_status_name)+"\n            ")])])]),t._v(" "),s("div",{staticClass:"panel"},[t._m(0),t._v(" "),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"info_p"},[t._v("\n                退货单号："+t._s(t.refundInfo.order_refund_id)),s("br"),t._v(" 申请时间："+t._s(t.refundInfo.order_refund_ctime)+"\n                "),s("br"),t._v(" 订单号："+t._s(t.refundInfo.order_code)+"\n            ")])])]),t._v(" "),s("div",{staticClass:"panel"},[t._m(1),t._v(" "),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"info_p"},[t._v("\n                申请类型："+t._s(t.refundType[t.refundInfo.order_refund_type])+"\n                "),s("br")]),t._v(" "),s("div",{staticClass:"good_list"},[t._m(2),t._v(" "),t._l(t.refundInfo.goods_info,function(e,a){return s("div",{key:a,staticClass:"flex_box good_item"},[s("div",{staticClass:"good_item_col"},[s("img",{attrs:{src:e.goods_img}}),t._v(" "),s("p",[t._v(t._s(e.goods_name))])]),t._v(" "),s("div",{staticClass:"good_item_col"},[s("p",[t._v("¥"+t._s(t.formatPrice(e.goods_original_price)))])]),t._v(" "),s("div",{staticClass:"good_item_col"},[s("p",[t._v("¥"+t._s(t.formatPrice(e.goods_refund_price)))])]),t._v(" "),s("div",{staticClass:"good_item_col"},[s("p",[t._v(t._s(e.goods_num))])])])}),t._v(" "),s("p",{staticClass:"goods_total_price"}),t._v(" "),s("p",{staticClass:"goods_total_refund_price"})],2)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"panel-heading"},[e("h3",{staticClass:"panel-title"},[this._v("平台审核通过")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"panel-heading"},[e("h3",{staticClass:"panel-title"},[this._v("退货申请内容")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex_box"},[e("div",{staticClass:"good_item_title"},[this._v("商品")]),this._v(" "),e("div",{staticClass:"good_item_title"},[this._v("原价（元）")]),this._v(" "),e("div",{staticClass:"good_item_title"},[this._v("申请退款金额（元）")]),this._v(" "),e("div",{staticClass:"good_item_title"},[this._v("数量")])])}]};var p=s("VU/8")(v,u,!1,function(t){s("QFzu")},"data-v-35aee87c",null).exports,f={name:"orderDetail",components:{BreadCrumb:a.a,ExpressInfo:c,OrderDetail:l.a,RefundInfo:p},data:function(){return{tabName:"OrderInfo",breadcrumb:[{name:"订单管理"},{name:"服务订单",url:"/order/list_goods"},{name:"订单详情"}],refundTabName:"refund_0",orderCode:this.$route.params.order_code,order:{},refundList:[],order_status:{1:"待处理",2:"待发货",3:"已发货",4:"已完成",5:"已评价",8:"已取消"}}},beforeRouteUpdate:function(t,e,s){},created:function(){},computed:{},mounted:function(){this.getData(this.$route.params),this.getRefundList(this.$route.params)},methods:{getData:function(t){var e=this;this.$axios({method:"get",url:"/api/admin/order/info",params:t}).then(function(t){e.order=t.data.data}).catch(function(t){})},getRefundList:function(t){var e=this;this.$axios({method:"get",url:"/api/admin/order/refundList",params:t}).then(function(t){e.refundList=t.data.data}).catch(function(t){})},formatPrice:function(t){return(t/100).toFixed(2)}}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page"},[s("div",{staticClass:"page-header"},[s("div",{staticClass:"crumbs"},[s("bread-crumb",{attrs:{"bread-crumb":t.breadcrumb}})],1)]),t._v(" "),s("div",{staticClass:"page-content"},[s("el-tabs",{model:{value:t.tabName,callback:function(e){t.tabName=e},expression:"tabName"}},[s("el-tab-pane",{attrs:{label:"基本信息",name:"OrderInfo"}},[s("OrderDetail",{attrs:{order:t.order}})],1),t._v(" "),s("el-tab-pane",{attrs:{label:"物流信息",name:"ExpressInfo"}},[s("ExpressInfo",{attrs:{"order-code":t.orderCode}})],1),t._v(" "),s("el-tab-pane",{attrs:{label:"退款/退货",name:"OrderRefund"}},[s("div",{staticClass:"refund-list"},[s("el-tabs",{model:{value:t.refundTabName,callback:function(e){t.refundTabName=e},expression:"refundTabName"}},t._l(t.refundList,function(t,e){return s("el-tab-pane",{key:t.order_refund_id,attrs:{label:"订单"+(e+1),name:"refund_"+e}},[s("RefundInfo",{key:"refund_"+t.order_refund_id,attrs:{refundInfo:t}})],1)}))],1)])],1)],1)])},staticRenderFns:[]};var g=s("VU/8")(f,m,!1,function(t){s("P8xM")},"data-v-fb0ab4fe",null);e.default=g.exports},CM8H:function(t,e,s){"use strict";s("7agB");var a={name:"OrderDetail",components:{},data:function(){return{orderCode:this.$route.params.order_code,order_status:{1:"待处理",2:"待发货",3:"已发货",4:"已完成",5:"已评价",8:"已取消"}}},props:{order:{type:Object,default:function(){}}},computed:{},beforeRouteUpdate:function(t,e,s){},created:function(){console.log(this.order)},mounted:function(){},methods:{formatPrice:function(t){return(t/100).toFixed(2)}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"panel"},[s("div",{staticClass:"panel-heading"},[s("h3",{staticClass:"panel-title",staticStyle:{"line-height":"28px",background:"#FBFBFF 100%"}},[t._v("\n                订单状态："+t._s(t.order_status[t.order.order_status_all])+"\n                "),2==+t.order.order_status_all?s("el-button",{staticStyle:{float:"right"},attrs:{icon:"el-icon-plus",size:"mini",type:"primary"},on:{click:function(e){t.$router.push({path:"/categorylist"})}}},[t._v("\n                    去发货\n                ")]):t._e()],1)])]),t._v(" "),s("div",{staticClass:"panel"},[t._m(0),t._v(" "),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"info_p"},[t._v("\n                用户昵称："+t._s(t.order.order_user_name)),s("br"),t._v(" 支付方式："+t._s("微信支付 银联支付 现金支付 ".split(" ")[t.order.pay_type])),s("br"),t._v(" 收货地址："+t._s(t.order.order_user_address)+"\n            ")])])]),t._v(" "),s("div",{staticClass:"panel"},[t._m(1),t._v(" "),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"order_item"},[s("div",{staticClass:"order_tit"},[s("span",[t._v("下单时间："+t._s(t.order.order_pay_time))]),t._v(" "),s("span",[t._v("订单编号:"+t._s(t.order.order_code))])]),t._v(" "),s("div",{staticClass:"good_list"},[t._m(2),t._v(" "),t._l(t.order.goods_list,function(e,a){return s("div",{key:a,staticClass:"flex_box good_item"},[s("div",{staticClass:"good_item_col"},[s("img",{attrs:{src:e.goods_img}}),t._v(" "),s("p",[t._v(t._s(e.goods_name))])]),t._v(" "),s("div",{staticClass:"good_item_col"},[s("p",[t._v("¥"+t._s(e.goods_price/100))]),t._v(" "),s("p",{staticStyle:{color:"#999","margin-top":"5px"}},[t._v(t._s(e.goods_num)+"瓶")])]),t._v(" "),s("div",{staticClass:"good_item_col"},[s("p",[t._v("¥"+t._s(t.formatPrice(e.goods_price*e.goods_num)))])])])})],2),t._v(" "),s("p",[t._v(t._s(t.order.order_gifts))]),t._v(" "),s("div",{staticClass:"total"},[s("p",[s("label",{attrs:{for:""}},[t._v("商品金额:")]),t._v(" "),s("span",[t._v("¥"+t._s(t.formatPrice(t.order.order_total_price)))])]),t._v(" "),s("p",[s("label",{attrs:{for:""}},[t._v("优惠金额:")]),t._v(" "),s("span",[t._v("-¥"+t._s(t.formatPrice(t.order.order_reduce_price)))])]),t._v(" "),s("p",[s("label",{attrs:{for:""}},[t._v("配送费:")]),t._v(" "),s("span",[t._v("¥"+t._s(t.formatPrice(t.order.order_dis_price)))])]),t._v(" "),s("p",[s("label",{attrs:{for:""}},[t._v("实收款:")]),t._v(" "),s("span",[t._v("¥"+t._s(t.formatPrice(t.order.order_online_price)))])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"panel-heading"},[e("h3",{staticClass:"panel-title"},[this._v("买家信息")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"panel-heading"},[e("h3",{staticClass:"panel-title"},[this._v("订单信息")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex_box"},[e("div",{staticClass:"good_item_title"},[this._v("商品")]),this._v(" "),e("div",{staticClass:"good_item_title"},[this._v("单价（元）/数量")]),this._v(" "),e("div",{staticClass:"good_item_title"},[this._v("商品总价（元）")])])}]};var r=s("VU/8")(a,i,!1,function(t){s("V8Xu")},"data-v-6fcae5f8",null);e.a=r.exports},JevA:function(t,e){},P8xM:function(t,e){},QFzu:function(t,e){},V8Xu:function(t,e){},icFL:function(t,e){}});