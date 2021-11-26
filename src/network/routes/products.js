const express = require("express");
const product_router = express.Router();

const product_controller_instance = require("src/controllers/products/product_controller");
const {auth_middleware} = require("src/middlewares/middleware");

/**
 * Product Routes
 * For Health Check
 */
product_router.get("/ping", function (req, res, next) {
		res.json({
				ping: new Date()
		});
});

// Products
product_router.post("/", auth_middleware, product_controller_instance.create);
product_router.get("/", auth_middleware, product_controller_instance.get_all);
product_router.get("/:id", auth_middleware, product_controller_instance.get_by_id);
product_router.get("/categories/:category_id", auth_middleware, product_controller_instance.find_by_category_id);
product_router.put("/:id", auth_middleware, product_controller_instance.update);
product_router.delete("/:id", auth_middleware, product_controller_instance.delete_by_id);


module.exports = product_router;
