const { setConfig, getWidgets, getWidgetScript } = require("./widget.service");

function getEntryConfig(configName) {
	try {
		let entryConfig = {};

		setConfig(configName);
		getWidgets()?.forEach((widget) => {
			entryConfig[widget.widgetId] = getWidgetScript(widget);
		});
		console.log(entryConfig);
		return entryConfig;
	} catch (e) {
		console.error(e);
		return {};
	}
}

module.exports = {
	getEntryConfig,
};
