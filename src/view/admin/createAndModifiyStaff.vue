<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
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
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
    name: 'adminUser',

    components: {
        BreadCrumb
    },

    data(){
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "平台管理"
                },
                {
                    name: "成员管理",
                    url:"/admin/staffList"
                },
                {
                    name: "添加成员",
                    url: "/admin/addStaff"
                }
            ],
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
        //判断当前页面 是否有参数 有参数那就调用info接口 
        if(this.modifiy){this.$store.dispatch('adminUser/fetchGetUserInfo',{"user_id":this.user_id})}

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
                console.log(res,'res')
                if (res.data.code === 0) {
                    this.$alert('操作成功')
                    this.$router.push('/admin/staffList')
                }else{
                    this.$alert(res.data.msg)
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


