var mongoose    =   require("mongoose");
mongoose.connect('<your mongodb url>');
var mongoSchema =   mongoose.Schema;

var userSchema  = {

	"title": String,
	"name":String,
	"desc":String,
	"pick":String,
	"email":String,
	"phone":Number,
	"price": String,
	"category": String,
	"location":String,
	"itemImageURL" : String

};

module.exports = mongoose.model('Item',userSchema);
