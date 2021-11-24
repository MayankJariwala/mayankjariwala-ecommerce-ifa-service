const express = require("express");
const product_router = express.Router();

const product_controller_instance = require("src/controllers/product_controller");
const product_category_controller_instance = require("src/controllers/product_category_controller");

/**
 * Product Routes
 * For Health Check
 */
product_router.get("/ping", function (req, res, next) {
		res.json({
				ping: new Date()
		});
});

product_router.post("/", product_controller_instance.create);
product_router.post("/category", product_category_controller_instance.create);

module.exports = product_router;
