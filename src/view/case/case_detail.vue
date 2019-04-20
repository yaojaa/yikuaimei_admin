<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-status">
                    <span>状态：</span><span class="f18 bold">{{'审核状态 待审核 审核通过 审核不通过'.split(' ')[info.review_status]}}</span>
                </div>
                <div class="panel-heading">
                    <div class="panel-title bold">发布人信息:</div>
                </div>
                <div class="panel-body info-box" v-if="info.create_user!=undefined">
                    <!-- 解决数据渲染成功但是报错问题 解决办法：增加if判断如上 -->
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">发布人：</el-col>
                        <el-col :span=20 class="bd">{{info.create_user.shop_account_name}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">发布人职务：</el-col>
                        <el-col :span=20 class="bd">{{info.create_user.shop_account_melevel_name}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">发布门店：</el-col>
                        <el-col :span=20 class="bd">{{info.create_user.shop_name}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">创建时间：</el-col>
                        <el-col :span=20 class="bd">{{info.create_time}}</el-col>
                    </el-row>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <div class="panel-title bold">顾客信息:</div>
                </div>
                <div class="panel-body info-box" v-if="info.user_info!=undefined">
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">姓名:</el-col>
                        <el-col :span=20 class="bd">{{info.user_info.user_name}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">电话:</el-col>
                        <el-col :span=20 class="bd">{{info.user_info.user_phone}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">出生日期:</el-col>
                        <el-col :span=20 class="bd">{{info.user_info.user_birth}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">身高:</el-col>
                        <el-col :span=20 class="bd">{{info.user_info.user_height}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">体重:</el-col>
                        <el-col :span=20 class="bd">{{info.user_info.user_weight}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">职业:</el-col>
                        <el-col :span=20 class="bd">{{info.user_info.user_job}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">皮肤现状:</el-col>
                        <el-col :span=20 class="bd">{{info.user_info.skin}}</el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">Before:</el-col>
                        <el-col :span=20 class="bd">
                            <img width="500" :src="info.user_info.pic_before" />
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">After:</el-col>
                        <el-col :span=20 class="bd">
                            <img width="500" :src="info.user_info.pic_after" />
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="panel info-box" v-if="info.report!=undefined">
                <div class="panel-heading">
                    <div class="panel-title bold">检测报告:</div>
                </div>
                <div class="panel-body">
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">报告图片:</el-col>
                        <el-col :span=20 class="bd">
                            <el-row :gutter=15>
                                <el-col :span=6 v-for="(el,index) in info.report" :key="index">
                                    <img :src="el" class="w-full" />
                              </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="panel info-box" v-if="info.expert_suggest!=undefined">
                <div class="panel-heading">
                    <div class="panel-title bold">案例详情:</div>
                </div>
                <div class="panel-body">
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">专家建议:</el-col>
                        <el-col :span=20 class="bd">
                            <p>{{info.expert_suggest.content}}</p>
                            <p>
                                <img v-for="(el,index) in info.expert_suggest.pic_list" width="200" :src="el" :key="index" />
                            </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">产品介绍内容:</el-col>
                        <el-col :span=20 class="bd">
                            <p>{{info.product_introduce.content}}</p>
                            <p>
                                <img v-for="(el,index) in info.product_introduce.pic_list" width="200" :src="el" :key="index" />
                            </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">操作流程内容:</el-col>
                        <el-col :span=20 class="bd">
                            <p>{{info.operate_process.content}}</p>
                            <p>
                                <img v-for="(el,index) in info.operate_process.pic_list" width="200" :src="el" :key="index" />
                            </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">操作记录内容:</el-col>
                        <el-col :span=20 class="bd">
                            <p>{{info.operate_record.content}}</p>
                            <p>
                                <img v-for="(el,index) in info.operate_record.pic_list" width="200" :src="el" :key="index" />
                </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">两次数据对比内容:</el-col>
                        <el-col :span=20 class="bd">
                            <p>{{info.data_contrast.content}}</p>
                            <p>
                                <img v-for="(el,index) in info.data_contrast.pic_list" width="200" :src="el" :key="index" />
                            </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">专家解析内容:</el-col>
                        <el-col :span=20 class="bd">
                            <p>{{info.expert_analysis.content}}</p>
                            <p>
                                <img v-for="(el,index) in info.expert_analysis.pic_list" width="200" :src="el" :key="index" />
                            </p>
                        </el-col>
                    </el-row>
                    <el-row :gutter=5>
                        <el-col :span=4 class="hd">点评师点评内容:</el-col>
                        <el-col :span=20 class="bd">
                            <p>{{info.expert_review.content}}</p>
                            <p>
                                <img v-for="(el,index) in info.expert_review.pic_list" width="200" :src="el" :key="index" />
                            </p>
                        </el-col>
                    </el-row>
                    <div class="text-center p-md">
                        <!-- <el-button size="medium" @click="review(2)">通过</el-button>
                        <el-button size="medium" type="primary" @click="review(3)">拒绝</el-button> -->
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <div class="panel-title bold">顾客评论:</div>
                </div>
                <div class="panel-body comment-panel">
                    
                    <div class="comment-item" v-for="(cm,index) in commentList" :key="cm._id">
                        <div class="comment-box">
                            <div class="hd mr-sm"><img :src="cm.user_info_user_img" width="40"  height="40" /></div>
                                <div class="bd">
                                    <div class="title f14"><span class="text-info">{{cm.user_info_user_name}}：</span><span></span>{{cm.content}}</div>
                                    <div class="photo mt-sm" v-if="cm.comment_img.length>0">
                                        <el-row :gutter=15>
                                            <el-col :span=3 v-for="(pic,index) in cm.comment_img" :key="index">
                                                <div class="mb-sm">
                                                    <img :src="pic" class="w-full" />
                                        </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="text-justify">
                                        <div class="f12 text-muted">{{cm.reply_account_reply_time}}</div>
                                        <div>
                                            <span v-if="flag">
                                                <el-button size="mini" type="0" icon="el-icon-star-off" @click="setChoice(cm.cases_comment_id)" >精选评论</el-button>
                                            </span>
                                            <span v-else>
                                                <el-button size="mini" type="0" icon="el-icon-star-off" @click="cancelChoice(cm.cases_comment_id)" >取消精选</el-button>
                                            </span>
                                            
                                            <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="reply_content_show=index" :disabled="cm.reply_status==1?true:false">回复</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="reply-box" v-if="reply_content_show==index">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reply_content">
                                </el-input>
                                <div class="text-right mt-sm">
                                    <el-button @click="reply_content_show=false">取消  
                                </el-button>
                                    <el-button @click="reply(cm.cases_comment_id)" type="primary">提交  
                                </el-button>
                                </div>
                                
                            </div>
                            <div class="reply-box" v-if="cm.reply_status==1">
                                <div class="title text-info f14">专家回复：</div>
                                <div class="reply flex mt-sm">
                                    <div class="avatar mr-sm">
                                        <img :src="cm.reply_account_shop_account_img" width="30" height="30" />
                                    </div>
                                    <div class="body flex-sub">
                                        <div class="name"><span class="f14">{{cm.reply_account_shop_account_name}} </span><span class="f12 text-purple"> ({{cm.reply_account_create_melevel_name}} )</span></div>
                                        <div class="info f14 mt-xs text-info">{{cm.reply_info_reply}}</div>
                                    </div>
                                </div>
                            </div>
                    </div>
                     
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
    data() {
        return {
             breadcrumb: [
                //面包屑
                {
                    name: "案例" //名字
                },
                {
                    name: "案例管理", //名字
                    url: "/manage/case"
                },

                {
                    name: "案例详情" //名字
                    
                }
            ],
            loading: false,
            info: {},
            reply_content: '',
            flag:true,
            reply_content_show: -1,
            commentList: []
        }
    },
    created() {
        this.getDetailInfo(this.$route.params)
        this.id = this.$route.params.id
        this.getCommentList(this.$route.params)
    },
    components: {
        BreadCrumb
       
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
        // review(status) {
        //     var tiptxt = ""
        //     if (status == 2) {
        //         tiptxt = "确定要通过审核吗？"
        //         const h = this.$createElement;
        //         this.$msgbox({
        //             title: '案例审核',
        //             message: '确定要通过审核吗？',
        //             showCancelButton: true,
        //             confirmButtonText: '确定',
        //             cancelButtonText: '取消',
        //             beforeClose: (action, instance, done) => {
        //                 if (action === 'confirm') {
        //                     // instance.confirmButtonLoading = true;
        //                     // instance.confirmButtonText = '执行中...';
        //                     this.$axios.post('/api/admin/cases/review', {
        //                             "id": this.id, //案例id
        //                             "review_status": status, //审核状态 2审核通过 3审核不通过
        //                             "reason": "没有好好填写内容" //审核不通过时，填写的原因
        //                         })
        //                         .then(res => {
        //                             if (res.data.code == 0) {
        //                                 this.$message({
        //                                     type: 'success',
        //                                     message: '操作成功'
        //                                 })
        //                             } else {
        //                                 this.$message({
        //                                     type: 'error',
        //                                     message: res.data.msg
        //                                 })
        //                             }
        //                             done()
        //                         })
        //                 } else {
        //                     done();
        //                 }
        //             }
        //         }).then(action => {})
        //     } else if (status == 3) {
        //         this.$prompt('输入拒绝理由', '提示', {
        //             confirmButtonText: '确定',
        //             cancelButtonText: '取消',
        //         }).then(({ value }) => {
        //             this.$axios.post('/api/admin/cases/review', {
        //                 "id": this.id, //案例id
        //                 "review_status": status, //审核状态 2审核通过 3审核不通过
        //                 "reason": value //审核不通过时，填写的原因
        //             }).then((res) => {
        //                 if (res.data.code == 0) {
        //                     this.$message({
        //                         type: 'success',
        //                         message: '操作成功'
        //                     })
        //                 } else {
        //                     this.$message({
        //                         type: 'error',
        //                         message: res.data.msg
        //                     })
        //                 }
        //             })
        //         }).catch(() => {
        //             // this.$message({
        //             // type: 'info',
        //             // message: '取消输入'
        //             // })
        //         })
        //     }
        // },
        getDetailInfo(id) {
            this.$axios.get('/api/admin/cases/detail', { params: id })
                .then(res => {
                    this.info = res.data.data;
                })
                
        },
        //获取案例评论
        getCommentList(id) {
            this.$axios.get('/api/admin/casescomment/index', { params: id })
                .then(res => {
                    this.commentList = res.data.data;
                    console.log(this.commentList,'this.commentList')
                })
        },
        //设置精选
        setChoice(cases_comment_id){
                const params = {
                "cases_comment_id": cases_comment_id,
                "excellent": 1
                }
                this.$axios.post("/api/admin/casescomment/setExcellent", params).then(res => {
            
                    if (res.data.code == 0) {
                        this.flag=false
                        this.$alert(res.data.data)
                    } else {
                        this.$alert(res.data.msg)
                    }

                }).catch((e) => {
                    this.$alert('操作失败' + e)
                })
            // if(!this.flag){
            
            // }else{
            
            // }

        },
        cancelChoice(cases_comment_id){
                const params = {
                "cases_comment_id": cases_comment_id,
                "excellent": 0
                }
                this.$axios.post("/api/admin/casescomment/setExcellent", params).then(res => {

                    if (res.data.code == 0) {
                        this.flag = true
                        this.$alert(res.data.data)
                    } else {
                        this.$alert(res.data.msg)

                    }

                }).catch((e) => {
                    this.$alert('操作失败' + e)
                })
        }
    }
}
</script>
<style scoped>
</style>