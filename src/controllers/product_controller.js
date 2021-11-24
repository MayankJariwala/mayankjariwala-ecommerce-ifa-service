const uuid = require("uuid");

const product_registry = require("src/repository/product_registry");
const {db_instance} = require("src/db/connection");
const loggers = require("src/utils/loggers");
const {response_payload} = require("src/network/responses/response");
const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");
const {ExceptionHandler} = require("src/handlers/exception_handler");
const in_mem_cache_service = require("src/services/cache_service");
const {SESSION_CACHE_PREFIX, TIMESTAMP_CACHE_PREFIX} = require("src/constants/cache_constants");
const {generate_session_token} = require("src/utils/helpers");

/**
 *
 * @constructor
 */
function ProductController() {

}

ProductController.prototype.create = async (req, res, next) => {
		const session = await db_instance.mongo.instance.startSession();
		try {
				session.startTransaction();
				const response = await product_registry.create(req.body, session);
				await session.commitTransaction();
				loggers.log(`Product is registered successfully with id ${response._id}`);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Successfully Registered"));
		} catch (e) {
				session.inTransaction() && await session.abortTransaction();
				loggers.log(__filename, `Transaction has been rolled back`);
				return ExceptionHandler(e, res);
		}
};

module.exports = new ProductController();
