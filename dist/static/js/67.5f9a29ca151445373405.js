webpackJsonp([67],{"S/7v":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("bOdI"),l=a.n(r),s=a("gRE1"),i=a.n(s),o=a("fZjL"),n=a.n(o),u=a("0qDT"),d=a("PMOO"),c={data:function(){return{status_filter:"",tagsListGroup:{"订单类型：":[{title:"全部",key:"profit",value:""},{title:"利润归门店",key:"profit",value:2},{title:"利润归平台",key:"profit",value:1}],"订单状态：":[{title:"全部",key:"status",value:0},{title:"待处理",key:"status",value:1},{title:"已付款",key:"status",value:2},{title:"已发货",key:"status",value:3},{title:"待评价",key:"status",value:4},{title:"已评价",key:"status",value:5},{title:"已取消",key:"status",value:8}]},searchs:{list:[{type:"input-text",label:"用户名",name:"order_user_name",value:"",placeholder:"用户名"},{type:"input-text",label:"手机号",name:"order_user_phone",value:"",placeholder:""},{type:"input-text",label:"订单号",name:"order_code",value:""},{type:"input-text",label:"商品名称",name:"goods_name",value:""},{type:"input-date",label:"日期",name:"date",value:""},{type:"input-date",label:"日期",name:"date",value:""}]},tableJson:{column:[{type:"text",align:"center",label:"商品名称",prop:"business_ctime",width:"300",formatter:function(e){var t="";return e.goods_list.forEach(function(e){t+='<div class="flex_box"><div class="flex_item"><img width="30" height="30" src="'+e.goods_img+'"/></div><div class="flex_item">'+e.goods_name+'</div><div class="flex_item">¥'+e.goods_price+"✖️ "+e.goods_num+"</div></div>"}),t+="</div>"}},{type:"text",align:"center",label:"创建时间",prop:"order_ctime",width:""},{type:"text",align:"center",label:"用户/手机号",prop:"order_user_name",width:"",formatter:function(e){return e.order_user_name+"<br/>"+e.order_user_phone}},{type:"text",align:"center",label:"实付金额",prop:"order_price",width:""},{type:"text",align:"center",label:"订单状态",prop:"order_status_name",width:""},{type:"text",label:"操作",align:"center",width:"200",formatter:function(e){var t='<div style="text-align:right">';return 1==e.order_status&&(t+='<a href="/order/send_goods/'+e.order_code+'" class="el-button reset el-button--default el-button--small" >去发货</a>'),t+='<a href="/order/order_detail/'+e.order_code+'" class="el-button reset el-button--default el-button--small is-plain" >详情</a>',t+="</div>"}}]}}},components:{NomalTable:u.a,TableSearch:d.a},beforeRouteUpdate:function(e,t,a){console.log(e.query),this.status_filter=n()(e.query)[0]+i()(e.query)[0],console.log(this.status_filter),this.$refs.table.getData(e.query),a()},created:function(){console.log("created")},computed:{},methods:{getData:function(e,t){this.$refs.table.getData(l()({},e,t))}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-header"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[e._v("订单管理")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:e.$route.path}}},[e._v(e._s(e.$route.meta.title))])],1)],1),e._v(" "),a("div",{staticClass:"page-content"},[a("div",{staticClass:"filter-tag-box"},e._l(e.tagsListGroup,function(t,r,l){return a("div",{staticClass:"filter-tag-item"},[a("div",{staticClass:"tag-hd"},[e._v(e._s(r))]),e._v(" "),a("div",{staticClass:"tag-bd"},e._l(t,function(t,r){return a("router-link",{key:t.value,staticClass:"tag",class:t.key+t.value==e.status_filter?"active":"",attrs:{to:{path:"/order/list_goods",query:(l={},l[t.key]=t.value,l)}}},[e._v("\n                        "+e._s(t.title))]);var l}))])})),e._v(" "),a("nomal-table",{ref:"table",attrs:{"table-json":e.tableJson,url:"/api/admin/order/index"}},[a("table-search",{attrs:{searchs:e.searchs}})],1)],1)])},staticRenderFns:[]};var v=a("VU/8")(c,p,!1,function(e){a("nAEf")},"data-v-6283beb7",null);t.default=v.exports},nAEf:function(e,t){}});