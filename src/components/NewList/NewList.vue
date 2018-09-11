<template>
	<div>
		<nav-bar title="新闻列表" />
		<ul>
			<li v-for='news in newsList' :key="news.id">
				<router-link :to="{name: 'news.detail',query: {id: news.id}}">
					<img :src="news.img_url">
					<div>
						<p>{{ news.title }}</p>
						<div>
							<p>点击数:{{ news.click }}</p>
							<p>发表时间: {{ news.add_time | convertTime('YYYY-MM-DD')}}</p>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
	
</template>

<script type="text/javascript">
	export default {
		data(){
			return{
				newsList: [] //新闻列表
			}
		},
		//适合操作数据
		created(){
			this.$axios.get('getnewsList').then(res => {
					this.newsList = res.data.message
			}).catch(err => console.log('新闻列表异常'))
		}
	}
</script>

<style scoped>
	ul > li > a{
		display: block;
	}
	img{
		width: 50px;
		height: 50px;
		margin-top: 12.5px;
		vertical-align: middle;
	}
	img + div{
		display: inline-block;
		width: 300px;
		text-indent: 5px;
		vertical-align: middle;
	}
	img + div > div{
		overflow: hidden;
	}
	img  + div > div > p{
		float: left;
		padding-left: 5px;
	}
	img + div > div > p:nth-child(2){
		padding-left: 30px;
	}
</style>
