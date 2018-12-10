<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" unique-opened router >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: true,
                breadcrumb:[],
                items: [
                    {
                        icon: 'iconfont icon-shouye',
                        index: '/index',
                        title: '首页'
                    },
                    {
                        icon: 'iconfont icon-guanli',
                        index: 'index2',
                        title: '商品管理',
                        subs: [
                            {
                                index: '/goodList',
                                title: '平台商品'
                            },{
                                index: '/userincome',
                                title: '门户服务'
                            },{
                                index: '/userincome',
                                title: '采购品项'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-shangjiacopy',
                        index: '/business',
                        title: '订单管理',
                        subs: [
                            {
                                index: '/business',
                                title: '平台商品'
                            },
                            {
                                index: '/business',
                                title: '门店服务'
                            },
                            {
                                index: '/business',
                                title: '采购品项'
                            },
                            {
                                index: '/business',
                                title: '评价管理'
                            },
                            {
                                index: '/business',
                                title: '退款初审'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-kefu',
                        index: '/case',
                        title: '案例'
                    },
                    {
                        icon: 'iconfont icon-guanggaoguanli',
                        index: 'index6',
                        title: '加盟商管理',
                        subs: [
                            {
                                index: '/ad/admin',
                                title: '加盟商'
                            },
                            {
                                index: '/ad/all',
                                title: '门店'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-yingxiaocopy',
                        index: 'index7',
                        title: '消费者管理',
                        subs: [
                            {
                                index: '/marketcoupon',
                                title: '消费者'
                            },
                            {
                                index: '/physicalcoupon',
                                title: '黑名单'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-yingxiaocopy',
                        index: 'index8',
                        title: '审核管理',
                        subs: [
                            {
                                index: '/marketcoupon',
                                title: '加盟商'
                            },
                            {
                                index: '/physicalcoupon',
                                title: '门店'
                            },
                            {
                                index: '/physicalcoupon',
                                title: '提现(门店)'
                            },
                            {
                                index: '/physicalcoupon',
                                title: '提现(人)'
                            },
                            {
                                index: '/physicalcoupon',
                                title: '退款(复审)'
                            },
                            {
                                index: '/physicalcoupon',
                                title: '案例'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-yingxiaocopy',
                        index: 'index9',
                        title: '培训'
                    },
                    {
                        icon: 'iconfont icon-yingxiaocopy',
                        index: 'index10',
                        title: '美丽档案'
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path;
            }
        },
        created(){
            let that = this;
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            // _.forEach(this.items,function(v,k){
            //     if(_.find(v.subs,['index',that.$route.path])){
            //         that.breadcrumb = _.concat(_.omit(that.items[k],'subs'),_.find(v.subs,['index',that.$route.path]),{'title':that.$route.meta.title})
            //     }
            // })
        },
        methods:{
        }
    }
</script>

<style>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom:0;
        overflow-y: auto;
        overflow-x: hidden;
        width: 220px
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 220px;
    }
    .sidebar > ul {
        height:100%;
    }
    .sidebar .sidebar-el-menu{
        box-sizing: border-box;
        border:none;
    }
</style>
