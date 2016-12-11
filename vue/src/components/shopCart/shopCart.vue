
<template>
	<div class="shop-cart-wraper">
		<div class="cart-logo">
			<p>
				<span class="iconfont icon-gouwuche icon-logo"></span>
			</p>
		</div>
		<p class="cart-money">
			¥<span  >0</span>
		</p>
		<p class="cart-tip">
			另需配送费<span v-text="deliveryPrice"></span>元
		</p>
		<p class="cart-buy">
			¥<span v-text="minAcount"></span>元起送
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
			}
		}
	}
</script>

<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";
	@import "../../../build/css/_ignore/theme.scss";


	
	@include DPR(".shop-cart-wraper  .icon-logo",28px);
	@include DPR(".shop-cart-wraper  .cart-money",16px);


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
				bottom: pxToRem(40);
				padding: pxToRem(20);
				@include borderRadius(50%);
				span{
					display: block;
					width: 100%;
					height: 100%;
					background-color: #2b343d;
					@include borderRadius(50%);
					text-align: center;
					line-height: pxToRem(100);
					color: #808589;
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
		}
	}

	
</style>
