<template>
    <div>
        <div class="panel">
            <div class="panel-heading"></div>
            <div class="panel-body">
                <div class="userimg">
                    <div>
                        <img src="/static/img/3.jpg" alt=""><span>卡琪儿婚纱摄影</span>
                    </div>
                    <div></div>
                </div>
                <show-detail :showdata='showdata1'></show-detail>
                <show-detail :showdata='showdata2'>
                    <div class="location">
                        <h2 class="title"><span></span><i class="iconfont"></i></h2>
                        <div id="allmap"></div>
                    </div>
                </show-detail>                
            </div>

        </div>
        <div class="panel">
            <div class="panel-heading"></div>
            <div class="panel-body">
                <show-detail :showdata='showdata3'></show-detail> 
            </div> 
        </div>
    </div>
</template>
<script>
import BMap from 'BMap';
import ShowDetail from '@/components/common/showdetail'
export default {
    data: function() {
        return {
            showdata1:[
                {
                    type:7,
                    label:'商家名称',
                    title:'卡琪儿婚纱摄影'
                },
                {
                    type:7,
                    label:'品牌名称',
                    title:'城市后花园'
                },
                {
                    type:7,
                    label:'经营范围',
                    title:'婚纱摄影'
                },
                {
                    type:7,
                    label:'门店电话',
                    title:'010-6522668'
                },
                {
                    type:7,
                    label:'电子邮箱',
                    title:'601344881@qq.com'
                },
                {
                    type:7,
                    label:'所在地区',
                    title:'北京丰台区'
                },
                {
                    type:7,
                    label:'联系地址',
                    title:'北京市大兴区金地仰山西区2号院601'
                },
                {
                    type:7,
                    label:'商家简介',
                    title:'韩国KBS报道：韩国艺匠ARTIZ STUDIO对全球婚纱照有着不可忽视的影响。在洛杉矶、首尔、新加坡、上海等地引起一场婚照革命。艺匠工匠来自世界各地。中国、德国、法国、韩国、美国、意大利等。'
                },
                {
                    type:7,
                    label:'商家封面',
                    imgurl:'/static/img/2.png'
                },
                {
                    type:7,
                    label:'店铺环境',
                    imgurl:['/static/img/3.png','/static/img/3.png','/static/img/3.png']
                }
            ],
            showdata2:[
                {
                    type:7,
                    label:'地理位置'
                }
            ],
            showdata3:[
                {
                    type:7,
                    label:'银行卡信息',
                    title:['持卡人：胡豆豆','银行卡号：6284 8463 4532 7587'],
                    imgurl:'/static/img/card.png'
                },
                {
                    type:7,
                    label:'',
                    imgurl:'/static/img/card.png'
                },
                {
                    type:7,
                    label:'地理位置',
                    imgurl:['/static/img/idcard.png','/static/img/idcard.png']
                },
                {
                    type:7,
                    label:'营业执照',
                    imgurl:['/static/img/idcard.png']
                }
            ],
        }
    },
    methods: {

    },
    components:{
        ShowDetail
    },
    mounted() {
        // 百度地图API功能
        var map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 17); // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
            mapTypes: [
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
            ]
        }));
        map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    computed: {

    }
}
</script>
<style lang='less' scoped>
li {
    list-style: none;
}

span {
    font-size: 12px;
    color: #666;
    line-height: 17px;
}

div /deep/ p {
    font-size: 14px;
    color: #333!important;
    line-height: 20px;
}

.location {
    margin-top: 30px;
    background-color: #fff;
    flex: 3;
    div {
        height: 311px;
        width: 390px;
        background-color: #fff;
    }
}
.userimg{
    display: flex;
    div:nth-child(1){
        flex: 1;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    div:nth-child(2){
        flex: 2
    }
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%
    }
    span{
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


</style>