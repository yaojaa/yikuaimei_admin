webpackJsonp([106],{CtWP:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("bOdI"),s=a.n(i),n=a("gRE1"),l=a.n(n),r=a("fZjL"),o=a.n(r),u=a("0qDT"),c=a("tVcc"),p=a("PMOO"),d=a("y5RH"),_={name:"tabletest",data:function(){return{status_filter:"",category:[],user:JSON.parse(localStorage.user),visible:!1,currentItem:{},tagsListGroup:{"选择状态:":[{title:"全部",key:"is_use",value:0},{title:"已上架",key:"is_use",value:1},{title:"未上架",key:"is_use",value:2}],"行业分类":[{title:"美容",key:"category_id",value:1},{title:"美甲美瞳",key:"category_id",value:2},{title:"美发",key:"category_id",value:3},{title:"美体",key:"category_id",value:4},{title:"轻医美",key:"category_id",value:5}]},url:"/api/admin/shopgoods/index",breadcrumb:[{name:"商品管理"},{name:"平台商品",url:"/goodList"}],searchs:{list:[{type:"input-text",label:"商品名称",name:"good_name",value:"",placeholder:"请输入名称"},{type:"input-text",label:"标签",name:"tag_name",value:"",placeholder:"请输入标签名称"}]},tableJson:{}}},components:{NomalTable:u.a,BreadCrumb:c.a,TableSearch:p.a},beforeRouteUpdate:function(t,e,a){console.log(t.query),this.status_filter=o()(t.query)[0]+l()(t.query)[0],this.$refs.table.getData(t.query),a()},created:function(){this.tableJson=this.initColumn()},computed:{},mounted:function(){},methods:{initColumn:function(){return{column:[{type:"text",label:"商品",width:"200px",formatter:function(t){var e="<div style='background-color#fff;padding:8px;'>";return e+="<div style='float:left;width:80px;height:80px;margin-right:8px;'><img style='width:100%; height:100%;' src='"+t.good_ico+"'></div>",e+="<p class='list-good-name'>"+t.good_name+"</p>",e+="<p class='list-good-price' style='margin-top:10px;'>¥"+t.price_low+"</p>",e+="</div>"}},{type:"text",label:"标签",prop:"label_name",align:"center",formatter:function(t){return"<p style='text-align: center'>"+(t.tag_name_arr.length>2?t.tag_name_arr[0]+","+t.tag_name_arr[1]+"...":2===t.tag_name_arr.length?t.tag_name_arr[0]+","+t.tag_name_arr[1]:1===t.tag_name_arr.length?t.tag_name_arr[0]:"--")+"</p>"}},{type:"text",label:"分类",prop:"category_name",width:"",align:"center"},{type:"text",label:"状态",prop:"status",width:"",align:"center",formatter:function(t){return"<p style='text-align: center'>\n                                                  "+d.a.status[t.is_use]+"\n                                                </p>"}},{type:"text",label:"总销量",align:"center",width:"",prop:"sell"},{type:"handle",label:"操作",align:"center",width:"",list:[{label:"下架",type:"edit",onClick:function(t,e,a){e.openModal(a)}},{label:"编辑",type:"edit",onClick:function(t,e,a){e.$router.push({path:"/createGood",query:{good_id:a.good_id,good_type:2}})}}]}]}},getData:function(t,e){this.$refs.table.getData(s()({},t,e))},openModal:function(t){this.currentItem=t,this.visible=!0},doUpdateIsUse:function(){var t=this,e=this.currentItem,a=e.good_id,i=e.is_use,s=void 0;1===i?s=2:2===i&&(s=1);var n={id:a,is_use:s};this.$axios.post("/api/admin/shopgoods/isUse",n).then(function(e){t.visible=!1,t.$refs.table.getData({good_type:1}),t.tableJson=t.initColumn()})}}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-header"},[a("div",{staticClass:"crumbs"},[a("bread-crumb",{attrs:{"bread-crumb":t.breadcrumb}})],1)]),t._v(" "),a("div",{staticClass:"page-content"},[a("div",{staticClass:"sub-heading"},[t._m(0),t._v(" "),a("div",{staticClass:"sub-actions"},[a("el-button",{attrs:{icon:"el-icon-plus",size:"mini",type:"primary"},on:{click:function(e){t.$router.push({path:"/categorylist"})}}},[t._v("管理分类")]),t._v(" "),a("el-button",{attrs:{icon:"el-icon-plus",size:"mini",type:"primary"},on:{click:function(e){t.$router.push({path:"/labellist"})}}},[t._v("管理标签")]),t._v(" "),a("el-button",{attrs:{icon:"el-icon-plus",size:"mini",type:"primary"},on:{click:function(e){t.$router.push({path:"/createGood?good_id=0&good_type=2"})}}},[t._v("添加商品")])],1)]),t._v(" "),t._l(t.tagsListGroup,function(e,i,s){return a("div",{key:s,staticClass:"status_filter"},[a("ul",[a("li",{staticClass:"tags-li"},[t._v("\n\t\t\t\t\t"+t._s(i)+"\n\t\t\t\t\t"),t._l(e,function(e){return a("router-link",{key:e.value,class:e.key+e.value==t.status_filter?"active":"",attrs:{to:{path:"/goodList",query:(i={},i[e.key]=e.value,i)}}},[t._v("\n\t\t\t\t\t\t"+t._s(e.title))]);var i})],2)])])}),t._v(" "),a("nomal-table",{ref:"table",attrs:{"table-json":t.tableJson,url:t.url,query:{good_type:2}}},[a("table-search",{attrs:{searchs:t.searchs}})],1),t._v(" "),a("el-dialog",{attrs:{title:"下架",visible:t.visible,width:"30%"}},[a("p",[t._v("确定要下架"+t._s(t.currentItem.good_name)+"吗?")]),t._v(" "),a("p",[t._v("操作人:"+t._s(t.user.data.user_realname))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.doUpdateIsUse}},[t._v("确 定")])],1)])],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{staticClass:"sub-title"},[e("span",{staticClass:"sub-icon"},[e("img",{attrs:{src:"/static/img/sub_icon.png",width:"100%"}})]),e("span",{staticClass:"title"},[this._v("常用功能")])])}]};var v=a("VU/8")(_,g,!1,function(t){a("G6ea")},"data-v-06b63380",null);e.default=v.exports},G6ea:function(t,e){}});