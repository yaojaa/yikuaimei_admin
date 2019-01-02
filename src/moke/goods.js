let Goods = {}
/** *
 * 商品/服务/采购品项 列表  
GET http://dev.countinsight.com/api/admin/shopgoods/index 
is_page	string	Yes	是否分页 1分页 2获取全部
Example: 1
page	string	Yes	页码
Example: 1
page_size	string	Yes	每页数据条数
Example: 20
good_type	string		商品类型：1服务 2商品 3采购品项 4虚拟商品
Example: 1
id	string		商品的good_id字段
Example: 38
good_name	string		商品/服务/采购 名字
Example: 面膜
is_use	string		是否上架 1下架 2上架
Example: 2
category_id	string		行业id
Example: 2
tag_id	string		标签id
Example: 2
返回实例
200:
 */
Goods.shopgoods = {
    "code": 0,
    "msg": "OK",
    "data": [{
            "good_category_id": 7,
            "good_category_name": "美甲",
            "good_category_ico": "\/o.jpg",
            "good_category_pid": 0,
            "good_category_deep": 1,
            "good_category_path": "",
            "good_category_status": 1,
            "good_category_ctime": "2018-11-27 14:49:03",
            "good_category_utime": null,
            "good_category_sons": //一级分类名下的所有二级分类列表
                [{
                        "good_category_id": 11,
                        "good_category_name": "美小指甲",
                        "good_category_ico": "\/1.jpg",
                        "good_category_pid": 7,
                        "good_category_deep": 2,
                        "good_category_path": "7",
                        "good_category_status": 1,
                        "good_category_ctime": "2018-11-27 14:51:48",
                        "good_category_utime": null
                    },
                    {
                        "good_category_id": 12,
                        "good_category_name": "美中指甲",
                        "good_category_ico": "\/2.jpg",
                        "good_category_pid": 7,
                        "good_category_deep": 2,
                        "good_category_path": "7",
                        "good_category_status": 1,
                        "good_category_ctime": "2018-11-27 14:51:58",
                        "good_category_utime": null
                    },
                    {
                        "good_category_id": 13,
                        "good_category_name": "美大拇指甲",
                        "good_category_ico": "\/3.jpg",
                        "good_category_pid": 7,
                        "good_category_deep": 2,
                        "good_category_path": "7",
                        "good_category_status": 1,
                        "good_category_ctime": "2018-11-27 14:52:13",
                        "good_category_utime": null
                    }
                ]
        },
        {
            "good_category_id": 9,
            "good_category_name": "美肤",
            "good_category_ico": "\/b.jpg",
            "good_category_pid": 0,
            "good_category_deep": 1,
            "good_category_path": "",
            "good_category_status": 1,
            "good_category_ctime": "2018-11-27 14:50:48",
            "good_category_utime": null,
            "good_category_sons": //一级分类名下的可选择二级分类列表
                [{
                    "good_category_id": 20,
                    "good_category_name": "美脸部皮肤",
                    "good_category_ico": "\/10.jpg",
                    "good_category_pid": 9,
                    "good_category_deep": 2,
                    "good_category_path": "9",
                    "good_category_status": 1,
                    "good_category_ctime": "2018-11-27 14:54:29",
                    "good_category_utime": "2018-11-27 14:58:54"
                }]
        }
    ]
}
/** *
 * 添加
 * post http://dev.countinsight.com/api/admin/shopgoods/create
 */
