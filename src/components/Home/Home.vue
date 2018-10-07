<template>
	<div>
		<my-swipe url="getlunbo" />

    	 <my-ul>
    	 	<my-li v-for="(grid,index) in grids" :key='index'>
    	 		<router-link :to='grid.router'>
    	 			<span :class='grid.className'></span>
    	 			<span>{{ grid.title }}</span>
    	 		</router-link>
    	 	</my-li>
    	 </my-ul>
	</div>
</template>

<script>
export default {
	data(){
		return {
			imgs: [],
			grids: [
			{className:'cms-news',title:'新闻资讯',router:{ name: 'news.list'}},
			{className:'cms-photo',title:'图文分享',router:{ name: 'photo.list',params:{categoryId: 0}}},
			{className:'cms-trade',title:'商品展示',router:{ name: 'goods.list',query:{id: 1}}},
			{className:'cms-message',title:'留言反馈',router:{ name: 'news.list'}},
			{className:'cms-search',title:'搜索资讯',router:{ name: 'news.list'}},
			{className:'cms-contact',title:'联系我们',router:{ name: 'news.list'}},
			]
		}
	},
     created(){
          this.$axios.get('getlunbo').then(res=>{
              this.imgs = res.data.message   //res.data返回的才是真的数据
             
            
          }).catch(err=>console.log('can not find data'))
      }
}
</script>
<style scoped>
	/*.grid{
		overflow: hidden;
		list-style: none;
		margin: 0;
		padding: 0;
	}*/
	/*.grid li{
		float: left;
		width: 33%;
		height: 100px;
		background-color: yellow;
		line-height: 100px;
	}*/
	a{
		display: block;
		text-decoration: none;
	}
	a > span:nth-child(1){
		display: block;
		margin: 0 auto;
		margin-top: 10px;
	}
	.cms-news{
		background: url('../../assets/img/news.png') center/cover no-repeat;
		width: 30px;
		height: 30px;
	}
	.cms-photo{
		background: url('../../assets/img/iamge-text.png') center/cover no-repeat;
		width: 30px;
		height: 30px;
	}
	.cms-trade{
		background: url('../../assets/img/deal.png') center/cover no-repeat;
		width: 30px;
		height: 30px;
	}
	.cms-message{
		background: url('../../assets/img/message.png') center/cover no-repeat;
		width: 30px;
		height: 30px;
	}
	.cms-search{
		background: url('../../assets/img/search.png') center/cover no-repeat;
		width: 30px;
		height: 30px;
	}
	.cms-contact{
		background: url('../../assets/img/connection.png') center/cover no-repeat;
		width: 30px;
		height: 30px;
	}
	
</style>
