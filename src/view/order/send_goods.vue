<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
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
                    <el-col :span="8">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>待发货</span>
                            </div>
                            <div v-for="o in from_goods_list" :key="o.id" class="text clearfix flex_box">
                                <div class="img">
                                    <img :src="o.goods_img" width="50" height="50"/>
                                </div>
                                    <div class="con">
                                        <p>名称：{{o.goods_name}}</p>
                                        <p>编码：{{o.goods_barcode}}</p>
                                        <p>数量：{{o.goods_num}}</p>
                                    </div>
                                </div>
                        </el-card>
                    </el-col>
                    <el-col :span="10">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>操作区</span>
                            </div>
                            <el-card shadow="always">
                                <el-input type="input" :rows="2" placeholder="请扫描商品" v-model.trim="textarea">
                                </el-input>
                            </el-card>
                            <br><br>
                            <el-card shadow="always" v-if="current_goods.goods_name">
                                <h1 style="color:red;font-size: 18px">
                    该商品"{{current_goods.goods_name}}"共{{current_goods.goods_num}}件，


                    <div v-if="current_goods.goods_num - current_goods.num == 0 "> 已扫全</div>
                    <div v-else> 还差{{current_goods.goods_num - current_goods.num}}件代扫</div>


                  </h1>
                            </el-card>
                            <el-card shadow="always" v-if="current_goods.goods_name">
                                <!--当前扫描的商品-->
                                <div class="flex_box">
                                    <div class="current-img">
                                        <img  :src="current_goods.goods_img" width="50" height="50" />
                                    </div>
                                        <div class="goods_conent">
                                            <p class="current-p">商品名：{{current_goods.goods_name}}</p>
                                            <!-- <p>{{current_goods.sku_type}}</p> -->
                                            <el-input-number v-model="current_goods.num" @change="numhandleChange" :min="1" label="数量"></el-input-number>
                                            <br> <br>
                                            <el-button size="large" @click="toSendArea" type="success">确定</el-button>
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
                                <div v-if="to_goods_list" class="to-p">
                                    <p>请扫描商品</p>
                                </div>
                                <div v-else>
                                    <div v-for="o in to_goods_list" :key="o.id" class="text clearfix flex_box">
                                        <div class="img">
                                            <img :src="o.goods_img" width="50" height="50">
                                        </div>
                                            <div class="con">
                                                <p>商品名：{{o.goods_name}}</p>
                                                <!-- <p>{{o.sku_type}}</p> -->
                                                <p>商品数量：{{o.num}}</p>
                                            </div>
                                    </div>
                                </div>
                                <el-button size="large" type="success" @click="printExpres">打印快递单</el-button>
                                <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                                    <el-form :model="form">
                                        <el-form-item label="收件人姓名:" :label-width="formLabelWidth">
                                            <el-input v-model="d.order_user_name" autocomplete="off" :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="收件人电话:" :label-width="formLabelWidth">
                                            <el-input v-model="d.order_user_phone" autocomplete="off" :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="收件人地址:" :label-width="formLabelWidth">
                                            <el-input v-model="d.order_user_address" autocomplete="off" :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="发件仓库" :label-width="formLabelWidth">
                                            <el-select v-model="form.address_id" placeholder="请选择">
                                                <el-option v-for="item in sendList" :label="item.contacts_name" :value="item.address_id" :key="item.address_id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="寄件人备注:" :label-width="formLabelWidth">
                                            <el-input type="textarea" v-model="form.dis_send_remark"></el-input>
                                        </el-form-item>
                                        <el-form-item label="物流列表" :label-width="formLabelWidth">
                                            <el-select v-model="form.dis_identity" placeholder="请选择">
                                                <el-option v-for="item in expressList" :label="item.name" :value="item.code" :key="item.code">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="sendGoods">确 定</el-button>
                                    </div>
                                </el-dialog>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
