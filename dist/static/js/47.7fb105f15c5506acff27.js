webpackJsonp([47],{Bskz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("0qDT"),n=a("tVcc"),s=a("PMOO"),r={data:function(){return{url:"./static/vuetable.json",breadcrumb:[{name:"消息"},{name:"短信"}],searchs:{list:[{type:"input-date",label:"发布时间",name:"date",value:""},{type:"input-text",label:"接受对象",name:"user",value:"",placeholder:"手机号码"},{type:"input-select",label:"发送对象",name:"obj",value:"0",options:[{name:"个人",value:"0"},{name:"系统",value:"1"}]}],btn:{iconClass:"el-icon-search",label:"搜索"}},tableJson:{column:[{type:"text",label:"发送对象",prop:"name",width:"",align:"center"},{type:"text",label:"内容",prop:"address",width:"",align:"center"},{type:"text",label:"接受对象",prop:"name",width:"",align:"center"},{type:"text",label:"发送时间",prop:"date",width:"",align:"center"}]}}},components:{NomalTable:l.a,BreadCrumb:n.a,TableSearch:s.a},created:function(){},computed:{},methods:{}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page"},[t("div",{staticClass:"page-header"},[t("div",{staticClass:"crumbs"},[t("bread-crumb",{attrs:{"bread-crumb":this.breadcrumb}})],1)]),this._v(" "),t("div",{staticClass:"page-content"},[t("nomal-table",{attrs:{"table-json":this.tableJson,url:this.url}},[t("table-search",{attrs:{searchs:this.searchs}})],1)],1)])},staticRenderFns:[]};var i=a("VU/8")(r,c,!1,function(e){a("mkkf")},"data-v-73251ea5",null);t.default=i.exports},mkkf:function(e,t){}});