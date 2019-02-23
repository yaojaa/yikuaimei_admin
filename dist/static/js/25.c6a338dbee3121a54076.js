webpackJsonp([25],{"4d+Q":function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"detail",components:{},data:function(){return{tab:"info",info:{},id:"",shopList:{}}},beforeRouteUpdate:function(s,t,a){},created:function(){},computed:{},mounted:function(){console.log(this.$route.params),this.id=this.$route.params.id,this.getData(this.$route.params),this.getShopList()},methods:{handleTabsClick:function(s){console.log(this.tab)},getData:function(s){var t=this;this.$axios({method:"get",url:"/api/admin/business/getOneById",params:s}).then(function(s){0==s.data.code?t.info=s.data.data:t.$alert("接口返回错误")}).catch(function(s){t.$alert("接口返回错误"+s)})},getShopList:function(){var s=this;this.$axios({method:"get",url:"/api/admin/business/getBusinessShop",params:{id:this.id,page_size:100}}).then(function(t){0==t.data.code?s.shopList=t.data.data:s.$alert("接口返回错误")}).catch(function(t){s.$alert("接口返回错误"+t)})},formatPrice:function(s){return(s/100).toFixed(2)}}},e={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-header"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[s._v("加盟商")]),s._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:s.$route.path}}},[s._v(s._s(s.$route.meta.title))])],1)],1),s._v(" "),a("div",{staticClass:"page-content"},[a("el-tabs",{staticClass:"primary-tab",on:{"tab-click":s.handleTabsClick},model:{value:s.tab,callback:function(t){s.tab=t},expression:"tab"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"info"}}),s._v(" "),a("el-tab-pane",{attrs:{label:"拥有门店",name:"shop"}})],1),s._v(" "),"shop"==s.tab?a("div",{staticClass:"page-column"},[a("div",{staticClass:"p-xl"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:s.shopList}},[a("el-table-column",{attrs:{prop:"shop_name",label:"门店",width:"280"}}),s._v(" "),a("el-table-column",{attrs:{prop:"shop_ctime",label:"创建时间",width:"180"}}),s._v(" "),a("el-table-column",{attrs:{prop:"shop_service_phone",label:"类型"}}),s._v(" "),a("el-table-column",{attrs:{prop:"shop_service_phone",label:"店长"}}),s._v(" "),a("el-table-column",{attrs:{prop:"shop_service_phone",label:"手机号"}})],1)],1)]):s._e(),s._v(" "),"info"==s.tab?a("div",{staticClass:"page-column"},[a("div",{staticClass:"page-main"},[a("div",{staticClass:"panel-status text-justify"},[a("div",[a("span",[s._v("状态：")]),a("span",{staticClass:"f18 bold"},[s._v("\n                "+s._s(["删除","正常"][s.info.business_status])+"\n            ")])])]),s._v(" "),a("div",{staticClass:"panel"},[s._m(0),s._v(" "),a("div",{staticClass:"panel-body"},[a("div",{staticClass:"item-list f14 four-text"},[a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("法人代表：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.business_corporation)+"\n\n                                    拥有"+s._s(s.info.shop_total)+"家门店\n                                ")])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("联系电话：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.business_phone))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("公司名称：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.business_name))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("企业类型：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.business_type))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("行业：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.category_name))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("推荐人：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.referee_phone))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("法人身份证：")]),s._v(" "),a("div",{staticClass:"bd"},[a("img",{attrs:{src:s.info.business_sfz_pic_z,width:"200"}}),s._v(" "),a("img",{attrs:{src:s.info.business_sfz_pic_f,width:"200"}})])])])])]),s._v(" "),a("div",{staticClass:"panel"},[s._m(1),s._v(" "),a("div",{staticClass:"panel-body"},[a("div",{staticClass:"item-list f14 four-text"},[s._m(2),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("加盟时间：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.business_ctime))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("加盟费：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.business_join_money))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("公司地址：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.address_string))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("营业执照号：")]),s._v(" "),a("div",{staticClass:"bd"},[s._v(s._s(s.info.business_licence_num))])]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"hd"},[s._v("营业执照：")]),s._v(" "),a("div",{staticClass:"bd"},[a("img",{attrs:{src:s.info.business_sfz_pic_z,width:"200"}})])])])])])]),s._v(" "),s._m(3)]):s._e()],1)])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"panel-heading"},[t("h3",{staticClass:"panel-title bold"},[this._v("基本信息")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"panel-heading"},[t("h3",{staticClass:"panel-title bold"},[this._v("公司信息")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"item"},[t("div",{staticClass:"hd"},[this._v("经营状态：")]),this._v(" "),t("div",{staticClass:"bd"},[this._v("在业\n                                ")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"page-side"},[t("div",{staticClass:"panel"},[t("div",{staticClass:"panel-heading"},[t("h3",{staticClass:"panel-title bold"},[this._v("审核记录")])]),this._v(" "),t("div",{staticClass:"panel-body"},[t("div",{staticClass:"item-list f14"},[t("div",{staticClass:"item"},[t("div",{staticClass:"bd bold"},[this._v("暂无记录")])])])])])])}]};var l=a("VU/8")(i,e,!1,function(s){a("8EuW")},"data-v-e2b5cb84",null);t.default=l.exports},"8EuW":function(s,t){}});