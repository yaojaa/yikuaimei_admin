webpackJsonp([69],{UA2L:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("0qDT"),l=a("PMOO"),o={data:function(){return{url:"./static/vuetable.json",searchs:{list:[{type:"input-select",label:"触发分类",name:"option",value:"all",options:[{name:"全部",value:"all"},{name:"option2",value:"option2"},{name:"option3",value:"option3"}]},{type:"input-text",label:"触发条件",name:"user",value:"",placeholder:"触发条件名称"}]},tableJson:{spanMethod:function(e){e.row,e.column;var t=e.rowIndex,a=e.columnIndex;if(console.log(a),0===a)return t%2==0?{rowspan:2,colspan:1}:{rowspan:0,colspan:0}},column:[{type:"text",align:"center",label:"触发条件",prop:"name",width:""},{type:"text",align:"center",label:"关联渠道",prop:"name",width:""},{type:"text",align:"center",label:"关联模板名称",prop:"address",width:""}]}}},components:{NomalTable:n.a,TableSearch:l.a},created:function(){},computed:{},methods:{}},r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("nomal-table",{attrs:{border:!0,"table-json":this.tableJson,url:this.url}},[t("table-search",{attrs:{searchs:this.searchs}})],1)],1)},staticRenderFns:[]};var s=a("VU/8")(o,r,!1,function(e){a("wMfj")},"data-v-4a96e0f1",null);t.default=s.exports},wMfj:function(e,t){}});