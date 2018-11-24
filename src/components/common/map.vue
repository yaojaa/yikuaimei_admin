<template>
    <div class="location">
        <!-- <h2 class="title"><span>地理位置</span><i class="iconfont">图标</i></h2> -->
        <div id="allmap"></div>
    </div>
</template>
<script>
import BMap from 'BMap';
export default {
    data: function() {
        return {

        }
    },
    props:['longitude','latitude','city'],
    methods: {

    },
    mounted() {
        // 百度地图API功能
        var map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(this.longitude, this.latitude), 17); // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
            mapTypes: [
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
            ]
        }));
        map.setCurrentCity(this.city); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    computed: {

    }
}
</script>
<style lang='less' scoped>
#allmap{
    height: 350px;
    // width: 1050px;
}
</style>