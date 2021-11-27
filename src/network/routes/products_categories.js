const express = require("express");
const product_category_router = express.Router();

const product_category_controller_instance = require("src/controllers/products/product_category_controller");
const {auth_middleware, admin_middleware} = require("src/middlewares/middleware");

/**
 * Product Routes
 * For Health Check
 */
product_category_router.get("/ping", function (req, res, next) {
		res.json({
				ping: new Date()
		});
});


product_category_router.post("/", admin_middleware, product_category_controller_instance.create);
product_category_router.get("/", auth_middleware, product_category_controller_instance.get_all);
product_category_router.get("/:id", auth_middleware, product_category_controller_instance.get_by_id);
product_category_router.delete("/:id", admin_middleware, product_category_controller_instance.delete_by_id);
product_category_router.patch("/:id", admin_middleware, product_category_controller_instance.update);

module.exports = product_category_router;
