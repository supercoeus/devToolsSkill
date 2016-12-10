<template>
	<div class="wraper">
		<div class="menu-wraper" ref="menuWraper">
			<ul class="menu-list">
				<li v-for="(group,index) in foodsGroupList" 
					v-text="group.label + index" 
					class="menu-item" 
					:class="{'active':index == currentIndex}">
					
				</li>
			</ul>
		</div>
		<div class="goods-wraper" ref="goodsWraper">
			<div>
				<ul v-for="(group,index) in foodsGroupList" class="food-group">
					<label v-text="group.label + index" class="food-label"></label>
					<li v-for="(list,index) in group.foodList"  class="food-item pos-rel">
						<div class="food-img">
							<img :src="list.imgSrc">
						</div>
						<div class="food-msg">
							<p v-text="list.name" class="name-line"></p>
							<p class="price-line">
								<span class="fc-red">¥</span>
								<span v-text="list.price" class="fc-red"></span>
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Bscroll from "better-scroll";
	import goodsData from "./goodsData.js";
	export default {
		data(){
			return {
				currentIndex:0,
				foodsGroupList:goodsData.foodsGroupList
			}
		},
		method:{

		},
		mounted(){
			console.log("mounted");
			this.menuScroll=new Bscroll(this.$refs.menuWraper,{
	          probeType: 3,
	          click: true
        	});

			this.goodsScroll=new Bscroll(this.$refs.goodsWraper,{
	          probeType: 3,
	          click: true
        	});

			this.menuScroll.on("scroll",(prop)=>{
				console.log(prop);
			});

		}
	}
</script>


<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";
	
	@include DPR(".wraper .menu-wraper",12px);
	.wraper{
		position: absolute;
		top:pxToRem(440);
		left:0;
		right:0;
		bottom:pxToRem(100);
		width: 100%;
		display: flex;
		overflow: hidden;
		.menu-wraper{
			flex:0 0 pxToRem(160);
			background-color: #f3f3f3;
			.menu-list{
				.menu-item{
					line-height: pxToRem(80);
					text-align: center;
					border-bottom: 1px solid #e8e8e8;
					&.active{
						background-color: #fff;
					}

				}
			}
		}
		.goods-wraper{
			flex:1;
			-webkit-flex:1;
			height: 100%;
			@include boxSizing(border-box);
			.food-group{
				.food-label{
					display: block;
					line-height: pxToRem(50);
					text-indent: pxToRem(10);
					background-color: #e8e8e8;

				}
				.food-item{
					display: flex;
					padding: pxToRem(10);
					@include boxSizing(border-box);
					border-bottom:pxToRem(1) solid #e8e8e8;
					.food-img{
						flex:0 0 pxToRem(100);
						-webkit-flex:0 0 pxToRem(100);
						margin-right: pxToRem(15);
						width: pxToRem(100);
						height:pxToRem(100);
						img{
							width: 100%;
							height: 100%;
						}
					}
					.food-msg{
						display: table;
						flex:1;
						.price-line{
							line-height: pxToRem(90);
						}
					}
				}
			}

		}
	}
	
</style>
