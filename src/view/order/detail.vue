<template>
 <div class="page">
        <div class="page-header">
         <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> 
        </div> 

        <div class="page-content">

        	<div class="panel">
        		<div  class="panel-heading">
        			<h3  class="panel-title">买家信息</h3>
        		</div> 
        		<div class="panel-body">

        			<div class="info_p">
        					用户昵称：{{d.order_user_name}}<br/>

					支付方式：{{ '微信支付 银联支付 现金支付 '.split(' ')[d.pay_type]}}<br/>

					收货地址：{{d.order_user_address}}
        			</div>
				
        		</div>
        	</div>


        	<div class="panel">
        		<div  class="panel-heading">
        			<h3  class="panel-title">订单信息</h3>
        		</div> 
        		<div class="panel-body">

        			<div class="order_item">
        				<div class="order_tit">
        					订单编号:2345720005765350 下单时间：2018-10-25 10:00:00
        				</div>

        				<div class="flex_box cell">
        					
        					<div class="cell_item">
        						<div>
                                            <img src="https://fakeimg.pl/50x50/" alt="美白护手霜">
                                            <p>美白护手霜</p>
                                            <p>×1</p>
                                        </div>
        					</div>
        					<div class="cell_item">¥290.00</div>
        					<div class="cell_item">韩雪儿 13783838333</div>
        					<div class="cell_item">待发货</div>
        					<div class="cell_item">满1000减200</div>

        				</div>
        				
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

            	d:{}
            }
        },
       
        beforeRouteUpdate (to, from, next) {

        },
        created() {

        	console.log('created')
            
        },
        computed: {
           
        },
        mounted(){


        	this.getData(this.$route.params)


           
        },
        methods: {

        	getData(params){

        		this.$axios({
				    method: 'get',
				    url: '/api/admin/order/info',
				    params: params
				  }).then( (res)=> {
				  	console.log('this',this)
				  	console.log(res.data)
				    this.d = res.data.data
				  }).catch( (error)=> {
				    console.log(error);
				  });

        		
        	}


        }
    }

</script>

<style scoped>
.cell_item{
	flex: 1;
	border: 1px solid #ddd
}

</style>
