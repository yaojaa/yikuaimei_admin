<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">
                <p class="ms-login-title" v-if="flag">偷偷美&nbsp;管理平台登陆</p>
                <p class="ms-login-title" v-else>蕾蕾美颜&nbsp;管理平台登陆</p>
                <img src="/static/img/ms-title-icon.png" width="10" class="ms-title-icon">
            </div>
            <el-form :model="ruleForm" size="medium" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-input-custom">
                <el-form-item prop="user_name">
                    <el-input v-model="ruleForm.user_name" placeholder="username">
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="user_pwd">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.user_pwd" @keyup.enter.native="submitForm('ruleForm')">
                        <i slot="prefix" class="el-input__icon el-icon-pass"></i>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
    import {user} from '@/api'
    export default {
        data: function(){
            return {
                flag:true,
                ruleForm: {
                    user_name: '',
                    user_pwd: ''
                },
                rules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    user_pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        user.login.call(this, {
                            url: '/api/admin/login/index',
                            method: 'post',
                            data: this[formName]
                        })
                        .then(res => {
                            console.log(res, '0000')
                       localStorage.setItem('ms_username',this.ruleForm.username);
                        })
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted() {
            if(window.location.href.indexOf("leilei")!="-1"){
                this.flag = false
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        left: 0px;
        top: 0px;
        width:100%;
        height:100%;
        background-image: url('/static/img/login_wrap_bg.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .login-star-a,.login-star-b,.login-star-c,.login-star-d,.login-star-e,.login-star-f,.login-star-g{
        width:8px;
        height: 8px;
        border-radius:50%;
        box-shadow:0px 0px 16px #270586;
        background:#a6a6a6;
        -webkit-animation:fadeIn 2s infinite linear ;
    }
    
    .ms-title{
        width:100%;
        height: 30px;
        text-align: center;
        font-size:20px;
        color: #fff;
        margin-bottom: 25px;
        position: relative;
        left: 0px;
        top: 0px;
    }
    .ms-login-title{
        line-height: 30px;
    }
    .ms-title-icon{
        position: absolute;
        left: 106px;
        top: -1px;
        z-index: 9;
    }
    .ms-login{
        position: absolute;
        right:11%;
        top:37%;
        width:280px;
        height:240px;
        padding:25px 60px;
        border-radius: 8px;
        background:rgba(35,27,62,0.6);
    }
    .login-btn button{
        width:166px;
        height: 40px;
        padding:0px;
        text-align:center;
        display:block;
        margin:0 auto;
        border-radius:20px;
    }
    .el-button--primary{
        width:166px;
        height: 40px;
        line-height:40px;
        font-size: 16px;
        color:#fff;
    }
    .el-form-item{
        margin-bottom:30px;
    }
    
    .el-icon-user{
        background: url('/static/img/login-user-icon.png') center no-repeat; 
        background-size: cover;
        height:20px;
        width:16px;
        margin-left:12px;
        margin-top:8px;

    }
    .el-icon-user:before{
        content: "";
        font-size: 16px;
        visibility: hidden;
    }
    .el-icon-pass{
        background: url('/static/img/login-pass-icon.png') center no-repeat; 
        background-size: cover;
        height:20px;
        width:17px;
        margin-left:12px;
        margin-top:8px;

    }
    .el-icon-pass:before{
        content: "";
        font-size: 16px;
        visibility: hidden;
    }
</style>
<style >
    .login-input-custom .el-input__inner{
        padding-left:40px;
        background-color:rgba(61,54,86,0.4);
        border-radius:20px;
        color:#fff;
    }
</style>