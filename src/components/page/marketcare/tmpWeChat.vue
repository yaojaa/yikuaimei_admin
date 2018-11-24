<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>营销</el-breadcrumb-item>
                    <!-- <el-breadcrumb-item>关怀</el-breadcrumb-item> -->
                    <el-breadcrumb-item to="/care/chat">微信模版</el-breadcrumb-item>
                    <el-breadcrumb-item>添加模板</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-body">
                    <el-row :gutter="20">
                        <el-col :span="14">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="180px" class='demo-dynamic'>
                                <el-form-item label="➊ 模板名称" prop="name">
                                    <el-input v-model="ruleForm.name" placeholder="请输入模板名称"></el-input>
                                </el-form-item>
                                <el-form-item label="➋ 图片" prop="pic">
                                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.pic" list-type="picture">
                                        <el-button size="small" type="primary">上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="URL链接地址" prop="url">
                                    <el-input v-model="ruleForm.url" placeholder="请输入链接地址"></el-input>
                                </el-form-item>
                                <div class="dividing"></div>
                                <el-form-item label="➌ 模板名称" prop="name">
                                    <el-input v-model="ruleForm.name" placeholder="请输入模板名称"></el-input>
                                </el-form-item>
                                <el-form-item label="➍ 图片" prop="pic">
                                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.pic" list-type="picture">
                                        <el-button size="small" type="primary">上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="URL链接地址" prop="url">
                                    <el-input v-model="ruleForm.url" placeholder="请输入链接地址"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')" class="w-100">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="10">
                            <p class="text-info mb-md f12">示例：</p>
                            <div class="app-pic">
                                <img src="/static/img/wx.png" alt="">
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                pic: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
                url: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入链接地址', trigger: 'blur' },
                    { type: 'url', message: '格式不正确', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style scoped>
.app-pic img {
    width: 100%;
    max-width: 580px;
}

.dividing {
    border-top: 1px dashed #b1b1b2;
    font-size: 0;
    line-height: 0;
    height: 0;
    margin: 40px 0;
}
</style>