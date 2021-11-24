const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");

module.exports = (function () {

	const ExceptionHandler = function (e, response_instance) {
		switch (e.name) {
			// Custom exceptions error/exception
			case "UserNotApprovedException":
			case "UserNotFoundException":
			case "CredentialsFailedException":
			case "InvalidRequestException":
			case "InvalidNumberException":
			case "EmailInvalidException":
			case "EmptyFieldException":
			case "FileWriteException":
			case "ExchangeRateExceptions":
			case "PasswordNotMatchException":
			case "RecordNotFoundException":
			case "InvalidBidDecisionException":
			case "InvalidCSVFileException":
			case "UserAccountSuspendedException":
				return e.sendAppResponse(response_instance);

			// The mongoose related errors
			case "ValidationError":
				return response_instance
					.status(STATUS_CODES.BAD_REQUEST)
					.json({
						status: SEVERITY_LEVEL.EXCEPTION,
						exception: e.name,
						message: Object.values(e.errors).map(el => el.message),
						stack: {}
					});

			case "MongoError":
				const IS_DUPLICATE = e.hasOwnProperty("code") && e.code === 11000;
				return response_instance
					.status(IS_DUPLICATE ? STATUS_CODES.BAD_REQUEST : STATUS_CODES.SERVER_ERROR)
					.json({
						status: SEVERITY_LEVEL.EXCEPTION,
						exception: "Database Exception",
						message: IS_DUPLICATE ? "Value already exists in database" : "Internal Server Error",
						stack: {}
					});

			// Runtime Exception
			default:
				return response_instance
					.status(STATUS_CODES.SERVER_ERROR)
					.json({
						status: SEVERITY_LEVEL.ERROR,
						exception: e.name,
						message: "Internal Server Error",
						stack: {}
					});
		}
	};

	return {
		ExceptionHandler
	};

})();
