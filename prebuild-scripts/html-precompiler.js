const fs = require("fs");
const path = require("path");

const templateFile = "template.html";

const names = ["login", "reset-password"];

const filePath = path.join(__dirname, "..", "src", templateFile);
// console.log(filePath);

const templateContent = fs.readFileSync(filePath, {
	encoding: "utf8",
	flag: "r",
});
// console.log(templateContent);

names.forEach((name) => {
	try {
		const filePath = path.join(__dirname, "..", "src", name, `${name}.html`);
		// console.log(filePath);
		const fileContent = fs.readFileSync(filePath, {
			encoding: "utf8",
			flag: "r",
		});

		let newTemplateContent = templateContent.replace(
			/{{placeholder}}/i,
			fileContent
		);

		newTemplateContent = newTemplateContent.replace(
			/{{script.js}}/i,
			`../js/${name}.js`
		);
		// newTemplateContent += `<script src="${name}.js"></script>`;
		// console.log(newTemplateContent);

		const target = path.join(__dirname, "../", "build", "html");

		if (!fs.existsSync(target)) {
			fs.mkdirSync(target, { recursive: true });
		}
		const newFilePath = path.join(target, `${name}.html`);
		fs.writeFileSync(newFilePath, newTemplateContent);
	} catch (e) {
		console.error(e);
	}
});
