webpackJsonp([31],{"/Xhj":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("bOdI"),o=a.n(l),r=a("gRE1"),n=a.n(r),s=a("fZjL"),i=a.n(s),c=a("0qDT"),u=a("PMOO"),p=a("7agB"),d={data:function(){return{status_filter:"",tagsListGroup:{"评价类型：":[{title:"订单评价",key:"comment_type",value:1},{title:"服务评价",key:"comment_type",value:2}],"商品类型：":[{title:"商品",key:"good_type",value:2},{title:"服务",key:"good_type",value:1}],"评分：":[{title:"全部",key:"goods_score",value:0},{title:"五星",key:"goods_score",value:5},{title:"四星",key:"goods_score",value:4},{title:"三星",key:"goods_score",value:3},{title:"二星",key:"goods_score",value:2},{title:"一星",key:"goods_score",value:1}]},searchs:{list:[{type:"input-text",label:"用户名",name:"user_name",value:"",placeholder:"用户名"},{type:"input-text",label:"手机号",name:"phone",value:"",placeholder:""},{type:"input-text",label:"订单号",name:"order_number",value:""},{type:"input-text",label:"商品/服务名称",name:"goods_name",value:""},{type:"input-text",label:"标签",name:"tag_name",value:"",placeholder:"请输入标签名称"},{type:"input-date",label:"日期",name:"date",value:""}]},tableJson:{column:[{type:"text",align:"center",label:"商品/服务",prop:"purchase_ctime",width:"",formatter:function(e){var t=void 0;e.goods_info.length&&(t=e.goods_info[0]),console.log(t);var a="<div style='background-color#fff;padding:8px;'>";return e.goods_info.length&&(a+="<div style='float:left;width:80px;height:80px;margin-right:8px;'><img style='width:100%; height:100%;' src='"+t.good_ico+"'></div>",a+="<p class='list-good-name'>"+t.good_name+"</p>",a+="</div>"),a}},{type:"text",align:"center",label:"门店",prop:"shop_info_business_name",width:""},{type:"text",align:"center",label:"评分",prop:"",width:"",formatter:function(e){return"<p style='text-align: center'>\n                                                  "+p.a.goods_score[e.goods_score]+"\n                                                </p>"}},{type:"text",align:"center",label:"评价内容",prop:"comment_content",width:""},{type:"text",align:"center",label:"评价时间",prop:"create_time",width:""}]}}},components:{NomalTable:c.a,TableSearch:u.a},beforeRouteUpdate:function(e,t,a){console.log(e.query),this.status_filter=i()(e.query)[0]+n()(e.query)[0],console.log(this.status_filter),this.$refs.table.getData(e.query),a()},created:function(){console.log("created")},computed:{},methods:{getData:function(e,t){this.$refs.table.getData(o()({},e,t))}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-header"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[e._v("订单管理")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:e.$route.path}}},[e._v(e._s(e.$route.meta.title))])],1)],1),e._v(" "),e._l(e.tagsListGroup,function(t,l,o){return a("div",{key:o,staticClass:"status_filter"},[a("ul",[a("li",{staticClass:"tags-li"},[e._v("\n                "+e._s(l)+"\n                "),e._l(t,function(t){return a("router-link",{key:t.value,class:t.key+t.value==e.status_filter?"active":"rrrr",attrs:{to:{path:"/order/commentList",query:(l={},l[t.key]=t.value,l)}}},[e._v(e._s(t.title))]);var l})],2)])])}),e._v(" "),a("nomal-table",{ref:"table",attrs:{"table-json":e.tableJson,url:"/api/admin/comment/index"}},[a("table-search",{attrs:{searchs:e.searchs}})],1)],2)},staticRenderFns:[]};var _=a("VU/8")(d,g,!1,function(e){a("09gp")},"data-v-c007177c",null);t.default=_.exports},"09gp":function(e,t){}});