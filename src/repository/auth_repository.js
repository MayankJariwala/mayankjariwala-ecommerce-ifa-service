/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {users} = require("src/db/mongo/schema_registry");
const loggers = require("src/utils/loggers");
const {generate_session_token} = require("src/utils/helpers");
const bcrypt = require("bcrypt");
const {CredentialsFailedException, UserNotFoundException} = require("src/exceptions/auth_exceptions");


/**
 * Important Tag: Do not remove it
 * @constructor
 */
function AuthRepository() {
}

const class_instance = new AuthRepository();

AuthRepository.prototype.create = async (user_model) => {
		const mongoose_user_model = new users(user_model);
		return await new Promise(async (resolve, reject) => {
				await mongoose_user_model.save({}, function (error, user_model) {
						if (error) {
								loggers.error(__filename, `User Registration process  failed [ERROR: ${error}]`);
								reject(error);
						} else {
								loggers.log(__filename, `User registered ${user_model}`);
								resolve(user_model);
						}
				});
		});
};

AuthRepository.prototype.find_by_email = async (email) => {
		const response = await users.findOne({"email": email});
		if (response === null)
				throw new UserNotFoundException("Account with such email does not exist");
		return response;
};

AuthRepository.prototype.find_by_email_password = async (login_model) => {
		let result = await users.findOne({
				email: login_model.email
		}, {
				"__v": 0
		});
		if (result == null)
				throw new UserNotFoundException("Account with such email does not exist");
		const password_match = await bcrypt.compare(login_model.password, result.password);
		if (!password_match)
				throw new CredentialsFailedException("Sorry, your password was incorrect");
		let generated_token = generate_session_token(25);
		if (result.type === "admin") {
				generated_token = "ad-" + generated_token;
		} else {
				generated_token = "usr-" + generated_token;
		}
		const session_response = await class_instance.update_session_token(result, result._id, generated_token);
		if (session_response.modifiedCount !== 1) {
				throw "Session token updating Failed";
		}
		result.session_token = generated_token;
		const {password, ...response} = result._doc;
		return response;
};


AuthRepository.prototype.update_session_token = async (instance, userId, token) => {
		try {
				return await instance.updateOne({
						_id: userId.toString(),
						session_token: token
				});
		} catch (e) {
				throw e;
		}
};

module.exports = class_instance;
