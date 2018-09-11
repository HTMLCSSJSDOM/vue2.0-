<template>
	<div>
		<nav-bar title="商品详情" />

		<comment :cid="$route.query.id" />
	</div>
	
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped>
	
</style>
