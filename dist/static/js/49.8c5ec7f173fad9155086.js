webpackJsonp([49],{"Az+/":function(t,a){},tFgk:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var d=e("tVcc"),n=e("rhtX"),r=e("SAp9"),s={data:function(){return{breadcrumb:[{name:"营销"},{name:"关怀"},{name:"APP推送"}],addButton:{name:"",url:""},menus:{type:"menu",list:[{label:"APP推送",index:"/care/app",add:"/care/templateApp",addBtn:"添加模版"},{label:"站内信",index:"/care/mail",add:"/care/templateInfo",addBtn:"添加模版"},{label:"短信",index:"/care/sms",add:"/care/templateMsg",addBtn:"添加模版"},{label:"微信模版",index:"/care/chat",add:"/care/templateWeChat",addBtn:"添加模版"},{label:"触发条件",index:"/care/trigger",add:"/care/relation",addBtn:"创建关联"}],activeIndex:"/care/app"}}},watch:{},components:{BreadCrumb:d.a,TableTabs:n.a,AddButton:r.a},created:function(){this.menus.activeIndex=this.$route.path;var t=_.find(this.menus.list,["index",this.$route.path]);this.breadcrumb[2].name=t.label,this.addButton.name=t.addBtn,this.addButton.url=t.add},computed:{},methods:{menusClick:function(t){var a=this.getLabel(this.menus.list,t);this.breadcrumb[2].name=a[0].label,this.addButton.name=a[0].addBtn,this.addButton.url=a[0].add},getLabel:function(t,a){return t.filter(function(t){return t.index==a})}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page"},[e("div",{staticClass:"page-header"},[e("bread-crumb",{attrs:{"bread-crumb":t.breadcrumb}})],1),t._v(" "),e("div",{staticClass:"page-content"},[e("div",{staticClass:"menus-box"},[e("table-tabs",{attrs:{"page-tabs":t.menus},on:{"tabs-click":t.menusClick}}),t._v(" "),t.addButton.url?e("add-button",{attrs:{"add-btn":t.addButton}}):t._e()],1),t._v(" "),e("router-view")],1)])},staticRenderFns:[]};var c=e("VU/8")(s,i,!1,function(t){e("Az+/")},"data-v-70c4ffca",null);a.default=c.exports}});