const _ = require("lodash");
const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const UserPaymentSchema = new Schema({
		user_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
				required: true
		},
		payment_type: {
				type: String,
				enum: {
						values: ["CARD"],
						message: "{VALUE} is not supported"
				},
				default: "CARD"
		},
		provider: {
				type: String,
				required: [true, "Card Provider is required"]
		},
		card_number: {
				type: String,
				required: [true, "Card Number is required"]
		},
		expiry: {
				type: String,
				required: [true, "Card Expiry is required"]
		},
		cvv: {
				type: String,
				required: [true, "Card CVV is required"]
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});


UserPaymentSchema.path("user_id").validate(function (v) {
		return _.$isEmpty(v);
}, "Address should belong to user (User reference is missing)");


module.exports = {UserPaymentSchema};
