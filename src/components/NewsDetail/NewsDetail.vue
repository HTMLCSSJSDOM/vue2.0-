<template>
	<div class='tmpl'>
		<nav-bar :title="title" />
		<div class='news-title'>
			<p>{{ newsDetail.title }}</p>
			<div>
				<span>{{  newsDetail.click }}</span>
				<span>分类</span>
				<span>{{  newsDetail.add_time | convertTime('YYYY-MM-DD') }}</span>
			</div>
		</div>
		<!-- v-html的值不会作为Vue的模板进行编译，所以style里的样式不会应用到v-html中，一般在全局样式中编写,并且是在updated时才存在，mounted时是没进行装载的 -->
		<div class='news-content' v-html="newsDetail.content">新闻明细</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				newsDetail: {},
				title: ''
			}
		},
		/*mounted(){
			console.log(document.querySelectorAll('.news-content > p')[0],1)
		},
		beforeUpdate(){
			console.log(document.querySelectorAll('.news-content > p')[0],2)
		},
		updated(){
			console.log(document.querySelectorAll('.news-content > p')[0],1)
		},*/
		// 路由确认前,to是运用这个组件的路由,from是从哪个组件来的
		beforeRouteEnter(to,from,next){
			console.log(typeof from.name)
				let title = ''
				if(from.name === 'null'){
						if(to.name === 'news.detail'){
							title = '新闻详情'
						}else if(to.name === 'goods.info'){
							title = '商品图文介绍'
						}
				}else if(from.name === 'news.list'){
					title = ' 新闻详情'
				}else if(from.name === 'goods.detail'){
					title = '商品图文介绍'
				}
				//最终都会放行，vm为未来此组件对象的this
					next(vm => {
						vm.title = title
					})
		},
		created(){

			// 获取路由查询字符串参数query的
			let id = this.$route.query.id
			this.$axios.get('getnew/'　+ id).then(res=>{
				this.newsDetail = res.data.message[0]
			}).catch(err=>console.log(err))
		}
	}
</script>

<style scoped> 

	.news-title p{
		font-size: 20px;
		font-weight: bold;
		color: #0a87f8;
	}
	.news-title span{
		margin-left: 30px;
	}
	.news-title{
		margin-top: 5px;
		border-bottom: 1px solid rgba(0,0,0,.2);
	}
	/*主题文章的左右距离*/
	.news-content{
		padding: 10px 5px ;
	}
</style>
