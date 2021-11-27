/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {GeneralValidationException} = require("src/exceptions/validation_exception");
const {shopping_sessions, cart_items, products} = require("src/db/mongo/schema_registry");
const {db_instance} = require("src/db/connection");

/**
 * Important Tag: Do not remove it
 * @constructor
 */
function CartRepository() {
}

const class_instance = new CartRepository();

CartRepository.prototype.create_session = async (session_model) => {
		const mongoose_shopping_session_model = new shopping_sessions(session_model);
		return await mongoose_shopping_session_model.save();
};

CartRepository.prototype.delete_session = async (session_id) => {
		const session = await db_instance.mongo.instance.startSession();
		try {
				session.startTransaction();
				await cart_items.deleteMany({"session_id": session_id}).session(session);
				await shopping_sessions.deleteOne({"_id": session_id}).session(session);
				await session.commitTransaction();
				return true;
		} catch (e) {
				session.inTransaction() && await session.abortTransaction();
				throw e;
		}
};


CartRepository.prototype.add_item_in_session = async (add_item_model) => {
		const session = await db_instance.mongo.instance.startSession();
		const isSessionExists = await shopping_sessions.exists({"session_id": add_item_model.session_id});
		if (isSessionExists) {
				try {
						session.startTransaction();
						const response = await cart_items.exists({$and: [{"session_id": add_item_model.session_id}, {"product_id": add_item_model.product_id}]});
						if (response) {
								const update_response = await cart_items.updateOne({
										"$and": [
												{"session_id": add_item_model.session_id},
												{"product_id": add_item_model.product_id}
										],
										"$set": add_item_model
								});
								console.log(update_response);
								if (update_response.modifiedCount === 0) {
										throw new GeneralValidationException("Item updating failed");
								}
						} else {
								const mongoose_cart_items_model = new cart_items(add_item_model);
								await mongoose_cart_items_model.save();
						}
						const product_response = await products.findOne({"_id": add_item_model.product_id}, {
								price: 1
						});
						await shopping_sessions.updateOne({_id: add_item_model.session_id}, {
								total: parseInt(add_item_model.quantity) * parseFloat(product_response.price)
						});
						await session.commitTransaction();
						return true;
				} catch (e) {
						session.inTransaction() && await session.abortTransaction();
						throw e;
				}
		}
		throw new GeneralValidationException("Session not exists");
};

module.exports = class_instance;
