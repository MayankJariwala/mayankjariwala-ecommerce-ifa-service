const process = require("process");
require("custom-env").env(process.env.NODE_ENV);

const config = {
		app: {
				host: `${process.env.HOST}`,
				port: `${process.env.PORT}`,
				uri: `${process.env.HOST}:${process.env.PORT}`,
				base: `/api/v1`,
				timezone: `${process.env.TIME_ZONE}`
		}
};

module.exports = config;
