/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {product_categories} = require("src/db/mongo/schema_registry");
const loggers = require("src/utils/loggers");


/**
 * Important Tag: Do not remove it
 * @constructor
 */
function ProductCategoryRepository() {
}

const class_instance = new ProductCategoryRepository();

ProductCategoryRepository.prototype.create = async (category, session) => {
		const mongoose_products_category_model = new product_categories(category);
		return await new Promise(async (resolve, reject) => {
				await mongoose_products_category_model.save({session}, function (error, saved_category) {
						if (error) {
								loggers.error(__filename, `Product Category Registration process failed [ERROR: ${error}]`);
								reject(error);
						} else {
								loggers.log(__filename, `Product Category registered ${saved_category}`);
								resolve(saved_category);
						}
				});
		});
};


module.exports = class_instance;
