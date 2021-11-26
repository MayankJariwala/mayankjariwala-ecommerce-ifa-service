var express = require("express");
var user_router = express.Router();

const user_controller_instance = require("src/controllers/users/user_controller");
const {auth_middleware} = require("src/middlewares/middleware");

user_router.post("/address", auth_middleware, user_controller_instance.create_address);
user_router.put("/address/:id", auth_middleware, user_controller_instance.update_address);
user_router.get("/address/:user_id", auth_middleware, user_controller_instance.find_user_addresses);
user_router.delete("/address/:id", auth_middleware, user_controller_instance.delete_address);

user_router.get("/", auth_middleware, user_controller_instance.all);
user_router.delete("/:id", auth_middleware, user_controller_instance.delete);

module.exports = user_router;
