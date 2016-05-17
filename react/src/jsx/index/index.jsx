(function(){
	//元素操作  动画   移动端事件 怎么和react组合使用
	
	var names=["习大大","彭麻麻","王大师","哈哈哈"];
	React.render(
		<div>
		<h3>测试循环</h3>
		{
				names.map(function(item,index){
					return <li>{index+1}:{item} </li>;
				})
			}
		</div>
		
	,document.getElementById("container"));


	var Lists=React.createClass({
		getInitialState:function(){//如果是异步获取的初始状态呢  怎么搞？
			return {
				status:false,
				color:"#f33",
				wdW:window.innerWidth,
				now:new Date()
			}
		},
		handleResize:function(){//页面尺寸发生变化
			this.setState({
				wdW:window.innerWidth
			});
		},
		handleClick:function(){
			this.setState({
				status:!this.state.status
			});
			this.setProps({
				datavalue:Math.random()
			});

			// console.log(this.state);
			if(this.state.status){
				this.setState({
					color:"#f33"
				});
			}
			else{
				this.setState({
					color:"#39f"
				});
			}
		},
		handleClickSub:function(){
			console.log(21323);
		},
		handleInput:function(){
			this.setState({
				inputVal:document.getElementById("input").value
			});
		},
		componentDidMount:function(){//组件被加载到页面上后
			var _self=this;
			window.addEventListener("resize",this.handleResize);
			setInterval(function(){
				_self.setState({
					now:new Date()
				});
			},1000);

		},
		componentWillUnMount:function(){//
			window.removeEventListener("resize",this.handleResize);
			// alert("did");
		},
		set:function(val){
			return val<10?"0"+val:val;
		},
		render:function(){//render是所有方法里面最脏的一个部分  如果结构很复杂  岂不是很蛋疼
			//思想是把数据和展示完全分开  有特定的业务逻辑模块负责更新
			//this 多次嵌套后  this时终止向组件本身 this.set(this.state.now.getSeconds()) 
			// 这个不是真正意义上的多层嵌套 因为本质上是显式this
			var self=this;
			return (<div style={{color:this.state.color}} >
			<p onClick={this.handleClick}>点击我 </p>
			<p>{this.state.now.getHours()+":"+this.state.now.getMinutes()+":"+this.set(this.state.now.getSeconds())}</p>
			{this.props.datavalue}
			<br/><br/>
			<p>更改窗口大小动态显示宽度 :{this.state.wdW}</p>
			{
				this.props.options.map(function(item,index){
					return (<li onClick={this.handleClickSub}>
							<span>{index}: {item}</span>
						</li>)
				}.bind(this))//绑定this 不然里面的点击处理函数中的this会指向到window上
			}
			<input id="input" onInput={this.handleInput} />
			<span>{this.state.inputVal||"null"}</span>
			</div>)
		}
	});

	
	//这种写法的优势在哪里呢   

	React.render(<Lists datavalue="123" options={["apple","window","android"]}/>,document.getElementById("lists"));

	setTimeout(function(){
		// React.unmountComponentAtNode(document.getElementById("lists"));
		
	},5000);
})();