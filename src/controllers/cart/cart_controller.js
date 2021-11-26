const cart_repository = require("src/repository/cart_repository");
const loggers = require("src/utils/loggers");
const {response_payload} = require("src/network/responses/response");
const {STATUS_CODES} = require("src/network/http_reference_list");
const {ExceptionHandler} = require("src/handlers/exception_handler");

/**
 *
 * @constructor
 */
function CartController() {

}

CartController.prototype.create_session = async (req, res, next) => {
		try {
				await cart_repository.create_session(req.body);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Session Started"));
		} catch (e) {
				loggers.log(__filename, `Shopping Session failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

CartController.prototype.delete_session = async (req, res, next) => {
		try {
				await cart_repository.delete_session(req.params.id);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Session deleted"));
		} catch (e) {
				loggers.log(__filename, `Shopping Session deletion failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

CartController.prototype.add_item = async (req, res, next) => {
		try {
				await cart_repository.add_item_in_session(req.body);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Item Added"));
		} catch (e) {
				loggers.log(__filename, `Adding item failed ${e}`);
				return ExceptionHandler(e, res);
		}
};

module.exports = new CartController();
