const express = require("express");
const auth_router = express.Router();

const auth_controller_instance = require("src/controllers/auth_controller");

/**
 * User Routes
 * For Health Check
 */
auth_router.get("/ping", function (req, res, next) {
		res.json({
				ping: new Date()
		});
});

auth_router.post("/register", auth_controller_instance.register);
auth_router.post("/login", auth_controller_instance.login);

// auth_router.patch("/user/login", auth_controller_instance.login_by_company_email);
// auth_router.patch("/setup/password", auth_controller_instance.setup_password);
// auth_router.patch("/forgot-password", auth_controller_instance.forgot_password);

/**
 * Admin routes
 */
// auth_router.patch("/admin/login", auth_controller_instance.admin_login);
// auth_router.post("/admin/register", auth_controller_instance.register_admin);


module.exports = auth_router;
