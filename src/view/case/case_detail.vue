<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>案例</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-status">
                    <span>状态：</span><span class="f18 bold">{{'审核状态 待审核 审核通过 审核不通过'.split(' ')[info.review_status]}}</span>
                </div>
                <div class="panel-heading">
                    <h3 class="panel-title">发布人信息:</h3>
                </div>
                <div class="panel-body">
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">发布人：</el-col>
                        <el-col :span=18 class="bd">{{info.create_user_shop_account_name}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">发布人职务：</el-col>
                        <el-col :span=18 class="bd">{{info.create_user_shop_account_melevel_name}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">发布门店：</el-col>
                        <el-col :span=18 class="bd">{{info.create_user_shop_name}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">创建时间：</el-col>
                        <el-col :span=18 class="bd">{{info.create_time}}</el-col>
                    </el-row>
                </div>
            </div>
            <div class="panel">
                <div class="panel-body info-box">
                    <h3>顾客信息:</h3>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">姓名:</el-col>
                        <el-col :span=18 class="bd">{{info.user_info_user_name}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">电话:</el-col>
                        <el-col :span=18 class="bd">{{info.user_info_user_phone}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">出生日期:</el-col>
                        <el-col :span=18 class="bd">{{info.user_info_user_birth}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">身高:</el-col>
                        <el-col :span=18 class="bd">{{info.user_info_user_height}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">体重:</el-col>
                        <el-col :span=18 class="bd">{{info.user_info_user_weight}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">职业:</el-col>
                        <el-col :span=18 class="bd">{{info.user_info_user_weight}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">皮肤现状:</el-col>
                        <el-col :span=18 class="bd">{{info.user_info_skin}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">Before:</el-col>
                        <el-col :span=18 class="bd">
                            <img width="500" :src="info.user_info_pic_before" />
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">After:</el-col>
                        <el-col :span=18 class="bd">
                            <img width="500" :src="info.user_info_pic_after" />
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">检测报告:</el-col>
                        <el-col :span=18 class="bd">
                            <img v-for="(el,index) in info.report" width="500" :src="el" />
                       </el-col>
                    </el-row>
                    <h3>案例详情:</h3>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">专家建议:</el-col>
                        <el-col :span=18 class="bd">
                            <p>{{info.expert_suggest_content}}</p>
                            <p>
                                <img v-for="(el,index) in info.expert_suggest_pic_list" width="200" :src="el" />
                </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">产品介绍内容:</el-col>
                        <el-col :span=18 class="bd">
                            <p>{{info.product_introduce_content}}</p>
                            <p>
                                <img v-for="(el,index) in info.product_introduce_pic_list" width="200" :src="el" />
                </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">操作流程内容:</el-col>
                        <el-col :span=18 class="bd">
                            <p>{{info.operate_process_content}}</p>
                            <p>
                                <img v-for="(el,index) in info.operate_process_pic_list" width="200" :src="el" />
                </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">操作记录内容:</el-col>
                        <el-col :span=18 class="bd">
                            <p>{{info.operate_record_content}}</p>
                            <p>
                                <img v-for="(el,index) in info.operate_record_pic_list" width="200" :src="el" />
                </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">两次数据对比内容:</el-col>
                        <el-col :span=18 class="bd">
                            <p>{{info.data_contrast_content}}</p>
                            <p>
                                <img v-for="(el,index) in info.data_contrast_pic_list" width="200" :src="el" />
                </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">专家解析内容:</el-col>
                        <el-col :span=18 class="bd">
                            <p>{{info.expert_analysis_content}}</p>
                            <p>
                                <img v-for="(el,index) in info.expert_analysis_pic_list" width="200" :src="el" />
                </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">点评师点评内容:</el-col>
                        <el-col :span=18 class="bd">
                            <p>{{info.expert_review_content}}</p>
                            <p>
                                <img v-for="(el,index) in info.expert_review_pic_list" width="200" :src="el" />
                </p>
                        </el-col>
                    </el-row>
                    <button @click="review(2)">通过</button>
                    <button @click="review(3)">拒绝</button>
                    <h3>顾客评论:</h3>
                    <div class="commentList">
                        <ul>
                            <li v-for="(cm,index) in commentList" :key="cm._id">
                                <span v-for="img in cm.comment_img">
                        <img width="100" :src="img" />
                    </span>
                                <p>{{cm.content}}</p>
                                <el-button type="info" @click="reply_content_show=index">回复</el-button>
                                <div v-if="reply_content_show==index">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reply_content">
                                    </el-input>
                                    <el-button @click="reply(cm.cases_comment_id)" type="success">提交
                                    </el-button>
                                </div>
                                <hr>
                                <h5>专家回复：</h5>
                                <p> {{cm.reply_account_shop_account_name}} ({{cm.reply_account_create_melevel_name}} )
                                </p>
                                <p>{{cm.reply_info_reply}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            info: {},
            reply_content: '',
            reply_content_show: -1,
            commentList: []
        }
    },
    created() {
        this.getDetailInfo(this.$route.params)
        this.id = this.$route.params.id
        this.getCommentList(this.$route.params)
    },
    computed: {},
    mounted() {},
    methods: {
        //发表回复
        reply(id) {
            this.$axios.post('/api/admin/casescomment/reply ', {
                "cases_comment_id": id,
                "reply": this.reply_content,
            }).then((res) => {
                if (res.data.code == 0) {
                    this.$message('发布成功！')
                    this.reply_content = ''
                    this.reply_content_show = -1
                } else {
                    this.$message(res.data.msg)
                }
            })
        },
        //审核
        review(status) {
            var tiptxt = ""
            if (status == 2) {
                tiptxt = "确定要通过审核吗？"
                const h = this.$createElement;
                this.$msgbox({
                    title: '案例审核',
                    message: '确定要通过审核吗？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            // instance.confirmButtonLoading = true;
                            // instance.confirmButtonText = '执行中...';
                            this.$axios.post('/api/admin/cases/review', {
                                    "id": this.id, //案例id
                                    "review_status": status, //审核状态 2审核通过 3审核不通过
                                    "reason": "没有好好填写内容" //审核不通过时，填写的原因
                                })
                                .then(res => {
                                    if (res.data.code == 0) {
                                        this.$message({
                                            type: 'success',
                                            message: '操作成功'
                                        })
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: res.data.msg
                                        })
                                    }
                                    done()
                                })
                        } else {
                            done();
                        }
                    }
                }).then(action => {})
            } else if (status == 3) {
                this.$prompt('输入拒绝理由', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$axios.post('/api/admin/cases/review', {
                        "id": this.id, //案例id
                        "review_status": status, //审核状态 2审核通过 3审核不通过
                        "reason": value //审核不通过时，填写的原因
                    }).then((res) => {
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {
                    // this.$message({
                    // type: 'info',
                    // message: '取消输入'
                    // })
                })
            }
        },
        getDetailInfo(id) {
            this.$axios.get('/api/admin/cases/detail', { params: id })
                .then(res => {
                    this.info = res.data.data
                })
        },
        //获取案例评论
        getCommentList(id) {
            this.$axios.get('/api/admin/casescomment/index', { params: id })
                .then(res => {
                    this.commentList = res.data.data
                })
        },
    }
}
</script>
<style scoped>
</style>