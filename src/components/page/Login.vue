<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="user_name">
                    <el-input v-model="ruleForm.user_name" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="user_pwd">
                    <el-input type="password" placeholder="password" v-model="ruleForm.user_pwd" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {user} from '@/api'
    export default {
        data: function(){
            return {
                ruleForm: {
                    user_name: '13521089284',
                    user_pwd: '123456'
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
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>