<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>成员管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-moment">
            <el-form ref="form" :model="form" label-width="80px" id="adminUser">
                <el-form-item label="角色名称">
                    <el-select v-model="form.role_id" placeholder="请选择角色">
                        <el-option :label="item.role_name" :value="item.role_id" v-for="item in roleList" :key="`${item.role_name}${item.role_id}`"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成员姓名">
                    <el-input v-model="form.user_realname" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="登陆账号">
                    <el-input v-model="form.user_name" placeholder="请输入账号名称" />
                </el-form-item>
                <el-form-item label="登陆密码">
                    <el-input ype="password" v-model="form.user_pwd" autocomplete="off" />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input ype="password" v-model="user_pwd" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { mapState } from 'Vuex'

export default {
    name: 'adminUser',

    components: {},

    data(){
        return {
            form:{
                user_name: '', // 登陆账号
                user_pwd: '', // 密码
                user_realname: '', // 成员姓名
                role_id: '', // 角色id
                user_division: '', // 职位
                user_img: '', // 图片
                user_is_use: '' // 是否可用  1可用 2冻结
            },
            user_pwd:'',
            modifiy: false
        }
    },
    computed:{
        ...mapState('adminUser',['roleList','userInfo'])
    },

    created(){
        this.user_id = this.$route.params.id
        if(+this.user_id) {
            this.modifiy = true
        } else {
            this.modifiy = false
        }
        if(this.modifiy){this.$store.dispatch('adminUser/fetchGetUserInfo',{user_id:0})}
        if(!this.roleList.length){
            this.$store.dispatch('adminUser/fetchGetRoleList')     
        }
        this.form = {...this.form, ...this.userInfo}
    },

    methods:{
        onSubmit(){
            // console.log('form',this.form)
            if(this.form.user_pwd !== this.user_pwd){
                alert("两次输入密码不一致")
                return 
            }
            let url = this.modifiy ? '/api/admin/adminUser/edit' : '/api/admin/adminUser/add'
            this.$axios({
                method: "post",
                url,
                params: { ...this.form }
            }).then((res) => {
                if (res.code === 0) {
                    this.$alert('操作成功')
                    this.$router.push('/admin/staffList')
                }
            });

            // this.$store.dispatch(url, this.form).then(res => {
            //     if(res){
            //         alert("操作成功")
            //     }
            // })
        }
    }
}
</script>
<style>
#adminUser{
    margin: 0 auto ;
    width: 50%;
    margin-top: 50px
}
</style>


