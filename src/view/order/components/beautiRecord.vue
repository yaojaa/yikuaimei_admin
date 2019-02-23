<template>
    <div class="record_list">
        <div v-if="recordList.length>0" class="record_item" :key="index" v-for="(item, index) in recordList">
            <p class="record_create_time">{{item.create_time}}</p>
            <p class="record_content">{{item.content}}</p>
            <div class="img_list">
                <img :src="imgItem" alt="" class="record_img" :key="imgIndex" v-for="(imgItem, imgIndex) in item.beauty_img" />
            </div>
            <p class="reply_info" v-if="item.reply_status == 2">
                商家回复：<span>{{item.reply_info_reply}}</span>
            </p>
        </div>
        <p v-if="recordList.length === 0" style="text-align: center">暂无美丽日记信息</p>
    </div>
</template>

<script>
    import Config from "../config";
    export default {
        name: 'BeautiRecord',
    
        components: {
    
        },
    
        data() {
            return {
                recordList: [],
            }
        },
    
        props: {
            orderCode: {
                type: String,
                default: () => ''
            }
        },
    
        computed: {},
    
        beforeRouteUpdate(to, from, next) {
    
        },
    
        created() {
        },
    
        mounted() {
            this.getData(this.$route.params);
        },
    
        methods: {
            getData(params) {
				this.$axios({
					method: 'get',
					url: '/api/admin/orderService/orderBeautyList',
					params: params
				}).then((res) => {
					this.recordList = res.data.data;
				}).catch((error) => {});
            }
        }
    }
</script>

<style scoped>
    .record_item {
        margin-bottom: 30px;
    }
    .record_create_time {
        background: #F3F4FE 100%;
        padding: 0 27px;
        line-height: 40px;
        font-size: 18px;
        color: #333;
        border-bottom: 1px solid #F3F4FE;
    }
    .record_content {
        padding: 18px 27px;
        line-height: 26px;
        color: rgba(102, 102, 102, 1);
        font-size: 14px;
        text-align: left;
        font-family: PingFangSC-Regular;
    }
    .img_list {
        padding: 0 27px;
    }
    .img_list img {
        width: 215px;
        height: 240px;
        margin-right: 11px;
    }
    .img_list img:last-of-type {
        margin-right: 0;
    }
    .reply_info {
        margin-top: 16px;
        margin-left: 27px;
        margin-right: 27px;
        padding: 22px;
        background: #F9F9F9;
        line-height: 26px;
        font-size: 16px;
        color: #333;
    }
    .reply_info span {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
    }
</style>
