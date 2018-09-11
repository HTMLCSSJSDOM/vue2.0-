let obj = {}
//商品的数据结构
/*{
	"id": 数量
}*/
//获取所有的商品
obj.getGoods = function(){
	return JSON.parse(window.localStorage.getItem('goodsList')) || {}
} 

//保存商品
obj.saveGoods = function(goodsList){
	window.localStorage.setItem('goodsList',JSON.stringify(goodsList))
}

//新增一个商品
obj.add = function(goods){
	//判断当前goodsList中是否含有该商品，有则追加,无则赋值
	let goodsList = this.getGoods()

	if(goodsList[goods.id]){
		goodsList[goods.id] += goods.num
	}else{
		goodsList[goods.id] = goods.num
	}
	//保存数据
	this.saveGoods(goodsList)
}

//删除商品
obj.del = function(goods){
	let goodsList = this.getGoods()
		delete goodsList[goods.id]
		this.saveGoods(goodsList)
}

//获取购物车数量总数
obj.getTotalCount = function(){
	let goodsList = this.getGoods()
	//获得这个goodsList对象里的属性的value值的数组
	let values = Object.values(goodsList)
	//一开始没有数据的时候
	if(values.length === 0) return 0
	return values.reduce((accumulator,currentValue,currentIndex,arr) =>{
		return accumulator + currentValue
	})
}

export default obj