Goods.createRes = {
    "good_type": 1, //商品类型：1服务 2实物 3采购品项 4虚拟商品
    "good_name": "商品名字1", //商品名字
    "good_explain": "商品说明1", //商品卖点
    "category_id": 1, //行业id
    "tag_id_arr": [8, 18, 32], //标签id数组
    "good_video": "/vide.mv", //商品视频
    "good_video_pic": "/v/pic.mv", //商品视频封面图
    "good_img_arr": ["/a1.jpg", "/a2.jpg", "/a3.jpg"], //商品图片数组
    "good_ico": "ico.jpg", //商品展示图
    "unit": "20盒2000克箱装", //单位 例如盒，箱
    "show_img_arr": ["/b1.jpg", "/b2.jpg", "/b3.jpg"], //商品详情页介绍展示图片数组
    "good_notes": "补充说明", //补充说明
    "sku_type_arr": ["颜色", "尺寸", "材质"], //规格数组，单规格商品不要提交该字段
    "good_sku": [ //规格sku数组，单规格商品也要按该数组格式提交
        {
            "sku_type_arr": ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
            "sku_code": "23344545654654621", //商品编码 不提交该字段，则认定本条规格信息不存在
            "price_cost": 2321, //成本
            "price": 2888, //原价(只用于展示商品原价信息)
            "price_sale": 2666, //售价(商品实际需要支付价值，线下补交时要用到)
            "price_plate": 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
            "ico_small": "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
            "sku_type_arr": ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
            "sku_code": "23344545654654621", //商品编码
            "price_cost": 2321, //成本
            "price": 2888, //原价(只用于展示商品原价信息)
            "price_sale": 2666, //售价(商品实际需要支付价值，线下补交时要用到)
            "price_plate": 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
            "ico_small": "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
            "sku_type_arr": ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
            "sku_code": "23344545654654621", //商品编码
            "price_cost": 2321, //成本
            "price": 2888, //原价(只用于展示商品原价信息)
            "price_sale": 2666, //售价(商品实际需要支付价值，线下补交时要用到)
            "price_plate": 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
            "ico_small": "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
            "sku_type_arr": ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
            "sku_code": "23344545654654621", //商品编码
            "price_cost": 2321, //成本
            "price": 2888, //原价(只用于展示商品原价信息)
            "price_sale": 2666, //售价(商品实际需要支付价值，线下补交时要用到)
            "price_plate": 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
            "ico_small": "/small.jpg" //规格图标，单规格商品不要提交该字段
        }
    ],
    "good_friends": [ //服务添加耗材列表 不是服务不需要提交
        {
            "good_id": 1, //耗材id
            "sku_id": [1, 2, 3] //耗材sku_id列表
        },
        {
            "good_id": 2, //耗材id
            "sku_id": [6, 7, 8] //耗材sku_id列表
        }
    ]
}

Goods.req = {
    "code": 0,
    "msg": "OK",
    "data": "55"
}

/** *
 * 修改  http://dev.countinsight.com/api/admin/shopgoods/modify
 */
