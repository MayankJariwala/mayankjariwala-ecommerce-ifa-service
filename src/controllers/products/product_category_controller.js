const product_category_repository = require("src/repository/product_category_repository");
const {db_instance} = require("src/db/connection");
const loggers = require("src/utils/loggers");
const {response_payload} = require("src/network/responses/response");
const {STATUS_CODES} = require("src/network/http_reference_list");
const {ExceptionHandler} = require("src/handlers/exception_handler");

/**
 *
 * @constructor
 */
function ProductCategoryController() {

}

ProductCategoryController.prototype.create = async (req, res, next) => {
		const session = await db_instance.mongo.instance.startSession();
		try {
				session.startTransaction();
				const response = await product_category_repository.create(req.body, session);
				await session.commitTransaction();
				loggers.log(`Product Category is registered successfully with id ${response._id}`);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Successfully Registered"));
		} catch (e) {
				session.inTransaction() && await session.abortTransaction();
				loggers.log(__filename, `Transaction has been rolled back`);
				return ExceptionHandler(e, res);
		}
};


ProductCategoryController.prototype.get_all = async (req, res, next) => {
		try {
				const response = await product_category_repository.get_all();
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.exception(`Fetching Categories exception ${JSON.stringify(e)}`, __filename);
				return ExceptionHandler(e, res);
		}
};

ProductCategoryController.prototype.get_by_id = async (req, res, next) => {
		try {
				const response = await product_category_repository.find_by_id(req.params.id);
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.exception(`Fetching Category By Id Exception ${JSON.stringify(e)}`, __filename);
				return ExceptionHandler(e, res);
		}
};

ProductCategoryController.prototype.delete_by_id = async (req, res, next) => {
		try {
				await product_category_repository.delete_by_id(req.params.id);
				return res
						.status(STATUS_CODES.OK)
						.json({});
		} catch (e) {
				loggers.exception(`Failed to delete Product Category Exception ${JSON.stringify(e)}`, __filename);
				return ExceptionHandler(e, res);
		}
};

ProductCategoryController.prototype.update = async (req, res, next) => {
		try {
				const response = await product_category_repository.update(req.params.id, req.body);
				return res
						.status(STATUS_CODES.OK)
						.json(response);
		} catch (e) {
				loggers.exception(`Category Update failed with exception ${JSON.stringify(e)}`, __filename);
				return ExceptionHandler(e, res);
		}
};

module.exports = new ProductCategoryController();
