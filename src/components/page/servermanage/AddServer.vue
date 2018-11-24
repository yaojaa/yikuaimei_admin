<template>
    <div class="panel">
        <div class="panel-body">
            <div class="form-panel mt-md">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
                    <el-form-item label="客服类别" prop="leibie">
                        <el-select v-model="ruleForm.leibie" placeholder="选择客服类型" style="width: 100%">
                            <el-option label="售前" value="shouqian"></el-option>
                            <el-option label="售后" value="shouhou"></el-option>
                            <el-option label="婚纱" value="hunsha"></el-option>
                            <el-option label="摄影" value="sheying"></el-option>
                            <el-option label="婚博会" value="hunbohui"></el-option>
                            <el-option label="儿博会" value="erbohui"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色类型" prop="juese">
                        <el-select v-model="ruleForm.juese" placeholder="选择角色类型" style="width: 100%">
                            <el-option label="主管" value="zhuguan"></el-option>
                            <el-option label="专员" value="zhuanyuan"></el-option>
                            <el-option label="普通客服" value="putongkefu"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="客服姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ邮箱" prop="qqmail">
                        <el-input v-model="ruleForm.qqmail"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        var valphone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入电话号码'));
            } else {
                if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
                    callback(new Error('请输入正确的电话号码'));
                    return false;
                } else {
                    this.checkPass1 = true
                    callback();
                }
            }
        };
        var valmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱地址'));
            } else {
                if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value))) {
                    callback(new Error('请输入正确的邮箱地址'));
                    return false;
                } else {
                    this.checkPass2 = true
                    callback();
                }
            }
        };
        //   var valhas = (rule, value, callback) => {
        //     if (value === '') {
        //       callback(new Error('请选择'));
        //     } else {
        //         if(rule=='juese'){
        //             this.checkPass1=true
        //         }else{
        //             this.checkPass2=true
        //         }
        //       callback();
        //     }
        //   };      
        return {
            ruleForm: {
                name: '',
                phone: '',
                juese: '',
                leibie: '',
                qqmail: '',
                desc: ''
            },
            checkPass1: false,
            checkPass2: false,
            checkPass3: false,
            checkPass4: false,
            checkPass5: false,
            rules: {
                name: [
                    { required: true, message: '请输入客服姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                phone: [
                    { validator: valphone, required: true, trigger: 'blur' }
                ],
                qqmail: [
                    { validator: valmail, required: true, trigger: 'blur' }
                ],
                juese: [
                    { required: true, trigger: 'blur' }
                ],
                leibie: [
                    { required: true, trigger: 'blur' }
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
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
</script>
<style lang="less" scoped>
.container {
    margin-top: 30px;
}

.container /deep/ .el-form {
    width: 500px;
}
</style>