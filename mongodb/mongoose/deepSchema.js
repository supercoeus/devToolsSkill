var mongoose=require("mongoose");

var DeepSchema=new mongoose.Schema({
	name:String,
	age:Number,
	arr:Array,
	obj:mongoose.Schema.Types.Mixed
});

module.exports=DeepSchema;