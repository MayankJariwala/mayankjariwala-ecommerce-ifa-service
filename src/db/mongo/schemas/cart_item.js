const mongoose = require("mongoose/index");
const {GeneralValidationException} = require("src/exceptions/validation_exception");
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
		},
		price: {
				type: Number,
				default: 0
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});


CartItemSchema.path("session_id").validate(async function (v) {
		const {shopping_sessions} = require("src/db/mongo/schema_registry");
		const isSessionExists = await shopping_sessions.exists({"_id": v});
		if (!isSessionExists) {
				throw new GeneralValidationException(`Session id: ${v} not exists`);
		}
		return true;
}, "Session not exists");

CartItemSchema.path("product_id").validate(async function (v) {
		const {products} = require("src/db/mongo/schema_registry");
		const isProductExists = await products.exists({_id: v});
		if (!isProductExists) {
				throw new GeneralValidationException("Product not found");
		}
		return true;
}, "Product not found");


module.exports = {CartItemSchema};
