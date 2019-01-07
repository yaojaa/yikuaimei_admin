import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/index',
                    component: resolve => require(['../view/index.vue'], resolve),
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: '/goodList',
                    component: resolve => require(['../view/goods/goodList.vue'], resolve),
                    meta: {
                        title: '平台商品'
                    }
                },
                {
                    path: '/createGood',
                    component: resolve => require(['../view/goods/createGood.vue'], resolve),
                    meta: {
                        title: '平台商品'
                    }
                },
                {
                    path: '/serviceList',
                    component: resolve => require(['../view/goods/serviceList.vue'], resolve),
                    meta: {
                        title: '门店服务'
                    }
                },
                {
                    // 分类管理
                    path: '/categorylist',
                    component: resolve => require(['../view/goods/categorylist.vue'], resolve),
                    meta: {
                        title: '分类管理'
                    }
                },
                {
                    // 添加分类
                    path: '/createCategory',
                    component: resolve => require(['../view/goods/createCategory.vue'], resolve),
                    meta: {
                        title: '添加分类'
                    }
                },

                {
                    // 订单管理
                    path: '/order/list_goods',
                    component: resolve => require(['../view/order/list_goods.vue'], resolve),
                    meta: {
                        title: '商品订单',
                        permission: true
                    }
                },

                {
                    // 订单管理--订单详情
                    path: '/order/order_detail/:order_code',
                    component: resolve => require(['../view/order/detail.vue'], resolve),
                    meta: {
                        title: '订单详情',
                        permission: true
                    }
                },
                {
                    // 订单管理--订单详情
                    path: '/order/send_goods/:order_code',
                    component: resolve => require(['../view/order/send_goods.vue'], resolve),
                    meta: {
                        title: '发货',
                        permission: true
                    }
                },
                {
                    // 案例页面
                    path: '/case',
                    component: resolve => require(['../view/case/caseList.vue'], resolve),
                    meta: {
                        title: '案例列表',
                        permission: true
                    }
                },

                {
                    // 案例页面
                    path: '/case/add',
                    component: resolve => require(['../view/case/case_add.vue'], resolve),
                    meta: {
                        title: '添加案例',
                        permission: true
                    }
                },
                  {
                    // 案例页面
                    path: '/case/add/:id',
                    component: resolve => require(['../view/case/case_add.vue'], resolve),
                    meta: { title: '编辑案例', permission: true }
                },
                  {
                    // 案例页面
                    path: '/case/:id',
                    component: resolve => require(['../view/case/case_detail.vue'], resolve),
                    meta: { title: '案例详情', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: {
                        title: '权限测试',
                        permission: true
                    }
                },
                {
                    // 加盟商
                    path: '/alliance',
                    component: resolve => require(['../view/alliance.vue'], resolve),
                    meta: {
                        title: '加盟商'
                    }
                },
                {
                    // 加盟商
                    path: '/alliance_add',
                    component: resolve => require(['../view/alliance_add.vue'], resolve),
                    meta: {
                        title: '添加加盟商'
                    }
                },
                {
                    // 测试表格
                    path: '/slot',
                    component: resolve => require(['../components/page/slot.vue'], resolve),
                    meta: {
                        title: '表格测试'
                    }
                },
                {
                    // 用户列表
                    path: '/userlist',
                    component: resolve => require(['../components/page/userlist.vue'], resolve),
                    meta: {
                        title: '用户列表'
                    }
                },
                {
                    // 测试用的用户订单详情页
                    path: '/userdetailorderdetail',
                    component: resolve => require(['../components/page/userDetailOrderDetail.vue'], resolve),
                    meta: {
                        title: '用户订单详情',
                        permission: true
                    }
                },
                {
                    // 测试用的用户收藏对比页
                    path: '/userdetailcollect',
                    component: resolve => require(['../components/page/userDetailCollect.vue'], resolve),
                    meta: {
                        title: '用户详情收藏',
                        permission: true
                    }
                },
                {
                    // 用户收入
                    path: '/userincome',
                    component: resolve => require(['../components/page/userIncome.vue'], resolve),
                    meta: {
                        title: '用户收入'
                    }
                },
                {
                    //商家管理list
                    path: '/business',
                    component: resolve => require(['../components/page/business.vue'], resolve),
                    meta: {
                        title: '商家管理'
                    }
                },
                {
                    //商家管理
                    path: '/businessManage',
                    component: resolve => require(['../components/page/businessManage.vue'], resolve),
                    meta: {
                        title: '商家管理'
                    },
                    children: [{
                        path: 'BasicInfo/:id',
                        component: resolve => require(['../components/page/business/BasicInfo.vue'], resolve),
                        meta: {
                            title: '基本信息',
                            permission: true
                        }
                    }, {
                        path: 'PackageInfo/:id',
                        component: resolve => require(['../components/page/business/PackageInfo.vue'], resolve),
                        meta: {
                            title: '套餐信息',
                            permission: true
                        }
                    }, {
                        path: 'CaseInfo/:id',
                        component: resolve => require(['../components/page/business/CaseInfo.vue'], resolve),
                        meta: {
                            title: '案例信息',
                            permission: true
                        }
                    }, {
                        path: 'coupon/:id',
                        component: resolve => require(['../components/page/business/coupon.vue'], resolve),
                        meta: {
                            title: '优惠券',
                            permission: true
                        }
                    }, {
                        path: 'notice/:id',
                        component: resolve => require(['../components/page/business/notice.vue'], resolve),
                        meta: {
                            title: '公告',
                            permission: true
                        }
                    }]
                },
                {
                    path: '/caseDetails',
                    component: resolve => require(['../components/page/business/caseDetails.vue'], resolve),
                    meta: {
                        title: '案例信息详情',
                        permission: true
                    }
                },
                //测试用
                {
                    path: '/aaatalkbox',
                    component: resolve => require(['../components/page/aaatalkbox.vue'], resolve),
                    meta: {
                        title: '案例信息详情',
                        permission: true
                    }
                },
                {
                    //客服管理
                    path: '/servermanage',
                    component: resolve => require(['../components/page/servermanage/Index.vue'], resolve),
                    meta: {
                        title: '客服管理'
                    },
                    children: [{
                            path: '/',
                            component: resolve => require(['../components/page/servermanage/ServiceStatistics.vue'], resolve),
                            meta: {
                                title: '客服统计',
                                permission: true
                            }
                        },
                        {
                            path: 'addserver',
                            component: resolve => require(['../components/page/servermanage/AddServer.vue'], resolve),
                            meta: {
                                title: '添加客服',
                                permission: true
                            }
                        },
                        {
                            path: 'check',
                            component: resolve => require(['../components/page/servermanage/CheckServer.vue'], resolve),
                            meta: {
                                title: '查看记录',
                                permission: true
                            }
                        }
                    ]
                },
                {
                    path: '/datachart',
                    component: resolve => require(['../components/page/DataChart.vue'], resolve),
                    meta: {
                        title: '数据报表',
                        permission: true
                    }
                },
                {
                    path: '/talkbox',
                    component: resolve => require(['../components/common/TalkBox.vue'], resolve),
                    meta: {
                        title: '聊天',
                        permission: true
                    }
                },
                {
                    //展会管理
                    path: '/exhibitionmanage',
                    component: resolve => require(['../components/page/exhibitionmanage/List.vue'], resolve),
                    meta: {
                        title: '展会管理'
                    }
                },
                {
                    path: '/exhibitioninfo/:id',
                    component: resolve => require(['../components/page/exhibitionmanage/Info.vue'], resolve),
                    meta: {
                        title: '展会信息'
                    }
                },
                {
                    path: '/exhibitionchart',
                    component: resolve => require(['../components/page/exhibitionmanage/Chart.vue'], resolve),
                    meta: {
                        title: '展会图表'
                    }
                },
                {
                    //审核管理
                    path: '/checkmanage',
                    component: resolve => require(['../components/page/checkmanage/Index.vue'], resolve),
                    meta: {
                        title: '审核管理'
                    },
                    children: [{
                            path: '/',
                            component: resolve => require(['../components/page/checkmanage/List.vue'], resolve),
                            meta: {
                                title: '审核管理'
                            }
                        },
                        {
                            path: 'bussinessinfo',
                            component: resolve => require(['../components/page/checkmanage/BussinessInfo.vue'], resolve),
                            meta: {
                                title: '商家详情',
                                permission: true
                            }
                        },
                        {
                            path: 'mealinfo',
                            component: resolve => require(['../components/page/checkmanage/MealInfo.vue'], resolve),
                            meta: {
                                title: '套餐详情',
                                permission: true
                            }
                        },
                        {
                            path: 'caseinfo',
                            component: resolve => require(['../components/page/checkmanage/CaseInfo.vue'], resolve),
                            meta: {
                                title: '案例详情',
                                permission: true
                            }
                        },
                        {
                            path: 'exhibitioninfo',
                            component: resolve => require(['../components/page/checkmanage/ExhibitionInfo.vue'], resolve),
                            meta: {
                                title: '展会详情',
                                permission: true
                            }
                        }
                    ]
                },
                {
                    //营销--关怀
                    path: '/care',
                    component: resolve => require(['../components/page/marketcare/index.vue'], resolve),
                    meta: {
                        title: '营销--关怀'
                    },
                    children: [{
                        path: 'app',
                        component: resolve => require(['../components/page/marketcare/app.vue'], resolve),
                        meta: {
                            title: 'app推送',
                            permission: true
                        }
                    }, {
                        path: 'sms',
                        component: resolve => require(['../components/page/marketcare/sms.vue'], resolve),
                        meta: {
                            title: '短信',
                            permission: true
                        }
                    }, {
                        path: 'mail',
                        component: resolve => require(['../components/page/marketcare/mail.vue'], resolve),
                        meta: {
                            title: '站内信',
                            permission: true
                        }
                    }, {
                        path: 'chat',
                        component: resolve => require(['../components/page/marketcare/chat.vue'], resolve),
                        meta: {
                            title: '站内信',
                            permission: true
                        }
                    }, {
                        path: 'trigger',
                        component: resolve => require(['../components/page/marketcare/trigger.vue'], resolve),
                        meta: {
                            title: '站内信',
                            permission: true
                        }
                    }]
                },
                {
                    path: '/care/templateApp',
                    component: resolve => require(['../components/page/marketcare/tmpApp.vue'], resolve),
                    meta: {
                        title: '添加APP推送模板',
                        permission: true
                    }
                }, {
                    path: '/care/templateInfo',
                    component: resolve => require(['../components/page/marketcare/tmpInfo.vue'], resolve),
                    meta: {
                        title: '添加站内信模板',
                        permission: true
                    }
                }, {
                    path: '/care/templateMsg',
                    component: resolve => require(['../components/page/marketcare/tmpMsg.vue'], resolve),
                    meta: {
                        title: '添加短信模板',
                        permission: true
                    }
                }, {
                    path: '/care/templateWeChat',
                    component: resolve => require(['../components/page/marketcare/tmpWeChat.vue'], resolve),
                    meta: {
                        title: '添加微信模板',
                        permission: true
                    }
                }, {
                    path: '/care/relation',
                    component: resolve => require(['../components/page/marketcare/relation.vue'], resolve),
                    meta: {
                        title: '创建关联',
                        permission: true
                    }
                },
                {
                    path: '/userinfo',
                    component: resolve => require(['@/components/page/usercenter/Info.vue'], resolve),
                    meta: {
                        title: '基本信息',
                        permission: true
                    },
                    children: [{
                            path: 'sinfo/:id',
                            component: resolve => require(['@/components/page/usercenter/sInfo.vue'], resolve),
                            meta: {
                                title: '基本信息',
                                permission: true
                            }
                        },
                        {
                            path: 'collect/:id',
                            component: resolve => require(['@/components/page/usercenter/Collect.vue'], resolve),
                            meta: {
                                title: '收藏/关注/对比',
                                permission: true
                            }
                        },
                        {
                            path: 'coupon/:id',
                            component: resolve => require(['@/components/page/usercenter/Coupon.vue'], resolve),
                            meta: {
                                title: '婚基金',
                                permission: true
                            }
                        },
                        {
                            path: 'discount/:id',
                            component: resolve => require(['@/components/page/usercenter/Discount.vue'], resolve),
                            meta: {
                                title: '优惠券',
                                permission: true
                            }
                        },
                        {
                            path: 'exhibition/:id',
                            component: resolve => require(['@/components/page/usercenter/Exhibition.vue'], resolve),
                            meta: {
                                title: '展会信息',
                                permission: true
                            }
                        },
                        {
                            path: 'orderlist/:id',
                            component: resolve => require(['@/components/page/usercenter/OrderList.vue'], resolve),
                            meta: {
                                title: '订单信息',
                                permission: true
                            }
                        }
                    ]
                },
                {
                    path: '/orderInfo',
                    component: resolve => require(['@/components/page/usercenter/OrderInfo.vue'], resolve),
                    meta: {
                        title: '订单详情',
                        permission: true
                    }
                },
                {
                    path: '/exhibitiondetail/:id',
                    component: resolve => require(['@/components/page/usercenter/ExhibitionDetail.vue'], resolve),
                    meta: {
                        title: '展会详情',
                        permission: true
                    }
                },
                // {
                //     path: '/userlist/collect',
                //     component: resolve => require(['@/components/page/usercenter/Collect.vue'], resolve),
                //     meta: { title: '收藏/关注/对比', permission: true }
                // },{
                //     path: '/userlist/coupon',
                //     component: resolve => require(['@/components/page/usercenter/Coupon.vue'], resolve),
                //     meta: { title: '婚基金', permission: true }
                // },{
                //     path: '/userlist/discount',
                //     component: resolve => require(['@/components/page/usercenter/Discount.vue'], resolve),
                //     meta: { title: '优惠券', permission: true }
                // },{
                //     path: '/userlist/exhibition',
                //     component: resolve => require(['@/components/page/usercenter/Exhibition.vue'], resolve),
                //     meta: { title: '展会信息', permission: true }
                // },{
                //     path: '/userlist/orderInfo',
                //     component: resolve => require(['@/components/page/usercenter/OrderInfo.vue'], resolve),
                //     meta: { title: '订单信息', permission: true }
                // },
                {
                    //用户管理
                    path: '/userlist',
                    component: resolve => require(['@/components/page/userlist.vue'], resolve),
                    meta: {
                        title: '用户管理用户详情'
                    }
                },
                {
                    //营销--优惠券--添加模板
                    path: '/addcoupon',
                    component: resolve => require(['../components/page/addcoupon.vue'], resolve),
                    meta: {
                        title: '营销--优惠券'
                    }
                },
                {
                    //广告管理
                    path: '/ad/admin',
                    component: resolve => require(['../components/page/ad/admin.vue'], resolve),
                    meta: {
                        title: '广告管理'
                    }
                },
                {
                    //添加广告位
                    path: '/ad/add',
                    component: resolve => require(['../components/page/ad/add.vue'], resolve),
                    meta: {
                        title: '添加广告位'
                    }
                },
                {
                    //添加广告位
                    path: '/ad/template',
                    component: resolve => require(['../components/page/ad/template.vue'], resolve),
                    meta: {
                        title: '添加模版'
                    }
                },
                {
                    //一站搞定
                    path: '/ad/all',
                    component: resolve => require(['../components/page/ad/all.vue'], resolve),
                    meta: {
                        title: '一站搞定'
                    }
                },
                {
                    //广告位类型
                    path: '/ad/type/:id',
                    component: resolve => require(['../components/page/ad/type.vue'], resolve),
                    meta: {
                        title: '广告位类型'
                    }
                },
                {
                    //查看排期
                    path: '/ad/schedule',
                    component: resolve => require(['../components/page/ad/schedule.vue'], resolve),
                    meta: {
                        title: '查看排期'
                    }
                },
                {
                    //营销--优惠券
                    path: '/marketcoupon',
                    component: resolve => require(['../components/page/marketCoupon.vue'], resolve),
                    meta: {
                        title: '营销--优惠券'
                    }
                },
                {
                    //营销--实物券
                    path: '/physicalcoupon',
                    component: resolve => require(['../components/page/physicalcoupon.vue'], resolve),
                    meta: {
                        title: '营销--实物券'
                    }
                },
                {
                    //营销--实物券
                    path: '/addphysicalcoupon',
                    component: resolve => require(['../components/page/addphysicalcoupon.vue'], resolve),
                    meta: {
                        title: '营销--实物券'
                    }
                },
                {
                    //营销--平台活动
                    path: '/event',
                    component: resolve => require(['../components/page/event.vue'], resolve),
                    meta: {
                        title: '营销--活动'
                    }
                },
                {
                    //营销--平台活动
                    path: '/createEvent',
                    component: resolve => require(['../components/page/createEvent.vue'], resolve),
                    meta: {
                        title: '营销--活动'
                    }
                },
                {
                    //营销--游戏
                    path: '/marketgame',
                    component: resolve => require(['../components/page/marketGame.vue'], resolve),
                    meta: {
                        title: '营销--游戏'
                    }
                },
                {
                    //营销--游戏
                    name: 'business',
                    path: '/gameBusiness',
                    component: resolve => require(['../components/page/gameBusiness.vue'], resolve),
                    meta: {
                        title: '营销--游戏'
                    }
                },
                {
                    //营销--游戏
                    name: 'zigongsi',
                    path: '/gameZigongsi',
                    component: resolve => require(['../components/page/gameBusiness.vue'], resolve),
                    meta: {
                        title: '营销--游戏'
                    }
                },
                {
                    //营销--游戏
                    path: '/addgame',
                    component: resolve => require(['../components/page/addGame.vue'], resolve),
                    meta: {
                        title: '营销--游戏'
                    }
                },
                {
                    //营销--游戏--查看商家
                    path: '/check',
                    component: resolve => require(['../components/page/marketGameCheck.vue'], resolve),
                    meta: {
                        title: '营销--游戏--查看商家'
                    }
                },
                {
                    //营销--内容
                    path: '/content',
                    component: resolve => require(['../components/page/content.vue'], resolve),
                    meta: {
                        title: '营销--内容'
                    }
                },
                {
                    //营销--内容
                    path: '/addcontent',
                    component: resolve => require(['../components/page/addcontent.vue'], resolve),
                    meta: {
                        title: '营销--内容'
                    }
                },
                {
                    //消息管理--短息
                    path: '/message/sms',
                    component: resolve => require(['../components/page/message/sms.vue'], resolve),
                    meta: {
                        title: '营销--游戏--查看商家'
                    }
                },
                {
                    //设置--成员管理
                    path: '/set/member',
                    component: resolve => require(['../components/page/set/member.vue'], resolve),
                    meta: {
                        title: '设置--成员管理'
                    }
                },
                {
                    //设置--添加成员
                    path: '/set/addmember',
                    component: resolve => require(['../components/page/set/addMember.vue'], resolve),
                    meta: {
                        title: '设置--添加成员'
                    }
                },
                {
                    //设置--角色管理
                    path: '/set/role',
                    component: resolve => require(['../components/page/set/role.vue'], resolve),
                    meta: {
                        title: '设置--角色管理'
                    }
                },
                {
                    //设置--添加角色
                    path: '/set/addrole',
                    component: resolve => require(['../components/page/set/addrole.vue'], resolve),
                    meta: {
                        title: '设置--添加角色'
                    }
                },
                {
                    //设置--日志管理
                    path: '/set/log',
                    component: resolve => require(['../components/page/set/log.vue'], resolve),
                    meta: {
                        title: '设置--日志管理'
                    }
                },
                {
                    //设置--账号管理
                    path: '/set/account',
                    component: resolve => require(['../components/page/set/account.vue'], resolve),
                    meta: {
                        title: '设置--账号管理'
                    }
                },
                {
                    //设置--风格设置
                    path: '/style',
                    component: resolve => require(['../components/page/style.vue'], resolve),
                    meta: {
                        title: '设置--风格设置'
                    }
                },
                {
                    //分公司管理
                    path: '/branchManagement',
                    component: resolve => require(['../components/page/branchManagement.vue'], resolve),
                    meta: {
                        title: '分公司管理'
                    }
                },
                {
                    //分公司管理
                    path: '/addBranch',
                    component: resolve => require(['../components/page/addBranch.vue'], resolve),
                    meta: {
                        title: '分公司管理'
                    }
                },
                {
                    //设置--弹窗设置
                    path: '/set/alert',
                    component: resolve => require(['../components/page/set/alert.vue'], resolve),
                    meta: {
                        title: '设置--弹窗设置'
                    }
                },
                {
                    //监控中心--抽免单
                    path: '/monitor/exemption',
                    component: resolve => require(['../components/page/monitor/exemption.vue'], resolve),
                    meta: {
                        title: '监控中心--抽免单'
                    }
                },
                {
                    //监控中心--订单管理
                    path: '/monitor/order',
                    component: resolve => require(['../components/page/monitor/order.vue'], resolve),
                    meta: {
                        title: '监控中心--订单管理'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})