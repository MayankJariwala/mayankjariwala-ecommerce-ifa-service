const mongoose = require("mongoose");
const {UserSchema} = require("src/db/mongo/schemas/users");
const {UserAddressSchema} = require("src/db/mongo/schemas/user_address");
const {ProductSchema} = require("src/db/mongo/schemas/product");
const {ProductCategorySchema} = require("src/db/mongo/schemas/product_category");
const {PaymentDetailSchema} = require("src/db/mongo/schemas/payment_details");
const {OrderDetailSchema} = require("src/db/mongo/schemas/order_details");
const {UserPaymentSchema} = require("src/db/mongo/schemas/user_payment");
const {CartItemSchema} = require("src/db/mongo/schemas/cart_item");
const {ShoppingSessionSchema} = require("src/db/mongo/schemas/shopping_session");
const {OrderItemSchema} = require("src/db/mongo/schemas/order_items");

/**
 * @namespace Model
 * @description
 */

const mongo_models = {
		users: mongoose.model("users", UserSchema),
		user_addresses: mongoose.model("user_addresses", UserAddressSchema),
		products: mongoose.model("products", ProductSchema),
		product_categories: mongoose.model("product_categories", ProductCategorySchema),
		payment_details: mongoose.model("payment_details", PaymentDetailSchema),
		orders: mongoose.model("orders", OrderDetailSchema),
		order_items: mongoose.model("order_items", OrderItemSchema),
		user_payments: mongoose.model("user_payments", UserPaymentSchema),
		cart_items: mongoose.model("cart_items", CartItemSchema),
		shopping_sessions: mongoose.model("shopping_sessions", ShoppingSessionSchema)
};

module.exports = mongo_models;
