require.config({
	paths:{
		jquery:["jquery/jquery-1.11.3.min"],
		//school:"school",
		student:"student",
		studentA:"students/a"
	}
});



require(["jquery","student","studentA"],function($,student,studentA){
	$(function(){
		console.log(student,studentA);
	});
});