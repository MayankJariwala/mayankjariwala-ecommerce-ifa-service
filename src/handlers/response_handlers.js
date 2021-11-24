const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");


/**
 *
 * @constructor
 */
function ResponseHandlers() {

}

const response_handler_instance = new ResponseHandlers();

ResponseHandlers.prototype.unauthorized = function (res, code = STATUS_CODES.UNAUTHORIZED, message = "Account session is expired. Logging out in ${seconds} seconds") {
	res.status(code).json({
		status: SEVERITY_LEVEL.EXCEPTION,
		message: message,
		data: {}
	});
};

ResponseHandlers.prototype.forbidden = function (res, code = STATUS_CODES.FORBIDDEN, message = "Account is expired") {
	res.status(code).json({
		status: SEVERITY_LEVEL.EXCEPTION,
		message: message,
		data: {}
	});
};

module.exports = response_handler_instance;
