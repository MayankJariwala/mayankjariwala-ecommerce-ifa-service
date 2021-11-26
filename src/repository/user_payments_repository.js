/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const mongoose = require("mongoose");
const {user_payments} = require("src/db/mongo/schema_registry");
const loggers = require("src/utils/loggers");


/**
 * Important Tag: Do not remove it
 * @constructor
 */
function UserPaymentRepository() {
}

const class_instance = new UserPaymentRepository();

UserPaymentRepository.prototype.create = async (user_payment, session) => {
		const mongoose_user_payments_model = new user_payments(user_payment);
		return await mongoose_user_payments_model.save({session});
};

UserPaymentRepository.prototype.update = async (id, user_payment) => {
		return await user_payments.findByIdAndUpdate(id, user_payment, {
				new: true,
				runValidators: true
		});
};

UserPaymentRepository.prototype.get_all = async () => {
		return await user_payments.find({}, {
				"__v": 0
		}).sort({"updatedAt": -1});
};

UserPaymentRepository.prototype.find_by_user_id = async (id) => {
		return await user_payments.find(
				{user_id: id},
				{
						"__v": 0
				}
		);
};

UserPaymentRepository.prototype.find_by_category_id = async (id) => {
		return await products.findOne(
				{
						$match: {
								"category_id": new mongoose.Types.ObjectId(id)
						}
				}
		);
};

UserPaymentRepository.prototype.count_product_by_category_id = async (id) => {
		return await products.count(
				{
						$match: {
								"category_id": new mongoose.Types.ObjectId(id)
						}
				}
		);
};

UserPaymentRepository.prototype.delete_by_id = async (id) => {
		return await products.deleteOne({_id: id});
};


module.exports = class_instance;
