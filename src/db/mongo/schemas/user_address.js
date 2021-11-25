const _ = require("lodash");
const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const UserAddressSchema = new Schema({
		user_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
				required: true
		},
		address_line_1: {
				type: String,
				required: [true, "Address line 1 is required"]
		},
		address_line_2: String,
		city: {
				type: String,
				required: [true, "City is required"]
		},
		postal_code: {
				type: String,
				required: [true, "Postal code is required"]
		},
		country: {
				type: String,
				required: [true, "Country is required"]
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});

UserAddressSchema.path("user_id").validate(function (v) {
		return _.$isEmpty(v);
}, "Address should belong to user (User reference is missing)");


module.exports = {UserAddressSchema};
