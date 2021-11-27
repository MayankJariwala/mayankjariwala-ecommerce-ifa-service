const uuid = require("uuid");
const mongoose = require("mongoose/index");
const {get_hash_value} = require("src/utils/helpers");
const {Schema} = mongoose;


const UserSchema = new Schema({
		accountId: {
				type: String,
				required: true,
				default: function genUUID() {
						return uuid.v4();
				}
		},
		first_name: {
				type: String,
				required: [true, "First name is required"]
		},
		last_name: {
				type: String,
				required: [true, "Last name is required"]
		},
		email: {
				type: String,
				required: [true, "Email is required"],
				unique: [true, "Email already exists"]
		},
		username: {
				type: String,
				index: true,
				required: [true, "Username is required"]
		},
		password: {
				type: String,
				required: [true, "Password is required"]
		},
		mobile: {
				type: String,
				required: [true, "Mobile is required"]
		},
		type: {
				type: String,
				enum: {
						values: ["user", "admin"],
						message: "{VALUE} is not supported"
				},
				default: "User"
		},
		session_token: {
				type: String
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

UserSchema.pre("save", function (next) {
		var user = this;
		if (!user.isModified("password")) return next();
		user.password = get_hash_value(user.password);
		next();

});

// validation
UserSchema.path("mobile").validate(function (v) {
		var re = /^\d{10}$/;
		return (v == null || v.trim().length < 1) || re.test(v);
}, "Please enter a valid phone");

UserSchema.path("email").validate(function (v) {
		var re = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return re.test(v);
}, "Please enter a valid email");


module.exports = {UserSchema};
