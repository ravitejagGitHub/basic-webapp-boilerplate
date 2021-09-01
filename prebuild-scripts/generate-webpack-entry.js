const fs = require("fs");
const path = require("path");

function getEntryConfig(configName) {
	try {
		let entryConfig = {};

		const filePath = path.join(__dirname, "..", "config", configName);
		// console.log(filePath);

		const config = JSON.parse(
			fs.readFileSync(filePath, {
				encoding: "utf8",
				flag: "r",
			})
		);
		// console.log(config);

		config?.widgetRegistry?.forEach((widget) => {
			entryConfig[widget.widgetId] = `${config.widgetsBasepath}/${widget.path}`;
		});
		// console.log(entryConfig);
		return entryConfig;
	} catch (e) {
		console.error(e);
		return {};
	}
}

module.exports = {
	getEntryConfig,
};
