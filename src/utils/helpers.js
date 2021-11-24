const app_config = require("src/config/mapper");
const moment = require("moment-timezone");

const getCurrentIndiaTimestamp = moment.tz(Date.now(), app_config.app.timezone);


const generate_session_token = (length = 25) => {
	let result = "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const get_hash_value = (value) => {
	const bcrypt = require("bcrypt");
	const saltRounds = 10;
	return bcrypt.hashSync(value, saltRounds);
};

module.exports = {
	generate_session_token,
	getCurrentIndiaTimestamp,
	get_hash_value
};
