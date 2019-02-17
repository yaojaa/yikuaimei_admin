<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-heading">
                    <h3  class="panel-title">订单信息</h3>
                </div>
                <div class="panel-body">
                    <div class="info_p">
                        收件人：{{d.order_user_name}}<br />
                        收货地址：{{d.order_user_address}}<br />
                        备注：{{d.order_remark}}<br />
                    </div>
                </div>
            </div>
            <div class="panel">
                <el-row :gutter="8">
                    <el-col :span="5">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>待发货</span>
                            </div>
                            <div v-for="o in from_goods_list" :key="o.id" class="text clearfix flex_box">
                                <div class="img">
                                    <img src="http://192.168.2.178:8888/%E5%8E%9F%E5%9E%8B/%E5%B9%B3%E5%8F%B0%E5%8E%9F%E5%9E%8B-html/images/%E5%B9%B3%E5%8F%B0%E5%95%86%E5%93%81/u999.png" width="50" height="50">
			</div>
                                    <div class="con">
                                        <p>{{o.goods_name}}</p>
                                        <p>{{o.sku_type}}</p>
                                        <p>{{o.goods_num}}</p>
                                    </div>
                                </div>
                        </el-card>
                    </el-col>
                    <el-col :span="13">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>操作区</span>
                            </div>
                            <el-card shadow="always">
                                <el-input type="input" :rows="2" placeholder="请扫描商品" v-model.trim="textarea">
                                </el-input>
                            </el-card>
                            <br><br>
                            <el-card shadow="always">
                                <h1 style="color:red">
				  	该商品共{{current_goods_need_num}}件，您还差{{current_goods_need_num - current_goods.num}}件没扫
				  </h1>
                            </el-card>
                            <el-card shadow="always" v-if="current_goods.goods_name">
                                <!--当前扫描的商品-->
                                <div class="flex_box">
                                    <div class="img">
                                        <img src="https://file.iviewui.com/weapp/dist/e5da9fdc97a0b3fb16c115d379820583.jpg" width="50" height="50" />
			    	</div>
                                        <div class="goods_conent">
                                            <p>{{current_goods.goods_name}}</p>
                                            <p>{{current_goods.sku_type}}</p>
                                            <el-input-number v-model="current_goods.num" @change="numhandleChange" :min="1" label="数量"></el-input-number>
                                            <br> <br>
                                            <el-button size="large" @click="toSendArea" type="success">确定</el-button>
                                        </div>
                                        <div class="num">
                                            ✖️{{current_goods.num}}
                                        </div>
                                    </div>
                            </el-card>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>待确认发货</span>
                            </div>
                            <div v-for="o in to_goods_list" :key="o.id" class="text clearfix flex_box">
                                <div class="img">
                                    <img :src="o.good_ico" width="50" height="50">
			</div>
                                    <div class="con">
                                        <p>{{o.goods_name}}</p>
                                        <p>{{o.sku_type}}</p>
                                        <p>{{o.num}}</p>
                                    </div>
                                </div>
                                <el-button size="large" type="success">打印快递单</el-button>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
//******* 1.扫描商品码 匹配商品到当前区域
//3.再次扫描如果商品码一样 当前商品数量+1 如果不一样 进入代发货区域。
// 4.手动控制数量
// 2.扫描到的商品 是否是发货商品检测 不是的话 提示。 checkScanGoods
// 


export default {
    data() {
        return {

            d: '',
            textarea: '', //条码区
            from_goods_list: [],
            to_goods_list: [],
            last_code: '', //上一个code暂存
            current_goods: {
                num: 1,
                goods_name: '',
                goods_ico: ''
            },
            current_goods_need_num: 'xxx'
        }
    },

    beforeRouteUpdate(to, from, next) {

    },
    created() {

        console.log('created')

    },
    watch: {
        textarea(curVal, oldVal) {

            console.log('watch')

            // if(curVal.indexOf('\n')>0){

            // 	console.log('包含回车',curVal  this.last_code)

            // 	if(curVal == this.last_code){

            // 		console.log('当前商品和上个商品一样')

            // 		++ this.current_goods.num 
            // 	}else{
            // 		console.log('当前商品和上个商品不一样')
            // 		console.log('当前商品进入代发货区')
            // 	}


            // }
            // console.log('this.last_code=',this.last_code)
            if (this.last_code && curVal !== '' && curVal !== this.last_code) {
                console.log('当前商品进入代发货区')
                this.toSendArea()

                this.last_code = ''



                setTimeout(() => {
                    this.textarea = ''
                }, 1000)
                return
            }




            let str = curVal.replace("\n", "");
            if (str.length) {
                this.getCurrentGoodsInfo(str)
                setTimeout(() => {
                    this.textarea = ''
                }, 1000)

            } else {
                console.log('长度0')
            }

            console.log('this.last_code:', this.last_code)

        }
    },
    computed: {

    },
    mounted() {
        this.getData(this.$route.params)
    },
    methods: {

        checkScanGoods(it) {

            let isSame = true //最后需要改为false

            this.from_goods_list.forEach((item, index) => {

                console.log('each', item.sku_code, it.sku_info.sku)

                if (item.sku_code == it.sku_info.sku_code) {
                    this.current_goods_need_num = item.goods_num
                    return true
                }
            })

            return isSame

        },

        toSendArea() {
            this.to_goods_list.push(this.current_goods)

            this.current_goods = {
                num: 0,
                goods_name: '',
                goods_ico: ''
            }
        },

        getCurrentGoodsInfo(code) {

            this.$axios({
                method: 'get',
                url: 'https:\\image.countinsight.com/goods.json'
            }).then((res) => {
                if (res.status == 200) {

                    const c_goods = res.data[code] || false

                    if (c_goods) {

                        if (this.checkScanGoods(c_goods)) {

                            if (code == this.last_code) {
                                this.current_goods.num = ++this.current_goods.num
                            }

                            this.last_code = code.trim()



                            this.current_goods.goods_name = c_goods.good_name
                            this.current_goods.goods_ico = c_goods.good_ico

                            console.log(this.current_goods)

                        } else {

                            this.$alert('这是一段内容', '商品不存在', {
                                confirmButtonText: '确定'
                            })

                        }



                    } else {


                    }

                } else {
                    this.$message({ message: res.data.msg, type: 'warning' });
                }
            }).catch((error) => {
                console.log(error);
            })

        },




        numhandleChange(e) {
            console.log(e)
        },

        getData(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/order/confirmDis',
                params: params
            }).then((res) => {
                if (res.data.code == 0) {
                    this.d = res.data.data
                    this.from_goods_list = res.data.data.goods_list

                    // this.total_count = 

                } else {
                    this.$message({ message: res.data.msg, type: 'warning' });
                }
            }).catch((error) => {
                console.log(error);
            })


        }


    }
}
</script>
<style scoped>
</style>