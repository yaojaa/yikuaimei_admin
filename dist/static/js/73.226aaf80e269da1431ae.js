webpackJsonp([73],{"+I+c":function(e,t){},"0b+p":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("0qDT"),n=a("PMOO"),r=a("tVcc"),s={name:"userlist",data:function(){return{url:"",breadcrumb:[{name:"用户管理",url:"/userlist"},{name:"用户收入"}],searchs:{list:[{type:"input-text",label:"手机号码",name:"phone",value:"",placeholder:"手机号"},{type:"input-text",label:"城市",name:"city",value:"",placeholder:"城市"},{type:"input-select",label:"收益来源",name:"option",value:"all",options:[{name:"全部",value:"all"},{name:"option2",value:"option2"},{name:"option3",value:"option3"}]},{type:"input-date",label:"收益时间",name:"date",value:""}]},tableJson:{column:[{type:"text",align:"center",label:"用户ID",prop:"date",width:""},{type:"text",align:"center",label:"手机号码",prop:"name",width:""},{type:"text",align:"center",label:"金额",prop:"address",width:"150"},{type:"text",align:"center",label:"时间",prop:"date",width:""},{type:"text",align:"center",label:"收益来源",prop:"date",width:""}]}}},components:{NomalTable:l.a,TableSearch:n.a,BreadCrumb:r.a},created:function(){},computed:{},methods:{}},i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page"},[t("div",{staticClass:"page-header"},[t("bread-crumb",{attrs:{"bread-crumb":this.breadcrumb}})],1),this._v(" "),t("div",{staticClass:"page-content"},[t("nomal-table",{attrs:{"table-json":this.tableJson,url:this.url}},[t("table-search",{attrs:{searchs:this.searchs}})],1)],1)])},staticRenderFns:[]};var c=a("VU/8")(s,i,!1,function(e){a("+I+c")},"data-v-441d5d01",null);t.default=c.exports}});