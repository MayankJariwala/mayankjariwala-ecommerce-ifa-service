/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const mongoose = require("mongoose");
const {GeneralValidationException} = require("src/exceptions/validation_exception");
const {orders, shopping_sessions} = require("src/db/mongo/schema_registry");

/**
 * Important Tag: Do not remove it
 * @constructor
 */
function OrderRepository() {
}

const class_instance = new OrderRepository();

OrderRepository.prototype.create = async (order_model, session) => {
		if (!order_model.hasOwnProperty("session_id") || order_model.session_id === "" || order_model.session_id === undefined) {
				throw new GeneralValidationException("Some problem with existing session. Please start a new session");
		}
		const isSessionExists = await shopping_sessions.exists({"session_id": order_model.session_id});
		if (isSessionExists) {
				const mongoose_order_model = new orders(order_model);
				const saved_order = await mongoose_order_model.save({session});
				const order_id = saved_order._id;
				if (order_id === undefined || order_id === "") {
						throw new GeneralValidationException("failed to create order");
				}
				return order_id;
		}
		throw new GeneralValidationException("Session not exists");
};

OrderRepository.prototype.all = async () => {
		return await orders.aggregate([
				{
						"$lookup": {
								from: "order_items", // collection name in db
								localField: "_id",
								foreignField: "order_id",
								as: "items"
						}
				},
				{
						$project: {
								"__v": 0,
								"items": {
										"_id": 0,
										"__v": 0,
										"createdAt": 0,
										"updatedAt": 0
								}
						}
				}
		]);
};


OrderRepository.prototype.find_by_id = async (order_id) => {

		return await orders.aggregate([
				{
						$match: {
								"_id": mongoose.Types.ObjectId(order_id)
						}
				},
				{
						"$lookup": {
								from: "order_items", // collection name in db
								localField: "_id",
								foreignField: "order_id",
								as: "items"
						}
				},
				{
						$project: {
								"__v": 0,
								"items": {
										"_id": 0,
										"__v": 0,
										"createdAt": 0,
										"updatedAt": 0
								}
						}
				}
		]);
};

module.exports = class_instance;
