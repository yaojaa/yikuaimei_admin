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
                // 商品管理
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
                        title: '添加商品'
                    }
                },
                {
                    path: '/createPhase',
                    component: resolve => require(['../view/goods/createPhase.vue'], resolve),
                    meta: {
                        title: '添加商品'
                    }
                },
                {
                    path: '/serviceList',
                    component: resolve => require(['../view/goods/serviceList.vue'], resolve),
                    meta: {
                        title: '平台服务'
                    }
                },
                {
                    path: '/purchaseList',
                    component: resolve => require(['../view/goods/purchaseList.vue'], resolve),
                    meta: {
                        title: '品相管理'
                    }
                },
                {
                    path: '/fictitiousList',
                    component: resolve => require(['../view/goods/fictitiousList.vue'], resolve),
                    meta: {
                        title: '虚拟卡券管理'
                    }
                },
                {
                    path: '/shareAd',
                    component: resolve => require(['../view/goods/shareAd.vue'], resolve),
                    meta: {
                        title: '分享海报'
                    }
                },
                {
                    path: '/goodPreview',
                    component: resolve => require(['../view/goods/goodPreview.vue'], resolve),
                    meta: {
                        title: '商品预览'
                    }
                },
                // {
                //     // 分类管理
                //     path: '/categorylist',
                //     component: resolve => require(['../view/goods/categorylist.vue'], resolve),
                //     meta: {
                //         title: '分类管理'
                //     }
                // },
                // {
                //     // 添加分类
                //     path: '/createCategory',
                //     component: resolve => require(['../view/goods/createCategory.vue'], resolve),
                //     meta: {
                //         title: '添加分类'
                //     }
                // },
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
                    // 订单管理--门店订单详情
                    path: '/order/order_service_detail/:order_code',
                    component: resolve => require(['../view/order/serviceDetail.vue'], resolve),
                    meta: {
                        title: '门店详情',
                        permission: true
                    }
                },
                {
                    // 订单管理--品项报货信息
                    path: '/order/order_purchase_detail/:purchase_id',
                    component: resolve => require(['../view/order/purchaseDetail.vue'], resolve),
                    meta: {
                        title: '报货信息',
                        permission: true
                    }
                },
                {
                    // 订单管理--发货
                    path: '/order/send_goods/:order_code',
                    component: resolve => require(['../view/order/send_goods.vue'], resolve),
                    meta: {
                        title: '发货',
                        permission: true
                    }
                },
                {
                    // 订单管理-门店服务
                    path: '/order/serviceOrderList',
                    component: resolve => require(['../view/order/serviceOrderList.vue'], resolve),
                    meta: {
                        title: '平台服务',
                        permission: true
                    }
                },
                {
                    // 订单管理-采购品项
                    path: '/order/purchaseOrderList',
                    component: resolve => require(['../view/order/purchaseOrderList.vue'], resolve),
                    meta: {
                        title: '采购品项',
                        permission: true
                    }
                },
                {
                    // 订单管理-评价管理
                    path: '/order/commentList',
                    component: resolve => require(['../view/order/commentList.vue'], resolve),
                    meta: {
                        title: '评价管理',
                        permission: true
                    }
                },
                {
                    // 订单管理-退款初审
                    path: '/order/refundAuditList',
                    component: resolve => require(['../view/order/refundAuditList.vue'], resolve),
                    meta: {
                        title: '退款初审',
                        permission: true
                    }
                },
                {
                    // 订单管理-退款详情
                    path: '/order/refundDetail/:refund_id',
                    component: resolve => require(['../view/order/refundDetail.vue'], resolve),
                    meta: {
                        title: '退款详情',
                        permission: true
                    }
                },

                // 网站管理
                {
                    // 案例页面
                    path: '/manage/case',
                    component: resolve => require(['../view/case/caseList.vue'], resolve),
                    meta: {
                        title: '案例列表',
                        permission: true
                    }
                },
                {
                    // 案例添加
                    path: '/manage/case/add',
                    component: resolve => require(['../view/case/case_add.vue'], resolve),
                    meta: {
                        title: '添加案例',
                        permission: true
                    }
                },
                {
                    // 案例编辑
                    path: '/manage/case/add/:id',
                    component: resolve => require(['../view/case/case_add.vue'], resolve),
                    meta: {
                        title: '编辑案例',
                        permission: true
                    }
                },
                {
                    // 案例详情
                    path: '/manage/case/case_detail/:id',
                    component: resolve => require(['../view/case/case_detail.vue'], resolve),
                    meta: {
                        title: '案例详情',
                        permission: true
                    }
                },
                {
                    // 标签管理
                    path: '/manage/label',
                    component: resolve => require(['../view/label/labelList.vue'], resolve),
                    meta: {
                        title: '标签管理'
                    }
                },
                {
                    // 添加分类
                    path: '/manage/label/add',
                    component: resolve => require(['../view/label/add.vue'], resolve),
                    meta: {
                        title: '添加标签'
                    }
                },
                {
                    // 添加分类
                    path: '/manage/label/groupAdd',
                    component: resolve => require(['../view/label/groupAdd.vue'], resolve),
                    meta: {
                        title: '添加标签组'
                    }
                },
                {
                    // 服务订单
                    path: '/order/list_service',
                    component: resolve => require(['../view/service/list_service.vue'], resolve),
                    meta: {
                        title: '服务订单',
                        permission: true
                    }
                },

                {
                    // 服务订单详情
                    path: '/order/service_detail/:order_code',
                    component: resolve => require(['../view/service/detail.vue'], resolve),
                    meta: {
                        title: '服务订单详情',
                        permission: true
                    }
                },

                {
                    // 品项管理
                    path: '/order/product_phase',
                    component: resolve => require(['../view/product_phase/list.vue'], resolve),
                    meta: {
                        title: '品项管理',
                        permission: true
                    }
                },

                {
                    // 品项管理详情
                    path: '/order/product_phase/:purchase_id',
                    component: resolve => require(['../view/product_phase/detail.vue'], resolve),
                    meta: {
                        title: '品项管理',
                        permission: true
                    }
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
                    path: '/business/alliance',
                    component: resolve => require(['../view/business/alliance.vue'], resolve),
                    meta: {
                        title: '加盟商'
                    }
                },

                {
                    // 加盟商
                    path: '/business/alliance_add',
                    component: resolve => require(['../view/business/alliance_add.vue'], resolve),
                    meta: {
                        title: '添加加盟商'
                    }
                },
                {
                    // 加盟商
                    path: '/business/alliance_add/:business_id',
                    component: resolve => require(['../view/business/alliance_add.vue'], resolve),
                    meta: {
                        title: '编辑加盟商'
                    }
                },
                {
                    // 加盟商
                    path: '/business/alliance_detail/:id',
                    component: resolve => require(['../view/business/alliance_detail.vue'], resolve),
                    meta: {
                        title: '加盟商详情'
                    }
                },
                {
                    // 退款复审
                    path: '/refundReview/list',
                    component: resolve => require(['../view/refund_review/list.vue'], resolve),
                    meta: {
                        title: '退款复审'
                    }
                },
                {
                    // -退款详情
                    path: '/refundReview/refundReviewDetail/:refund_id',
                    component: resolve => require(['../view/refund_review/refundReviewDetail.vue'], resolve),
                    meta: {
                        title: '退款详情',
                        permission: true
                    }
                },
                {
                    // 门店审核
                    path: '/audit/shop',
                    component: resolve => require(['../view/audit_shop/list.vue'], resolve),
                    meta: {
                        title: '门店审核列表'
                    }
                },
                {
                    // 门店审核
                    path: '/audit/shop/:id',
                    component: resolve => require(['../view/audit_shop/detail.vue'], resolve),
                    meta: {
                        title: '门店审核详情'
                    }
                },
                {
                    // 门店提现
                    path: '/storeWithdrawal/list',
                    component: resolve => require(['../view/storeWithdrawal/list.vue'], resolve),
                    meta: {
                        title: '门店提现'
                    }
                },
                {
                    // 门店提现详情
                    path: '/storeWithdrawal/detail/:shop_withdraw_id',
                    component: resolve => require(['../view/storeWithdrawal/detail.vue'], resolve),
                    meta: {
                        title: '门店提现/详情'
                    }
                },
                {
                    // 加盟商审核
                    path: '/audit/business',
                    component: resolve => require(['../view/audit_business/list.vue'], resolve),
                    meta: {
                        title: '加盟商审核列表'
                    }
                },
                {
                    // 加盟商审核
                    path: '/audit/business/detail/:id',
                    component: resolve => require(['../view/audit_business/detail.vue'], resolve),
                    meta: {
                        title: '加盟商审核详情'
                    }
                },

                {
                    // 门店
                    path: '/shop/list',
                    component: resolve => require(['../view/shop/list.vue'], resolve),
                    meta: {
                        title: '门店'
                    }
                },
                {
                    // 编辑门店
                    path: '/shop/add/:id',
                    component: resolve => require(['../view/shop/add.vue'], resolve),
                    meta: {
                        title: '编辑门店'
                    }
                },
                {
                    // 培训列表
                    path: '/training/list',
                    component: resolve => require(['../view/training/list.vue'], resolve),
                    meta: {
                        title: '培训列表'
                    }
                },
                {
                    // 添加培训
                    path: '/training/add',
                    component: resolve => require(['../view/training/add.vue'], resolve),
                    meta: {
                        title: '添加干货培训'
                    }
                },
                {
                    // 编辑培训
                    path: '/training/add/:id',
                    component: resolve => require(['../view/training/add.vue'], resolve),
                    meta: {
                        title: '编辑干货培训'
                    }
                },

                {
                    // 门店
                    path: '/shop/add',
                    component: resolve => require(['../view/shop/add.vue'], resolve),
                    meta: {
                        title: '添加门店'
                    }
                },

                {
                    // 加盟商
                    path: '/shop/detail/:id',
                    component: resolve => require(['../view/shop/detail.vue'], resolve),
                    meta: {
                        title: '门店详情'
                    }
                },

                // 用户管理
                {
                    // 用户列表
                    path: '/user/userList',
                    component: resolve => require(['../view/user/userList.vue'], resolve),
                    meta: {
                        title: '用户管理'
                    }
                },
                {
                    // 档案列表
                    path: '/user/beautifulList',
                    component: resolve => require(['../view/user/beautifulList.vue'], resolve),
                    meta: {
                        title: '美丽档案'
                    }
                },
                {
                    // 档案详情
                    path: '/user/beautifulDetail/:id',
                    component: resolve => require(['../view/user/beautifulDetail.vue'], resolve),
                    meta: {
                        title: '档案详情'
                    }
                },
                {
                    // 用户详情
                    path: '/user/detail/:id',
                    component: resolve => require(['../view/user/userDetail.vue'], resolve),
                    meta: {
                        title: '用户详情'
                    }
                },
                //营销管理
                {
                    // 用户详情
                    path: '/marketing/markList',
                    component: resolve => require(['../view/marketing/markList.vue'], resolve),
                    meta: {
                        title: '营销应用'
                    }
                },

                {
                    // 满减优惠劵列表
                    path: '/marketing/fullReducionCouponList',
                    component: resolve => require(['../view/marketing/fullReducionList.vue'], resolve),
                    meta: {
                        title: '满减／立减优惠券'
                    }
                },
                {
                    // 添加优惠券
                    path: '/marketing/addCoupon',
                    component: resolve => require(['../view/marketing/addCoupon.vue'], resolve),
                    meta: {
                        title: '添加优惠券'
                    }
                },
                {
                    // 优惠券编辑
                    path: '/marketing/addCoupon/:coupon_code',
                    component: resolve => require(['../view/marketing/addCoupon.vue'], resolve),
                    meta: {
                        title: '编辑优惠券',
                        permission: true
                    }
                },
                {
                    // 优惠券详情
                    path: '/marketing/couponInfo/:coupon_code',
                    component: resolve => require(['../view/marketing/couponInfo.vue'], resolve),
                    meta: {
                        title: '优惠券详情',
                        permission: true
                    }
                },
                {
                    // 已用门店
                    path: '/marketing/usedShop/:coupon_code',
                    component: resolve => require(['../view/marketing/usedShop.vue'], resolve),
                    meta: {
                        title: '已用门店',
                        permission: true
                    }
                },

                {
                    // 摇一摇列表
                    path: '/marketing/shake/list',
                    component: resolve => require(['../view/marketing/shake/list.vue'], resolve),
                    meta: {
                        title: '摇一摇',
                        permission: true
                    }
                },
                {
                    // 摇一摇编辑
                    path: '/marketing/shake/shakeAdd/:activity_code',
                    component: resolve => require(['../view/marketing/shake/shakeAdd.vue'], resolve),
                    meta: {
                        title: '摇一摇',
                        permission: true
                    }
                },
                {
                    // 增加摇一摇活动
                    path: '/marketing/shake/shakeAdd',
                    component: resolve => require(['../view/marketing/shake/shakeAdd.vue'], resolve),
                    meta: {
                        title: '摇一摇',
                        permission: true
                    }
                },
                {
                    // 摇一摇详情
                    path: '/marketing/shake/shakeInfo/:activity_code',
                    component: resolve => require(['../view/marketing/shake/shakeInfo.vue'], resolve),
                    meta: {
                        title: '摇一摇详情',
                        permission: true
                    }
                },
                {
                    // 新人红包列表
                    path: '/marketing/newPerson/list',
                    component: resolve => require(['../view/marketing/newPerson/list.vue'], resolve),
                    meta: {
                        title: '新人红包',
                        permission: true
                    }
                },
                {
                    // 新人红包添加
                    path: '/marketing/newPerson/personAdd',
                    component: resolve => require(['../view/marketing/newPerson/personAdd.vue'], resolve),
                    meta: {
                        title: '添加新人红包',
                        permission: true
                    }
                },
                {
                    // 新人红包编辑
                    path: '/marketing/newPerson/personAdd/:activity_code',
                    component: resolve => require(['../view/marketing/newPerson/personAdd.vue'], resolve),
                    meta: {
                        title: '编辑新人红包',
                        permission: true
                    }
                },
                {
                    // 新人红包详情
                    path: '/marketing/newPerson/personInfo/:activity_code',
                    component: resolve => require(['../view/marketing/newPerson/personInfo.vue'], resolve),
                    meta: {
                        title: '新人红包详情',
                        permission: true
                    }
                },
                {
                    // 多人同行列表
                    path: '/marketing/person/list',
                    component: resolve => require(['../view/marketing/person/list.vue'], resolve),
                    meta: {
                        title: '多人同行',
                        permission: true
                    }
                },
                {
                    // 多人同行详情
                    path: '/marketing/person/personInfo/:activity_code',
                    component: resolve => require(['../view/marketing/person/personInfo.vue'], resolve),
                    meta: {
                        title: '多人同行',
                        permission: true
                    }
                },
                {
                    // 多人同行添加
                    path: '/marketing/person/personAdd',
                    component: resolve => require(['../view/marketing/person/personAdd.vue'], resolve),
                    meta: {
                        title: '添加多人同行',
                        permission: true
                    }
                },
                {
                    // 多人同行编辑
                    path: '/marketing/person/personAdd/:activity_code',
                    component: resolve => require(['../view/marketing/person/personAdd.vue'], resolve),
                    meta: {
                        title: '编辑多人同行',
                        permission: true
                    }
                },
                {
                    // 多人同行已用门店
                    path: '/marketing/person/usedShop/:activity_code',
                    component: resolve => require(['../view/marketing/person/usedShop.vue'], resolve),
                    meta: {
                        title: '已用门店',
                        permission: true
                    }
                },
                {
                    // 邀请好友列表
                    path: '/marketing/invite/list',
                    component: resolve => require(['../view/marketing/invite/list.vue'], resolve),
                    meta: {
                        title: '邀请好友列表',
                        permission: true
                    }
                },
                {
                    // 邀请好友添加
                    path: '/marketing/invite/inviteAdd',
                    component: resolve => require(['../view/marketing/invite/inviteAdd.vue'], resolve),
                    meta: {
                        title: '邀请好友添加',
                        permission: true
                    }
                },

                {
                    // 邀请好友编辑
                    path: '/marketing/invite/inviteAdd/:activity_code',
                    component: resolve => require(['../view/marketing/invite/inviteAdd.vue'], resolve),
                    meta: {
                        title: '编辑邀请好友',
                        permission: true
                    }
                },
                {
                    // 满赠活动列表
                    path: '/marketing/full/list',
                    component: resolve => require(['../view/marketing/full/list.vue'], resolve),
                    meta: {
                        title: '满赠活动',
                        permission: true
                    }
                },
                {
                    // 满赠活动添加
                    path: '/marketing/full/fullAdd',
                    component: resolve => require(['../view/marketing/full/fullAdd.vue'], resolve),
                    meta: {
                        title: '满赠活动/添加',
                        permission: true
                    }
                },
                {
                    // 满赠活动编辑
                    path: '/marketing/full/fullAdd/:activity_code',
                    component: resolve => require(['../view/marketing/full/fullAdd.vue'], resolve),
                    meta: {
                        title: '编辑满赠活动',
                        permission: true
                    }
                },
                {
                    // 满赠活动详情
                    path: '/marketing/full/fuInfo/:activity_code',
                    component: resolve => require(['../view/marketing/full/fuInfo.vue'], resolve),
                    meta: {
                        title: '满赠活动/详情',
                        permission: true
                    }
                },
                
                {
                    // 邀请好友详情
                    path: '/marketing/invite/inviteInfo/:activity_code',
                    component: resolve => require(['../view/marketing/invite/inviteInfo.vue'], resolve),
                    meta: {
                        title: '邀请好友详情',
                        permission: true
                    }
                },
                {
                    // 帮砍
                    path: '/marketing/helpCut/list',
                    component: resolve => require(['../view/marketing/helpCut/list.vue'], resolve),
                    meta: {
                        title: '帮砍',
                        permission: true
                    }
                },
                {
                    // 帮砍添加
                    path: '/marketing/helpCut/helpCutAdd',
                    component: resolve => require(['../view/marketing/helpCut/helpCutAdd.vue'], resolve),
                    meta: {
                        title: '帮砍/添加',
                        permission: true
                    }
                },
                {
                    // 帮砍编辑
                    path: '/marketing/helpCut/helpCutAdd/:activity_code',
                    component: resolve => require(['../view/marketing/helpCut/helpCutAdd.vue'], resolve),
                    meta: {
                        title: '帮砍/添加',
                        permission: true
                    }
                },
                {
                    // 帮砍详情
                    path: '/marketing/helpCut/helpCutInfo/:activity_code',
                    component: resolve => require(['../view/marketing/helpCut/helpCutInfo.vue'], resolve),
                    meta: {
                        title: '帮砍/详情',
                        permission: true
                    }
                },
                

                {
                    // 你变美我买单
                    path: '/marketing/pay_bill/list',
                    component: resolve => require(['../view/marketing/pay_bill/list.vue'], resolve),
                    meta: {
                        title: '你变美我买单',
                        permission: true
                    }
                },

                {
                    // 你变美我买单 add
                    path: '/marketing/pay_bill/add',
                    component: resolve => require(['../view/marketing/pay_bill/add.vue'], resolve),
                    meta: {
                        title: '你变美我买单',
                        permission: true
                    }
                },
                {
                    // 你变美我买单 edit
                    path: '/marketing/pay_bill/add/:activity_code',
                    component: resolve => require(['../view/marketing/pay_bill/add.vue'], resolve),
                    meta: {
                        title: '你变美我买单',
                        permission: true
                    }
                },
                {
                    // 你变美我买单 info
                    path: '/marketing/pay_bill/Info/:activity_code',
                    component: resolve => require(['../view/marketing/pay_bill/Info.vue'], resolve),
                    meta: {
                        title: '你变美我买单',
                        permission: true
                    }
                },
                  {
                    // 你变美我买单 参与用户
                    path: '/marketing/pay_bill/users/:activity_code',
                    component: resolve => require(['../view/marketing/pay_bill/users.vue'], resolve),
                    meta: {
                        title: '参与用户',
                        permission: true
                    }
                },

                          {
                    // 你变美我买单 中奖名单
                    path: '/marketing/pay_bill/name_list/:activity_code',
                    component: resolve => require(['../view/marketing/pay_bill/name_list.vue'], resolve),
                    meta: {
                        title: '中奖名单',
                        permission: true
                    }
                },

                {
                    // 你变美我买单 中奖名单
                    path: '/marketing/pay_bill/user_detail/:activity_code/:user_id',
                    component: resolve => require(['../view/marketing/pay_bill/user_detail.vue'], resolve),
                    meta: {
                        title: '用户详情',
                        permission: true
                    }
                },

                {
                    // 平台验票
                    path: '/marketing/checkList',
                    component: resolve => require(['../view/marketing/checkList.vue'], resolve),
                    meta: {
                        title: '验票列表',
                        permission: true
                    }
                },

                //  平台管理
                {
                    path: '/admin/staffList',
                    component: resolve => require(['../view/admin/staffList.vue'], resolve),
                    meta: {
                        title: '成员管理'
                    }
                }, {
                    path: '/admin/roleList',
                    component: resolve => require(['../view/admin/roleList.vue'], resolve),
                    meta: {
                        title: '角色管理'
                    }
                }, {
                    path: '/admin/addRole/:id',
                    component: resolve => require(['../view/admin/addAndModifiyRole.vue'], resolve),
                    meta: {
                        title: '添加角色'
                    }
                }, {
                    path: '/admin/addStaff/',
                    component: resolve => require(['../view/admin/createAndModifiyStaff.vue'], resolve),
                    meta: {
                        title: '添加成员'
                    }
                },
                {
                    path: '/admin/addStaff/:id',
                    component: resolve => require(['../view/admin/createAndModifiyStaff.vue'], resolve),
                    meta: {
                        title: '编辑成员'
                    }
                },
                {
                    path: '/admin/news/list',
                    component: resolve => require(['../view/admin/news/list.vue'], resolve),
                    meta: {
                        title: '消息推送'
                    }
                },
                {
                    path: '/admin/news/newsAdd',
                    component: resolve => require(['../view/admin/news/newsAdd.vue'], resolve),
                    meta: {
                        title: '消息推送／添加'
                    }
                },
                {
                    path: '/admin/news/newsAdd/:id',
                    component: resolve => require(['../view/admin/news/newsAdd.vue'], resolve),
                    meta: {
                        title: '消息推送／添加'
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