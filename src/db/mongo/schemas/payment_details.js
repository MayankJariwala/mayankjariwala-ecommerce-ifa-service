const _ = require("lodash");
const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const PaymentDetailSchema = new Schema({
		order_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "orders"
		},
		payment_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "user_payments"
		},
		amount: {
				type: Number,
				required: [true, "Amount is required"]
		},
		provider: {
				type: String,
				required: [true, "Provider is required"]
		},
		status: {
				type: String,
				enum: {
						values: [
								"Canceled_Reversal",
								"Created",
								"Denied",
								"Expired",
								"Failed",
								"Pending",
								"Refunded",
								"Processed"
						],
						message: "{VALUE} is not supported"
				}
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});


PaymentDetailSchema.path("order_id").validate(function (v) {
		return _.$isEmpty(v);
}, "Order Reference Id is missing");

PaymentDetailSchema.path("payment_id").validate(function (v) {
		return _.$isEmpty(v);
}, "Payment Reference Id is missing");


module.exports = {PaymentDetailSchema};
