webpackJsonp([57],{"+SF0":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("7agB");var n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page"},[e("div",{staticClass:"page-header"},[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",[this._v("订单管理")]),this._v(" "),e("el-breadcrumb-item",{attrs:{to:{path:this.$route.path}}},[this._v(this._s(this.$route.meta.title))])],1)],1),this._v(" "),e("div",{staticClass:"page-content"})])},staticRenderFns:[]};var r=a("VU/8")({name:"RefundDetail",components:{},data:function(){return{refundId:this.$route.params.refund_id,refundInfo:{}}},beforeRouteUpdate:function(t,e,a){},created:function(){},computed:{},mounted:function(){this.getData(this.$route.params)},methods:{getData:function(t){var e=this;this.$axios({method:"get",url:"/api/admin/refund/info",params:t}).then(function(t){e.order=t.data.data}).catch(function(t){})},formatPrice:function(t){return(t/100).toFixed(2)}}},n,!1,function(t){a("H66X")},"data-v-6af4f0e8",null);e.default=r.exports},H66X:function(t,e){}});