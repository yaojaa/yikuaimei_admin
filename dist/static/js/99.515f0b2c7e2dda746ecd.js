webpackJsonp([99],{QuxH:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{ruleForm:{name:"",pic:[{name:"food.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}],url:"",content:""},rules:{name:[{required:!0,message:"请输入模板名称",trigger:"blur"}],url:[{required:!0,message:"请输入链接地址",trigger:"blur"},{type:"url",message:"格式不正确",trigger:"blur"}],content:[{required:!0,message:"请输入100字以内的内容",trigger:"blur"},{min:10,max:100,message:"最少10个字节，最多100个字节",trigger:"blur"}]}}},methods:{handleRemove:function(e,t){console.log(e,t)},handlePreview:function(e){console.log(e)},submitForm:function(e){this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")})}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page"},[r("div",{staticClass:"page-header"},[r("div",{staticClass:"crumbs"},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",[e._v("营销")]),e._v(" "),r("el-breadcrumb-item",{attrs:{to:"/care/mail"}},[e._v("站内信")]),e._v(" "),r("el-breadcrumb-item",[e._v("添加模板")])],1)],1)]),e._v(" "),r("div",{staticClass:"page-content"},[r("div",{staticClass:"panel"},[r("div",{staticClass:"panel-body"},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:14}},[r("el-form",{ref:"ruleForm",staticClass:"demo-dynamic",attrs:{model:e.ruleForm,rules:e.rules,"label-position":"right","label-width":"180px"}},[r("el-form-item",{attrs:{label:"模板名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入模板名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"图片",prop:"pic"}},[r("el-upload",{staticClass:"upload-demo",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.ruleForm.pic,"list-type":"picture"}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("上传")]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"URL链接地址",prop:"url"}},[r("el-input",{attrs:{placeholder:"请输入链接地址"},model:{value:e.ruleForm.url,callback:function(t){e.$set(e.ruleForm,"url",t)},expression:"ruleForm.url"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"➊ 内容",prop:"content"}},[r("el-input",{attrs:{type:"textarea",placeholder:"请输入200以内的内容",rows:"5"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1),e._v(" "),r("el-form-item",[r("el-button",{staticClass:"w-100",attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("提交")])],1)],1)],1),e._v(" "),r("el-col",{attrs:{span:10}},[r("p",{staticClass:"text-info mb-md f12"},[e._v("示例：")]),e._v(" "),r("div",{staticClass:"app-pic"},[r("img",{attrs:{src:"/static/img/app.png",alt:""}})])])],1)],1)])])])},staticRenderFns:[]};var s=r("VU/8")(l,a,!1,function(e){r("mMtU")},"data-v-055ff6d5",null);t.default=s.exports},mMtU:function(e,t){}});