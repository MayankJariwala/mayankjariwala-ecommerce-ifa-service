const {unauthorized, forbidden} = require("src/handlers/response_handlers");
const {UnauthorizedException} = require("src/exceptions/middleware_exceptions");
const in_mem_cache_service = require("src/services/cache_service");
const {SESSION_CACHE_PREFIX, VISITOR_TOKEN} = require("src/constants/cache_constants");

module.exports = (function () {

		const visitor_middleware = function (req, res, next) {
				if (`${process.env.SKIP_MIDDLEWARE}` === "true") {
						if (req.headers.hasOwnProperty("visitor-token") && req.headers["visitor-token"] === VISITOR_TOKEN) {
								next();
						} else {
								return unauthorized(res, 401, "Access denied for viewing data");
						}
				} else {
						next();
				}
		};

		const admin_middleware = function (req, res, next) {
				if (`${process.env.SKIP_MIDDLEWARE}` === "false") {
						try {
								session_exists(req, res);
								uuid_exists(req, res);
								session_token_matches(req, res);
								//add extra layer
								next();
						} catch (e) {
								return unauthorized(res);
						}
				} else {
						next();
				}
		};

		const auth_middleware = function (req, res, next) {
				if (`${process.env.SKIP_MIDDLEWARE}` === "false") {
						try {
								console.log(in_mem_cache_service.getAllKeys());
								is_request_authorized(req, res);
								uuid_exists(req, res);
								session_token_matches(req, res);
								next();
						} catch (e) {
								return forbidden(res);
						}
				} else {
						next();
				}
		};

		function is_request_authorized(req, res) {
				if (!req.headers.hasOwnProperty("x-session-token") && !req.headers.hasOwnProperty("x-user-id")) {
						throw new UnauthorizedException();
				}
		}

		function uuid_exists(req, res) {
				if (!in_mem_cache_service.keyExists(`${SESSION_CACHE_PREFIX}${req.headers["x-user-id"]}`)) {
						throw new UnauthorizedException();
				}
		}

		function session_token_matches(req, res) {
				if (in_mem_cache_service.get(`${SESSION_CACHE_PREFIX}${req.headers["x-user-id"]}`) !== req.headers["x-session-token"]) {
						throw new UnauthorizedException();
				}
		}

		return {
				admin_middleware: admin_middleware,
				visitor_middleware: visitor_middleware,
				auth_middleware: auth_middleware
		};

})();
