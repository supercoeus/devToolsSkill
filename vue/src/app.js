
// require("../build/css/_ignore/base.scss");
import Vue from "../public/js/plugins/vue.js";
import VueRouter from "../public/js/plugins/vue-router.2.1.1.js";
import App from "./App.vue";


new Vue({
	el:"#box",
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

