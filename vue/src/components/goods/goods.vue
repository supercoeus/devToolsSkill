<template>
	<div>
		<div class="wraper">
			<div class="menu-wraper" ref="menuWraper">
				<ul class="menu-list">
					<li v-for="(group,index) in foodsGroupList" 
						v-text="group.label + index" 
						class="menu-item" 
						:class="{'active':index == currentIndex}"
						v-on:click="goodsGoIndex(index)">
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

								<p class="operate-line">
									<v-cartControl :goods="list" ></v-cartControl>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
		</div>
		<v-shopCart :deliveryPrice="deliveryPrice" 
					:minAcount="minAcount" 
					:selectedFoods="selectedFoods"
		>
			
		</v-shopCart>
	</div>
</template>

<script>
	import Bscroll from "better-scroll";
	import goodsData from "./goodsData.js";
	import cartControl from "components/cartControl/cartControl.vue";
	import shopCart from "components/shopCart/shopCart.vue";

	export default {
		data(){
			return {
				currentIndex:0,
				scrollY:0,
				foodsGroupHeight:[],
				foodsGroupList:goodsData.foodsGroupList,
				deliveryPrice:4,//配送费
				minAcount:20,//起送费
				// selectedFoods:[]
			}
		},
		computed:{
			selectedFoods(){
				var selectedFoodsArr=[];
				this.foodsGroupList.forEach(function(group,index){
					var group=group.foodList;
					for(var i=0;i<group.length;i++){
						if(group[i].selectedNum>0){
							selectedFoodsArr.push(group[i]);
						}
					}
				});
				console.log(selectedFoodsArr);
				// selectedFoodsArr.push({selectedNum:1,price:10});
				return selectedFoodsArr;
			},
		},
		methods:{
			_caculateIndex(){
				var self=this;
				var scrollY=this.scrollY;
				var length=this.foodsGroupHeight.length;
				for(var i=0;i<length;i++){
					var item=this.foodsGroupHeight[i];
					var itemNext=this.foodsGroupHeight[i+1];
					
					if(scrollY>=item && scrollY<=itemNext) {
						this.currentIndex=i;
						if((scrollY+this.$refs.goodsWraper.clientHeight>=this.foodsGroupHeight[length-1])){
							this.currentIndex=length-2;
						}
					}

				}
			},
			goodsGoIndex(index){
				var to= - this.foodsGroupHeight[index];
				this.goodsScroll.scrollTo(0, to,500 );
			},
			
		},
		mounted(){
			var self=this;
			console.log("mounted");
			this.menuScroll=new Bscroll(this.$refs.menuWraper,{
	          probeType: 3,
	          click: true
        	});

			this.goodsScroll=new Bscroll(this.$refs.goodsWraper,{
	          probeType: 3,
	          click: true
        	});

			this.goodsScroll.on("scroll",(prop)=>{
				this.scrollY=Math.abs( Math.round(prop.y) );
				this._caculateIndex();
			});

			var startH=0;
			self.foodsGroupHeight.push(startH);
			var groups=this.$refs.goodsWraper.getElementsByClassName("food-group");
			for(var i=0;i<groups.length;i++){
				var group=groups[i];
				var height=group.clientHeight;
				startH+=height;
				self.foodsGroupHeight.push(startH);
			}
		},
		components:{
			"v-cartControl":cartControl,
			"v-shopCart":shopCart
		}
	}
</script>


<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";
	@import "../../../build/css/_ignore/theme.scss";
	
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
						.operate-line{
							position: absolute;
							right: pxToRem(10);
							bottom:pxToRem(10);
							text-align: right;
							$size:pxToRem(60);
							height: $size;
							font-size: 0;
							
						}
					}
				}
			}

		}
	}

	
</style>
