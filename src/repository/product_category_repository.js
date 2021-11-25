/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const {product_categories} = require("src/db/mongo/schema_registry");
const {count_product_by_category_id} = require("src/repository/product_repository");
const loggers = require("src/utils/loggers");
const {ProductLinkedToCategoryException} = require("src/exceptions/query_exceptions");


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

ProductCategoryRepository.prototype.get_all = async () => {
		return await product_categories.find({}, {
				"__v": 0
		}).sort({"updatedAt": -1});
};

ProductCategoryRepository.prototype.find_by_id = async (id) => {
		return await product_categories.findOne(
				{"_id": id},
				{
						"__v": 0
				}
		);
};

ProductCategoryRepository.prototype.delete_by_id = async (id) => {
		const count = await count_product_by_category_id(id);
		if (count > 0) {
				throw new ProductLinkedToCategoryException("Products are linked to this category");
		}
		return await product_categories.deleteOne({
						"_id": id
				}
		);
};

module.exports = class_instance;
