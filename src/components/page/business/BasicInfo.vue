<template>
    <div>
        <div class="panel">
            <div class="panel-body info-box">
                <el-row :gutter=5>
                    <el-col :span=6 class="hd"><img :src="data.shop_logo" class="shop-logo"></el-col>
                    <el-col :span=18 class="bd">
                        <h2 class="shop-name f18 text-purple">卡琪儿婚纱摄影</h2></el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">品牌名称：</el-col>
                    <el-col :span=18 class="bd">{{data.shop_name}}</el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">经营范围：</el-col>
                    <el-col :span=18 class="bd">{{data.shop_category_name}}</el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">门店电话：</el-col>
                    <el-col :span=18 class="bd">{{data.shop_phone}}</el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">电子邮箱：</el-col>
                    <el-col :span=18 class="bd">{{data.shop_email}}</el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">所在地区：</el-col>
                    <el-col :span=18 class="bd">{{data.shop_name}}</el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">联系地址：</el-col>
                    <el-col :span=18 class="bd">{{data.shop_address}}</el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">商家简介：</el-col>
                    <el-col :span=18 class="bd">{{data.shop_introduce}}</el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">商家封面：</el-col>
                    <el-col :span=18 class="bd"><img :src="data.shop_cover_img" style="max-width: 400px;"></el-col>
                </el-row>
                <el-row :gutter=5>
                    <el-col :span=6 class="hd">店铺环境：</el-col>
                    <el-col :span=18 class="bd">
                        <el-row :gutter=20>
                            <el-col :span=6 v-for="(pic,i) in data.shop_environment_data" :key="i">
                                <img :src="pic" width="100%">
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter=5 class="mb-n">
                    <el-col :span=6 class="hd">地理位置：</el-col>
                    <el-col :span=18 class="bd">
                        <div class="location">
                            <baidu-map class="map" :center="{'lng': data.shop_longitude, 'lat': data.shop_latitude}" :zoom="14"></baidu-map>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="panel">
            <div class="panel-body info-box">
                <template v-if='data.bank_info'>
                    <el-row :gutter=5>
                        <el-col :span=6 class="hd">持卡人姓名：</el-col>
                        <el-col :span=18 class="bd">{{data.bank_info.shop_bank_user}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=6 class="hd">银行卡号：</el-col>
                        <el-col :span=18 class="bd">{{data.bank_info.shop_bank_card_number}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=6 class="hd">银行卡照：</el-col>
                        <el-col :span=18 class="bd"><img :src="data.bank_info.shop_bank_front_img" style="max-width: 400px;"></el-col>
                    </el-row>
                </template>
                <template v-if='data.verify_info'>
                    <el-row :gutter=5>
                        <el-col :span=6 class="hd">营业执照：</el-col>
                        <el-col :span=18 class="bd"><img :src="data.verify_info.shop_info_licence" style="max-width: 400px;"></el-col>
                    </el-row>
                    <el-row :gutter=5 class="mb-n">
                        <el-col :span=6 class="hd">身份证照：</el-col>
                        <el-col :span=18 class="bd">
                            <el-row :gutter=20 class="mb-n">
                                <el-col :span=6>
                                    <img :src="data.verify_info.shop_info_id_card_front" width="100%">
                                </el-col>
                                <el-col :span=6>
                                    <img :src="data.verify_info.shop_info_id_card_con" width="100%">
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            isLoading: true,
            shadownbox: false,
            data: {},
            showdata2: [{
                type: 7,
                label: '地理位置'
            }],
            showdata3: [{
                    type: 7,
                    label: '银行卡信息',
                    title: ['持卡人：胡豆豆', '银行卡号：6284 8463 4532 7587'],
                    imgurl: '/static/img/card.png'
                },
                {
                    type: 7,
                    label: '',
                    imgurl: '/static/img/card.png'
                },
                {
                    type: 7,
                    label: '身份证信息',
                    imgurl: ['/static/img/idcard.png', '/static/img/idcard.png']
                },
                {
                    type: 7,
                    label: '营业执照',
                    imgurl: ['/static/img/idcard.png']
                }
            ],
        }
    },
    created() {
        this.createdDate();
    },
    methods: {
        createdDate() {
            this.$axios.post('/api/admin/shop/info?shop_id=' + this.$route.params.id)
                .then((res) => {
                    this.isLoading = false
                    this.data = res.data.data;

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    components: {},
    mounted() {

    },
    computed: {

    }
}
</script>
<style lang='less' scoped>
.shop-name {
    line-height: 80px;
}

.shop-logo {
    height: 80px;
}

.location {
    height: 311px;
    width: 390px;
    background-color: #fff;
}

.userimg {
    display: flex;
    div:nth-child(1) {
        flex: 1;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    div:nth-child(2) {
        flex: 2
    }
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%
    }
    span {
        color: #7224D8;
        font-size: 18px;
    }
}

.title {
    width: 390px;
    display: flex;
    justify-content: space-between;
    height: 43px;
    background-color: #EEEFF1;
    align-items: center;
    color: #666;
    font-weight: normal;
    span {
        margin-left: 8px;
        font-size: 16px;
        color: #333;
        line-height: 22px;
    }
    i {
        font-size: 16px;
        margin-right: 10px;
    }
}

.shadowbox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 99999;
    .title {
        width: 100%;
    }
}
</style>