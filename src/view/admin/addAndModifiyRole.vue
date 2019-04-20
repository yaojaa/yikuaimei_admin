<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-moment">
            <el-form ref="form" :model="form" label-width="80px" class="adminRole">
                <el-form-item label="角色名称">
                    <el-input v-model="form.role_name" placeholder="例：客服" style="width: 150px;" />
                </el-form-item>
                <el-form-item label="管理权限">
                    <el-table :data="powerList" tooltip-effect="dark" style="width: 100%" class="table_out" border>
                        <el-table-column type="expand">
                            <template slot-scope="scope" v-if="scope.row.children && $_poweDeep(scope.row.children) > 2">
                                    <div v-for="chil in scope.row.children" :key="`${chil.power_id}chil`">
                                        <el-table class="table_inner" :data="scope.row.children" :showHeader="false" border>
                                            <el-table-column type="expand"></el-table-column>
                                            <el-table-column>
                                                <template slot-scope="scope">
                                                    {{ scope.row.power_cn }}
                                                    <el-checkbox-group v-model="form.role_power_ids">
                                                        <el-checkbox :label="scope.row.power_id"
                                                            name="type">
                                                            显示{{scope.row.power_id}}
                                                        </el-checkbox>
                                                    </el-checkbox-group>
</template>
                                        </el-table-column>
                                        <el-table-column>
<template slot-scope="scope">
    <el-checkbox-group v-model="form.role_power_ids">
        <el-checkbox :label="chil.power_id" name="type" v-for="chil in scope.row.children" :key="`${chil.power_id}chil`">
            {{chil.power_cn}}{{chil.power_id}}
        </el-checkbox>
    </el-checkbox-group>
</template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="导航名称" >
<template slot-scope="scope">
     {{ scope.row.power_cn }}{{scope.row.power_id}}
    <el-checkbox-group v-model="form.role_power_ids">
        <el-checkbox :label="scope.row.power_id" name="type">全选</el-checkbox>
    </el-checkbox-group>
</template>
                        </el-table-column>
                        <el-table-column label="权限分配" >
<template slot-scope="scope">
    <p v-if="scope.row.children && $_poweDeep(scope.row.children) === 2">
        {{ scope.row.children ? scope.row.children[0].power_cn : ''}} {{ scope.row.children ? scope.row.children[0].power_id : ''}}
        <el-checkbox-group v-model="form.role_power_ids">
            <el-checkbox :label="scope.row.children[0].power_id" name="type">
                显示
            </el-checkbox>
        </el-checkbox-group>
    </p>
</template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    
    
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
    import {
        mapState
    } from "Vuex";
    export default {
        name: "detail",
    
        components: {
            BreadCrumb
        },
    
        data() {
            return {
                breadcrumb: [
                //面包屑
                {
                    name: "平台管理"
                },
                {
                    name: "角色管理",
                    url: "/admin/roleList"
                },
                {
                    name: "添加角色",
                    url: ""
                }
            ],
                form: {
                    role_name: "",
                    role_id: null, // id
                    is_manager: 0, // 是否是超级管理员
                    role_power_ids: [] // 权限
                },
                powerList: []
            };
        },
    
        computed: {
            ...mapState("adminRole", ["power_list", "roleInfo", "roleList", "info"]),
            role_id() {
                // 0 新建 1 编辑
                return Number(this.$route.params.id);
            }
        },
    
        async created() {
            if (!this.roleList.length) {
                this.$store.dispatch("adminRole/fetchAdminRoleList");
            }
            if (this.role_id) {
                await this.$store.dispatch("adminRole/fetchGetRoleInfo", {
                    role_id: this.role_id
                });
                this.powerList = this.roleInfo;
                this.form = { ...this.form,
                    ...this.info
                };
            } else {
                if (!this.power_list) {
                    await this.$store.dispatch("adminRole/fetchGetPowerList");
                }
                this.powerList = this.power_list;
            }
        },
    
        methods: {
            onSubmit() {
                let url = this.role_id ? "adminRole/fetchEdit" : "adminRole/fetchCreate";
                this.$store.dispatch(url, { ...this.form
                }).then(res => {
                    this.$alert("操作成功");
                    this.$router.push('/admin/roleList');
                });
            },
    
            $_poweDeep(arr, power_deep) {
                if (!power_deep) power_deep = 1;
                arr.filter(item => {
                    if (item.power_deep > power_deep) {
                        power_deep = item.power_deep;
                    }
                    if (item.children) {
                        power_deep = this.$_poweDeep(item.children, power_deep);
                    }
                });
                return power_deep;
            }
        }
    };
</script>

<style>
    .table_out .el-table__expanded-cell {
        padding: 0;
    }
    
    .table_inner .el-table__expand-column {
        visibility: hidden;
    }
    
    .adminRole {
        padding: 20px;
    }
    
    .el-checkbox-group {
        display: inline-block;
    }
</style>

