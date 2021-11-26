const user_repository = require("src/repository/user_repository");
const loggers = require("src/utils/loggers");
const {response_payload} = require("src/network/responses/response");
const {STATUS_CODES} = require("src/network/http_reference_list");
const {ExceptionHandler} = require("src/handlers/exception_handler");

/**
 *
 * @constructor
 */
function UserController() {

}

UserController.prototype.create_address = async (req, res, next) => {
		try {
				await user_repository.create_address(req.body);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Address created"));
		} catch (e) {
				loggers.log(__filename, `Address creation failed ${e}`);
				return ExceptionHandler(e, res);
		}
};


UserController.prototype.update_address = async (req, res, next) => {
		try {
				await user_repository.update_address(req.params.id, req.body);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Address updated"));
		} catch (e) {
				loggers.log(__filename, `Updating address failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

UserController.prototype.find_user_addresses = async (req, res, next) => {
		try {
				const response = await user_repository.find_user_addresses(req.params.user_id);
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.log(__filename, `Address fetching failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

UserController.prototype.delete_address = async (req, res, next) => {
		try {
				await user_repository.delete_address(req.params.id);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Address Deleted"));
		} catch (e) {
				loggers.log(__filename, `Address deletion failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

UserController.prototype.delete = async (req, res, next) => {
		try {
				await user_repository.delete(req.params.id);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "User Deleted"));
		} catch (e) {
				loggers.log(__filename, `User deletion failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

UserController.prototype.all = async (req, res, next) => {
		try {
				const response = await user_repository.all();
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.log(__filename, `Address deletion failed ${e}`);
				return ExceptionHandler(e, res);
		}
};
module.exports = new UserController();
