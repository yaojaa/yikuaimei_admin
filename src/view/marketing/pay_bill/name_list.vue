<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel padding20" v-if="info.activity_info">
                <h2>{{info.activity_info.activity_title}}</h2>
                <p class="destext">活动时间：{{info.activity_info.activity_start_time}}-{{info.activity_info.activity_end_time}}</p>
                <div class="action_btn">
                    <el-button type="success" @click="jumpTo">参与用户</el-button>
                </div>
                <!--  <div class="list" v-for="el in info.winning_list">

                {{el.nickname}}
                

              </div> -->
                <el-table :data="info.winning_list" border style="width: 100%">
                    <el-table-column prop="winning_index" label="序列" width="50">
                    </el-table-column>
                    <el-table-column label="参与用户" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.avatar"  width="30" height="30" />
        {{scope.row.nickname}}
                            <!--       <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="join_time" label="参与时间">
                    </el-table-column>
                    <el-table-column prop="rank" label="总得分" width="70">
                    </el-table-column>
                    <el-table-column prop="gifts" label="奖品">
                    </el-table-column>
                    <el-table-column prop="gifts" label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="toDetail(scope.row.user_id)" type="text" size="small">
                                详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                    name: "中奖名单" //名字
                }
            ],

            info: {

            }

        };
    },
    methods: {

        jumpTo() {
            this.$router.push('/marketing/pay_bill/users/' + this.$route.params.activity_code)
        },
        toDetail(id) {
            console.log(id)

            this.$router.push('/marketing/pay_bill/user_detail/' + this.$route.params.activity_code + '/' + id)

        }

    },







    components: {
        BreadCrumb
        // formlist
    },
    mounted() {

    },
    created() {

        let params = this.$route.params;
        console.log(params)
        if (Object.keys(params).length) {
            this.$axios.post("/api/admin/activity/beautifulWinning ", params).then(res => {
                if (res.data.code == 0) {
                    this.info = res.data.data;
                }
            })
        }

    }
};
</script>
<style scoped>
.padding20 {
    padding: 20px;
    position: relative;
}

.destext {
    font-size: 14px;
    color: #666;
    padding: 10px 0
}

.action_btn {
    position: absolute;
    right: 10px;
    top: 20px;
}
</style>