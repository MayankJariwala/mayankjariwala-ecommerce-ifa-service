var express = require("express");
var orders_router = express.Router();

const order_controller_instance = require("src/controllers/order/order_controller");
const {auth_middleware} = require("src/middlewares/middleware");

orders_router.post("/", auth_middleware, order_controller_instance.create_order);
orders_router.get("/", auth_middleware, order_controller_instance.get_all_orders);
orders_router.get("/:id", auth_middleware, order_controller_instance.get_order_by_id);
// orders_router.delete("/session/:id", auth_middleware, cart_controller_instance.delete_session);
// orders_router.post("/item", auth_middleware, cart_controller_instance.add_item);

module.exports = orders_router;
