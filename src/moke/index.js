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

export default info