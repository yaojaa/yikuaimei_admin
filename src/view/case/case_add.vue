<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <el-steps :active="step" simple>
                    <el-step @click.native="goNextStep(1)" title="顾客信息"></el-step>
                    <el-step @click.native="goNextStep(2)" title="检测报告"></el-step>
                    <el-step @click.native="goNextStep(3)" title="案列详情"></el-step>
                    <el-step @click.native="goNextStep(4)" title="商品服务"></el-step>
                </el-steps>
                <!--step start-->
                <div class="form-panel p-xl" v-if="step==1">
                    <!--form start-->
                    <el-form :model="form1" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">
                        <h3 class="form_title_label">发布人信息：</h3>
                        <el-form-item label="发布门店">
                            <el-autocomplete class="inline-input" v-model="form1.create_user.shop_name" :fetch-suggestions="querySearch" :debounce=300 placeholder="请输入门店名称" @select="handleSelectShopName"></el-autocomplete>
                        </el-form-item>
                        <el-form-item label="所属行业">
                            <el-select @change="loadMechanic" v-model="form1.category_id" placeholder="请选择所属行业">
                                <el-option label="美容" :value="1"></el-option>
                                <el-option label="美甲美睫" :value="2"></el-option>
                                <el-option label="美发" :value="3"></el-option>
                                <el-option label="美体" :value="4"></el-option>
                                <el-option label="轻医美" :value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="发布人">
                            <el-select v-model="form1.create_user.shop_account_id" placeholder="请选择发布人">
                                <el-option v-for="(el,index) in accountList" :label="el.shop_account_name" :value="el.shop_account_id" :key="index">{{el.shop_account_name}} {{el.shop_account_id}}</el-option>
                            </el-select>
                        </el-form-item>
                        <!-- /api/admin/select/shopAccountList  -->
                        <el-form-item label="发布人职务">
                            <el-select v-model="form1.create_user.shop_account_melevel" placeholder="请选择发布人职务">
                                <el-option v-for="(el,index) in mechanicList" :label="el.mechanic_name" :value="el.mechanic_id" :key="index">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <h3 class="form_title_label">顾客信息:</h3>
                        <el-form-item label="姓名">
                            <el-input v-model="form1.user_info.user_name" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="form1.user_info.user_phone" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <el-col :span="12">
                                <el-form-item >
                                    <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" v-model="form1.user_info.user_birth" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <!-- <el-input v-model="form1.user_info.user_birth" placeholder=""></el-input> -->
                        </el-form-item>
                        <el-form-item label="身高">
                            <el-input v-model="form1.user_info.user_height" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="体重">
                            <el-input v-model="form1.user_info.user_weight" placeholder="请输入发布人姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="职业">
                            <el-input v-model="form1.user_info.user_job" placeholder="请输入发布人姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="皮肤现状">
                            <el-input type="textarea" v-model="form1.user_info.skin"></el-input>
                        </el-form-item>
                        <el-form-item label="临床诊断" >
                            <el-input type="textarea" v-model="form1.user_info.diagnosis"></el-input>
                        </el-form-item>
                        <el-form-item label="上传图片">
                            
                            <el-upload class="avatar-uploader" action="/api/admin/fileupload/image" :show-file-list="false" :on-success="handleFaceUploadSuccess">
                                before
                                <img width="100%" v-if="form1.user_info.pic_before" :src="form1.user_info.pic_before" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <div class="upload-title">
                                <p class="upload-title-red">图片格式：png、jpg，尺寸1242*1242像素</p>
                            </div>
                        </el-form-item>
                        <el-form-item label="上传图片" prop="pic_after">
                             
                            <el-upload class="avatar-uploader" action="/api/admin/fileupload/image" :show-file-list="false" :on-success="handleFaceUploadSuccessAfter">
                                after
                                <img width="100%" v-if="form1.user_info.pic_after" :src="form1.user_info.pic_after" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <div class="upload-title">
                                <p class="upload-title-red">图片格式：png、jpg，尺寸1242*1242像素</p>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="goNextStep(2)">保存并下一步</el-button>
                        </el-form-item>
                    </el-form>
                    <!--form end-->
                </div>
                <!--step end-->
                <!--step2 start-->
                <div class="form-panel p-xl" v-if="step==2">
                    <!--form start-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="上传检测报告">
                            <el-upload accept="image/jpg" class="upload-demo" action="/api/admin/fileupload/image" :on-remove="handleRemove" :show-file-list=false list-type="picture" :on-success="handleReportUploadSuccess" multiple>
                                <el-button size="small" type="primary">+点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-if="form1.report.length">
                                <li tabindex="0" class="el-upload-list__item is-success" v-for="(img,index) in form1.report" :key="index">
                                    <img :src="img" alt="" class="el-upload-list__item-thumbnail">
                                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
    </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-check"></i>
                                    </label>
                                    <i class="el-icon-close"></i>
                                    <span class="el-upload-list__item-actions" @click="removeImg('report',index)">
      <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                                </li>
                            </ul>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="goNextStep(3)">保存并下一步</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!--step end-->
                <!--step3 start-->
                <div class="form-panel p-xl" v-if="step==3">
                    <!--form start-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <!--上传ITEM start-->
                        <el-form-item label="专家建议" label-width="130px">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form1.expert_suggest.content">
                            </el-input>
                        </el-form-item>
                        <div class="up_area">
                            <!--     <el-upload
      class="uploader_small"
      multiple
      action="/api/admin/fileupload/image"
       :show-file-list = false
       :on-success  = "handleUploadSuccess_expert_suggest"
      :on-remove="handleRemove_expert_suggest"
      >
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
                            <el-upload action="/api/admin/fileupload/image" multiple :on-success="handleUploadSuccess_expert_suggest" :on-remove="handleRemove_expert_suggest" :show-file-list=false list-type="picture">
                                <el-button size="small" type="primary">+点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">图片或者视频</div>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-if="form1.expert_suggest.pic_list.length">
                                <li tabindex="0" class="el-upload-list__item is-success" v-for="(img,index) in form1.expert_suggest.pic_list" :key="index">
                                    <img :src="img" alt="" class="el-upload-list__item-thumbnail">
                                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
    </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-check"></i>
                                    </label>
                                    <i class="el-icon-close"></i>
                                    <span class="el-upload-list__item-actions" @click="removeImg('expert_suggest',index,'pic_list')">
      <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                                </li>
                            </ul>
                        </div>
                        <!--上传ITEM end-->
                        <!--上传ITEM start-->
                        <el-form-item label="产品或仪器介绍" label-width="130px">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form1.product_introduce.content">
                            </el-input>
                        </el-form-item>
                        <div class="up_area">
                            <el-upload multiple action="/api/admin/fileupload/image" :on-success="handleUploadSuccess_product_introduce" :on-remove="handleRemove_product_introduce" :show-file-list=false list-type="picture">
                                <el-button size="small" type="primary">+点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">图片或者视频</div>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-if="form1.product_introduce.pic_list.length">
                                <li tabindex="0" class="el-upload-list__item is-success" v-for="(img,index) in form1.product_introduce.pic_list" :key="index">
                                    <img :src="img" alt="" class="el-upload-list__item-thumbnail">
                                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
    </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-check"></i>
                                    </label>
                                    <i class="el-icon-close"></i>
                                    <span class="el-upload-list__item-actions" @click="removeImg('product_introduce',index,'pic_list')">
      <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                                </li>
                            </ul>
                        </div>
                        <!--上传ITEM end-->
                        <!--上传ITEM start-->
                        <el-form-item label="操作流程或视频" label-width="130px">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form1.operate_process.content">
                            </el-input>
                        </el-form-item>
                        <div class="up_area">
                            <el-upload multiple action="/api/admin/fileupload/image" :show-file-list=false :on-success="handleUploadSuccess_operate_process" :on-remove="handleRemove_operate_process" list-type="picture">
                                <el-button size="small" type="primary">+点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">图片或者视频</div>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-if="form1.operate_process.pic_list.length">
                                <li tabindex="0" class="el-upload-list__item is-success" v-for="(img,index) in form1.operate_process.pic_list" :key="index">
                                    <img :src="img" alt="" class="el-upload-list__item-thumbnail">
                                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
    </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-check"></i>
                                    </label>
                                    <i class="el-icon-close"></i>
                                    <span class="el-upload-list__item-actions" @click="removeImg('operate_process',index,'pic_list')">
      <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                                </li>
                            </ul>
                        </div>
                        <!--上传ITEM end-->
                        <!--上传ITEM start-->
                        <el-form-item label="操作记录" label-width="130px">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form1.operate_record.content">
                            </el-input>
                        </el-form-item>
                        <div class="up_area">
                            <el-upload class="uploader_small" multiple action="/api/admin/fileupload/image" list-type="picture" :show-file-list=false :on-success="handleUploadSuccess_operate_record" :on-remove="handleRemove_operate_record">
                                <el-button size="small" type="primary">+点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">图片或者视频</div>
                            </el-upload>
                            <!---->
                            <ul class="el-upload-list el-upload-list--picture-card" v-if="form1.operate_record.pic_list.length">
                                <li tabindex="0" class="el-upload-list__item is-success" v-for="(img,index) in form1.operate_record.pic_list" :key="index">
                                    <img :src="img" alt="" class="el-upload-list__item-thumbnail">
                                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
          </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-check"></i>
                                    </label>
                                    <i class="el-icon-close"></i>
                                    <span class="el-upload-list__item-actions" @click="removeImg('operate_record',index,'pic_list')">
            <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                                </li>
                            </ul>
                        </div>
                        <!--上传ITEM end-->
                        <!--上传ITEM start-->
                        <el-form-item label="两次数据对比" label-width="130px">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form1.data_contrast.content">
                            </el-input>
                        </el-form-item>
                        <div class="up_area">
                            <el-upload accept="video/mp4,image/*" multiple action="/api/admin/fileupload/image" :on-success="handleUploadSuccess_data_contrast" list-type="picture" :show-file-list=false :on-remove="handleRemove_data_contrast">
                                <el-button size="small" type="primary">+点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">图片或者视频</div>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-if="form1.data_contrast.pic_list.length">
                                <li tabindex="0" class="el-upload-list__item is-success" v-for="(img,index) in form1.data_contrast.pic_list" :key="index">
                                    <img :src="img" alt="" class="el-upload-list__item-thumbnail">
                                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
          </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-check"></i>
                                    </label>
                                    <i class="el-icon-close"></i>
                                    <span class="el-upload-list__item-actions" @click="removeImg('data_contrast',index,'pic_list')">
            <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                                </li>
                            </ul>
                        </div>
                        <!--上传ITEM end-->
                        <!--上传ITEM start-->
                        <el-form-item label="专家解析" label-width="130px">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form1.expert_analysis.content">
                            </el-input>
                        </el-form-item>
                        <div class="up_area">
                            <el-upload accept="video/mp4,image/*" multiple action="/api/admin/fileupload/image" list-type="picture" :show-file-list=false :on-success="handleUploadSuccess_expert_analysis" :on-remove="handleRemove_expert_analysis">
                                <el-button size="small" type="primary">+点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">图片或者视频</div>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-if="form1.expert_analysis.pic_list.length">
                                <li tabindex="0" class="el-upload-list__item is-success" v-for="(img,index) in form1.expert_analysis.pic_list" :key="index">
                                    <img :src="img" alt="" class="el-upload-list__item-thumbnail">
                                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
          </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-check"></i>
                                    </label>
                                    <i class="el-icon-close"></i>
                                    <span class="el-upload-list__item-actions" @click="removeImg('expert_analysis',index,'pic_list')">
            <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                                </li>
                            </ul>
                        </div>
                        <!--上传ITEM end-->
                        <!--上传ITEM start-->
                        <el-form-item label="点评师点评" label-width="130px">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form1.expert_review.content">
                            </el-input>
                        </el-form-item>
                        <div class="up_area">
                            <el-upload accept="video/mp4,image/*" multiple action="/api/admin/fileupload/image" list-type="picture" :show-file-list=false :on-success="handleUploadSuccess_expert_review" :on-remove="handleRemove_expert_review">
                                <el-button size="small" type="primary">+点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">图片或者视频</div>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-if="form1.expert_review.pic_list.length">
                                <li tabindex="0" class="el-upload-list__item is-success" v-for="(img,index) in form1.expert_review.pic_list" :key="index">
                                    <img :src="img" alt="" class="el-upload-list__item-thumbnail">
                                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
    </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-check"></i>
                                    </label>
                                    <i class="el-icon-close"></i>
                                    <span class="el-upload-list__item-actions" @click="removeImg('expert_review',index,'pic_list')">
      <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                                </li>
                            </ul>
                        </div>
                        <!--上传ITEM end-->
                        <el-form-item>
                            <el-button size="large" type="primary" @click="goNextStep(4)">保存并下一步</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!--step end-->
                <!--step4 start-->
                <div class="form-panel p-xl" v-if="step==4">
                    <!--form start-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <h3>商品服务：（选择案例包含的商品或服务）</h3>
                        <el-tabs type="border-card" v-model="activeName" :tabPosition="'left'" @tab-click="handleTabClick">
                            <el-tab-pane label="商品" name="1">
                                <el-checkbox-group v-model="form1.goods_id_list" :min="1" :max="15">
                                    <el-checkbox v-for="(g,index) in goodsList" :label="g.good_id" :key="g.good_id">{{g.good_name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-tab-pane>
                            <el-tab-pane label="服务" name="2">
                                <el-checkbox-group v-model="form1.service_id_list" :min="1" :max="15">
                                    <el-checkbox v-for="(s,index) in serviceList" :label="s.good_id" :key="s.good_id">{{s.good_name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-tab-pane>
                        </el-tabs>
                        <el-form-item>
                            <el-button type="primary" @click="goNextStep(5)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import formlist from "@/components/formlist";

const upSuccess = function(key) {

    return function(res, file) {
        this.form1[key].pic_list.push(res.data.url)

    }


}

const removeSuccess = function(key) {
    return function(file, fileList) {
        this.form1[key].pic_list = fileList.map((item => {
            return item.response.data.url
        }))
    }
}

export default {
    name: "tabletest",
    data() {
        return {

            options111: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value111: '选项2',

            step: 1,
            isEdit: false,
            breadcrumb: [
                //面包屑
                {
                    name: "网站管理" //名字
                },
                {
                    name: "案例管理/案例列表", //名字
                    url: "/manage/case"
                },

                {
                    name: "添加案例", //名字
                    url: "/manage/case/add"
                }
            ],
            accountList: ['张三','李四','王五'],
            mechanicList: [], //职务列表
            goodsList: [],
            serviceList: [],
            activeName: '1',
            form1: {
                "category_id": "", //行业id
                "create_user": { //创建人信息
                    "user_name": '',
                    "shop_name": '',
                    "shop_id": 0, //门店id
                    "shop_account_id": '', //门店账号id
                    "mechanic": '', //职务名称
                    "shop_account_melevel": '' //职称级别id
                },
                "user_info": { //顾客信息
                    "user_name": "", //姓名
                    "user_phone": "", //手机
                    "user_birth": "", //生日
                    "user_height": null, //身高单位CM
                    "user_weight": null, //体重单位KG
                    "user_job": "", //工作
                    "skin": "",
                    "diagnosis": "",
                    "pic_before": "", //图片before
                    "pic_after": "" //图片after
                },
                "report": [], //检测报告
                "expert_suggest": {
                    "content": "专家建议内容",
                    "pic_list": [] //图片或视频列表
                },
                "product_introduce": {
                    "content": "产品介绍内容",
                    "pic_list": []
                },
                "operate_process": {
                    "content": "操作流程内容",
                    "pic_list": []
                },
                "operate_record": {
                    "content": "操作记录内容",
                    "pic_list": []
                },
                "data_contrast": {
                    "content": "两次数据对比内容",
                    "pic_list": []
                },
                "expert_analysis": {
                    "content": "专家解析内容",
                    "pic_list": []
                },
                "expert_review": {
                    "content": "点评师点评内容",
                    "pic_list": []
                },
                "goods_id_list": [119, 120], //商品id数组
                "service_id_list": [109, 110, 111, 112] //服务id数组
            },
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            options: [{
                    name: 'coupon_template_type',
                    value: '1'
                },
                {
                    name: "coupon_template_name",
                    type: "input",
                    label: "模板名称",
                    placeholder: '优惠券名称',
                    rules: [{
                        required: true,
                        message: "请输入优惠券模板名称",
                        trigger: "blur"
                    }],
                    value: ""
                },

            ]
        };
    },
    components: {
        BreadCrumb,
        formlist
    },
    created() {

        let params = this.$route.params;
        //
        if (Object.keys(params).length) {
            this.isEdit = true
            this.params = params
            this.$axios.get("/api/admin/cases/detail", { params: params }).then(res => {
                this.form1 = res.data.data;
                this.form1.category_id = res.data.data.category_id
                this.getshopAccout(this.form1.create_user.shop_id)
                this.loadMechanic();


            })
        }

    },
    computed: {

    },
    methods: {
        removeImg(key, index, subkey) {
            if (subkey) {
                this.form1[key][subkey].splice(index, 1)
            } else {
                this.form1[key].splice(index, 1)

            }
        },
        handleRemove(file, fileList) {
            this.form1.expert_suggest.pic_list = fileList.map((item => {
                return item.response.data.url
            }))
            console.log(this.form1.expert_suggest.pic_list.toString())
        },

        handleUploadSuccess_expert_suggest: upSuccess('expert_suggest'),
        handleUploadSuccess_product_introduce: upSuccess('product_introduce'),
        handleUploadSuccess_operate_process: upSuccess('operate_process'),
        handleUploadSuccess_operate_record: upSuccess('operate_record'),
        handleUploadSuccess_data_contrast: upSuccess('data_contrast'),
        handleUploadSuccess_expert_analysis: upSuccess('expert_analysis'),
        handleUploadSuccess_expert_review: upSuccess('expert_review'),

        handleRemove_expert_suggest: removeSuccess('expert_suggest'),
        handleRemove_product_introduce: removeSuccess('product_introduce'),
        handleRemove_operate_process: removeSuccess('operate_process'),
        handleRemove_operate_record: removeSuccess('operate_record'),
        handleRemove_data_contrast: removeSuccess('data_contrast'),
        handleRemove_expert_analysis: removeSuccess('expert_analysis'),
        handleRemove_expert_review: removeSuccess('expert_review'),

        handleReportUploadSuccess(res, file) {
            this.form1.report.push(res.data.url)
            console.log(this.form1.report)
        },
        handleFaceUploadSuccess(res, file) {
            this.form1.user_info.pic_before = res.data.url
        },
        handleFaceUploadSuccessAfter(res, file) {
            this.form1.user_info.pic_after = res.data.url
        },


        handleSelectShopName(item) {
            this.form1.create_user.shop_id = item.id
            this.getshopAccout(item.id)
        },

        handleTabClick(tab, event) {
            console.log(tab.name)
            if (tab.name == 2) {
                this.getGoodsList(2)
            }
        },

        getshopAccout(shop_id) {

            this.$axios.get('/api/admin/select/shopAccountList?shop_id=' + shop_id)
                .then(res => {
                    this.accountList = res.data.data
                })

        },

        loadMechanic() {

            // const MAP= {
            //   '美容':1,
            //   '美甲美睫':2 ,
            //   '美发':3,
            //   '美体':4,
            //   '轻医美':5
            //  }

            this.$axios.get('/api/admin/select/mechanic?category_id=' + this.form1.category_id)
                .then(res => {
                    this.mechanicList = res.data.data
                })

        },

        //mechanicList
        //下一步
        goNextStep(n) {
            this.step = n
            if (n == 4) {
                this.getGoodsList(1)
            }

            if (n == 5) {

                if (this.isEdit) {
                    
                     var data = Object.assign(this.form1, this.params)
                    this.$axios.post('/api/admin/cases/modify', data)
                        .then(res => {
                            if (res.data.code == 0) {
                                this.$message('编辑成功')
                                this.$router.push("/manage/case")
                            } else {
                                this.$message(res.data.msg);
                            }
                        })

                } else {
                    
                    var data = Object.assign(this.form1, this.params)
                    this.$axios.post('/api/admin/cases/create', data)
                        .then(res => {
                            if (res.data.code == 0) {
                                this.$router.push("/manage/case")
                                const h = this.$createElement;
                                this.$message('添加成功');
                            } else {
                                this.$message(res.data.msg);
                            }
                        })

                }




            }
        },
        //搜索门店
        querySearch(queryString, cb) {

            this.load_shop_list(queryString).then(data => {


                let source_data = data.map((it) => {
                    return { "value": it.shop_name, "id": it.shop_id }
                })

                // 调用 callback 返回建议列表的数据
                cb(source_data)

            })

        },

        load_shop_list(s) {
            return new Promise((resolve, reject) => {
                this.$axios.get('/api/admin/select/shopList?shop_name=' + s).then(res => {

                    if (res.data.code == 0) {
                        resolve(res.data.data)
                    } else {
                        reject(res.data.msg)
                    }

                })
            })

        },
        /**获取平台商品服务列表**/

        getGoodsList(type) {

            this.$axios.get('/api/admin/shopgoods/index?good_type=' + type).then(res => {

                if (res.data.code == 0) {

                    if (type == 1) {

                        this.goodsList = res.data.data

                    } else if (type == 2) {

                        this.serviceList = res.data.data

                    }


                } else {

                }

            })




        }
    }
}
</script>
<style scoped>
.el-upload--text {
    width: 100px;
    height: 100px;
    line-height: 100px
}


h3.form_title_label {
    padding: 28px 0
}

.search {
    background-color: #fff;
    padding: 20px 20px 4px 10px;
}

.up_area {
    padding-left: 130px;
    padding-bottom: 50px
}
.inline-input{
    width: 193px;
}
.el-checkbox+.el-checkbox{
    margin-left:0px;
}
.el-checkbox{
    width:176px;
    height:24px;
    line-height: 24px;
    display: inline-block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

}
.upload-title-red{
    font-size: 12px;
    color: red;
}


/*.uploader_small {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height:100px;
  }
  .uploader_small:hover {
    border-color: #409EFF;
  }
*/
</style>