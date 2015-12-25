(function(){

	

	var TestClass=React.createClass({
		getInitialState:function(){
			return {
				status:"hide",
				color:"#f33"
			}
		},
		render:function(){
			return (
				<div className={this.state.status} style={{color:this.state.color}}>
					{this.state.color}
				</div>
			)
		}
	});

	React.render(<TestClass />,document.getElementById("testClass"))



})();