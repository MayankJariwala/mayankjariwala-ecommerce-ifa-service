/**
 * @namespace Repository
 * @author Mayank Jariwala
 * @version 1.0.0
 */
const mongoose = require("mongoose");
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
		return await mongoose_products_model.save({session});
};

ProductRepository.prototype.update = async (id, product) => {
		return await products.findByIdAndUpdate({_id: id}, product, {
				new: true,
				runValidators: true
		});
};

ProductRepository.prototype.get_all = async () => {
		return await products.find({}, {
				"__v": 0
		}).sort({"updatedAt": -1});
};

ProductRepository.prototype.find_by_id = async (id) => {
		return await products.findOne(
				{"_id": id},
				{
						"__v": 0
				}
		);
};

ProductRepository.prototype.find_by_category_id = async (id) => {
		return await products.findOne(
				{
						$match: {
								"category_id": new mongoose.Types.ObjectId(id)
						}
				}
		);
};

ProductRepository.prototype.count_product_by_category_id = async (id) => {
		return await products.count(
				{
						$match: {
								"category_id": new mongoose.Types.ObjectId(id)
						}
				}
		);
};

ProductRepository.prototype.delete_by_id = async (id) => {
		return await products.deleteOne({_id: id});
};

ProductRepository.prototype.find_by_name = async (name) => {
		return await products.find({"name": `/${name}/`}, {
				"_v": 0
		});
};

module.exports = class_instance;
