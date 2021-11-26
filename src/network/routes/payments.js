var express = require("express");
var payments_router = express.Router();

const {auth_middleware} = require("src/middlewares/middleware");
const payment_controller_instance = require("src/controllers/payments/payment_controller");

payments_router.get("/ping", function (req, res, next) {
		res.json({
				ping: new Date()
		});
});

payments_router.post("/", auth_middleware, payment_controller_instance.create);

payments_router.put("/:id", auth_middleware, payment_controller_instance.update);
payments_router.get("/:user_id", auth_middleware, payment_controller_instance.users_payments);

module.exports = payments_router;
