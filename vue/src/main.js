import Vue from "../public/js/plugins/vue.js";
import App from "./App";


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

