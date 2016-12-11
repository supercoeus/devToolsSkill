
<template>
	<div class="shop-cart-wraper">
		<div class="cart-logo">
			<p class="pos-rel">
				<span class="iconfont icon-gouwuche icon-logo" :class="{'active':count>0}"></span>
				<label class="count" v-text="count" v-show="count>0"></label>
			</p>
		</div>
		<p class="cart-money" :class="{'active':acount>0}">
			¥<span  v-text="acount"></span>
		</p>
		<p class="cart-tip" >
			<label v-show="acount<minAcount">
				另需配送费<span v-text="deliveryPrice"></span>元
			</label>
		</p>
		<p class="cart-buy" :class="{'active':acount>=minAcount}">
			{{payMsg}}
		</p>
	</div>
</template>

<script >
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		props:{
			deliveryPrice:{
				type:Number
			},
			minAcount:{
				type:Number
			},
			selectedFoods:{
				type:Array,
				default:function(){
					return [];
				}
			}
		},
		created(){
			console.log(this.selectedFoods);
		},
		computed:{
			count(){
				var count=0;
				var selectedFoods=this.selectedFoods;
				for(var i=0;i<selectedFoods.length;i++){
					count+=selectedFoods[i].selectedNum||0;
				}
				// count=1;
				return count;
			},
			acount(){
				var acount=0;
				var selectedFoods=this.selectedFoods;
				for(var i=0;i<selectedFoods.length;i++){
					var food=selectedFoods[i];
					acount += food.selectedNum * food.price;
				}
				// acount=20;
				var acountStr=acount+"";

				if( (acountStr.split(".")[1]+"").length>1){
					acount=acount.toFixed(1);
				}
				return acount;
			},
			payMsg(){
				if(!this.acount){
					return `¥${this.minAcount}元起送`;
				}
				else{
					if(this.acount<this.minAcount){
						var diff=this.minAcount - this.acount;
						var diffStr=diff+"";

						if( (diffStr.split(".")[1]+"").length>1){
							diff=diff.toFixed(1);
						}
						return ` 还差¥${diff}元起送`;
					}
					else{
						return "结算";
					}
				}
			}
		}
	}
</script>

<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";
	@import "../../../build/css/_ignore/theme.scss";


	
	@include DPR(".shop-cart-wraper  .icon-logo",28px);
	@include DPR(".shop-cart-wraper  .cart-money",16px);
	@include DPR(".shop-cart-wraper  .cart-logo .count",12px);

	.shop-cart-wraper{
		$h:pxToRem(100);
		position: fixed;
		width: 100%;
		height: pxToRem(100);
		background-color: #14172c;
		bottom: 0;
		display: flex;
		.cart-logo{
			width: $h * 1.4;
			height: $h * 1.4;
			
			@include boxSizing(border-box);
			padding:pxToRem(20);
			/*position: absolute;*/
			/*bottom: 0;*/
			p{
				width: 100%;
				height: 100%;
				background-color: #14172c;
				position: relative;
				bottom: pxToRem(60);
				padding: pxToRem(20);
				@include borderRadius(50%);
				.icon-logo{
					display: block;
					width: 100%;
					height: 100%;
					background-color: #2b343d;
					@include borderRadius(50%);
					text-align: center;
					line-height: pxToRem(100);
					color: #808589;
					&.active{
						background-color: $theme-blue;
						color: #fff;
					}
				}
				.count{
					$lh:pxToRem(30);
					position: absolute;
					top: 0;
					right: 0;
					display: block;
					line-height: $lh;
					text-align: center;
					background-color: $theme-red;
					color: #fff;
					@include borderRadius($lh / 2);
					padding:0 pxToRem(15);
				}
			}
		}
		.cart-money{
			$color:#2b343d;
			margin:pxToRem(20);
			line-height: pxToRem(60);
			border-right: 1px solid $color;
			padding:0 pxToRem(30);
			color:#41474f;
			&.active{
				color: #e8e8e8;
			}
			span{
				margin-left:pxToRem(5); 
			}
		}
		.cart-tip{
			line-height: $h;
			flex: 1;
			color: #999;
		}
		.cart-buy{
			line-height: $h;
			width: pxToRem(180);
			text-align: center;
			background-color: #2b343b;
			color: #808589;
			&.active{
				background-color: $theme-green;
				color: #fff;
			}
		}
	}

	
</style>
