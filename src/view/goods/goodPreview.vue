<template>
	<div class="page">
		<div class="page-header">
			<div class="crumbs">
				<bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
			</div>
		</div>
		<div class="page-content">
			<div>
				<img :src="qrCodeImg" alt="">
			</div>
			<div class="option">
				<el-button @click="$_goUpdate">返回编辑</el-button>
          		<el-button type="primary" @click="$_goList">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import BreadCrumb from "@/components/common/BreadCrumb";
	export default {
		name: "goodPreview",
		components: {BreadCrumb},
		data() {
			return {
				good_id: this.$route.query.good_id, 
				good_type: this.$route.query.good_type, 
				breadcrumb: [],
				reqParams: {
					scene: 'id='+this.$route.query.good_id+'&preview=true'
				},
				qrCodeImg: ''
			};
		},
		created() {
			if(+this.$route.query.good_type === 1) {
				this.breadcrumb = [
					{
                        name: "商品管理"
                    },
                    {
                        name: "门店服务",
                        url: "/serviceList"
					},
					{
						name: "在线预览"
					}
				];
				this.reqParams.page = 'pages/service-detail/index'
			} else if (+this.$route.query.good_type === 2) {
				this.breadcrumb = [
					{
                        name: "商品管理"
                    },
                    {
                        name: "平台商品",
                        url: "/goodList"
                    },
					{
						name: "在线预览"
					}
				];
				this.reqParams.page = 'pages/goods-detail/index'
			}
		},
		computed: {},
		mounted() {
			this.getQrCode()
		},
		methods: {
			getQrCode() {
				console.log(this.reqParams,'this.reqParams')
				this.$axios.post("/api/admin/shopgoods/getQrCode", this.reqParams).then(res => {
					console.log('res',res)
					if(res.data.code != 0){
						this.$alert(res.data.msg);
					}else{
						this.qrCodeImg = res.data.data
					}   
                });
			},
			$_goUpdate() {
				this.$router.push('/createGood?good_id='+this.good_id+'&good_type='+this.good_type)
			},
			$_goList() {
				if(+this.good_type === 1){
					this.$router.push('/serviceList')
				}else if(+this.good_type === 2){
					this.$router.push('/goodList')
				}
			},
		},
	};
</script>

<style scoped>
	
</style>
