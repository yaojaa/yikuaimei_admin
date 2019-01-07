let info = {}
/** *
 * 平台管理 http: //dev.countinsight.com/api/admin/goodcategory/getCategory 商品分类列表
 * is_page	string	Yes	是否分页 1分页 0获取所有
 * page	string		页码
 * page_size	string		每页数据条数
 * Example: 20
 * good_category_name	string		分类名字
 * Example: 美甲
 * good_category_pid	string		上级分类id
 * good_category_deep	string		层级深度 1:一级商品分类 2:二级商品分类

 */
info.shopgoods = {
    "code": 0,
    "msg": "OK",
    "data": [{
        "good_category_id": 20, // 商品分类id
        "good_category_name": "美脸部皮肤", //商品分类名字
        "good_category_ico": "\/10.jpg", //商品分类图标
        "good_category_pid": 9, //父级分类id
        "good_category_deep": 2, //层级深度 1:一级行业分类 2:二级行业分类
        "good_category_path": "9", //层级路径
        "good_category_status": 1, //0:删除,1:正常
        "good_category_ctime": "2018-11-27 14:54:29", //创建时间
        "good_category_utime": "2018-11-27 14:58:54" //修改时间
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

/** *
 * 商品分类 列表  
GET http://dev.countinsight.com/api/admin/goodcategory/index
is_page	string	Yes	是否分页 1分页 0获取所有
Example: 1
page	string		页码
Example: 1
page_size	string		每页数据条数
Example: 20
good_category_name	string		分类名字
Example: 美甲
good_category_pid	string		上级分类id
Example: 7
good_category_deep	层级深度 1:一级商品分类 2:二级商品分类
 */
info.goodcategory = {
    "code": 0,
    "msg": "OK",
    "data": [{
        "good_category_id": 20, // 商品分类id
        "good_category_name": "美脸部皮肤", //商品分类名字
        "good_category_ico": "\/10.jpg", //商品分类图标
        "good_category_pid": 9, //父级分类id
        "good_category_deep": 2, //层级深度 1:一级行业分类 2:二级行业分类
        "good_category_path": "9", //层级路径
        "good_category_status": 1, //0:删除,1:正常
        "good_category_ctime": "2018-11-27 14:54:29", //创建时间
        "good_category_utime": "2018-11-27 14:58:54" //修改时间
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
/** *
 * 添加 商品分类  
 * 
POST http://dev.countinsight.com/api/admin/goodcategory/create 
300001	分类名称不能为空
300002	上级分类id不存在
310005	添加失败

good_category_name	string	Yes	商品分类名字
Example: 美甲
good_category_pid	string	Yes	商品分类父级id
Example: 10
good_category_ico	string	Yes	商品分类图标
Example: /r.jpg
 */
info.goodcategory = {
    "code": 0,
    "msg": "OK",
    "data": "55"
}

/** *
   * 编辑 商品分类  
   *  http://dev.countinsight.com/api/admin/goodcategory/modify
   * id	string	Yes	商品分类id
Example: 20
good_category_name	string	Yes	商品分类名字
Example: 美甲
good_category_pid	string	Yes	商品分类父级id
Example: 10
good_category_ico	string	Yes	商品分类图标
Example: /r.jpg
300105	请提供正确的商品分类ID
300001	分类名称不能为空
300002	上级商品id不存在
310005	编辑失败
   */
info.modify = {
    "code": 0,
    "msg": "OK",
    "data": "编辑成功"
}
/** *
   * 删除商品分类
   * http://dev.countinsight.com/api/admin/goodcategory/remove
   * id	string	Yes	商品分类id
Example: 7
   */
info.remove = {
    "code": 0,
    "msg": "OK",
    "data": "删除成功"
}
/** *
 * 商品分类详情
 * 
GET http://dev.countinsight.com/api/admin/goodcategory/detail 
id	string	Yes	商品分类id
Example: 38
 */
info.detail = {
    "code": 0,
    "msg": "OK",
    "data": {
        "good_category_id": 20, // 商品分类id
        "good_category_name": "美脸部皮肤", //商品分类名字
        "good_category_ico": "\/10.jpg", //商品分类图标
        "good_category_pid": 9, //父级分类id
        "good_category_deep": 2, //层级深度 1:一级行业分类 2:二级行业分类
        "good_category_path": "9", //层级路径
        "good_category_status": 1, //0:删除,1:正常
        "good_category_ctime": "2018-11-27 14:54:29", //创建时间
        "good_category_utime": "2018-11-27 14:58:54" //修改时间
    }
}
/** *
 * 商品分类 所有层级分类
 *  http://dev.countinsight.com/api/admin/goodcategory/getCategory 
 * good_category_id	string		商品分类列表id，不提交获取所有商品行业
Example: 4,7,9 或 8
 */

info.all = {
    "code": 0,
    "msg": "OK",
    "data": {
        "List1": //一级行业分类列表（即1级行业分类，以及其名下的2级分类都可以选择）
            [{
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
            }],
        "List2": //二级行业分类列表（即1级行业分类不可以被选择，但其名下的2级分类都可以选择）
            [{
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
            }]
    }
}

info.create = {
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
    "explain_img_arr": ["/b1.jpg", "/b2.jpg", "/b3.jpg"], //卖点图数组
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
export default info