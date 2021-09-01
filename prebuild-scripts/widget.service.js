const path = require("path");
const { getConfig } = require("./config.service");

let configName = "en-US.json"; //default Config

const widgetsBasePath = path.join(__dirname, "..", "src/widgets");

function getWidgetById(widgetId) {
	const config = getConfig(configName);
	const widget = config.widgetRegistry?.find((w) => w.widgetId == widgetId);
	if (!widget) {
		console.error(`${widgetId} is not found in  ${configName}`);
	}
	return widget;
}

function getWidgetModule(widgetId) {
	const widget = getWidgetById(widgetId);
	const modulePath = `${widgetsBasePath}/${widget.path}/${widget.moduleName}.js`;
	return require(modulePath);
}

function getWidgets() {
	const config = getConfig(configName);
	return config?.widgetRegistry;
}

function setConfig(config) {
	configName = config;
}

function getWidgetScript(widget) {
	const module = getWidgetModule(widget.widgetId);

	return `${widgetsBasePath}/${widget.path}/${module.script}`;
}

function getWidgetTemplate(widget) {
	const module = getWidgetModule(widget.widgetId);

	return `${widgetsBasePath}/${widget.path}/${module.template}`;
}
module.exports = {
	setConfig,
	widgetsBasePath,
	getWidgetById,
	getWidgetModule,
	getWidgets,
	getWidgetTemplate,
	getWidgetScript,
};
