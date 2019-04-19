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
                                index: '/serviceList',
                                title: '平台服务'
                            },{
                                index: '/purchaseList',
                                title: '品项管理'
                            },{
                                index: '/fictitiousList',
                                title: '虚拟卡券管理'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-shangjiacopy',
                        title: '订单管理',
                        index:'/order',
                        subs: [
                            {
                                index: '/order/list_goods',
                                title: '商品订单'
                            },
                            {
                                // index: '/order/list_service',
                                // title: '服务订单'
                                index: '/order/serviceOrderList',
                                title: '服务订单'
                            },
                            {
                                index: '/order/purchaseOrderList',
                                title: '采购品项'
                            },
                            {
                                index: '/order/commentList',
                                title: '评价管理'
                            },
                            {
                                index: '/order/refundAuditList?order_type=2',
                                title: '退款初审'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-kefu',
                        index: '/manage',
                        title: '网站管理',
                        subs: [
                            {
                                index: '/manage/case',
                                title: '案例管理'
                            },
                            {
                                index: '/manage/label',
                                title: '标签管理'
                            }
                        ]
                    },

                    
                    {
                        icon: 'iconfont icon-guanggaoguanli',
                        index: 'index61',
                        title: '加盟商管理',
                        subs: [
                            {
                                index: '/business/alliance',
                                title: '加盟商'
                            },
                            {
                                index: '/shop/list',
                                title: '门店'
                            },
                            {
                                index: '/training/list',
                                title: '培训'
                            }
                        ]
                    },
                  
                    {
                        icon: 'iconfont icon-yingxiaocopy',
                        index: 'index8',
                        title: '审核管理',
                        subs: [
                            {
                                index: '/audit/business',
                                title: '加盟商'
                            },
                            {
                                index: '/audit/shop',
                                title: '门店'
                            },
                            {
                                index: '/refundReview/list',
                                title: '退款复审'
                            },
                            {
                                index: '/storeWithdrawal/list',
                                title: '门店提现'
                            },
                            // {
                            //     index: '/physicalcoupon',
                            //     title: '提现(人)'
                            // },
                            // {
                            //     index: '/physicalcoupon',
                            //     title: '退款(复审)'
                            // },
                            // {
                            //     index: '/physicalcoupon',
                            //     title: '案例'
                            // }
                        ]
                    },
                    {
                        icon: 'iconfont icon-guanli',
                        index: '/user',
                        title: '用户管理',
                        subs: [
                            {
                                index: '/user/userList?is_black=0',
                                title: '用户管理'
                            },
                            {
                                index: '/user/beautifulList',
                                title: '美丽档案'
                            }
                            
                        ]
                    },
                    {
                        icon: 'iconfont icon-guanli',
                        index: '/marketing',
                        title: '营销管理',
                        subs: [
                            {
                                index: '/marketing/markList',
                                title: '营销应用'
                            }
                            // {
                            //     index: '/marketing/checkList',
                            //     title: '验票列表'
                            // }
                        ]
                    },
                    {
                        icon: 'iconfont icon-guanli',
                        index: '/admin',
                        title: '平台管理',
                        subs: [
                            {
                                index: '/admin/staffList',
                                title: '成员管理'
                            },
                            {
                                index: '/admin/roleList',
                                title: '角色管理'
                            },
                            {
                                index: '/admin/news/list',
                                title: '消息推送'
                            }
                            
                        ]
                    },
                //     {
                //         icon: 'iconfont icon-yingxiaocopy',
                //         index: 'index9',
                //         title: '培训'
                //     },
                //     {
                //         icon: 'iconfont icon-yingxiaocopy',
                //         index: 'index10',
                //         title: '美丽档案'
                //     },

                //    /**以下为示例页面可参考使用：***/
                //         {
                //         icon: 'iconfont icon-shouye',
                //         index: 'index1',
                //         title: '以下为示例页面可参考使用：'
                //     },

                //     {
                //         icon: 'iconfont icon-guanli',
                //         index: 'index3',
                //         title: '用户管理',
                //         subs: [
                //             {
                //                 index: '/userlist',
                //                 title: '用户管理'
                //             },{
                //                 index: '/userincome',
                //                 title: '用户收入'
                //             }
                //         ]
                //     },
                //     {
                //         icon: 'iconfont icon-shangjiacopy',
                //         index: '/business2',
                //         title: '商家',
                //         subs: [
                //             {
                //                 index: '/business2',
                //                 title: '商家管理'
                //             }
                //         ]
                //     },
                //     {
                //         icon: 'iconfont icon-kefu',
                //         index: '/servermanage',
                //         title: '客服',
                //         subs:[
                //             {
                //                 index:'/servermanage',
                //                 title:'客服统计'
                //             },
                //             {
                //                 index:'/servermanage/addserver',
                //                 title:'添加客服'
                //             },
                //             {
                //                 index:'/servermanage/check',
                //                 title:'查看记录'
                //             }
                //         ]
                //     },
                //     {
                //         icon: 'iconfont icon-guanggaoguanli',
                //         index: 'index6',
                //         title: '广告',
                //         subs: [
                //             {
                //                 index: '/ad/admin',
                //                 title: '广告管理'
                //             },
                //             {
                //                 index: '/ad/all',
                //                 title: '一站搞定'
                //             }
                //         ]
                //     },
                //     {
                //         icon: 'iconfont icon-yingxiaocopy',
                //         index: 'index99',
                //         title: '营销',
                //         subs: [
                //             {
                //                 index: '/marketcoupon',
                //                 title: '优惠券'
                //             },
                //             {
                //                 index: '/physicalcoupon',
                //                 title: '实物券'
                //             },
                //             {
                //                 index: '/event',
                //                 title: '总部活动'
                //             },
                //             {
                //                 index: '/marketgame',
                //                 title: '游戏'
                //             },
                //             {
                //                 index: '/content',
                //                 title: '内容'
                //             },
                //             {
                //                 index: '/style',
                //                 title: '风格'
                //             },
                //             {
                //                 index: '/care/app',
                //                 title: '关怀'
                //             }
                //         ]
                //     },
                //     {
                //         icon: 'iconfont icon-xiaoxicopy',
                //         index: '/message/sms',
                //         title: '消息'
                //     },
                //     {
                //         icon: 'iconfont icon-zhanhuiguanli',
                //         index: '/exhibitionmanage',
                //         title: '展会',
                //         subs: [
                //             {
                //                 index: '/exhibitionmanage',
                //                 title: '展会管理'
                //             },
                //             {
                //                 index: '/exhibitionchart',
                //                 title: '展会数据'
                //             }
                //         ]

                //     },
                //     {
                //         icon: 'iconfont icon-yuangongguanli',
                //         index: '/checkmanage',
                //         title: '审核管理',
                //         subs: [
                //             {
                //                 index: '/checkmanage',
                //                 title: '审核管理'
                //             },
                //             {
                //                 index: '/checkmanage/bussinessinfo',
                //                 title: '商家详情'
                //             },
                //             {
                //                 index: '/checkmanage/mealinfo',
                //                 title: '套餐详情'
                //             },
                //             {
                //                 index: '/checkmanage/caseinfo',
                //                 title: '案例详情'
                //             },
                //             {
                //                 index: '/checkmanage/exhibitioninfo',
                //                 title: '展会详情'
                //             }
                //         ]

                //     },
                //     {
                //         icon: 'iconfont icon-fenzigongsi',
                //         index: '/branchManagement',
                //         title: '分公司管理'
                //     },
                //     {
                //         icon: 'iconfont icon-jiankong',
                //         index: 'index18',
                //         title: '监控中心',
                //         subs: [
                //             {
                //                 index: '/monitor/exemption',
                //                 title: '抽免单'
                //             },
                //             {
                //                 index: '/monitor/order',
                //                 title: '订单管理'
                //             }
                //         ]
                //     },
                //     {
                //         icon: 'iconfont icon-shujubaobiao',
                //         index: '/datachart',
                //         title: '数据报表'
                //     },
                //     {
                //         icon: 'iconfont icon-shezhicopy',
                //         index: '',
                //         title: '设置',
                //         subs: [
                //             {
                //                 index: '/set/member',
                //                 title: '成员管理'
                //             },
                //             {
                //                 index: '/set/role',
                //                 title: '角色管理'
                //             },
                //             {
                //                 index: '/set/log',
                //                 title: '日志管理'
                //             },
                //             {
                //                 index: '/set/account',
                //                 title: '账号管理'
                //             },
                //             {
                //                 index: '/set/alert',
                //                 title: '弹窗设置'
                //             }
                //         ]
                //     }     
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
