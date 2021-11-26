const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const OrderDetailSchema = new Schema({
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


OrderDetailSchema.path("user_id").validate(async function (v) {
		const {users} = require("src/db/mongo/schema_registry");
		const isUserExists = await users.exists({_id: v});
		if (!isUserExists) {
				throw  new GeneralValidationException(`User ${v} not found`);
		}
}, "User not found");

OrderDetailSchema.path("payment_id").validate(async function (v) {
		const {user_payments} = require("src/db/mongo/schema_registry");
		const isPaymentExists = await user_payments.exists({_id: v});
		if (!isPaymentExists) {
				throw  new GeneralValidationException(`Payment reference ${v} not found`);
		}
}, "Payment reference not found");


module.exports = {OrderDetailSchema};