Goods.modifyReq = {
    "id": 38, //商品的good_id字段
    "good_type": 1, //商品类型：1服务 2实物 3采购品项 4虚拟商品
    "good_name": "商品名字1", //商品名字
    "good_explain": "商品说明1", //商品卖点
    "category_id": 1, //行业id
    "tag_id_arr": [8, 18, 32], //标签id数组
    "good_video": "/vide.mv", //商品视频
    "good_video_pic": "/v/pic.mv", //商品视频封面图
    "good_img_arr": ["/a1.jpg", "/a2.jpg", "/a3.jpg"], //商品图片数组
    "good_ico": "ico.jpg", //商品展示图
    "unit": "20盒2000克箱装", //单位 例如盒，箱
    "show_img_arr": ["/b1.jpg", "/b2.jpg", "/b3.jpg"], //商品详情页介绍展示图片数组
    "good_notes": "补充说明", //补充说明
    "sku_type_arr": ["颜色", "尺寸", "材质"], //规格数组，单规格商品不要提交该字段
    "good_sku": [ //规格sku数组，单规格商品也要按该数组格式提交
        {
            "sku_type_arr": ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
            "sku_code": "23344545654654621", //商品编码
            "price_cost": 2321, //成本
            "price": 2888, //原价(只用于展示商品原价信息)
            "price_sale": 2666, //售价(商品实际需要支付价值，线下补交时要用到)
            "price_plate": 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
            "ico_small": "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
            "sku_type_arr": ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
            "sku_code": "23344545654654621", //商品编码
            "price_cost": 2321, //成本
            "price": 2888, //原价(只用于展示商品原价信息)
            "price_sale": 2666, //售价(商品实际需要支付价值，线下补交时要用到)
            "price_plate": 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
            "ico_small": "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
            "sku_type_arr": ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
            "sku_code": "23344545654654621", //商品编码
            "price_cost": 2321, //成本
            "price": 2888, //原价(只用于展示商品原价信息)
            "price_sale": 2666, //售价(商品实际需要支付价值，线下补交时要用到)
            "price_plate": 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
            "ico_small": "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
            "sku_type_arr": ["黑色1", "12寸", "棉麻1"], //规格值数组，单规格商品不要提交该字段
            "sku_code": "23344545654654621", //商品编码
            "price_cost": 2321, //成本
            "price": 2888, //原价(只用于展示商品原价信息)
            "price_sale": 2666, //售价(商品实际需要支付价值，线下补交时要用到)
            "price_plate": 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
            "ico_small": "/small.jpg" //规格图标，单规格商品不要提交该字段
        }
    ],
    "good_friends": [ //服务添加耗材列表 不是服务不需要提交
        {
            "good_id": 1, //耗材id
            "sku_id": [1, 2, 3] //耗材sku_id列表
        },
        {
            "good_id": 2, //耗材id
            "sku_id": [6, 7, 8] //耗材sku_id列表
        }
    ]
}
Goods.reqmodify = {
    "code": 0,
    "msg": "OK",
    "data": "55"
}
/** *
 * 删除
 * 
POST http://dev.countinsight.com/api/admin/shopgoods/remove 
id	string	Yes	商品的good_id字段
Example: 7
编码	错误信息
300001	请提供正确的商品ID
300007	删除失败
 */

Goods.deleted = {
    "code": 0,
    "msg": "OK",
    "data": "删除成功"
}

/** *
 * 标签组列表 
GET http://dev.countinsight.com/api/admin/tag/groupList
is_page	string	Yes	是否分页 1分页 0获取所有
Example: 1
page	string		页码
Example: 1
page_size	string		每页数据条数
Example: 20
tag_group_id	string		标签组id
Example: 5
tag_group_name	string		标签组名字
Example: 美甲
tag_group_fid	string		上级标签组id
Example: 7
tag_group_fname	string		上级标签组名字
Example: 7
tag_group_deep	string		层级深度 1:一级标签组 2:二级标签组
Example: 1
category_id	string		行业id
Example: 1
tag_group_type	string		标签组类型：1商品 2服务 3虚拟券 4评价 5用户
Example: 1
create_time_start	string		开始时间
Example: 2018-12-11 14:41:49
create_time_end	string		结束时间
Example: 2018-12-11 14:41:49
 */
Goods.lableList = {
    "code": 0,
    "msg": "OK",
    "data": [{
        "tag_group_id": 14, //标签组id
        "category_id": 0, //行业id
        "tag_group_type": 1, //标签组类型 //标签组类型：1商品 2服务 3虚拟券 4评价 5用户
        "tag_group_name": "特护", //标签组名字
        "tag_group_remark": "", //备注
        "tag_group_ico": "\/16.jpg",
        "tag_group_fid": 12, //标签组父级id
        "tag_group_deep": 2, //层级深度 1:一级标签组 2:二级标签组
        "tag_group_path": "12", //层级路径
        "tag_group_create_id": 1, //添加人id
        "tag_group_create_name": "123", //添加人
        "tag_group_status": 1, //0:删除,1:正常
        "tag_group_ctime": "2018-11-28 14:33:34", //创建时间
        "tag_group_utime": "2018-11-29 10:36:42", //修改时间
        "category_name": "美肤", //行业名字
        "tag_group_fname": "功效" //父级标签组名字
    }, ],
    "pagination": {
        "total": 3,
        "page_size": 20,
        "current_page": 1,
        "current_offset": 0,
        "first_page": 1,
        "last_page": 1,
        "prev_page": 1,
        "next_page": 1,
        "from": 0,
        "to": 20
    }
}
export default Goods