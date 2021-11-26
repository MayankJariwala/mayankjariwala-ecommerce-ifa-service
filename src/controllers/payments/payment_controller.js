const user_payments_repository = require("src/repository/user_payments_repository");
const {db_instance} = require("src/db/connection");
const loggers = require("src/utils/loggers");
const {response_payload} = require("src/network/responses/response");
const {STATUS_CODES} = require("src/network/http_reference_list");
const {ExceptionHandler} = require("src/handlers/exception_handler");

/**
 *
 * @constructor
 */
function PaymentController() {

}

PaymentController.prototype.create = async (req, res, next) => {
		try {
				const response = await user_payments_repository.create(req.body);
				loggers.log(`User payment registration is created with id ${response._id}`);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Payment Type Added"));
		} catch (e) {
				loggers.log(__filename, `Payment registration failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

PaymentController.prototype.update = async (req, res, next) => {
		try {
				await user_payments_repository.update(req.params.id, req.body);
				loggers.log(`User payment registration is updated`);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Payment Information updated"));
		} catch (e) {
				loggers.log(__filename, `Transaction has been rolled back`);
				return ExceptionHandler(e, res);
		}
};

PaymentController.prototype.users_payments = async (req, res, next) => {
		try {
				const response = await user_payments_repository.find_by_user_id(req.params.user_id);
				loggers.log(`User Payment Information for id : ${req.params.user_id}`);
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.log(__filename, `Fetching user payment information failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

module.exports = new PaymentController();
