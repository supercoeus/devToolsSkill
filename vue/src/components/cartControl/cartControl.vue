
<template>
	<div class="cart-wraper">
		<transition name="slide-decrease">
			<span v-show="goods.selectedNum>0" 
					class="decrease iconfont icon-tubiao fn-fl" 
					v-on:click="decreaseFoods(goods)">
			</span>
		</transition>
		<transition name="slide-text">
			<span v-show="goods.selectedNum>0" class="count fn-fl" v-text="goods.selectedNum"></span>
		</transition>
		<span class="add iconfont icon-icontianjia01 fn-fl" v-on:click="addFoods(goods)"></span>
	</div>
</template>

<script >
	import Vue from "vue";
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			addFoods:function(good){
				if(!good.selectedNum){
					Vue.set(this.goods,"selectedNum",1);
				}
				else{
					Vue.set(this.goods,"selectedNum",this.goods.selectedNum+1);
				}
			},
			decreaseFoods(good){
				if(good.selectedNum>0){
					Vue.set(this.goods,"selectedNum",this.goods.selectedNum-1);
				}
			}
		},
		props:{
			goods:{
				type:Object,
				default:function(){
					return {};
				}
			}
		}
	}
</script>

<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";
	@import "../../../build/css/_ignore/theme.scss";


	@include DPR(".cart-wraper  span",20px);
	@include DPR(".cart-wraper  .count",16px);

	.cart-wraper{
		span{
			bottom:0;
			$size:pxToRem(40);
			display: inline-block;
			margin:0 pxToRem(10);
			line-height: $size;
			text-align: center;
			&.decrease{
				color:$theme-blue;
				z-index: 1;
				opacity:1;
			}
			&.count{
				opacity: 1;
				z-index: 2;
			}
			&.add{
				color: $theme-blue;
				z-index: 3;
			}
		}
	}
	
	.slide-decrease-enter-active,.slide-decrease-leave-active{
		transition:all ease 400ms;
	}
	.slide-decrease-enter-active{
		opacity:1;
		transform:translate3d(- pxToRem(0),0,0) rotate(-360deg);
	}
	.slide-decrease-leave-active{
		opacity:1;
		transform:translate3d(pxToRem(100),0,0)  rotate(0deg);
	}
	
	.slide-decrease-enter{
		opacity:0;
		transform:translate3d(pxToRem(100),0,0)  rotate(0deg);
	}
	


	.slide-text-enter-active,.slide-text-leave-active{
		transition:all ease 400ms;
	}

	.slide-text-leave-active{
		opacity:0;
		transform:translate3d(pxToRem(50),0,0);
	}
	.slide-text-enter-active{
		opacity:1;
		transform:translate3d(0,0,0);
	}
	.slide-text-enter{
		opacity:0;
		transform:translate3d(pxToRem(50),0,0);
	}
</style>
