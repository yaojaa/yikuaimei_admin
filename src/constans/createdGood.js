export const breadcrumb = {
    // 1 门店服务 2 平台商品 3 品项管理 4 虚拟卡券
    '1': [{
            name: "商品管理" //名字
        },
        {
            name: "门店服务", //名字
            url: "/goodList"
        },
        {
            name: "添加商品" //名字
        }
    ],
    '2': [{
            name: "商品管理" //名字
        },
        {
            name: "平台商品", //名字
            url: "/serviceList"
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
            name: "添加商品" //名字
        }
    ],
    '4': [{
            name: "商品管理" //名字
        },
        {
            name: "虚拟卡券", //名字
            url: "/fictitiousList"
        },
        {
            name: "添加商品" //名字
        }
    ],
}

export const type = ['', '服务', '商品', '品项', '虚拟']

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
    },
    {
        category_id: 5,
        category_name: "轻医美"
    }
]