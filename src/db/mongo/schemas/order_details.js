const uuid = require("uuid");
const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const OrderDetailSchema = new Schema({
		order_id: {
				type: String,
				required: true,
				default: function genUUID() {
						return uuid.v4();
				}
		},
		user_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users"
		},
		total: {
				type: Number,
				default: 0
		},
		payment_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "payment_details"
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});


module.exports = {OrderDetailSchema};
