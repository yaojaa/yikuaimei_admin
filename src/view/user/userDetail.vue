<template>
	<div class="page">
		<div class="page-header">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<div class="user-info">
				<el-row :gutter="20">
					<el-col :span="8">
						<div class="grid-content bg-purple user-info-item user-pic">
							<div class="head-pic center">
								<img :src="info.user_info_head_img" alt="">
							</div>
							<p class="user-name center">{{info.user_info_nick_name}}</p>
							<p class="user-name center">{{Is_black[info.is_black] || '--'}}</p>
							<el-tag type="primary" :key="index" v-for="(item,index) in info.my_tags">{{item.tag_name}}</el-tag>
						</div>
					</el-col>
					<el-col :span="16">
						<div class="grid-content bg-purple user-info-item user-basic-info">
							<h4>基本信息</h4>
							<p><span class="span-label">性别：</span>{{User_sex[info.user_info_gender] || '--'}}</p>
							<p><span class="span-label">生日：</span>{{info.user_info_birthday || '--'}}</p>
							<p><span class="span-label">联系电话：</span>{{info.user_bind_phone || '--'}}</p>
							<p><span class="span-label">现住址：</span>{{info.user_info_home_detail || '--'}}</p>
							<p><span class="span-label">个人爱好：</span>{{info.my_fav || '--'}}</p>
							<p><span class="span-label">注册时间：</span>{{info.user_info_ctime}}</p>
							<p><span class="span-label">注册渠道：</span>{{User_from[info.user_from] || '--'}}</p>
							<p><span class="span-label">归属门店：</span>{{info.my_superior || '--'}}</p>
						</div>
					</el-col>
				</el-row>
			</div>
	
			<div class="black-list">
				<h4>拉黑记录</h4>
				<el-table :data="blackList" style="margin-top: 10px;width: 100%" :show-header="false">
					<el-table-column prop="black_ctime" label="拉黑日期" width="150">
					</el-table-column>
					<el-table-column prop="black_mark" label="姓名">
					</el-table-column>
					<el-table-column prop="admin_user" label="地址" width="80">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: "userDetail",
	
		components: {},
	
		data() {
			return {
				user_id: null, // 用户id
				info: {}, // 用户信息
				blackList: [], // 拉黑记录
				User_from: {
					0: '未知',
					1: '安卓平台',
					2: 'IOS平台',
					3: '微信小程序',
					4: '微信服务号',
					5: 'PC网页',
					6: '移动平台网页',
					7: '其他',
				},
				Is_black: {
					0: '未拉黑',
					1: '拉黑'
				},
				User_sex: {
					1: '男',
					2: '女'
				}
			};
		},
	
		computed: {},
	
		beforeRouteUpdate(to, from, next) {},
	
		created() {
			this.getDetailInfo({
				user_id: this.$route.params.id
			});
			this.user_id = this.$route.params.id;
		},
	
		mounted() {},
	
		methods: {
			// 获取用户信息
			getDetailInfo(params) {
				this.$axios({
						method: "get",
						url: "/api/admin/user/info",
						params: params
					})
					.then(res => {
						this.info = res.data.data
						this.blackList = res.data.data.black_list
					})
					.catch(error => {});
			}
		}
	};
</script>

<style scoped>
	.user-info {
		margin-bottom: 20px;
	}
	
	.user-info .user-info-item {
		height: 365px;
		background: #ffffff;
	}
</style>
