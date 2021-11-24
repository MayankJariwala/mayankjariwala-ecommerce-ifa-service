/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {products} = require("src/db/mongo/schema_registry");
const loggers = require("src/utils/loggers");


/**
 * Important Tag: Do not remove it
 * @constructor
 */
function ProductRepository() {
}

const class_instance = new ProductRepository();

ProductRepository.prototype.create = async (product, session) => {
		const mongoose_products_model = new products(product);
		return await new Promise(async (resolve, reject) => {
				await mongoose_products_model.save({session}, function (error, saved_product) {
						if (error) {
								loggers.error(__filename, `Product Registration process failed [ERROR: ${error}]`);
								reject(error);
						} else {
								loggers.log(__filename, `Product registered ${saved_product}`);
								resolve(saved_product);
						}
				});
		});
};


module.exports = class_instance;
