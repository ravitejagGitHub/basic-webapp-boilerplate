const fs = require("fs");
const path = require("path");

const templateFile = "template.html";

const PAGES = ["login", "reset-password"];

const filePath = path.join(__dirname, "..", "src", templateFile);
// console.log(filePath);

const templateContent = fs.readFileSync(filePath, {
	encoding: "utf8",
	flag: "r",
});
// console.log(templateContent);

PAGES.forEach((PAGE) => {
	try {
		const filePath = path.join(__dirname, "..", "src", PAGE, `${PAGE}.html`);
		// console.log(filePath);
		const fileContent = fs.readFileSync(filePath, {
			encoding: "utf8",
			flag: "r",
		});

		//Repalce Place holder with specific Page view like Login, Forgot, Reset Password etc.
		let newTemplateContent = templateContent.replace(
			/{{placeholder}}/i,
			fileContent
		);

		//Repalce script with specific Page script like Login, Forgot, Reset Password etc.
		newTemplateContent = newTemplateContent.replace(
			/{{script.js}}/i,
			`../js/${PAGE}.js`
		);

		//Repalce link with specific Page css like Login, Forgot, Reset Password etc.
		newTemplateContent = newTemplateContent.replace(
			/{{style.css}}/i,
			`../css/${PAGE}.css`
		);

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
