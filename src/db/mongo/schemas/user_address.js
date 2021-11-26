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

UserAddressSchema.path("user_id").validate(async function (v) {
		if (v.toString().length === 0) {
				throw new Error("Address should belong to user (User reference is missing)");
		}
		const {users} = require("src/db/mongo/schema_registry");
		const isUserExists = await users.exists({_id: v});
		if (!isUserExists) {
				throw  new Error("User not found");
		}
		return true;
}, "Address should belong to user (User reference is missing)");


module.exports = {UserAddressSchema};
