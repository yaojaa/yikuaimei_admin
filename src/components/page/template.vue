<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>权限测试</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="page-header-actions">
                <el-row>
                    <el-button type="primary" size="small" round>添加</el-button>
                    <el-button type="danger" size="small" round>删除</el-button>
                </el-row>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">管理员权限页面</h3>
                </div>
                <div class="panel-body">
                    <p class="text-info f14">只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
                    <p class="text-info f14">想尝试一下，请
                        <router-link to="/login" class="logout">退出登录</router-link>，随便输入个账号名，再进来试试看。</p>
                </div>
            </div>
            <div class="panel panel-bordered">
                <div class="panel-heading">
                    <h3 class="panel-title">管理员权限页面</h3>
                    <div class="panel-actions">
                        <peity :type="'pie'" :data="pieData"></peity>
                    </div>
                </div>
                <div class="panel-body">
                    <p class="text-info f14">只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
                    <p class="text-info f14">想尝试一下，请
                        <router-link to="/login" class="logout">退出登录</router-link>，随便输入个账号名，再进来试试看。</p>
                </div>
                <div class="panel-footer">
                    想尝试一下
                </div>
            </div>
            <div class="sub-heading">
                <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">常用功能</span></h3>
                <div class="sub-actions"><a href="">更多</a></div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <p class="text-info f14">只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p class="text-info f14">
                    <p class="text-info f14">想尝试一下，请
                        <router-link to="/login" class="logout">退出登录</router-link>，随便输入个账号名，再进来试试看。</p>
                </div>
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title">管理员权限页面</h3>
                        </div>
                        <div class="panel-body">
                            <p class="text-info f14">只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title">管理员权限页面</h3>
                        </div>
                        <div class="panel-body">
                            <p class="text-info f14">只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title">管理员权限页面</h3>
                        </div>
                        <div class="panel-body">
                            <p class="text-info f14">只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title">管理员权限页面</h3>
                        </div>
                        <div class="panel-body">
                            <p class="text-info f14">只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>

export default {
  computed: {
    pieData () {
      return this.data.toString()
    }
  },
 
  data () {
    return {
      data: [1, 2, 3, 2, 2]
    }
  },
 
  created () {
   
  }
}
</script>
<style scoped>
</style>