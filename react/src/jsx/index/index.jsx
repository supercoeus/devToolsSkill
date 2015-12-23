(function(){

	var names=["习大大","彭麻麻","王大师","哈哈哈"];

	var Lists=React.createClass({
		getInitialState:function(){
			return {
				status:false,
				color:"#f33",
				wdW:window.innerWidth,
				now:new Date()
			}
		},
		handleResize:function(){
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
		render:function(){
			return <div style={{color:this.state.color}} onClick={this.handleClick}>
			<p>点击我 </p>
			<p>{this.state.now.getHours()+":"+this.state.now.getMinutes()+":"+this.state.now.getSeconds()}</p>
			{this.props.datavalue}
			<br/><br/>
			<p>更改窗口大小动态显示宽度:{this.state.wdW}</p>
			</div>;
		}
	});

	React.render(
		<div>{
				names.map(function(item,index){
					return <li>{index+1}:{item} </li>;
				})
			}
		</div>
		
	,document.getElementById("container"));


	React.render(<Lists datavalue="123" />,document.getElementById("lists"));

})();