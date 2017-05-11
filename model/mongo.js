var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');

var mongoSchema =   mongoose.Schema;

var userSchema  = {

	"itemId": String,
	"itemName": String,
	"price": String,
	"category": String,
	"itemImageURL" : String

};

module.exports = mongoose.model('item',userSchema);