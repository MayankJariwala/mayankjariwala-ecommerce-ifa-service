const user_repository = require("src/repository/auth_repository");
const {db_instance} = require("src/db/connection");
const loggers = require("src/utils/loggers");
const {response_payload} = require("src/network/responses/response");
const {STATUS_CODES} = require("src/network/http_reference_list");
const {ExceptionHandler} = require("src/handlers/exception_handler");
const in_mem_cache_service = require("src/services/cache_service");
const {SESSION_CACHE_PREFIX, TIMESTAMP_CACHE_PREFIX} = require("src/constants/cache_constants");

/**
 *
 * @constructor
 */
function AuthController() {

}

//TODO: Put validation and throw bad request exception in case of bad data
// or empty data
/**
 * Registering the platform user api
 * @param req
 * @param res
 * @param next
 * @return {Promise<*|Promise|Promise<any>>}
 */
AuthController.prototype.register = async (req, res, next) => {
		const session = await db_instance.mongo.instance.startSession();
		try {
				session.startTransaction();
				const response = await user_repository.create(req.body, session);
				await session.commitTransaction();
				loggers.log(`User is registered successfully with registration id ${response._id}`);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Successfully Registered"));
		} catch (e) {
				session.inTransaction() && await session.abortTransaction();
				loggers.log(__filename, `Transaction has been rolled back`);
				return ExceptionHandler(e, res);
		}
};

AuthController.prototype.login = async (req, res, next) => {
		try {
				const response = await user_repository.find_by_email_password(req.body);
				const session_token = response.session_token;
				delete response.session_token;
				loggers.log(`User is logged in successfully`);
				// setting cache for serving data for the first login time
				in_mem_cache_service.set(`${SESSION_CACHE_PREFIX}${response.accountId.toString()}`, session_token);
				in_mem_cache_service.set(`${TIMESTAMP_CACHE_PREFIX}${response.accountId.toString()}`, response.updatedAt);
				res.setHeader("x-session-token", session_token);
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.log(`Login Request Failed: ${e}`, __filename);
				return ExceptionHandler(e, res);
		}
};

module.exports = new AuthController();
