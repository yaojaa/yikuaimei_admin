<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="p-xl" v-if="info.nickname">
                    <!--form start-->
                    <el-form label-width="170px" class="demo-ruleForm">
                        <el-form-item label="参与者：">
                            {{info.nickname}}
                        </el-form-item>
                        <el-form-item label="上传对比照：">
                            <div class="inlineimg">
                                <img  width="200" :src="info.before_img" />
                                <br>
                                之前
                            </div>
                            <div class="inlineimg">
                                <img class="inlineimg"  width="200" :src="info.after_img" />
                                <br>
                                之后
                            </div>
                        </el-form-item>
                        <el-form-item label="活动规则：">
                        </el-form-item>
                        <el-form-item label="好友打分">
                            <el-table :data="help_list" border style="width: 100%">
                                <el-table-column prop="date" label="序列" type="index" width="180">
                                </el-table-column>
                                <el-table-column prop="nickname" label="姓名" width="180">
                                </el-table-column>
                                <el-table-column prop="rank" label="分数">
                                </el-table-column>
                                <el-table-column prop="join_time" label="打分时间">
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </div>
                <!--form end-->
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
// import formlist from "@/components/formlist";
// import { CATEGORYOPTIONS } from "../../constans/createdGood";
// import { pca, pcaa } from 'area-data'; // v5 or higher
export default {
    name: "tabletest",

    data() {
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "营销管理", //名字
                    url: '/marketing/markList'
                },
                {
                    name: "你变美我买单", //名字
                    url: '/marketing/pay_bill/list'
                },
                {
                    name: "参与用户详情" //名字
                }
            ],
            info: {},
            help_list: []
        }
    },
    methods: {

    },







    components: {
        BreadCrumb
        // formlist
    },
    mounted() {

    },
    created() {

        let params = this.$route.params;
        if (Object.keys(params).length) {

            this.$axios.post("/api/admin/activity/beautifulJoinInfo", params).then(res => {
                if (res.data.code == 0) {
                    console.log(res, res.data)
                    this.info = res.data.data.join_info;
                    this.help_list = res.data.data.help_list
                }

            })
        }

    }
};
</script>
<style scoped>
/* .form-panel{
  width:720px
} */
.width200px {
    width: 200px
}

.line-center {
    text-align: center;
}

.activity-img {
    font-size: 13px;
    color: #585858;
}

.limit-title {
    display: inline-block;
    width: 140px;
}

.limit-rules {
    display: inline-block;
    width: 250px;
}

.limit-no {
    position: relative;
    left: 0px;
    top: 10px;
}

.gift-title {
    font-size: 18px;
    color: #484848;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center
}

.gift-table {
    width: 720px;
    margin: 0 auto;
    position: relative;
    left: -120px;
    top: 10px;

}

.background-blue {
    background-color: blue
}

.table-th {
    width: 100%;
    height: 50px;
    color: #fff;
    line-height: 50px;
    background-color: #03a380;
    display: flex;
}

.th-item {
    flex: 1;
    text-align: center
}

.table-body {
    width: 100%;
    display: flex;
}

.body-item {
    flex: 1;

}

.person-item {
    width: 100%;
    height: 100px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}

.person-width {
    width: 140px;
    height: 100px;
}

.person-width p {
    font-size: 13px;
    margin-top: 10px;
}

.person-item-left {
    float: left;
    width: 50px;
    height: 50px;
}

.person-item-right {
    float: left;
    margin-left: 10px;
    width: 80px;
    height: 50px;
}

.goods-div {
    width: 211px;
    height: 70px;
    font-size: 12px;
    color: #fff;
    border-radius: 6px;
    border: 1px solid #ccc;
}

.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
}

.goods-div-left {
    width: 120px;
    padding: 10px;
    height: 50px;
    float: left;

}

.goods-div-right {
    width: 70px;
    height: 70px;
    float: left;
    border-left: 1px solid #ccc;
}

.price {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    margin-right: 6px;
}

.margin-top10 {
    margin-top: 10px;
}

.no-img {
    width: 70px;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    text-align: center;
}


/* .tab-overflow .el-tabs{
    overflow-y: scroll;
} */
.tab-overflow .el-tabs--border-card {
    /* height: 200px; */
    overflow-y: scroll;
}

.choiced {
    font-size: 12px;
    text-align: center;
    color: #000;
}

.tab-overflow .color-blue {
    color: #d0eee8;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

.tab-overflow .color-black {
    color: #333;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

.gift-person {
    top: 0px;
    margin-bottom: 20px;
}

.price-input {
    width: 80px;
    height: 30px;
    border: 1px solid #666;
}

.inlineimg {
    display: inline-block;
    margin-right: 10px;
    box-shadow: 0 0 5px #dddddd;
    text-align: center;
}
</style>