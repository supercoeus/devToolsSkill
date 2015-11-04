define(["school","students/b"],function(school,studentB){
	if(school.name){
		return {
			name:school.name+":student_1;"+"studentB:"+studentB.name,
			age:20
		}
	}
	
});