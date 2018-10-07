<template>

		<mt-swipe :auto="4000">
	        <mt-swipe-item v-for="(item,index) in imgs" :key="index">
	        	<img :src="item.img || item.src" alt="">
	        </mt-swipe-item>
    	 </mt-swipe>

</template>

<script type="text/javascript">
	export default {
		name: 'my-swipe',
		props: ["url"],
		data(){
			return {
				imgs: []
			}
		},
		created(){
			
			this.$axios.get(this.url).then(res=>{
				this.imgs = res.data.message
			}).catch(err=>console.log('首页或者商品详情轮播图获取异常',err))
		}
	}
</script>

<style scoped>
	.mint-swipe{

		height: 200px;
	}
	img{
		width: 100%;
		height: 100%;
	}
</style>
