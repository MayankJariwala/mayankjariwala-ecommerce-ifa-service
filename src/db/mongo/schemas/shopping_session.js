const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const ShoppingSessionSchema = new Schema({
		user_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users"
		},
		total: {
				type: Number,
				default: 0
		},
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});


module.exports = {ShoppingSessionSchema};
