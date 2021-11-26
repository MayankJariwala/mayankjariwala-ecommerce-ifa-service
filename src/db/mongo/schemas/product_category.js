const uuid = require("uuid");
const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const ProductCategorySchema = new Schema({
		category_id: {
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


module.exports = {ProductCategorySchema};
