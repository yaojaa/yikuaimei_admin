<template>
    <div class="page add-member">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-body">
                    <div class="form-panel form">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="手机号码" prop="phone">
                                <el-input v-model="ruleForm.phone" type="tel" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="旧密码" prop="oldpassword">
                                <el-input v-model="ruleForm.oldpassword" :type="inputType.type[inputType.oldpassword]" placeholder="请输入旧密码">
                                    <a href="javascript:;" v-show="ruleForm.oldpassword" slot="suffix" class="el-input__icon el-icon-view" @click="inputTypeClick('oldpassword')"></a>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newpassword">
                                <el-input v-model="ruleForm.newpassword" :type="inputType.type[inputType.newpassword]" placeholder="请输入新密码">
                                    <a href="javascript:;" v-show="ruleForm.newpassword" slot="suffix" class="el-input__icon el-icon-view" @click="inputTypeClick('newpassword')"></a>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码" prop="new_password">
                                <el-input v-model="ruleForm.new_password" :type="inputType.type[inputType.new_password]" placeholder="请再次输入新密码">
                                    <a href="javascript:;" v-show="ruleForm.new_password" slot="suffix" class="el-input__icon el-icon-view" @click="inputTypeClick('new_password')"></a>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="submit">
                                <el-button type="primary" @click="submitForm('ruleForm')" class="w-80">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb'

export default {
    data() {
        let validateAmount = (rule, value, callback) => {
            if (value != this.ruleForm.newpassword) {
                callback(new Error('两次密码不一样'));
            } else {
                callback();
            }
        };
        return {
            self: this,
            breadcrumb: [ //面包屑
                {
                    "name": "设置",
                },
                {
                    "name": "账号管理",
                }
            ],
            inputType: {
                type: ["password", "text"],
                oldpassword: 0,
                newpassword: 0,
                new_password: 0,
            },
            ruleForm: {
                phone: '',
                oldpassword: '',
                newpassword: '',
                new_password: '',
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '检查手机号是否正确', trigger: 'blur' }
                ],
                oldpassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                ],
                newpassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                new_password: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: validateAmount, trigger: 'blur' }
                ],
            }
        }
    },
    components: {
        BreadCrumb
    },
    created() {},
    computed: {},
    methods: {
        inputTypeClick(key) {
            this.inputType[key] = this.inputType[key] == 0 ? 1 : 0;
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

</style>