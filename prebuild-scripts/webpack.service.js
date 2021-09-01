const fs = require("fs");
const path = require("path");
const { getConfig } = require("./config.service");

function getEntryConfig(configName) {
	try {
		let entryConfig = {};

		const config = getConfig(configName);

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
