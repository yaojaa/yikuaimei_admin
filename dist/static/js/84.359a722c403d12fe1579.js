webpackJsonp([84],{"+SF0":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});a("7agB");var i={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-header"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[t._v("订单管理")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:t.$route.path}}},[t._v(t._s(t.$route.meta.title))])],1)],1),t._v(" "),a("div",{staticClass:"page-content"},[a("el-tabs",{staticClass:"primary-tab",on:{"tab-click":function(t){}},model:{value:t.tab,callback:function(s){t.tab=s},expression:"tab"}},[a("el-tab-pane",{attrs:{label:"商品",name:"goods"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"服务",name:"service"}})],1),t._v(" "),a("div",{staticClass:"panel-status text-justify"},[t._m(0),t._v(" "),a("div",[a("el-button",{attrs:{size:"mini",plain:""},on:{click:function(t){}}},[t._v("拒绝退款")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(s){t.successModel=!0}}},[t._v("同意退款")])],1)]),t._v(" "),a("div",{staticClass:"page-column"},[a("div",{staticClass:"page-main"},[t._m(1),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"panel mb-n"},[a("div",{staticClass:"panel-body"},[a("div",{staticClass:"item-list f14 four-text"},[t._m(3),t._v(" "),t._m(4),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[t._v("凭证：")]),t._v(" "),a("div",{staticClass:"bd"},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:6}},[a("img",{staticClass:"w-full",attrs:{src:"https://fakeimg.pl/200x200/"}})])],1)],1)])])])])]),t._v(" "),t._m(5)])],1),t._v(" "),a("el-dialog",{attrs:{title:"同意退款",visible:t.successModel,width:"40%"},on:{"update:visible":function(s){t.successModel=s}}},[a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(s){t.successModel=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(s){t.successModel=!1}}},[t._v("创 建")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("span",[this._v("状态：")]),s("span",{staticClass:"f18 bold"},[this._v("待审核")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"panel"},[a("div",{staticClass:"panel-body"},[a("div",{staticClass:"item-list f14 four-text"},[a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[t._v("退货单号：")]),t._v(" "),a("div",{staticClass:"bd"},[t._v("3948500237")])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[t._v("申请时间：")]),t._v(" "),a("div",{staticClass:"bd"},[t._v("2018-11-12 12:27:53")])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[t._v("订单号：")]),t._v(" "),a("div",{staticClass:"bd"},[t._v("958537049990-4")])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"panel"},[s("div",{staticClass:"panel-heading"},[s("h3",{staticClass:"panel-title bold"},[this._v("退货申请内容")])]),this._v(" "),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"item-list f14 four-text"},[s("div",{staticClass:"item"},[s("div",{staticClass:"hd"},[this._v("申请类型：")]),this._v(" "),s("div",{staticClass:"bd"},[this._v("退货")])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"item"},[s("div",{staticClass:"hd"},[this._v("退货原因：")]),this._v(" "),s("div",{staticClass:"bd"},[this._v("物流问题")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"item"},[s("div",{staticClass:"hd"},[this._v("备注：")]),this._v(" "),s("div",{staticClass:"bd"},[this._v("物流问题，打开包装，好几件瓶子都裂了，全部洒出来，都分不清哪些还是好的，那些被损坏的。 ")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"page-side"},[a("div",{staticClass:"panel"},[a("div",{staticClass:"panel-heading"},[a("h3",{staticClass:"panel-title bold"},[t._v("审核记录")])]),t._v(" "),a("div",{staticClass:"panel-body"},[a("div",{staticClass:"item-list f14 four-text"},[a("div",{staticClass:"item"},[a("div",{staticClass:"bd bold"},[t._v("平台初审同意退款，退款处理中")])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[t._v("处理人：")]),t._v(" "),a("div",{staticClass:"bd"},[t._v("孙妮雅")])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[t._v("处理时间：")]),t._v(" "),a("div",{staticClass:"bd"},[t._v("2018-11-12 12:27:53")])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[t._v("备注：")]),t._v(" "),a("div",{staticClass:"bd"},[t._v("已和客户沟通，确定过敏。")])])])])])])}]};var e=a("VU/8")({name:"RefundDetail",components:{},data:function(){return{tab:"goods",refundId:this.$route.params.refund_id,refundInfo:{},successModel:!1}},beforeRouteUpdate:function(t,s,a){},created:function(){},computed:{},mounted:function(){this.getData(this.$route.params)},methods:{getData:function(t){var s=this;this.$axios({method:"get",url:"/api/admin/refund/info",params:t}).then(function(t){s.order=t.data.data}).catch(function(t){})},formatPrice:function(t){return(t/100).toFixed(2)}}},i,!1,function(t){a("Yv+u")},"data-v-4afa9922",null);s.default=e.exports},"Yv+u":function(t,s){}});