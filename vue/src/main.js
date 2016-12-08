import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// import Goods from "components/goods/goods.vue";
// import Ratings from "components/ratings/ratings.vue";
// import Seller from "components/seller/seller.vue";

Vue.use(VueRouter);

var Goods="<h3>Goods</h3>";
var Ratings="<h3>Ratings</h3>";
var Seller="<h3>Seller</h3>";
console.log(Goods);
const routes=[
	{path:"/goods",component:{template:Goods}},
	{path:"/ratings",component:{template:Ratings}},
	{path:"/seller",component:{template:Seller}}
];
const router=new VueRouter({routes :routes });

new Vue({
	el:"#box",
	router,
	data:function(){
		return {
			name:"哈哈哈"
		}
	},
	methods:{

	},
	components:{
		App:App
	}
});

