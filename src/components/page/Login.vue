<template>
    <div class="login-wrap">
        
        <div class="ms-login">
            <div class="ms-title">偷偷美管理中心登录</div>
            <el-form :model="ruleForm" size="medium" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
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
        left: 0px;
        top: 0px;
        width:100%;
        height:100%;
        background-image: url('/static/img/login_wrap_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .ms-title{
        width:100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size:20px;
        color: #fff;
        margin-bottom: 25px;
    }
    .ms-login{
        position: absolute;
        right:11%;
        top:37%;
        width:280px;
        height:250px;
        padding:20px 60px;
        border-radius: 5px;
        background:rgba(34,26,61,0.5);
    }
   /* .ms-input .el-input__inner{
        background:rgba(61,53,86,0.5);
        width: 100%;
        height: 20px;
    } */
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>