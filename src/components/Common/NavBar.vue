<template>
	<div class='cms-s-header'>
		<h1 @click='goBack'>&nbsp&lt;</h1>
		<h1 class='page-title'>{{ title }}</h1>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'nav-bar',
		props: ['title'], 
		methods: {
			         //父组件可以传变量也可以传常量
			goBack(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.cms-s-header{
		height: 40px;
		background-color: #f7f7f7;
	}
	.page-title{
		margin-left: 25%;
	}
	h1,h2{
		display: inline-block;
		height: 40px;
		line-height: 40px;
	}
</style>
