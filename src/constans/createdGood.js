export const breadcrumb = {
    // 1 门店服务 2 平台商品 3 品项管理 4 虚拟卡券
    '1': [{
            name: "商品管理" //名字
        },
        {
            name: "门店服务", //名字
            url: "/serviceList"
        },
        {
            name: "添加门店" //名字
        }
    ],
    '2': [{
            name: "商品管理" //名字
        },
        {
            name: "平台商品", //名字
            url: "/goodList"
        },
        {
            name: "添加商品" //名字
        }
    ],
    '3': [{
            name: "商品管理" //名字
        },
        {
            name: "品项管理", //名字
            url: "/purchaseList"
        },
        {
            name: "添加品相" //名字
        }
    ],
    '4': [{
            name: "商品管理" //名字
        },
        {
            name: "虚拟卡券管理", //名字
            url: "/fictitiousList"
        },
        {
            name: "添加虚拟卡券" //名字
        }
    ],
}

export const breadcrumbEdit = {
    // 1 门店服务 2 平台商品 3 品项管理 4 虚拟卡券
    '1': [{
            name: "商品管理" //名字
        },
        {
            name: "门店服务", //名字
            url: "/serviceList"
        },
        {
            name: "编辑门店" //名字
        }
    ],
    '2': [{
            name: "商品管理" //名字
        },
        {
            name: "平台商品", //名字
            url: "/goodList"
        },
        {
            name: "编辑商品" //名字
        }
    ],
    '3': [{
            name: "商品管理" //名字
        },
        {
            name: "品项管理", //名字
            url: "/purchaseList"
        },
        {
            name: "编辑品相" //名字
        }
    ],
    '4': [{
            name: "商品管理" //名字
        },
        {
            name: "虚拟卡券管理", //名字
            url: "/fictitiousList"
        },
        {
            name: "编辑虚拟卡券" //名字
        }
    ],
}

export const type = ['', '服务', '商品', '品项', '虚拟卡券']
export const COUNTRY = ['法国', '美国', '以色列', '意大利', '韩国']
export const UNIT = ['个', '箱', '盒', '瓶', '袋']


export const CATEGORYOPTIONS = [{
        category_id: 1,
        category_name: "美容"
    },
    {
        category_id: 2,
        category_name: "美甲美睫"
    },
    {
        category_id: 3,
        category_name: "美发"
    },
    {
        category_id: 4,
        category_name: "美体"
    }
]
export const Category = [
    {
        category_id: 0,
        category_name: "全部"
    },
    {
        category_id: 1,
        category_name: "美甲"
    },
    {
        category_id: 2,
        category_name: "美发"
    },
    {
        category_id: 3,
        category_name: "轻体美"
    },
    {
        category_id: 4,
        category_name: "美肤"
    }
]

export const GOODTYPE = {
    'serviceList': 1,
    'goodList': 2,
    'purchaseList': 3,
    'fictitiousList': 4
}

export const INITFORMINFO = {
    good_name: '', // 商品名字
    good_explain: '', // 商品卖点
    category_id: '', // 行业id
    tag_id_arr: [], // 标签id数组
    tag_list: [], // 已选标签展示数据
    good_video: '', // 商品视频
    good_video_pic: '', // 商品视频封面图
    good_img_arr: [], // 商品图片数组
    explain_img_arr: [],
    good_ico: '', // 商品展示图
    unit: '', // 单位 例如盒，箱
    show_img_arr: [], // 详情页商品展示图数组
    explain_img_arr: [], // 卖点图数组
    sku_type_arr: [], // 规格数组，单规格商品不要提交该字段
    good_sku: [], // 规格sku数组，单规格商品也要按该数组格式提交
    good_friends: [], // 服务添加耗材列表 不是服务不需要提交
    goodSkuInfo: [{
            name: '',
            list: [],
            inputValue: ''
        },
        {
            name: '',
            list: [],
            inputValue: ''
        }
    ]
}