const mongoose = require("mongoose/index");
const {Schema} = mongoose;


const ShoppingSessionSchema = new Schema({
		user_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
				required: true
		},
		total: {
				type: Number,
				default: 0
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});

ShoppingSessionSchema.path("user_id").validate(async function (v) {
		if (v.toString().length === 0) {
				throw new Error("Session should belong to user (User reference is missing)");
		}
		const {users, shopping_sessions} = require("src/db/mongo/schema_registry");
		const isUserExists = await users.exists({_id: v});
		if (!isUserExists) {
				throw  new Error("User not found");
		}
		const isSessionExists = await shopping_sessions.exists({"user_id": v});
		if (isSessionExists) {
				throw new Error("Session already exists");
		}
		return true;
}, "Session should belong to user (User reference is missing)");


module.exports = {ShoppingSessionSchema};
