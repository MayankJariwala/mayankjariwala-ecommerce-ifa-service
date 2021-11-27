/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {GeneralValidationException} = require("src/exceptions/validation_exception");
const {orders} = require("src/db/mongo/schema_registry");
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
		const mongoose_order_model  = new orders(order_model);
		const saved_order = await mongoose_order_model.save({session});
		const order_id = saved_order._id;
		if (order_id === undefined || order_id === "") {
				throw new GeneralValidationException("failed to create order");
		}
		return order_id;
};

module.exports = class_instance;
