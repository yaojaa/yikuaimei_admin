<template>
    <div class="page add-member" v-loading="loading">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-body">
                    <div class="form-panel">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="角色名称" prop="role_id">
                                <el-select v-model="ruleForm.role_id" placeholder="角色名称" class="w-full">
                                    <el-option v-for="item in roleList" :key = "item.id" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所在部门" prop="user_division">
                                <el-input v-model.trim="ruleForm.user_division" type="text" placeholder="所在部门"></el-input>
                            </el-form-item>
                            <el-form-item label="成员姓名" prop="user_realname">
                                <el-input v-model.trim="ruleForm.user_realname" type="text" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="user_phone">
                                <el-input v-model.trim="ruleForm.user_phone" type="tel" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="user_pwd">
                                <el-input v-model.trim="ruleForm.user_pwd" type="password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item class="submit">
                                <el-button type="primary" @click="submitForm('ruleForm')" class="w-80">提交</el-button>
                                <!-- <el-button plain @click="checkList" class="w-80">查看成员</el-button> -->
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

        let phone = (rule, value, callback) => {
            if (/^1\d{10}$/.test(value)) {
                callback();
            } else {
                callback(new Error('请输入正确的手机号'));
            }
        };
        return {
            loading: false,
            breadcrumb: [ //面包屑
                {
                    "name": "设置",
                },
                {
                    "name": "成员管理",
                    "url":"/set/member"
                },
                {
                    "name": "添加成员",
                }
            ],

            roleList:[], //角色名称  {lable:"",value:""}

            ruleForm: {
                role_id: '',
                user_division: '',
                user_realname: '',
                user_phone: '',
                user_pwd: '',
            },
            rules: {
                role_id: [
                    { required: true, message: '请选择角色名称', trigger: 'change' }
                ],
                user_division: [
                    { required: true, message: '请输入所在部门', trigger: 'blur' },
                ],
                user_realname: [
                    { required: true, message: '请输入成员名称', trigger: 'blur' },
                ],
                user_phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: phone, trigger: 'blur' }
                ],
                user_pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }
        }
    },
    components: {
        BreadCrumb
    },
    created() {
        this.getRoleList();
    },
    computed: {},
    methods: {
        getRoleList(){
            this.loading = true;
            this.$axios.get("/api/admin/role/list?page_size=100000000").then(res => {
                this.loading = false;
                res = res.data;

                if(res.code != 0){
                    this.$alert(res.msg,"温馨提示");
                    return;
                }

                res.data.map(e => {
                    this.roleList.push({
                        label: e.role_name,
                        value: e.role_id
                    })
                })
            })
        },
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.ruleForm.user_name = this.ruleForm.user_phone;

                    this.$axios.post('/api/admin/adminuser/add', this.ruleForm)
                    .then(function (res) {
                        _this.loading = false;
                        res = res.data;

                        if(res.code != 0){ //错误提示
                            _this.$alert(res.msg, "温馨提示");
                            return;
                        }

                        _this.$message({
                            type:"success",
                            message: "添加成功！"
                        })




                        console.log(res.data);
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        checkList(){

            if(this.breadcrumb[1] && this.breadcrumb[1].url){
                this.$router.push({path:this.breadcrumb[1].url});
            }else{
                this.$router.go(-1);
            }
        },

    }
}
</script>
<style scoped>
</style>