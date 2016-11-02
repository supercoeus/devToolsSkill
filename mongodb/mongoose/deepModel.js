var mongoose=require("mongoose");
var DeepSchema=require("./deepSchema.js");
var DeepModel=mongoose.model("deepData",DeepSchema);

module.exports=DeepModel;