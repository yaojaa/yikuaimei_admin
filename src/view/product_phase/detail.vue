<template>
 <div class="page">
        <div class="page-header">
         <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> 
        </div> 

        <div class="page-content">

            <h3 class="p-xl">{{d.purchase_status_name}}</h3>

        	<div class="panel">
        		<div  class="panel-heading">
        			<h3  class="panel-title">• 基本信息</h3>
        		</div> 
        		<div class="panel-body">

        			<div class="info_p">
        		    <p>采购人员：{{d.shop_user_name}}</p>

                    <p>联系电话：{{d.shop_user_phone}}</p>

                    <p>采购时间：{{d.purchase_ctime}}</p>

                    <p>提成归属： <span v-for="s in d.recipients"> {{s}} </span></p>
        			</div>
				
        		</div>
        	</div>


        	<div class="panel">
        		<div  class="panel-heading">
        			<h3  class="panel-title">订单信息</h3>
        		</div> 
        		<div class="panel-body">

        			<div class="order_item">
        			
        					
        					<div class="flex_box" :key="index" v-for="(item,index) in d.goods_list">
                                    <p class="cell_item"><img width="50" height="50" :src="item.goods_img" /> {{item.goods_name}}</p> 
                                          <p class="cell_item">
                                            <span v-for="t in item.sku_type"> {{t}} </span>
                                          </p>

                                            <p class="cell_item">价格：¥{{item.goods_price}} ×{{item.goods_num}}</p>

                            </div>


							<div class="total f14">


							订单总原价：¥{{d.purchase_price}}元

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
				    url: '/api/admin/purchase/info',
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
	border: 1px solid #eee;
    text-align: center;
    padding: 30px
}
.total{
    text-align: right;
    padding: 10px
}

</style>
