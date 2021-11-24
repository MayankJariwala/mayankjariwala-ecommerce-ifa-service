const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const UserAddressSchema = new Schema({
		user_id: String,
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


module.exports = {UserAddressSchema};
