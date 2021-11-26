const product_category_repository = require("src/repository/product_category_repository");
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
		try {
				await product_category_repository.create(req.body);
				return res
						.status(STATUS_CODES.OK)
						.json(response_payload(200, "Successfully Registered"));
		} catch (e) {
				loggers.log(__filename, `Product Category creation failed ${e}`);
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
