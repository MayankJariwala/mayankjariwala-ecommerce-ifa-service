const order_repository = require("src/repository/order_repository");
const order_item_repository = require("src/repository/order_item_repository");
const {db_instance} = require("src/db/connection");

const loggers = require("src/utils/loggers");
const {response_payload} = require("src/network/responses/response");
const {STATUS_CODES} = require("src/network/http_reference_list");
const {ExceptionHandler} = require("src/handlers/exception_handler");

/**
 *
 * @constructor
 */
function OrderController() {

}

OrderController.prototype.create_order = async (req, res, next) => {
		const session = await db_instance.mongo.instance.startSession();
		try {
				session.startTransaction();
				const request_body = req.body;
				const order_id = await order_repository.create(req.body, session);
				await order_item_repository.create(order_id, request_body.user_id, request_body.session_id, session);
				await session.commitTransaction();
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Order Placed"));
		} catch (e) {
			session.inTransaction() && await session.abortTransaction();
				loggers.log(__filename, `Order Creation failed ${e}`);
				return ExceptionHandler(e, res);
		}
};


module.exports = new OrderController();
