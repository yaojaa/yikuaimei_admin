webpackJsonp([60],{"Ew/l":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("0qDT"),i=a("tVcc"),n=a("PMOO"),s=a("SAp9"),r={name:"member",data:function(){return{url:"/api/admin/adminuser/list",breadcrumb:[{name:"设置"},{name:"成员管理"}],searchs:{list:[{type:"input-text",label:"角色名称",name:"role_name",value:"",placeholder:"角色名称"},{type:"input-text",label:"成员姓名",name:"user_realname",value:"",placeholder:"成员姓名"},{type:"input-text",label:"手机号码",name:"user_name",value:"",placeholder:"手机号码"},{type:"input-radio",label:"是否启用",name:"is_start_using",value:0,options:[{name:"全部",value:0},{name:"启用",value:1},{name:"不启用",value:2}]}]},tableJson:{idName:"user_id",column:[{type:"text",label:"手机号码",prop:"user_name",minWidth:"120",align:"center"},{type:"text",label:"成员姓名",prop:"user_realname",minWidth:"150",align:"center"},{type:"text",label:"角色名称",prop:"role_name",minWidth:"100",align:"center"},{type:"text",label:"添加时间",prop:"user_ctime",minWidth:"160",align:"center"},{type:"text",label:"最后登录",prop:"user_last_logintime",minWidth:"160",align:"center"},{type:"switch",label:"是否启用",align:"center",minWidth:"100",prop:"is_start_using",config:{activeColor:"green",inactiveColor:"gray",value:[2,1]},axiosUrl:"/api/admin/adminuser/edit",axiosType:"post"},{type:"handle",label:"操作",align:"center",width:"200",list:[{label:"权限查看",type:"detail",url:"/"},{label:"编辑",type:"edit",url:"/set/addmember"},{label:"删除",type:"delete",axiosUrl:"/api/admin/adminuser/delete",axiosType:"post"}]}]}}},components:{NomalTable:l.a,BreadCrumb:i.a,TableSearch:n.a,AddButton:s.a},created:function(){},computed:{},methods:{}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-header"},[a("div",{staticClass:"crumbs"},[a("bread-crumb",{attrs:{"bread-crumb":e.breadcrumb}})],1)]),e._v(" "),a("div",{staticClass:"page-content"},[a("nomal-table",{attrs:{"table-json":e.tableJson,url:e.url}},[a("table-search",{attrs:{searchs:e.searchs}}),e._v(" "),a("div",{staticClass:"sub-heading"},[a("h3",{staticClass:"sub-title"},[a("span",{staticClass:"sub-icon"},[a("img",{attrs:{src:"/static/img/sub_icon.png",width:"100%"}})]),a("span",{staticClass:"title"},[e._v("数据列表")])]),e._v(" "),a("div",{staticClass:"sub-actions"},[a("el-button",{attrs:{icon:"el-icon-plus",size:"mini",type:"primary"},on:{click:function(t){e.$router.push({path:"/set/addmember"})}}},[e._v("添加成员")])],1)])],1)],1)])},staticRenderFns:[]};var u=a("VU/8")(r,c,!1,function(e){a("Q9HX")},"data-v-55e04b17",null);t.default=u.exports},Q9HX:function(e,t){}});