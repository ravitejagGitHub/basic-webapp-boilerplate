const fs = require("fs");
const path = require("path");

const templateFile = "layout.html";

const PAGES = ["login", "reset-password"];

const HEADER = "header";
const FOOTER = "footer";

const filePath = path.join(__dirname, "..", "src/layouts", templateFile);
// console.log(filePath);

const templateContent = fs.readFileSync(filePath, {
	encoding: "utf8",
	flag: "r",
});
// console.log(templateContent);

PAGES.forEach((PAGE) => {
	try {
		newTemplateContent = replaceTemplate({
			template: templateContent,
			widget: PAGE,
			contentHolder: "{{placeholder}}",
			scriptHolder: "{{script.js}}",
			styletHolder: "{{style.css}}",
		});

		newTemplateContent = replaceTemplate({
			template: newTemplateContent,
			widget: HEADER,
			contentHolder: "{{header}}",
			scriptHolder: "{{header.js}}",
			styletHolder: "{{header.css}}",
		});

		newTemplateContent = replaceTemplate({
			template: newTemplateContent,
			widget: FOOTER,
			contentHolder: "{{footer}}",
			scriptHolder: "{{footer.js}}",
			styletHolder: "{{footer.css}}",
		});

		const target = path.join(__dirname, "../", "build", "html");

		if (!fs.existsSync(target)) {
			fs.mkdirSync(target, { recursive: true });
		}
		const newFilePath = path.join(target, `${PAGE}.html`);
		fs.writeFileSync(newFilePath, newTemplateContent);
	} catch (e) {
		console.error(e);
	}
});

function replaceTemplate({
	template,
	widget,
	contentHolder,
	scriptHolder,
	styletHolder,
}) {
	let newTemplateContent = template.replace(
		new RegExp(contentHolder, "gi"),
		getPageContent(widget)
	);

	//Repalce script with specific Page script like Login, Forgot, Reset Password etc.
	newTemplateContent = newTemplateContent.replace(
		new RegExp(scriptHolder, "gi"),
		`../js/${widget}.js`
	);

	//Repalce link with specific Page css like Login, Forgot, Reset Password etc.
	newTemplateContent = newTemplateContent.replace(
		new RegExp(styletHolder, "gi"),
		`../css/${widget}.css`
	);

	return newTemplateContent;
}

function getPageContent(PAGE) {
	const filePath = path.join(
		__dirname,
		"..",
		"src/widgets",
		PAGE,
		`${PAGE}.html`
	);

	return fs.readFileSync(filePath, {
		encoding: "utf8",
		flag: "r",
	});
}
