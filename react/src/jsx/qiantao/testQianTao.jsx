//组件嵌套   子组件和父组件如何互相通信
(function(){

	var ComponentList=React.createClass({
		getInitialState:function(){
			return {
				options:[
					{name:"习大大1"},
					{name:"彭麻麻"}
				]
			}
		},
		render:function(){
			return (
				<div>
					{this.state.options.map(function(item,index){

						return <li>{item.name}</li> 
					})}
					{this.props.lists.map(function(item,index){

						return <li>{item}</li> 
					})}
				</div>
			);
		}
	});

	var ComponentFooter=React.createClass({
		render:function(){
			return (
				<div>
					footer
				</div>
			);
		}
	});

	var ComponentBox=React.createClass({
		getInitialState:function(){
			return {
				status:true,
				color:"#f33"
			};
		},
		handleClickChild:function(){
			
		},
		render:function(){

			return (
				<div>
					<h3 style={this.state}>ComponentBox-header</h3>

					<p>ComponentList-hender</p>
					<ComponentList lists={["props里面的数据1","b","c"]} />
					<p>ComponentFooter-fooder</p>
					<ComponentFooter />
				</div>
			);
		}
	});


	React.render(<ComponentBox />,document.getElementById("container"));
})();