<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>营销</el-breadcrumb-item>
                    <!-- <el-breadcrumb-item>关怀</el-breadcrumb-item> -->
                    <el-breadcrumb-item to="/care/app">APP推送</el-breadcrumb-item>
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
                                <el-form-item label="模板名称" prop="name">
                                    <el-input v-model="ruleForm.name" placeholder="请输入模板名称"></el-input>
                                </el-form-item>
                                <el-form-item label="URL链接地址" prop="url">
                                    <el-input v-model="ruleForm.url" placeholder="请输入链接地址"></el-input>
                                </el-form-item>
                                <el-form-item label="➊ 内容" prop="content">
                                    <el-input type="textarea" v-model="ruleForm.content" placeholder="请输入200以内的内容" rows="5"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')" class="w-100">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="10">
                            <p class="text-info mb-md f12">示例：</p>
                            <div class="app-pic">
                                <img src="/static/img/app.png" alt="">
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
                url: '',
                content: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入链接地址', trigger: 'blur' },
                    { type: 'url', message: '格式不正确', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入100字以内的内容', trigger: 'blur' },
                    { min: 10, max: 100, message: '最少10个字节，最多100个字节', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
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
</style>