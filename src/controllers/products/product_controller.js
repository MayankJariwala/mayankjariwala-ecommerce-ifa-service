const product_repository = require("src/repository/product_repository");
const {db_instance} = require("src/db/connection");
const loggers = require("src/utils/loggers");
const {response_payload} = require("src/network/responses/response");
const {STATUS_CODES} = require("src/network/http_reference_list");
const {ExceptionHandler} = require("src/handlers/exception_handler");

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
				const response = await product_repository.create(req.body, session);
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

ProductController.prototype.get_all = async (req, res, next) => {
		try {
				const response = await product_repository.get_all();
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.exception(`Fetching all products exception ${JSON.stringify(e)}`, __filename);
				return ExceptionHandler(e, res);
		}
};

ProductController.prototype.get_by_id = async (req, res, next) => {
		try {
				const response = await product_repository.find_by_id(req.params.id);
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.exception(`Fetching Product By Id Exception ${JSON.stringify(e)}`, __filename);
				return ExceptionHandler(e, res);
		}
};

ProductController.prototype.find_by_category_id = async (req, res, next) => {
		try {
				const response = await product_repository.find_by_category_id(req.params.id);
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.exception(`Fetching Product By Category Id Exception ${JSON.stringify(e)}`, __filename);
				return ExceptionHandler(e, res);
		}
};

ProductController.prototype.delete_by_id = async (req, res, next) => {
		try {
				await product_repository.delete_by_id(req.params.id);
				return res
						.status(STATUS_CODES.OK)
						.json({});
		} catch (e) {
				loggers.exception(`Failed to delete product with exception ${JSON.stringify(e)}`, __filename);
				return ExceptionHandler(e, res);
		}
};


module.exports = new ProductController();
