const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const CartItemSchema = new Schema({
		session_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "shopping_sessions"
		},
		product_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "products"
		},
		quantity: {
				type: Number,
				default: 0
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});


module.exports = {CartItemSchema};
