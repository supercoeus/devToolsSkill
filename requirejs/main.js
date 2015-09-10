require.config({
	"baseUrl":"public",
	"paths":{
		"jquery":["jquery-1.11.3"],
		"person":["persons"],
		"student":["students"]
	}
});


require(["jquery"],function($){
	alert($("li").length);
});

require(["jquery","person"],function($,persons){
	alert(persons.name);
});

require(["student"],function(students){
	alert(students.students);
});