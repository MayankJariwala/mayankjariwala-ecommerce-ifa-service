/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {orders, cart_items, order_items, products} = require("src/db/mongo/schema_registry");
const cart_repository = require("src/repository/cart_repository");
const {GeneralValidationException} = require("src/exceptions/validation_exception");


/**
 * Important Tag: Do not remove it
 * @constructor
 */
function OrderItemRepository() {
}

const class_instance = new OrderItemRepository();

OrderItemRepository.prototype.create = async (order_id, user_id, session_id, session) => {
		const cart_items_response = await cart_items.find({
				"$and": [
						{"session_id": session_id}
				]
		}, {
				_id: 0,
				product_id: 1,
				quantity: 1,
				price: 1
		});
		let order_items_array = [];
		let order_total = 0;
		for (let i = 0; i < cart_items_response.length; i++) {
				order_total += cart_items_response[i]["quantity"] * cart_items_response[i]["price"];
				order_items_array[i] = Object.assign(
						{},
						{
								"product_id": cart_items_response[i]["product_id"],
								"quantity": cart_items_response[i]["quantity"],
								"price": cart_items_response[i]["price"]
						},
						{"order_id": order_id}
				);
		}
		await class_instance.delete_many(order_id, session);
		await class_instance.insert_many(order_items_array, session);
		await class_instance.update(order_id, {total: order_total}, session);
		for (let i = 0; i < order_items_array.length; i++) {
				const product_id = order_items_array[i]["product_id"];
				const ordered_quantity = order_items_array[i]["quantity"];
				const product_response = await products.findOne({_id: product_id});
				if (ordered_quantity > product_response.quantity) {
						throw new GeneralValidationException(`${ordered_quantity} qty not available for Product ${product_response.name} [Available: ${product_response.quantity}]`);
				}
				product_response.quantity = product_response.quantity - ordered_quantity;
				await product_response.save({session});
		}
		await cart_repository.delete_session(session_id);
		return true;
};

OrderItemRepository.prototype.delete_many = async (order_id, session) => {
		return await order_items.deleteMany({"_id": order_id}).session(session);
};

OrderItemRepository.prototype.update = async (order_id, model, session) => {
		return await orders.updateOne({"_id": order_id}, model).session(session);
};

OrderItemRepository.prototype.insert_many = async (order_items_array, session) => {
		return await order_items.insertMany(order_items_array, {session});
};

module.exports = class_instance;
