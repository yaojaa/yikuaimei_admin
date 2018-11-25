<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
           unique-opened router >
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
                collapse: false,
                breadcrumb:[],
                items: [
                    {
                        icon: 'iconfont icon-shouye',
                        index: 'index1',
                        title: '首页',
                        subs: [
                            {
                                index: '/dashboard',
                                title: '核心数据'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-guanli',
                        index: 'index2',
                        title: '用户管理',
                        subs: [
                            {
                                index: '/userlist',
                                title: '用户管理'
                            },{
                                index: '/userincome',
                                title: '用户收入'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-shangjiacopy',
                        index: '/business',
                        title: '商家',
                        subs: [
                            {
                                index: '/business',
                                title: '商家管理'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-kefu',
                        index: '/servermanage',
                        title: '客服',
                        subs:[
                            {
                                index:'/servermanage',
                                title:'客服统计'
                            },
                            {
                                index:'/servermanage/addserver',
                                title:'添加客服'
                            },
                            {
                                index:'/servermanage/check',
                                title:'查看记录'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-guanggaoguanli',
                        index: 'index6',
                        title: '广告',
                        subs: [
                            {
                                index: '/ad/admin',
                                title: '广告管理'
                            },
                            {
                                index: '/ad/all',
                                title: '一站搞定'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-yingxiaocopy',
                        index: 'index9',
                        title: '营销',
                        subs: [
                            {
                                index: '/marketcoupon',
                                title: '优惠券'
                            },
                            {
                                index: '/physicalcoupon',
                                title: '实物券'
                            },
                            {
                                index: '/event',
                                title: '总部活动'
                            },
                            {
                                index: '/marketgame',
                                title: '游戏'
                            },
                            {
                                index: '/content',
                                title: '内容'
                            },
                            {
                                index: '/style',
                                title: '风格'
                            },
                            {
                                index: '/care/app',
                                title: '关怀'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-xiaoxicopy',
                        index: '/message/sms',
                        title: '消息'
                    },
                    {
                        icon: 'iconfont icon-zhanhuiguanli',
                        index: '/exhibitionmanage',
                        title: '展会',
                        subs: [
                            {
                                index: '/exhibitionmanage',
                                title: '展会管理'
                            },
                            {
                                index: '/exhibitionchart',
                                title: '展会数据'
                            }
                        ]

                    },
                    {
                        icon: 'iconfont icon-yuangongguanli',
                        index: '/checkmanage',
                        title: '审核管理',
                        subs: [
                            {
                                index: '/checkmanage',
                                title: '审核管理'
                            },
                            {
                                index: '/checkmanage/bussinessinfo',
                                title: '商家详情'
                            },
                            {
                                index: '/checkmanage/mealinfo',
                                title: '套餐详情'
                            },
                            {
                                index: '/checkmanage/caseinfo',
                                title: '案例详情'
                            },
                            {
                                index: '/checkmanage/exhibitioninfo',
                                title: '展会详情'
                            }
                        ]

                    },
                    {
                        icon: 'iconfont icon-fenzigongsi',
                        index: '/branchManagement',
                        title: '分公司管理'
                    },
                    {
                        icon: 'iconfont icon-jiankong',
                        index: 'index18',
                        title: '监控中心',
                        subs: [
                            {
                                index: '/monitor/exemption',
                                title: '抽免单'
                            },
                            {
                                index: '/monitor/order',
                                title: '订单管理'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-shujubaobiao',
                        index: '/datachart',
                        title: '数据报表'
                    },
                    {
                        icon: 'iconfont icon-shezhicopy',
                        index: '',
                        title: '设置',
                        subs: [
                            {
                                index: '/set/member',
                                title: '成员管理'
                            },
                            {
                                index: '/set/role',
                                title: '角色管理'
                            },
                            {
                                index: '/set/log',
                                title: '日志管理'
                            },
                            {
                                index: '/set/account',
                                title: '账号管理'
                            },
                            // {
                            //     index: '/set/style',
                            //     title: '风格设置'
                            // },
                            {
                                index: '/set/alert',
                                title: '弹窗设置'
                            }
                        ]
                    }
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