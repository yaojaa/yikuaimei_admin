webpackJsonp([92],{Br8j:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("0qDT"),n=a("o7+X"),i={data:function(){return{israse:!0,data:[{title:"今日接待人数（人）",num:600,label:"总接待人数200人",lefttitle:"昨日接待人数",lfetnum:65,righttitle:"环比接待人数",rightnum:70},{title:"今日接待次数（人）",num:500,label:"总接待次数200次",lefttitle:"昨日接待人数",lfetnum:6555,righttitle:"环比接待次数",rightnum:70}],tableJson:{column:[{type:"text",align:"center",label:"手机号码",prop:"address"},{type:"text",align:"center",label:"客服姓名",prop:"date",width:"200"},{type:"text",align:"center",label:"所属分公司",prop:"address"},{type:"text",align:"center",label:"当前状态",prop:"date",width:"100"},{type:"text",align:"center",label:"添加时间",prop:"address"},{type:"text",align:"center",label:"最后登录",prop:"date",width:"200"},{type:"switch",label:" 是否启用",align:"center",width:"80",prop:"switch",config:{activeColor:"green",inactiveColor:"gray",value:["0","1"]}},{type:"handle",label:"操作",align:"center",width:"",list:[{label:"查看记录",type:"edit",url:"/servermanage/check?id=1123",onClick:function(t,e){console.log(e.vue),console.log(t.isShow),e.nomal=!e.nomal,t.isShow=!t.isShow}},{label:"编辑",type:"edit",url:"",onClick:function(t,e){console.log(e.vue),console.log(t.isShow),e.nomal=!e.nomal,t.isShow=!t.isShow}},{label:"删除",type:"edit",url:"",onClick:function(t,e){console.log(e.vue),console.log(t.isShow),e.nomal=!e.nomal,t.isShow=!t.isShow}}]}]}}},beforeCreate:function(){},mounted:function(){},components:{NomalTable:l.a,DataDisplay:n.a}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"con"},[a("div",{staticClass:"textboxcontainer"},[a("data-display",{attrs:{data:t.data}})],1),t._v(" "),a("div",{staticClass:"sub-heading"},[t._m(0),t._v(" "),a("div",{staticClass:"sub-actions"},[a("el-button",{attrs:{icon:"el-icon-plus",size:"mini",type:"primary"},on:{click:function(e){t.$router.push({path:"/servermanage/addserver"})}}},[t._v("添加客服")])],1)]),t._v(" "),a("NomalTable",{attrs:{"table-json":t.tableJson}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{staticClass:"sub-title"},[e("span",{staticClass:"sub-icon"},[e("img",{attrs:{src:"/static/img/sub_icon.png",width:"100%"}})]),e("span",{staticClass:"title"},[this._v("数据列表")])])}]};var s=a("VU/8")(i,o,!1,function(t){a("a9T9")},"data-v-110d8c14",null);e.default=s.exports},a9T9:function(t,e){}});