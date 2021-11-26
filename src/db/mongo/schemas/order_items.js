const mongoose = require("mongoose");
const {Schema} = mongoose;


const OrderItemSchema = new Schema({
		order_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "order_details",
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
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});

OrderItemSchema.path("order_id").validate(async function (v) {
		const {orders} = require("src/db/mongo/schema_registry");
		const isOrderExists = await orders.exists({_id: v});
		if (!isOrderExists) {
				throw  new GeneralValidationException(`Order ${v} not found`);
		}
}, "Order not found");

OrderItemSchema.path("product_id").validate(async function (v) {
		const {products} = require("src/db/mongo/schema_registry");
		const isProductExists = await products.exists({_id: v});
		if (!isProductExists) {
				throw  new GeneralValidationException(`Product ${v} not found`);
		}
}, "Product not found");

module.exports = {OrderItemSchema};
