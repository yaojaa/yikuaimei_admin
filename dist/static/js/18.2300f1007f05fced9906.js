webpackJsonp([18],{UyYF:function(e,r,a){"use strict";a.d(r,"b",function(){return s}),a.d(r,"a",function(){return l});var s=[{name:"商品管理"},{name:"平台商品",url:"/goodList"},{name:"添加商品"}],l=[{category_id:1,category_name:"美容"},{category_id:2,category_name:"美甲美睫"},{category_id:3,category_name:"美发"},{category_id:4,category_name:"美体"},{category_id:5,category_name:"轻医美"}]},ckLA:function(e,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=a("tVcc"),l=a("rv7f"),t=a("UyYF"),n={name:"tabletest",data:function(){return{step:1,url:"",CATEGORYOPTIONS:t.a,breadcrumb:[{name:"加盟商管理"},{name:"添加加盟商"}],ruleForm:{name:1,business_phone:"18655556666",business_company_name:"公司名称",category_id:[1,2,8],business_type:1,business_corporation:"张三",address_code:"110000",business_longitude:"112.3",business_latitude:"134.5",business_sfz_num:"370684198909212231",business_sfz_pic_z:"/z.jpg",business_sfz_pic_f:"/f.jpg",business_licence_num:"2356325623",business_licence_pic:"/ico.jpg",business_company_adress:"大望路27号",review_id:"5be55f3e4c22ad1bd0007e2c",business_contract_num:"34563434",business_stock_percent_1:80,business_stock_percent_2:80,business_discount_mater:70,business_discount_goods:60,business_discount_device:90,business_join_money:900,business_join_reward:90,fid:11},rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],date1:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],date2:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}],type:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]},options:[{name:"coupon_template_type",value:"1"},{name:"coupon_template_name",type:"input",label:"模板名称",placeholder:"优惠券名称",rules:[{required:!0,message:"请输入优惠券模板名称",trigger:"blur"}],value:""}]}},methods:{handleFaceUploadSuccess:function(){},goNextStep:function(e){this.step=e},resetForm:function(e){this.$refs[e].resetFields()}},components:{BreadCrumb:s.a,formlist:l.a},created:function(){},computed:{}},o={render:function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-header"},[a("div",{staticClass:"crumbs"},[a("bread-crumb",{attrs:{"bread-crumb":e.breadcrumb}})],1)]),e._v(" "),a("div",{staticClass:"page-content"},[a("el-steps",{attrs:{active:e.step,simple:""}},[a("el-step",{attrs:{title:"编辑基本信息",icon:"el-icon-edit"},nativeOn:{click:function(r){e.goNextStep(1)}}}),e._v(" "),a("el-step",{attrs:{title:"编辑进货信息",icon:"el-icon-edit"},nativeOn:{click:function(r){e.goNextStep(2)}}}),e._v(" "),a("el-step",{attrs:{title:"编辑详细信息",icon:"el-icon-edit"},nativeOn:{click:function(r){e.goNextStep(3)}}})],1),e._v(" "),a("div",{staticClass:"panel"},[1==e.step?a("div",{staticClass:"form-panel p-xl"},[a("el-form",{ref:"ruleForm1",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"公司名称",prop:"business_company_name"}},[a("el-input",{model:{value:e.ruleForm.business_company_name,callback:function(r){e.$set(e.ruleForm,"business_company_name",r)},expression:"ruleForm.business_company_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公司地址",prop:"business_company_adress"}},[a("el-input",{model:{value:e.ruleForm.business_company_adress,callback:function(r){e.$set(e.ruleForm,"business_company_adress",r)},expression:"ruleForm.business_company_adress"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"法人姓名",prop:"business_corporation"}},[a("el-input",{model:{value:e.ruleForm.business_corporation,callback:function(r){e.$set(e.ruleForm,"business_corporation",r)},expression:"ruleForm.business_corporation"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号",prop:"name"}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"法人身份证"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/fileupload/image","show-file-list":!1,"on-success":e.handleFaceUploadSuccess}},[e._v("\n\n           上传正面\n")])],1),e._v(" "),a("el-form-item",{attrs:{label:"法人身份证"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/fileupload/image","show-file-list":!1,"on-success":e.handleFaceUploadSuccess}},[e._v("\n           上传背面\n         ")])],1),e._v(" "),a("el-form-item",{attrs:{label:"营业执照号",prop:"business_licence_num"}},[a("el-input",{model:{value:e.ruleForm.business_licence_num,callback:function(r){e.$set(e.ruleForm,"business_licence_num",r)},expression:"ruleForm.business_licence_num"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"营业执照"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/fileupload/image","show-file-list":!1,"on-success":e.handleFaceUploadSuccess}},[e._v("\n           上传营业执照\n         ")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"large",type:"primary"},on:{click:function(r){e.goNextStep(2)}}},[e._v("下一步")]),e._v(" "),a("el-button",{attrs:{size:"large"},on:{click:function(r){e.resetForm("ruleForm1")}}},[e._v("重置")])],1)],1)],1):e._e(),e._v(" "),2==e.step?a("div",{staticClass:"form-panel p-xl"},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"合同编号",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"进货提成比例（徒弟）",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"进货提成比例（徒孙）",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"线下耗材折扣",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"线下商品折扣",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"线下仪器折扣",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1)],1)],1):e._e(),e._v(" "),3==e.step?a("div",{staticClass:"form-panel p-xl"},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"推荐人平台账号",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"行业",prop:"category_id"}},[a("el-select",{attrs:{placeholder:"请选择所属行业分类"},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}},e._l(e.CATEGORYOPTIONS,function(e){return a("el-option",{key:e.category_id+"category_id",attrs:{label:e.category_name,value:e.category_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"加盟商类型"}},[a("el-radio-group",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}},[a("el-radio",{attrs:{label:"加盟"}}),e._v(" "),a("el-radio",{attrs:{label:"非加盟"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"售价",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"原价",prop:"name",required:""}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1)],1)],1):e._e()])],1)])},staticRenderFns:[]};var i=a("VU/8")(n,o,!1,function(e){a("qI5V")},"data-v-ba3ed900",null);r.default=i.exports},qI5V:function(e,r){}});