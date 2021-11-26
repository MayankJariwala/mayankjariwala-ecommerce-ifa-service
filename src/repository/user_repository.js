/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {users, user_payments, user_addresses} = require("src/db/mongo/schema_registry");

/**
 * Important Tag: Do not remove it
 * @constructor
 */
function UserRepository() {
}

const class_instance = new UserRepository();

UserRepository.prototype.create_address = async (user_address) => {
		const mongoose_user_address_model = new user_addresses(user_address);
		return await mongoose_user_address_model.save();
};

UserRepository.prototype.update_address = async (id, user_address) => {
		return await user_addresses.findByIdAndUpdate(id, user_address, {
				new: true,
				runValidators: true
		});
};

UserRepository.prototype.find_user_addresses = async (user_id) => {
		return await user_addresses.find({"user_id": user_id}, {
				"__v": 0
		}).sort({"updatedAt": -1});
};

UserRepository.prototype.delete_address = async (id) => {
		return await user_addresses.deleteOne({_id: id});
};

UserRepository.prototype.delete = async (id) => {
		await user_addresses.findOneAndUpdate({"user_id": id}, {"deleted_at": new Date().toUTCString()});
		await user_payments.findOneAndUpdate({"user_id": id}, {"deleted_at": new Date().toUTCString()});
		await users.findOneAndUpdate({"_id": id}, {"deleted_at": new Date().toUTCString()});
		return true;
};


UserRepository.prototype.all = async (id) => {
		return await users.find({}, {
				"__v": 0
		});
};

module.exports = class_instance;
