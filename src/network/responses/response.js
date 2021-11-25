const response_payload = function (code, message, data = null) {
		return {
				code: code,
				message: message,
				data: data
		};
};

module.exports = {
		response_payload
};
