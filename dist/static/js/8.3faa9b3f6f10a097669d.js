webpackJsonp([8],{CnVl:function(t,e){},MpTN:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("Dd8w"),i=s.n(n),a=new(s("7+uW").default),l=(s("gyMJ"),s("NYxO")),o={data:function(){return{collapse:!1,fullscreen:!1,name:"linxin",message:2}},computed:i()({},Object(l.b)(["user"])),methods:{handleCommand:function(t){this.$store.commit("USER_SIGNOUT")},collapseChage:function(){this.collapse=!this.collapse,a.$emit("collapse",this.collapse)},handleFullScreen:function(){var t=document.documentElement;this.fullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen(),this.fullscreen=!this.fullscreen}},mounted:function(){console.log(this.$store,"数据"),document.body.clientWidth<1500&&this.collapseChage()}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("div",{staticClass:"collapse-btn",on:{click:t.collapseChage}},[s("img",{staticStyle:{"margin-top":"13px"},attrs:{src:"/static/img/logo.png",width:"40"}})]),t._v(" "),s("div",{staticClass:"logo"},[t._v("一块美后台管理系统")]),t._v(" "),s("div",{staticClass:"header-right"},[s("div",{staticClass:"header-user-con"},[s("div",{staticClass:"btn-bell"},[s("el-tooltip",{attrs:{effect:"dark",content:t.message?"有"+t.message+"条未读消息":"消息中心",placement:"bottom"}},[s("router-link",{attrs:{to:"/message/sms"}},[s("i",{staticClass:"el-icon-bell"})])],1),t._v(" "),t.message?s("span",{staticClass:"btn-bell-badge"}):t._e()],1),t._v(" "),s("div",{staticClass:"user-avator"},[s("img",{attrs:{src:t.user.user_img||"/static/img/img.jpg"}})]),t._v(" "),s("div",{staticClass:"user-name"},[t._v("\n                    "+t._s(t.user.user_realname||"")+" | "),s("span",{on:{click:t.handleCommand}},[t._v("退出")])])])])])},staticRenderFns:[]};var c={data:function(){return{collapse:!0,breadcrumb:[],items:[{icon:"iconfont icon-shouye",index:"/index",title:"首页"},{icon:"iconfont icon-guanli",index:"index2",title:"商品管理",subs:[{index:"/goodList",title:"平台商品"},{index:"/serviceList",title:"门户服务"},{index:"/purchaseList",title:"品项管理"},{index:"/fictitiousList",title:"虚拟卡券管理"}]},{icon:"iconfont icon-shangjiacopy",title:"订单管理",index:"/order",subs:[{index:"/order/list_goods",title:"商品订单"},{index:"/order/list_service",title:"服务订单"},{index:"/order/purchaseOrderList",title:"采购品项"},{index:"/order/commentList",title:"评价管理"},{index:"/order/refundAuditList",title:"退款初审"}]},{icon:"iconfont icon-kefu",index:"/case",title:"案例"},{icon:"iconfont icon-guanggaoguanli",index:"index61",title:"加盟商管理",subs:[{index:"/alliance",title:"加盟商"},{index:"/ad/all",title:"门店"}]}]}},computed:{onRoutes:function(){return this.$route.path}},created:function(){var t=this;a.$on("collapse",function(e){t.collapse=e})},methods:{}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sidebar"},[s("el-menu",{staticClass:"sidebar-el-menu",attrs:{"default-active":t.onRoutes,"unique-opened":"",router:""}},[t._l(t.items,function(e){return[e.subs?[s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])]),t._v(" "),t._l(e.subs,function(e,n){return s("el-menu-item",{key:n,attrs:{index:e.index}},[t._v("\n                        "+t._s(e.title)+"\n                    ")])})],2)]:[s("el-menu-item",{key:e.index,attrs:{index:e.index}},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])])]]})],2)],1)},staticRenderFns:[]};var d={data:function(){return{tagsList:[]}},methods:{isActive:function(t){return t===this.$route.fullPath},closeTags:function(t){var e=this.tagsList.splice(t,1)[0],s=this.tagsList[t]?this.tagsList[t]:this.tagsList[t-1];s?e.path===this.$route.fullPath&&this.$router.push(s.path):this.$router.push("/")},closeAll:function(){this.tagsList=[],this.$router.push("/")},closeOther:function(){var t=this,e=this.tagsList.filter(function(e){return e.path===t.$route.fullPath});this.tagsList=e},setTags:function(t){!this.tagsList.some(function(e){return e.path===t.fullPath})&&this.tagsList.push({title:t.meta.title,path:t.fullPath,name:t.matched[1].components.default.name}),a.$emit("tags",this.tagsList)},handleTags:function(t){"other"===t?this.closeOther():this.closeAll()}},computed:{showTags:function(){return this.tagsList.length>0}},watch:{$route:function(t,e){this.setTags(t)}},created:function(){this.setTags(this.$route)}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.showTags?s("div",{staticClass:"tags"},[s("ul",t._l(t.tagsList,function(e,n){return s("li",{key:n,staticClass:"tags-li",class:{active:t.isActive(e.path)}},[s("router-link",{staticClass:"tags-li-title",attrs:{to:e.path}},[t._v("\n                "+t._s(e.title)+"\n            ")]),t._v(" "),s("span",{staticClass:"tags-li-icon",on:{click:function(e){t.closeTags(n)}}},[s("i",{staticClass:"el-icon-close"})])],1)})),t._v(" "),s("div",{staticClass:"tags-close-box"},[s("el-dropdown",{on:{command:t.handleTags}},[s("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("\n                标签选项"),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown",size:"small"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"other"}},[t._v("关闭其他")]),t._v(" "),s("el-dropdown-item",{attrs:{command:"all"}},[t._v("关闭所有")])],1)],1)],1)]):t._e()},staticRenderFns:[]};var m={data:function(){return{tagsList:[]}},components:{vHead:s("VU/8")(o,r,!1,function(t){s("vd7f")},"data-v-3d5b62ca",null).exports,vSidebar:s("VU/8")(c,u,!1,function(t){s("q0dw")},null,null).exports,vTags:s("VU/8")(d,h,!1,function(t){s("CnVl")},"data-v-edaeac1e",null).exports},created:function(){var t=this;a.$on("collapse",function(e){t.collapse=e}),a.$on("tags",function(e){for(var s=[],n=0,i=e.length;n<i;n++)e[n].name&&s.push(e[n].name);t.tagsList=s})}},f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"wrapper"},[e("v-head"),this._v(" "),e("v-sidebar"),this._v(" "),e("div",{staticClass:"content-box"},[e("div",{staticClass:"page-container"},[e("transition",{attrs:{name:"el-fade-in"}},[e("keep-alive",{attrs:{include:this.tagsList}},[e("router-view")],1)],1)],1)])],1)},staticRenderFns:[]},g=s("VU/8")(m,f,!1,null,null,null);e.default=g.exports},gyMJ:function(t,e,s){"use strict";var n={};s.d(n,"login",function(){return o}),s.d(n,"logout",function(){return r});var i={};s.d(i,"add",function(){return c});var a=s("7+uW"),l=function(t){return console.log(a.default.prototype),a.default.prototype.$axios[t.method](t.url,t.data)},o=function(t){var e=this;return l(t).then(function(t){if(0===t.data.code)return e.$store.dispatch("USER_SIGNIN",{sid:t.headers.sid,data:t.data.data}),console.log("USER_SIGNIN",t.headers.sid),e.$router.push("/"),t.data;e.$message.error(t.data.msg)})},r=function(t){var e=this;return l(t).then(function(t){0===t.data.code?(e.$store.dispatch("USER_SIGNOUT"),window.location.reload()):e.$message.error(t.data.msg)})},c=function(t){var e=this;return l(t).then(function(t){0===t.data.code?(e.$store.dispatch("USER_SIGNIN",{sid:t.headers.sid}),e.$router.push("/")):e.$message.error(t.data.msg)})};s.d(e,"a",function(){return n}),s.d(e,!1,function(){return i})},q0dw:function(t,e){},vd7f:function(t,e){}});