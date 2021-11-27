const mongoose = require("mongoose/index");
const {GeneralValidationException} = require("src/exceptions/validation_exception");
const {Schema} = mongoose;


const ShoppingSessionSchema = new Schema({
		user_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
				required: true
		},
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});

ShoppingSessionSchema.path("user_id").validate(async function (v) {
		if (v.toString().length === 0) {
				throw new GeneralValidationException("Session should belong to user (User reference is missing)");
		}
		const {users, shopping_sessions} = require("src/db/mongo/schema_registry");
		const isUserExists = await users.exists({_id: v});
		if (!isUserExists) {
				throw  new GeneralValidationException("User not found");
		}
		const isSessionExists = await shopping_sessions.exists({"user_id": v});
		if (isSessionExists) {
				throw new GeneralValidationException("Session already exists");
		}
		return true;
}, "Session should belong to user (User reference is missing)");


module.exports = {ShoppingSessionSchema};
