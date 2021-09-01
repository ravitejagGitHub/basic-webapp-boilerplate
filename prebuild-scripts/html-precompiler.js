const fs = require("fs");
const path = require("path");
const { getConfig } = require("./config.service");
const {
	setConfig,
	getWidgetById,
	getWidgetTemplate,
} = require("./widget.service");

setConfig("en-SG.json");

const config = getConfig("en-SG.json");
const PAGES = config.pages;
let layout = {};

PAGES.forEach((PAGE) => {
	if (PAGE) {
		try {
			const layout = getLayoutContent(PAGE?.layout);

			newTemplateContent = replaceTemplate({
				template: layout.content,
				widget: PAGE.id,
				contentHolder: "{{placeholder}}",
				scriptHolder: "{{script.js}}",
				styletHolder: "{{style.css}}",
			});

			const target = path.join(__dirname, "..", "build", "html");

			if (!fs.existsSync(target)) {
				fs.mkdirSync(target, { recursive: true });
			}
			const newFilePath = path.join(target, `${PAGE.id}.html`);
			fs.writeFileSync(newFilePath, newTemplateContent);
		} catch (e) {
			console.error(e);
		}
	}
});

function getLayoutContent(layoutId) {
	if (layout?.id === layoutId) {
		return layout;
	}
	const layoutObj = config?.layouts.find((l) => l.id === layoutId);

	if (layoutObj) {
		try {
			const filePath = path.join(
				__dirname,
				"..",
				"src/layouts",
				layoutObj?.path
			);
			// console.log(filePath);
			let newTemplateContent = fs.readFileSync(filePath, {
				encoding: "utf8",
				flag: "r",
			});

			newTemplateContent = replaceTemplate({
				template: newTemplateContent,
				widget: layoutObj.header,
				contentHolder: "{{header}}",
				scriptHolder: "{{header.js}}",
				styletHolder: "{{header.css}}",
			});

			newTemplateContent = replaceTemplate({
				template: newTemplateContent,
				widget: layoutObj.footer,
				contentHolder: "{{footer}}",
				scriptHolder: "{{footer.js}}",
				styletHolder: "{{footer.css}}",
			});

			layout = {
				id: layoutObj.id,
				content: newTemplateContent,
			};

			return layout;
		} catch (e) {
			console.log(e);
		}
	} else {
		console.error(`${layoutId} is not found in ${configName} file`);
	}
}

function replaceTemplate({
	template,
	widget,
	contentHolder,
	scriptHolder,
	styletHolder,
}) {
	let newTemplateContent = template.replace(
		new RegExp(contentHolder, "i"),
		getPageContent(widget)
	);

	//Repalce script with specific Page script like Login, Forgot, Reset Password etc.
	newTemplateContent = newTemplateContent.replace(
		new RegExp(scriptHolder, "i"),
		`${config.blobUrl}/js/${widget}.js`
	);

	//Repalce link with specific Page css like Login, Forgot, Reset Password etc.
	newTemplateContent = newTemplateContent.replace(
		new RegExp(styletHolder, "i"),
		`${config.blobUrl}/css/${widget}.css`
	);

	return newTemplateContent;
}

function getPageContent(widget) {
	const widgetConfig = getWidgetById(widget);
	if (widgetConfig) {
		const filePath = getWidgetTemplate(widgetConfig);
		try {
			return fs.readFileSync(filePath, {
				encoding: "utf8",
				flag: "r",
			});
		} catch {
			console.error(e);
		}
	} else {
		console.error(`${widget.id} is not found in  ${configName}`);
	}
}
