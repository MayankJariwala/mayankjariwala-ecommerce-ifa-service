const mongoose = require("mongoose");
const {GeneralValidationException} = require("src/exceptions/validation_exception");
const {Schema} = mongoose;


const OrderItemSchema = new Schema({
		order_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "orders",
				required: true
		},
		product_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "products",
				required: true
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

OrderItemSchema.path("product_id").validate(async function (v) {
		const {products} = require("src/db/mongo/schema_registry");
		const isProductExists = await products.exists({_id: v});
		if (!isProductExists) {
				throw  new GeneralValidationException(`Product ${v} not found`);
		}
}, "Product not found");

module.exports = {OrderItemSchema};
