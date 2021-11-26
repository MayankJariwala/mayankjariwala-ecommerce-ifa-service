const _ = require("lodash");
const mongoose = require("mongoose");
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
		expiry_month: {
				type: Number,
				required: [true, "Card Expiry Month is required"]
		},
		expiry_year: {
				type: Number,
				required: [true, "Card Expiry Year is required"]
		},
		cvv: {
				type: String,
				required: [true, "Card CVV is required"],
				unique: [true, "Card CVV is already use by other card"]
		}
}, {
		useNestedStrict: true,
		timestamps: true
}).index({
		type: 1
});


UserPaymentSchema.path("user_id").validate(async function (v) {
		const {users} = require("src/db/mongo/schema_registry");
		const isUserExists = await users.exists({_id: v});
		if (!isUserExists) {
				throw  new Error("User not found");
		}
		return true;
}, "User not found");

UserPaymentSchema.path("card_number").validate(async function (v) {
		const {user_payments} = require("src/db/mongo/schema_registry");
		const isCardExists = await user_payments.exists({"card_number": v});
		if (isCardExists) {
				throw  new Error("Card already Exists");
		}
		return true;
}, "Card already exists");

UserPaymentSchema.path("card_number").validate(function (v) {
		const valid = require("card-validator");
		const numberValidation = valid.number(v);
		if (!numberValidation.isValid) {
				throw new Error("Card number is not valid");
		}
		return true;
}, "Card number is not valid");

UserPaymentSchema.path("cvv").validate(async function (v) {
		const {user_payments} = require("src/db/mongo/schema_registry");
		const valid = require("card-validator");
		const cvvValidation = valid.cvv(v);
		if (!cvvValidation.isValid) {
				throw new Error("Card CVV is not valid");
		}
		const isCvvExists = await user_payments.exists({"cvv": v});
		if (isCvvExists) {
				throw  new Error("Card CVV already Exists");
		}
		return true;
}, "Card CVV is not valid");

UserPaymentSchema.path("expiry_month").validate(function (v) {
		if (isNaN(v)) {
				throw new Error("Card expiry month is not a number");
		}
		if (v.toString().length !== 2) {
				throw new Error("Card expiry year should be in mm format");
		}
		if (v > 12 || v < 1) {
				throw new Error("Card expiry year is not valid");
		}
		return true;
}, "Card expiry month  is not valid");

UserPaymentSchema.path("expiry_year").validate(function (v) {
		if (isNaN(v)) {
				throw new Error("Card expiry year is not a number");
		}
		if (v.toString().length !== 4) {
				throw new Error("Card expiry year should be in yyyy format");
		}
		const year = new Date().getFullYear();
		if (v < year) {
				throw new Error("Card expiry year is not valid");
		}
		return true;
}, "Card expiry year is not valid");


module.exports = {UserPaymentSchema};
