const fs = require("fs");
const path = require("path");

function getConfig(configName) {
	try {
		const filePath = path.join(__dirname, "..", "config", configName);
		// console.log(filePath);

		return JSON.parse(
			fs.readFileSync(filePath, {
				encoding: "utf8",
				flag: "r",
			})
		);
	} catch (e) {
		console.error(e);
		return {};
	}
}

module.exports = {
	getConfig,
};
