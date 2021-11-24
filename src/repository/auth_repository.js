/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {users} = require("src/db/mongo/schema_registry");
const loggers = require("src/utils/loggers");
const {generate_session_token} = require("src/utils/helpers");
const bcrypt = require("bcrypt");
const {CredentialsFailedException, EmailAlreadyExists, UserAccountSuspendedException, UserNotApprovedException, UserNotFoundException} = require("src/exceptions/auth_exceptions");
const {RecordNotFoundException} = require("src/exceptions/query_exceptions");
const moment = require("moment-timezone");


/**
 * Important Tag: Do not remove it
 * @constructor
 */
function AuthRepository() {
}

const class_instance = new AuthRepository();

AuthRepository.prototype.create = async (user_model, session) => {
		const mongoose_user_model = new users(user_model);
		return await new Promise(async (resolve, reject) => {
				await mongoose_user_model.save({session}, function (error, user_model) {
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
//
// AuthRepository.prototype.updateUserSessionToken = async (instance, userId, token) => {
// 	return await new Promise(async (resolve, reject) => {
// 		instance
// 			.updateOne({_id: userId.toString(), session_token: token})
// 			.then(result => {
// 				resolve(result);
// 			})
// 			.catch(reason => {
// 				reject(reason);
// 			});
// 	});
// };
//
// //TODO: refactor code to provide reason why login failed , while raising custom exception
// AuthRepository.prototype.login = async (login_object) => {
// 	const generated_token = generate_session_token();
// 	return await new Promise(async (resolve, reject) => {
// 		await users_mongoose_model.findOne({
// 			email: login_object.email
// 		}).then(async result => {
// 			if (result == null)
// 				throw new UserNotFoundException("Account with such email does not exist");
// 			if (!result.is_approved) {
// 				throw new UserNotApprovedException("Your account is currently pending approval by the site administrator");
// 			}
// 			const password_match = await bcrypt.compare(login_object.password, result.password);
// 			if (!password_match)
// 				throw new CredentialsFailedException("Sorry, your password was incorrect. Please double-check your password.");
// 			const session_response = await class_instance.updateUserSessionToken(result, result._id, generated_token);
// 			if (session_response.ok !== 1) {
// 				throw "Session token updating Failed";
// 			}
// 			result.session_token = generated_token;
// 			const {password, is_delete, is_deleted, ...response} = result._doc;
// 			resolve(response);
// 		}).catch(reason => {
// 			reject(reason);
// 		});
// 	});
// };
//
// AuthRepository.prototype.loginByCompanyEmail = async (login_object) => {
// 	const generated_token = generate_session_token();
// 	return await new Promise(async (resolve, reject) => {
// 		await users_mongoose_model.findOne({
// 			"company.email": login_object.email
// 		}).then(async result => {
// 			if (result == null)
// 				throw new UserNotFoundException("Account with such email does not exist");
// 			if (!result.is_approved) {
// 				throw new UserNotApprovedException("Your account is currently pending approval by the site administrator");
// 			}
// 			if (result.is_suspended) {
// 				throw new UserAccountSuspendedException();
// 			}
// 			const password_match = await bcrypt.compare(login_object.password, result.password);
// 			if (!password_match)
// 				throw new CredentialsFailedException("Sorry, your password was incorrect. Please double-check your password.");
// 			const session_response = await class_instance.updateUserSessionToken(result, result._id, generated_token);
// 			if (session_response.ok !== 1) {
// 				throw "Session token updating Failed";
// 			}
// 			result.session_token = generated_token;
// 			const {password, is_delete, is_deleted, ...response} = result._doc;
// 			resolve(response);
// 		}).catch(reason => {
// 			reject(reason);
// 		});
// 	});
// };
//
// AuthRepository.prototype.delete = async (id, session) => {
// 	return await users_mongoose_model.deleteOne(
// 		{
// 			_id: id
// 		},
// 		{session: session}
// 	);
// };
//
// AuthRepository.prototype.findAll = async () => {
// 	try {
// 		return await users_mongoose_model.find({"$and": [{"is_deleted": false}]}, {
// 			"is_deleted": 0,
// 			"password": 0,
// 			"__v": 0
// 		}).sort({"updatedAt": -1});
// 	} catch (e) {
// 		loggers.log(__filename, `User Registration Exception with message: ${e}`);
// 		//TODO: return proper error message code
// 		throw e;
// 	}
// };
//
// AuthRepository.prototype.findByType = async (type) => {
// 	try {
// 		return await users_mongoose_model.find({"$and": [{"is_deleted": false}, {"type": type}]}, {
// 			"is_deleted": 0,
// 			"password": 0,
// 			"__v": 0
// 		}).sort({"updatedAt": -1});
// 	} catch (e) {
// 		loggers.log(__filename, `Exception while fetching user by type with message: ${e}`);
// 		throw e;
// 	}
// };
//
// AuthRepository.prototype.findByEmail = async (email) => {
// 	const response = await users_mongoose_model.findOne({"$and": [{"is_deleted": false}, {"email": email}]});
// 	if (response === null)
// 		throw new UserNotFoundException("Account with such email does not exist");
// 	return response;
// };
//
// AuthRepository.prototype.findByCompanyEmail = async (email) => {
// 	const response = await users_mongoose_model.findOne({
// 		"$and": [
// 			{"is_deleted": false},
// 			{"company.email": email}
// 		]
// 	});
// 	if (response !== null)
// 		throw new EmailAlreadyExists("Company email address is already been taken");
// 	return response;
// };
//
// AuthRepository.prototype.update_profile = async (update_object, user_id) => {
// 	return await users_mongoose_model.findByIdAndUpdate({_id: user_id}, update_object, {new: true});
// };
//
// AuthRepository.prototype.setup_password = async (password_object) => {
// 	const response = await users_mongoose_model.updateOne({session_token: password_object.session}, {password: password_object.password});
// 	if (response.ok === 1 && response.n <= 0) {
// 		throw new RecordNotFoundException("No record with provided session found");
// 	}
// 	return response;
// };
//
// AuthRepository.prototype.update_session_token = async (_id, session_token) => {
// 	return await users_mongoose_model.findByIdAndUpdate({_id}, {session_token: session_token}, {
// 		new: true
// 	});
// };
//
// AuthRepository.prototype.findById = async (uuid) => {
// 	return await users_mongoose_model.findOne({"$and": [{"is_deleted": false}, {"uuid": uuid}]}, {
// 		"is_deleted": 0,
// 		"password": 0,
// 		"__v": 0
// 	});
// };
//
// // Account ID assigned by admin manually
// AuthRepository.prototype.findByAssignedId = async (uuid) => {
// 	return await users_mongoose_model.findOne({"$and": [{"is_deleted": false}, {"accountId": uuid}]}, {
// 		"is_deleted": 0,
// 		"password": 0,
// 		"__v": 0
// 	});
// };
//
// AuthRepository.prototype.update_approve_status = async (_id, session_token, status, account_id) => {
// 	return await users_mongoose_model.findByIdAndUpdate(
// 		{_id},
// 		{
// 			session_token: session_token,
// 			accountId: account_id,
// 			is_approved: status
// 		},
// 		{
// 			new: true
// 		});
// };

// /**
//  *
//  * @param _id: string
//  * @param status: string
//  * @return {Promise<T>}
//  */
// AuthRepository.prototype.update_suspend_status = async (_id, status) => {
// 	let object = {};
// 	object["is_suspended"] = status;
// 	if (status === "false") {
// 		object["createdAt"] = new moment(new Date()).tz("Asia/Kolkata").toISOString(true);
// 	}
// 	console.log(object);
// 	return await users_mongoose_model.findByIdAndUpdate(
// 		{_id},
// 		object,
// 		{
// 			new: true,
// 			timestamps: false
// 		});
// };


module.exports = class_instance;
