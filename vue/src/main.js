import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";


import App from "./App";

import Goods from "components/goods/goods.vue";
import Ratings from "components/ratings/ratings.vue";
import Seller from "components/seller/seller.vue";

console.log(Goods);

Vue.use(VueRouter);
Vue.use(VueResource);


const routes=[
	{path:"/goods",component:Goods},
	{path:"/ratings",component:Ratings},
	{path:"/seller",component:Seller}
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

