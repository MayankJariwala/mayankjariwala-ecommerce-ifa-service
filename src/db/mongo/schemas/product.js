const _ = require("lodash");
const uuid = require("uuid");
const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const ProductSchema = new Schema({
		product_id: {
				type: String,
				required: true,
				default: function genUUID() {
						return uuid.v4();
				}
		},
		name: {
				type: String,
				required: [true, "Product name is required"]
		},
		description: String,
		images: [
				{
						type: String,
						required: false
				}
		],
		sku: {
				type: String,
				required: [true, "sku is required"]
		},
		category_id: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: "product_categories",
				required: true
		}],
		price: {
				type: Number,
				required: [true, "Product Price is required"]
		},
		quantity: {
				type: Number,
				default: 0
		},
		deleted_at: {
				type: Date,
				required: false
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});

ProductSchema.path("category_id").validate(async function (v) {
		if (v.length <= 0) {
				throw  new Error("Product should belong to at least one category");
		}
		const {product_categories} = require("src/db/mongo/schema_registry");
		const isCategoryExists = await product_categories.exists({_id: v});
		if (!isCategoryExists) {
				throw  new Error("Category not found");
		}
}, "Product should belong to category");


module.exports = {ProductSchema};
