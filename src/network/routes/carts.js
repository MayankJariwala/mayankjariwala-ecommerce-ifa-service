var express = require("express");
var carts_router = express.Router();

const cart_controller_instance = require("src/controllers/cart/cart_controller");
const {auth_middleware} = require("src/middlewares/middleware");

carts_router.post("/session", auth_middleware, cart_controller_instance.create_session);
carts_router.delete("/session/:id", auth_middleware, cart_controller_instance.delete_session);
carts_router.post("/item", auth_middleware, cart_controller_instance.add_item);

module.exports = carts_router;
