/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {orders, shopping_sessions, cart_items, order_items} = require("src/db/mongo/schema_registry");
const cart_repository = require("src/repository/cart_repository");

/**
 * Important Tag: Do not remove it
 * @constructor
 */
function OrderItemRepository() {
}

const class_instance = new OrderItemRepository();

OrderItemRepository.prototype.create = async (order_id, user_id, session_id, session) => {
		const shopping_response = await shopping_sessions.findOne({
				"$and": [
						{"user_id": user_id}
				]
		}, {total: 1});
		// console.log(shopping_response);
		const cart_items_response = await cart_items.find({
				"$and": [
						{"session_id": session_id}
				]
		}, {
				_id: 0,
				product_id: 1,
				quantity: 1
		});
		let order_items_array = [];
		for (let i = 0; i < cart_items_response.length; i++) {
				order_items_array[i] = Object.assign(
						{},
						{"product_id": cart_items_response[i]["product_id"], "quantity": cart_items_response[i]["quantity"]},
						{"order_id": order_id}
				);
		}
		await order_items.deleteMany({"_id": order_id}).session(session);
		await order_items.insertMany(order_items_array, {session});
		await orders.updateOne({"_id": order_id}, {
				total: shopping_response.total
		}).session(session);
		await cart_repository.delete_session(session_id);
		return true;
};


module.exports = class_instance;