//******* 1.扫描商品码 匹配商品到当前区域
//3.再次扫描如果商品码一样 当前商品数量+1 如果不一样 进入代发货区域。
// 4.手动控制数量
// 2.扫描到的商品 是否是发货商品检测 不是的话 提示。 checkScanGoods
// 


export default {
    components: {
            BreadCrumb
        },
    data() {
        return {
            breadcrumb: [
                    //面包屑
                    {
                        name: "订单管理", //名字 
                    },
                    {
                        name: "商品订单", //名字
                        url: "/order/list_goods"
                    },
                    {
                        name: "发货"
                    }
                ],

            d: {},
            textarea: '', //条码区
            from_goods_list: [],
            to_goods_list: [],
            last_code: '', //上一个code暂存
            current_goods: {
                num: 1,
                goods_name: '',
                goods_ico: '',
                goods_barcode: ''

            },
            form: {
                "dis_send_remark": "",
                "address_id": "",
                "dis_identity": ""
            },
            dialogFormVisible: false,
            sendList: [],
            expressList: [],
            formLabelWidth: '120px'
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

            const str = curVal.replace("\n", "");


            if (str !== '') {
                console.log('str', str)


                if (this.checkScanGoods(str)) {

                    setTimeout(() => {
                        this.textarea = ''
                    }, 1000)

                }


            }

        }
    },
    computed: {

    },
    mounted() {
        this.getData(this.$route.params)
    },
    methods: {
        printExpres() {
            //debugger
            console.log(this.to_goods_list, 'to_goods_list')
            this.dialogFormVisible = true;
            this.$axios({
                method: 'get',
                url: '/api/admin/select/address?contacts_send=' + 1,

            }).then((res) => {

                if (res.data.code == 0) {
                    this.sendList = res.data.data;
                    //Object.assign(this.ruleForm,res.data.data) 
                } else {
                    this.$alert('接口返回错误')
                }

            }).catch((error) => {
                this.$alert('接口返回错误' + error)
            });
            //物流列表
            this.$axios({
                method: 'get',
                url: '/api/admin/select/expressCompany',

            }).then((res) => {

                if (res.data.code == 0) {
                    this.expressList = res.data.data;
                    //Object.assign(this.ruleForm,res.data.data) 
                } else {
                    this.$alert('接口返回错误')
                }

            }).catch((error) => {
                this.$alert('接口返回错误' + error)
            });
        },
        sendGoods() {
            console.log(this.to_goods_list, 'this.to_goods_list')
            //debugger
            var prams = {
                "order_code": this.d.order_code,
                "dis_send_id": this.form.address_id,
                "dis_send_remark": this.form.dis_send_remark,
                "dis_identity": this.form.dis_identity,
                "goods_list": [{
                    "goods_barcode": this.to_goods_list[0].goods_barcode,
                    "goods_num": this.to_goods_list[0].goods_num
                }]
            }
            //             {
            // "order_code" : "B000012T12000000003", // 订单编号
            // "dis_send_id" : 1, // 发货人id
            // "dis_send_remark" : "必须送上门", // 发货人备注
            // "dis_identity" : "SF",  // 快递公司  'SF' =>'顺丰速运', 'STO' =>'申通快递' ....
            // "goods_list" : [ // 发货的商品列表
            //     {
            //     "goods_barcode" : "2919875345167891",  // 订单的商品条形码
            //     "goods_num" : 1 // 发货的商品数量
            //     }
            // ]
            // }
            this.$axios.post("/api/admin/order/createDis", prams).then(res => {

                if (res.data.code == 0) {

                    this.$alert('发货成功！')

                    this.$router.push('/order/list_goods')

                } else {
                    this.$alert(res.data.msg)
                }


            }).catch((e) => {

                this.$alert('操作失败' + e)

            })
        },

        checkScanGoods(it) {

            let isSame = false //最后需要改为false


            //判断待发货区是否有当前商品码 如果有 return 
            //
            for(var i =0; i<this.to_goods_list.length;i++){

                if(this.to_goods_list[i].goods_barcode == it){
                    return this.$message('此商品已扫描完毕')
                }

            }

            if (this.current_goods.goods_barcode == it) {
                this.current_goods.num += 1

                if(this.current_goods.num == this.current_goods.goods_num){
                     this.toSendArea()
                        
                }

                return isSame = true

            }





            this.from_goods_list.forEach((item, index) => {

                console.log('循环from list 查找商品')




                if (item.goods_barcode == it) {

                    if(item.goods_num == this.current_goods.num){
                        console.log('数量相等了')
                        this.toSendArea()
                        return
                    }


                    this.current_goods = Object.assign({}, this.current_goods, item)
                    // console.log(item,'item')
                    this.current_goods.num = 1
                    // console.log(this.current_goods,'this.current_goods')
                    isSame = true
                }




            })

            return isSame

        },

        toSendArea() {

            //判断数量是否已经够了
            //
            //
            for(var i =0; i<this.from_goods_list.length;i++){

                const item = this.from_goods_list[i]

                if(item.goods_barcode == this.current_goods.goods_barcode){
                     if(item.goods_num !== this.current_goods.num){
                         this.$message('商品数量不匹配')
                         return false
                    }
                }
            }
            
            console.log('没有停止执行')

            
            


            if (this.to_goods_list.length) {
                this.to_goods_list.forEach(item => {

                    if (item.goods_barcode == this.current_goods.goods_barcode) {
                        this.$message('商品已存在，请重新扫描其它产品')
                    } else {

                        this.to_goods_list.push(this.current_goods)
                        this.current_goods = {
                            num: 0,
                            goods_name: '',
                            goods_ico: '',
                            goods_barcode: ''
                        }
                    }

                })




            } else {
                this.to_goods_list.push(this.current_goods)

                this.current_goods = {
                    num: 0,
                    goods_name: '',
                    goods_ico: '',
                    goods_barcode: ''
                }


            }






        },

        // getCurrentGoodsInfo(code) {

        //     //  var _businessList = this.d.goods_list;
        //     // // debugger
        //     // _businessList.forEach(function(item){
        //     //     if(item.goods_barcode==code){
        //     //         this.current_goods = item

        //     //     }

        //     // // })
        //     var c_goods = this.d.goods_list;
        //     console.log('c_goods',c_goods)
        //     if (c_goods.length) {

        //         console.log('this.checkScanGoods(code)',this.checkScanGoods(code))

        //                 if (this.checkScanGoods(code)) {

        //                     if (code == this.last_code) {
        //                         this.current_goods.num += 1
        //                     }

        //                     this.last_code = code.trim()



        //                     this.current_goods.goods_name = c_goods.good_name
        //                     this.current_goods.goods_ico = c_goods.good_ico
        //                     this.current_goods.goods_barcode = c_goods.goods_barcode

        //                     console.log(this.current_goods)

        //                 } else {

        //                     this.$message('商品不存在', '商品不存在', {
        //                         confirmButtonText: '确定'
        //                     })

        //                 }



        //             } else {


        //             }



        // },




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
                    this.from_goods_list = res.data.data.goods_list;


                    // var num = 0

                    // this.from_goods_list.forEach(item=>{
                    //     num += item.goods_num
                    // })

                    // this.current_goods_need_num = num



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
.current-img{
    width:50px;
    height: 50px;
    position: relative;
    left:0px;
    top: 12px;
    margin-right:10px;
}
.img{
    margin-bottom:10px;
}
.current-p{
    font-size: 13px;
    margin-bottom:4px;
    margin-top: 8px;
}
.con{
    margin-left:14px;
    font-size:13px;
}
.to-p{
    font-size: 13px;
    color:#d3382a
}
.to-p p{
    margin-bottom:8px;
    text-indent: 20px;
}
</style>